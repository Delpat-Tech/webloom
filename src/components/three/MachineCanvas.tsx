'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { machine } from './machineStore';

/**
 * "The Delpat Machine": one fixed canvas behind the whole Home page.
 *
 * ~1,800 particles are drawn as a single THREE.Points call with a sphere-impostor
 * shader (each dot is lit like a tiny 3D sphere), plus a soft halo pass and line
 * passes that reuse the very same position buffer. Positions are computed on the
 * CPU each frame from five layouts that blend as the page scrolls:
 *
 *   0 core (planet + ring)  1 storm  2 three engines  3 pipeline  4 beating core
 *
 * Interaction: particles part around the cursor, and a click sends a shockwave.
 * Rendering is on demand and capped to ~30fps when only ambient motion is running.
 */

const STAGES = 5;
const COLORS = ['#10b981', '#2b8fd6', '#38bdf8'];
const SPARK = '#e0f2fe';
const TAU = Math.PI * 2;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// cube corners by bit pattern (x = bit0, y = bit1, z = bit2) and its 12 edges
const H = 0.85;
const CORNERS = Array.from({ length: 8 }, (_, c) => [c & 1 ? H : -H, c & 2 ? H : -H, c & 4 ? H : -H]);
const EDGES = [
  [0, 1], [2, 3], [4, 5], [6, 7],
  [0, 2], [1, 3], [4, 6], [5, 7],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

interface Built {
  N: number;
  P: number;
  base: Float32Array[];
  ring: Uint8Array;
  ringR: Float32Array;
  sub: Uint8Array;
  param: Float32Array;
  packet: Uint8Array;
  seed: Float32Array;
  colors: Float32Array;
  enginePairs: Uint32Array;
  pipePairs: Uint32Array;
}

function build(P: number, streamGap = 1.0): Built {
  const N = P * 3;
  const rnd = mulberry32(11);
  const base = Array.from({ length: STAGES }, () => new Float32Array(N * 3));
  const ring = new Uint8Array(N);
  const ringR = new Float32Array(N);
  const sub = new Uint8Array(N);
  const param = new Float32Array(N);
  const packet = new Uint8Array(N);
  const seed = new Float32Array(N);
  const colors = new Float32Array(N * 3);
  const col = new THREE.Color();
  const golden = Math.PI * (3 - Math.sqrt(5));
  const enginePairs: number[] = [];
  const pipePairs: number[] = [];
  const isPacket = (k: number) => k % 37 === 0;

  for (let i = 0; i < N; i++) {
    const g = Math.floor(i / P);
    const k = i % P;
    const o = i * 3;
    seed[i] = rnd();

    col.set(k % 23 === 0 ? SPARK : COLORS[g]);
    const l = 0.82 + rnd() * 0.36;
    colors[o] = Math.min(1, col.r * l);
    colors[o + 1] = Math.min(1, col.g * l);
    colors[o + 2] = Math.min(1, col.b * l);

    // 0 / 4: fibonacci sphere, with every 6th particle on a planetary ring in stage 0
    const j = (i * 7919) % N;
    const y = 1 - (2 * (j + 0.5)) / N;
    const r = Math.sqrt(1 - y * y);
    const th = j * golden;
    const sx = Math.cos(th) * r;
    const sz = Math.sin(th) * r;
    if (k % 6 === 0) {
      ring[i] = 1;
      param[i] = rnd() * TAU;
      ringR[i] = 2.05 + rnd() * 0.5;
      base[0].set([0, (rnd() - 0.5) * 0.05, 0], o);
    } else {
      base[0].set([sx * 1.35, y * 1.35, sz * 1.35], o);
    }
    base[4].set([sx * 1.5, y * 1.5, sz * 1.5], o);

    // 1: a storm, pushed back so the copy in front stays legible
    base[1].set([(rnd() - 0.5) * 12, (rnd() - 0.5) * 6.5, -5.5 + rnd() * 5], o);

    // 2: engines (local offsets; centres and motion are added per frame)
    if (g === 0) {
      const f = (k * 12) / P;
      const e = Math.floor(f);
      const t = f - e;
      const a = CORNERS[EDGES[e][0]];
      const b = CORNERS[EDGES[e][1]];
      base[2].set([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t], o);
      sub[i] = e;
      if (k + 1 < P && Math.floor(((k + 1) * 12) / P) === e) enginePairs.push(i, i + 1);
    } else if (g === 1) {
      const f = (k * 3) / P;
      const rIdx = Math.floor(f);
      const ang = (f - rIdx) * TAU;
      const R = 1.05;
      const c = Math.cos(ang) * R;
      const s = Math.sin(ang) * R;
      base[2].set(rIdx === 0 ? [c, s, 0] : rIdx === 1 ? [c, 0, s] : [0, c, s], o);
      sub[i] = rIdx;
      const sameNext = k + 1 < P && Math.floor(((k + 1) * 3) / P) === rIdx;
      if (sameNext) enginePairs.push(i, i + 1);
      else enginePairs.push(i, g * P + Math.ceil((rIdx * P) / 3)); // close the ring
    } else {
      param[i] = k / P;
      enginePairs.push(i, k + 1 < P ? i + 1 : g * P); // closed infinity loop
    }

    // 3: three pipelines; every 37th particle is a fast-moving data packet
    packet[i] = isPacket(k) ? 1 : 0;
    base[3].set([-6 + 12 * (k / P), (g - 1) * streamGap, (rnd() - 0.5) * 0.3], o);
    if (!isPacket(k)) {
      if (k + 1 < P && !isPacket(k + 1)) pipePairs.push(i, i + 1);
      else if (k + 2 < P) pipePairs.push(i, i + 2);
    }
  }

  return {
    N, P, base, ring, ringR, sub, param, packet, seed, colors,
    enginePairs: new Uint32Array(enginePairs),
    pipePairs: new Uint32Array(pipePairs),
  };
}

// ---------- shaders ----------

const VERT = /* glsl */ `
  attribute float aScale;
  attribute vec3 color;
  uniform float uRadius;
  uniform float uScalePx;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(1.5, 2.0 * uRadius * aScale * uScalePx / -mv.z);
  }
`;

// each point is shaded as a sphere: diffuse + specular + rim
const FRAG_SPHERE = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    float r2 = dot(c, c);
    if (r2 > 1.0) discard;
    vec3 n = vec3(c.x, -c.y, sqrt(1.0 - r2));
    vec3 L = normalize(vec3(-0.45, 0.65, 0.7));
    float diff = max(dot(n, L), 0.0);
    float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 28.0);
    float rim = pow(1.0 - n.z, 2.0);
    vec3 col = vColor * (0.55 + 0.65 * diff) + spec * 0.75 + vec3(0.6, 0.85, 1.0) * rim * 0.35;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const FRAG_HALO = /* glsl */ `
  uniform float uHalo;
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    float d = length(c);
    if (d > 1.0) discard;
    float a = pow(1.0 - d, 2.4) * uHalo;
    gl_FragColor = vec4(vColor, a);
  }
`;

const ease = (t: number) => t * t * (3 - 2 * t);

function Machine({ small, reduced, isDark }: { small: boolean; reduced: boolean; isDark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { invalidate, viewport, camera } = useThree();
  const fit = Math.min(1, viewport.width / 11.5);

  const B = useMemo(() => (small ? build(300, 0.26) : build(600)), [small]);

  const { geo, lineE, lineP, sphereMat, haloMat, lineMatE, lineMatP } = useMemo(() => {
    const pos = new THREE.BufferAttribute(new Float32Array(B.N * 3), 3).setUsage(THREE.DynamicDrawUsage);
    const scl = new THREE.BufferAttribute(new Float32Array(B.N).fill(1), 1).setUsage(THREE.DynamicDrawUsage);
    const colr = new THREE.BufferAttribute(B.colors, 3);
    pos.array.set(B.base[0]);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', pos);
    geo.setAttribute('color', colr);
    geo.setAttribute('aScale', scl);

    const mkLine = (pairs: Uint32Array) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', pos); // shared: lines cost no extra uploads
      g.setAttribute('color', colr);
      g.setIndex(new THREE.BufferAttribute(pairs, 1));
      return g;
    };

    const uniforms = { uRadius: { value: small ? 0.028 : 0.021 }, uScalePx: { value: 1000 } };
    const sphereMat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG_SPHERE, uniforms });
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG_HALO,
      uniforms: { uRadius: { value: uniforms.uRadius.value * 3.4 }, uScalePx: uniforms.uScalePx, uHalo: { value: 0.2 } },
      transparent: true,
      depthWrite: false,
    });
    const lineMat = () =>
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, depthWrite: false });

    return {
      geo,
      lineE: mkLine(B.enginePairs),
      lineP: mkLine(B.pipePairs),
      sphereMat,
      haloMat,
      lineMatE: lineMat(),
      lineMatP: lineMat(),
    };
  }, [B, small]);

  useEffect(() => {
    haloMat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    haloMat.needsUpdate = true;
    invalidate();
  }, [isDark, haloMat, invalidate]);

  useEffect(
    () => () => {
      [geo, lineE, lineP].forEach((g) => g.dispose());
      [sphereMat, haloMat, lineMatE, lineMatP].forEach((m) => m.dispose());
    },
    [geo, lineE, lineP, sphereMat, haloMat, lineMatE, lineMatP]
  );

  const target = useRef(0);
  const stage = useRef(reduced ? 0 : 1.7); // intro: the core assembles out of the storm
  const pointer = useRef({ x: 0, y: 0, sx: 0, sy: 0, active: false, a: 0 });
  const shock = useRef({ x: 0, y: 0, t0: -10 });
  const groupScale = useRef([1, 1, 1]);
  // phones: which engine is centred (0..2, smoothed), so the engines slide like a carousel
  const focus = useRef(1);
  const time = useRef(0);
  const timer = useRef<number | null>(null);
  const tmpA = useMemo(() => new Float32Array(3), []);
  const tmpB = useMemo(() => new Float32Array(3), []);

  // scroll -> continuous stage value from the [data-stage] sections
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'));
      if (!els.length) return;
      const mid = window.scrollY + window.innerHeight * 0.5;
      const pts = els
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { c: window.scrollY + r.top + r.height / 2, s: parseFloat(el.dataset.stage || '0') };
        })
        .sort((a, b) => a.c - b.c);
      let s = pts[0].s;
      if (mid >= pts[pts.length - 1].c) s = pts[pts.length - 1].s;
      else if (mid > pts[0].c) {
        for (let i = 0; i < pts.length - 1; i++) {
          if (mid >= pts[i].c && mid <= pts[i + 1].c) {
            const t = (mid - pts[i].c) / (pts[i + 1].c - pts[i].c || 1);
            s = pts[i].s + (pts[i + 1].s - pts[i].s) * t;
            break;
          }
        }
      }
      target.current = s;
      machine.setStage(Math.round(s));
      invalidate();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    const toNdc = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onMove = (e: PointerEvent) => {
      toNdc(e);
      pointer.current.active = true;
      invalidate();
    };
    const onLeave = () => {
      pointer.current.active = false;
      invalidate();
    };
    const onDown = (e: PointerEvent) => {
      toNdc(e);
      shock.current = { x: pointer.current.x, y: pointer.current.y, t0: time.current };
      invalidate();
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const interactive = !small && !reduced;
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      window.addEventListener('pointerdown', onDown, { passive: true });
    }
    // phones: a tap (not a scroll) sends the shockwave
    const onTap = (e: MouseEvent) => onDown(e as PointerEvent);
    if (small && !reduced) window.addEventListener('click', onTap, { passive: true });
    const unsub = machine.subscribe(() => invalidate());
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('click', onTap);
      unsub();
      if (raf) cancelAnimationFrame(raf);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [invalidate, small, reduced]);

  /** Animated position of particle i in stage s at time t. */
  const posFor = (s: number, i: number, t: number, out: Float32Array) => {
    const o = i * 3;
    const b = B.base[s];
    const g = Math.floor(i / B.P);
    switch (s) {
      case 0: {
        let x: number, y: number, z: number;
        if (B.ring[i]) {
          const a = B.param[i] + t * 0.22;
          x = Math.cos(a) * B.ringR[i];
          y = b[o + 1];
          z = Math.sin(a) * B.ringR[i];
          // tilt the ring like a planet's
          const cy = Math.cos(0.42), sy = Math.sin(0.42);
          const y2 = y * cy - z * sy;
          z = y * sy + z * cy;
          y = y2;
        } else {
          const br = 1 + 0.03 * Math.sin(t * 1.6 + B.seed[i] * 12);
          const sp = t * 0.15;
          const c = Math.cos(sp), sn = Math.sin(sp);
          x = (b[o] * c - b[o + 2] * sn) * br;
          y = b[o + 1] * br;
          z = (b[o] * sn + b[o + 2] * c) * br;
        }
        out[0] = x; out[1] = y; out[2] = z;
        return;
      }
      case 1: {
        const sd = B.seed[i];
        out[0] = b[o] + Math.sin(t * 0.45 + sd * 20) * 0.45;
        out[1] = b[o + 1] + Math.cos(t * 0.38 + sd * 13) * 0.32;
        out[2] = b[o + 2] + Math.sin(t * 0.3 + sd * 7) * 0.3;
        return;
      }
      case 2: {
        const cx = (g - (small ? focus.current : 1)) * 3.6;
        let x = b[o], y = b[o + 1], z = b[o + 2];
        if (g === 0) {
          // tumbling wireframe cube
          const ay = t * 0.5 + 0.6, ax = t * 0.3 + 0.4;
          let c = Math.cos(ay), sn = Math.sin(ay);
          const x1 = x * c + z * sn, z1 = -x * sn + z * c;
          c = Math.cos(ax); sn = Math.sin(ax);
          const y1 = y * c - z1 * sn, z2 = y * sn + z1 * c;
          x = x1; y = y1; z = z2;
        } else if (g === 1) {
          // gyroscope: each ring spins on its own axis
          const r = B.sub[i];
          const a = t * (0.7 + r * 0.25);
          const c = Math.cos(a), sn = Math.sin(a);
          if (r === 0) { const x1 = x * c + z * sn; z = -x * sn + z * c; x = x1; }
          else if (r === 1) { const y1 = y * c - z * sn; z = y * sn + z * c; y = y1; }
          else { const x1 = x * c - y * sn; y = x * sn + y * c; x = x1; }
          const tilt = 0.35;
          const ct = Math.cos(tilt), st = Math.sin(tilt);
          const y2 = y * ct - z * st; z = y * st + z * ct; y = y2;
        } else {
          // particles flowing around an infinity loop
          const u = ((B.param[i] + t * 0.07) % 1) * TAU;
          const d = 1 + Math.sin(u) * Math.sin(u);
          x = (1.5 * Math.cos(u)) / d;
          y = (1.5 * Math.sin(u) * Math.cos(u)) / d;
          z = 0.3 * Math.sin(u);
          const a = Math.sin(t * 0.4) * 0.5;
          const c = Math.cos(a), sn = Math.sin(a);
          const x1 = x * c + z * sn; z = -x * sn + z * c; x = x1;
        }
        out[0] = cx + x; out[1] = y; out[2] = z;
        return;
      }
      case 3: {
        let x = b[o];
        if (B.packet[i]) x = ((((b[o] + 6 + t * 1.8 + B.seed[i] * 12) % 12) + 12) % 12) - 6;
        out[0] = x;
        out[1] = b[o + 1] + Math.sin(x * 1.1 + t * 2 + g) * 0.14;
        out[2] = b[o + 2];
        return;
      }
      default: {
        // heartbeat: a double pulse
        const beat =
          Math.pow(Math.max(0, Math.sin(t * 2.2)), 14) * 0.09 +
          Math.pow(Math.max(0, Math.sin(t * 2.2 - 0.55)), 14) * 0.05;
        const sp = t * 0.15;
        const c = Math.cos(sp), sn = Math.sin(sp);
        const k = 1 + beat;
        out[0] = (b[o] * c - b[o + 2] * sn) * k;
        out[1] = b[o + 1] * k;
        out[2] = (b[o] * sn + b[o + 2] * c) * k;
      }
    }
  };

  useFrame((state, rawDt) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(rawDt, 0.05);
    if (!reduced) time.current += dt;
    const t = time.current;

    // keep the point size in pixels correct for the current canvas
    const persp = camera as THREE.PerspectiveCamera;
    sphereMat.uniforms.uScalePx.value =
      (state.size.height * state.viewport.dpr) / (2 * Math.tan((persp.fov * Math.PI) / 360));

    // easing uses real elapsed time so slow or throttled frames still settle on time
    const k = 1 - Math.exp(-Math.min(rawDt, 0.25) * 4.5);
    const ds = target.current - stage.current;
    stage.current += ds * k;
    const s = Math.min(Math.max(stage.current, 0), STAGES - 1);
    const a = Math.min(Math.floor(s), STAGES - 2);
    const f = ease(s - a);

    const coreW = s < 1 ? 1 - s : s > 3 ? s - 3 : 0;
    const stormW = Math.max(0, 1 - Math.abs(s - 1));
    const engineW = Math.max(0, 1 - Math.abs(s - 2) * 1.6);
    const pipeW = Math.max(0, 1 - Math.abs(s - 3) * 1.6);

    // engine highlight from the service cards
    const hov = machine.hover;
    let gsMoving = false;
    for (let gi = 0; gi < 3; gi++) {
      const goal = hov === -1 ? 1 : hov === gi ? 1.55 : 0.5;
      groupScale.current[gi] += (goal - groupScale.current[gi]) * k;
      if (Math.abs(goal - groupScale.current[gi]) > 0.003) gsMoving = true;
    }
    const focusGoal = hov === -1 ? 1 : hov;
    focus.current += (focusGoal - focus.current) * k;
    if (Math.abs(focusGoal - focus.current) > 0.002) gsMoving = true;

    // pointer, in the group's local space
    const pt = pointer.current;
    pt.sx += (pt.x - pt.sx) * k;
    pt.sy += (pt.y - pt.sy) * k;
    pt.a += ((pt.active ? 1 : 0) - pt.a) * k;
    const heroW = Math.max(0, 1 - s);
    const aspect = viewport.width / viewport.height;
    // phones: the planet is the hero visual in the band above the headline (a spacer in the hero
    // reserves it), and one engine at a time sits centred above the cards.
    // narrower desktops: the hero planet shrinks and moves right so it clears the headline.
    const narrow = aspect < 1.6 ? 1 : 0;
    const heroPhone = Math.min(0.52, (viewport.width * 0.46) / 2.55); // ring fits the width
    const scale = small
      ? heroPhone * heroW + 0.36 * coreW * (1 - heroW) + (0.27 + 0.17 * engineW + 0.25 * pipeW + 0.3 * stormW) * (1 - coreW)
      : fit * (1 - 0.28 * heroW * narrow);
    // phones: the pipeline stands up as a timeline rail along the left edge of the step cards
    const gx = small ? (-viewport.width / 2 + 0.3) * pipeW : viewport.width * (narrow ? 0.31 : 0.25) * heroW;
    // lift the machine clear of the cards: engines/pipeline on phones, pipeline and CTA core on desktop
    const ctaW = s > 3 ? s - 3 : 0;
    // phone hero band: the layout's 96px header offset + a 34svh spacer, so its centre is ~96px + 17svh down
    const heroBandY = viewport.height * (0.5 - 96 / state.size.height - 0.17);
    const ep = engineW + pipeW;
    const gy = small
      ? heroBandY * heroW + Math.min(1, ep) * (ep > 0 ? (0.45 * engineW) / ep : 0) + 1.4 * ctaW
      : 0.55 * pipeW + 1.55 * ctaW;
    const mx = ((pt.sx * viewport.width) / 2 - gx) / scale;
    const my = ((pt.sy * viewport.height) / 2 - gy) / scale;
    const repel = pt.a > 0.01;

    const sh = shock.current;
    const age = t - sh.t0;
    const shocking = age < 2.2;
    const shx = ((sh.x * viewport.width) / 2 - gx) / scale;
    const shy = ((sh.y * viewport.height) / 2 - gy) / scale;
    const front = age * 5.5;
    const shAmp = 0.75 * Math.exp(-age * 1.5);

    const pulseX = ((t * 2.4) % 14) - 7;
    const pos = geo.attributes.position.array as Float32Array;
    const scl = geo.attributes.aScale.array as Float32Array;

    for (let i = 0; i < B.N; i++) {
      posFor(a, i, t, tmpA);
      let x = tmpA[0], y = tmpA[1], z = tmpA[2];
      if (f > 0.0005) {
        posFor(a + 1, i, t, tmpB);
        x += (tmpB[0] - x) * f;
        y += (tmpB[1] - y) * f;
        z += (tmpB[2] - z) * f;
      }

      let sc = 1;
      const gi = Math.floor(i / B.P);
      if (engineW > 0) sc *= 1 + (groupScale.current[gi] - 1) * engineW;
      if (pipeW > 0) {
        if (B.packet[i]) sc *= 1 + 1.1 * pipeW;
        else sc *= 1 + 1.6 * pipeW * Math.exp(-((x - pulseX) ** 2) / 0.45);
      }
      if (stormW > 0) sc *= 1 - 0.25 * stormW;

      if (repel) {
        const dx = x - mx, dy = y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 1.44) {
          const d = Math.sqrt(d2) + 1e-4;
          const push = (1 - d / 1.2) ** 2 * 0.8 * pt.a;
          x += (dx / d) * push;
          y += (dy / d) * push;
          z += push * 0.7;
          sc *= 1 + push * 0.6;
        }
      }

      if (shocking) {
        const dx = x - shx, dy = y - shy;
        const d = Math.sqrt(dx * dx + dy * dy) + 1e-4;
        const w = Math.exp(-((d - front) ** 2) * 2.5) * shAmp;
        if (w > 0.002) {
          x += (dx / d) * w;
          y += (dy / d) * w;
          z += w * 0.9;
          sc *= 1 + w * 0.8;
        }
      }

      const o = i * 3;
      pos[o] = x;
      pos[o + 1] = y;
      pos[o + 2] = z;
      scl[i] = sc;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.aScale.needsUpdate = true;

    haloMat.uniforms.uHalo.value = (isDark ? 0.32 : 0.2) * (0.55 + 0.45 * coreW + 0.3 * pipeW);
    lineMatE.opacity = 0.55 * engineW;
    lineMatP.opacity = 0.35 * pipeW;

    if (small) {
      sphereMat.uniforms.uRadius.value = 0.034 * scale;
      haloMat.uniforms.uRadius.value = 0.034 * scale * 3.4;
    }
    g.position.set(gx, gy, 0);
    g.scale.setScalar(scale);
    g.rotation.z = small ? (-Math.PI / 2) * pipeW : 0;
    g.rotation.y = pt.sx * 0.18;
    g.rotation.x = -pt.sy * 0.1;

    // keep rendering only while something is changing
    const settling =
      Math.abs(ds) > 0.002 ||
      gsMoving ||
      Math.abs(pt.x - pt.sx) > 0.002 ||
      Math.abs(pt.y - pt.sy) > 0.002 ||
      (pt.a > 0.005 && pt.a < 0.995) ||
      shocking;
    if (settling) invalidate();
    else if (!reduced && !timer.current) {
      // ambient motion at ~30fps instead of 60
      timer.current = window.setTimeout(() => {
        timer.current = null;
        invalidate();
      }, 33);
    }
  });

  return (
    <group ref={group}>
      <points geometry={geo} material={haloMat} frustumCulled={false} renderOrder={2} />
      <points geometry={geo} material={sphereMat} frustumCulled={false} renderOrder={1} />
      <lineSegments geometry={lineE} material={lineMatE} frustumCulled={false} renderOrder={0} />
      <lineSegments geometry={lineP} material={lineMatP} frustumCulled={false} renderOrder={0} />
    </group>
  );
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setIsDark(el.classList.contains('dark'));
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  return isDark;
}

export default function MachineCanvas() {
  const [env, setEnv] = useState<{ small: boolean; reduced: boolean } | null>(null);
  const [ok, setOk] = useState(true);
  const isDark = useDarkMode();

  useEffect(() => {
    setEnv({
      small: window.matchMedia('(max-width: 767px)').matches,
      reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  if (!ok || !env) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 42 }}
        dpr={[1, env.small ? 1.25 : 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        frameloop="demand"
        onError={() => setOk(false)}
        style={{ opacity: env.small ? 0.85 : 1 }}
      >
        <Machine small={env.small} reduced={env.reduced} isDark={isDark} />
      </Canvas>
    </div>
  );
}
