import * as THREE from 'three';
import { FRAG, L, VERT } from './shaders';
import { MILESTONES, PROOF, SCENES } from './story';

/**
 * One thread, drawn once and kept alive across every page.
 * On the home story, gestures step it through six scenes. On inner pages it holds one
 * scene behind the hero. Moving between pages morphs the thread from one scene to the next.
 */

const STAGES = SCENES.length;
const N_PROOF = PROOF.length;
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer: coarse)').matches || innerWidth < 768;
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const ease = (t: number) => t * t * (3 - 2 * t);

/** Where the thread sits for a scene, from the live viewport: [sx, sy, x, y, tiltBack, turn]. */
function place(scene: number, vw: number, vh: number, portrait: boolean, cols: number): number[] {
  switch (scene) {
    case 0: // the tangle sprawls across the screen
      return [(vw * 0.43) / 2.4, (vh * (portrait ? 0.2 : 0.27)) / 1.5, 0, vh * 0.12, 0, 0];
    case 1: // one thread, top to bottom
      return [portrait ? 1.35 : 2.3, (vh * 1.15) / 7.5, portrait ? vw * 0.29 : vw * 0.16, 0, 0, 0];
    case 2: // the warp, strung edge to edge
      return [(vw * 0.86) / (L.WC + 2 * L.GAP), (vh * 0.48) / L.HC, 0, -vh * 0.1, 0, 0];
    case 3: // the cloth, seen from low down
      return [(vw * (portrait ? 0.94 : 0.6)) / L.WC, (vh * 0.7) / L.HC, portrait ? 0 : vw * 0.15, -vh * 0.05, -0.5, portrait ? 0.06 : 0.16];
    case 4: {
      const gw = (cols - 1) * 2 * L.SX + L.SW;
      const gh = (8 / cols - 1) * L.SY + L.SH;
      const u = Math.min((vw * 0.88) / gw, (vh * 0.52) / gh);
      return [u, u, 0, -vh * 0.02, -0.1, 0];
    }
    default: {
      const u = Math.min(vw * 0.88, vh * 0.46) / 2.9;
      return [u, u, 0, vh * 0.19, -0.6, 0];
    }
  }
}

/** The logo as a white-on-black mask the cloth can read, so the mark is woven in. */
function logoMask(src: string): Promise<THREE.Texture | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onerror = () => resolve(null);
    img.onload = () => {
      try {
        const S = 256;
        const ar = (img.naturalWidth || 1024) / (img.naturalHeight || 718);
        const cv = document.createElement('canvas');
        cv.width = cv.height = S;
        const ctx = cv.getContext('2d', { willReadFrequently: true })!;
        const w = ar >= 1 ? S : S * ar;
        const h = ar >= 1 ? S / ar : S;
        ctx.drawImage(img, (S - w) / 2, (S - h) / 2, w, h);
        const d = ctx.getImageData(0, 0, S, S);
        let x0 = S, x1 = 0, y0 = S, y1 = 0;
        for (let i = 0; i < S * S; i++) {
          const o = i * 4;
          const on = d.data[o + 3] > 140 && d.data[o] + d.data[o + 1] + d.data[o + 2] < 660;
          d.data[o] = d.data[o + 1] = d.data[o + 2] = on ? 255 : 0;
          d.data[o + 3] = 255;
          if (on) {
            const x = i % S, y = (i / S) | 0;
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
        }
        if (x1 <= x0 || y1 <= y0) return resolve(null);
        ctx.putImageData(d, 0, 0);
        // crop to the mark so it fills the mask
        const out = document.createElement('canvas');
        out.width = out.height = S;
        const octx = out.getContext('2d')!;
        octx.fillStyle = '#000';
        octx.fillRect(0, 0, S, S);
        const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
        const k = (S * 0.92) / Math.max(bw, bh);
        octx.drawImage(cv, x0, y0, bw, bh, (S - bw * k) / 2, (S - bh * k) / 2, bw * k, bh * k);
        const tex = new THREE.CanvasTexture(out);
        tex.minFilter = tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        resolve(tex);
      } catch {
        resolve(null);
      }
    };
    img.src = src;
  });
}

/** What the home story hands the engine so it can drive the words and labels. */
export interface StoryHud {
  caps: HTMLElement[];
  labels: Map<string, HTMLElement>;
  counter: HTMLElement;
  cue: HTMLElement;
  spotName: HTMLElement;
  spotResult: HTMLElement;
  spotLink: HTMLAnchorElement;
  hoverBand: number;
  spotLock: number;
}

/** The engine is created once and lives across pages, so the thread morphs between them. */
export interface Thread {
  /** the home story: gestures step through the six scenes */
  story(hud: StoryHud): void;
  /** an inner page: the thread holds one scene behind the hero and the page scrolls normally */
  page(scene: number): void;
}

export function startThread(canvas: HTMLCanvasElement): Thread {
  let hud: StoryHud | null = null;
  let mode: 'story' | 'page' = 'page';
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8.5);
  const scene = new THREE.Scene();
  const group = new THREE.Group();
  scene.add(group);

  // one thread, N points along it
  const N = coarse ? 18000 : 44000;
  let seed = 11;
  const rnd = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const aU = new Float32Array(N);
  const aSeed = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    aU[i] = (i + rnd()) / N;
    for (let k = 0; k < 4; k++) aSeed[i * 4 + k] = rnd();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3)); // draw count only
  geo.setAttribute('aU', new THREE.BufferAttribute(aU, 1));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 4));

  const black = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
  black.needsUpdate = true;
  const un = {
    uA: { value: 0 },
    uB: { value: 1 },
    uMix: { value: 0 },
    uTime: { value: 0 },
    uDraw: { value: reduced ? 1 : 0 },
    uGrow: { value: 0 },
    uDrag: { value: 0 },
    uFade: { value: 1 },
    uSize: { value: 0.02 },
    uScalePx: { value: 1000 },
    uMaxPx: { value: coarse ? 18 : 36 },
    uSpot: { value: 0 },
    uCols: { value: 2 },
    uLogoOn: { value: 0 },
    uPluck: { value: new THREE.Vector3() },
    uPointer: { value: new THREE.Vector3() },
    uRip: { value: [0, 1, 2, 3].map(() => new THREE.Vector4(0, 0, -99, 0)) },
    uLogo: { value: black as THREE.Texture },
    uC0: { value: new THREE.Color('#1f8bff') },
    uC1: { value: new THREE.Color('#19d3ff') },
    uC2: { value: new THREE.Color('#1cf2a1') },
    uHi: { value: new THREE.Color('#ffffff') },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: un,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  group.add(points);

  logoMask('/dp.svg').then((tex) => {
    if (!tex) return;
    un.uLogo.value = tex;
    un.uLogoOn.value = 1;
  });

  // ---- state
  let vw = 1, vh = 1, W = 1, H = 1; // world and pixel size of the view
  let index = 0; // the scene we are on, or heading to
  let fade = 1;
  let pull = 0; // how far a finger is dragging toward the next scene, in scenes
  let stage = 0, prevStage = 0, stageVel = 0, grow = 0;
  let lockUntil = 0;
  let time = 0, last = performance.now(), born = last;
  let spot = 0;
  const pointer = { x: 0, y: 0, sx: 0, sy: 0, active: false, a: 0 };
  const taps: { x: number; y: number }[] = [];
  let ripIdx = 0;
  const pluck = [0, 0, 0];
  const tilt = { b0: 0, g0: 0, has: false };
  let active = 2; // seconds of full-rate rendering left
  let frame = 0;
  const vec = new THREE.Vector3();
  const vec2 = new THREE.Vector3();
  const inv = new THREE.Matrix4();

  const resize = () => {
    W = innerWidth;
    H = innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    vh = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    vw = vh * camera.aspect;
    active = 1;
  };
  resize();
  addEventListener('resize', resize);

  // One gesture, one scene. Any swipe, wheel or key press carries the thread all the way
  // to the next scene; nothing can stall half way. The motion itself is slow and heavy.
  const go = (dir: number) => {
    if (mode !== 'story') return;
    const next = Math.max(0, Math.min(STAGES - 1, index + dir));
    pull = 0;
    if (next === index) return;
    index = next;
    lockUntil = performance.now() + 950;
    active = 3;
    hud?.cue.classList.add('gone');
    root.classList.toggle('end', index === STAGES - 1);
  };
  let wheelAcc = 0, wheelAt = 0;
  addEventListener(
    'wheel',
    (e) => {
      if (mode !== 'story') return;
      e.preventDefault();
      const now = performance.now();
      if (now < lockUntil) return void (wheelAcc = 0); // swallow trackpad momentum
      if (now - wheelAt > 180) wheelAcc = 0;
      wheelAt = now;
      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) > 30) {
        go(Math.sign(wheelAcc));
        wheelAcc = 0;
      }
    },
    { passive: false }
  );
  addEventListener('keydown', (e) => {
    if (mode !== 'story') return;
    if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key) && !(e.target as HTMLElement).closest('a, button')) {
      e.preventDefault();
      go(1);
    } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'Home') go(-STAGES);
    else if (e.key === 'End') go(STAGES);
  });
  // touch: the thread follows the finger with resistance, then commits on release
  let touchY = 0, touchOn = false;
  addEventListener(
    'touchstart',
    (e) => {
      if (mode !== 'story') return;
      touchOn = true;
      touchY = e.touches[0].clientY;
    },
    { passive: true }
  );
  addEventListener(
    'touchmove',
    (e) => {
      if (!touchOn) return;
      const dy = touchY - e.touches[0].clientY;
      const raw = dy / (innerHeight * 1.1);
      // can't pull past either end
      const lo = index === 0 ? 0 : -0.45, hi = index === STAGES - 1 ? 0 : 0.45;
      pull = Math.max(lo, Math.min(hi, raw));
      active = 1.5;
    },
    { passive: true }
  );
  const touchEnd = (e: TouchEvent) => {
    if (!touchOn) return;
    touchOn = false;
    const dy = touchY - (e.changedTouches[0]?.clientY ?? touchY);
    if (Math.abs(dy) > 28) go(Math.sign(dy));
    else pull = 0;
  };
  addEventListener('touchend', touchEnd, { passive: true });
  addEventListener('touchcancel', touchEnd, { passive: true });

  const ndc = (e: { clientX: number; clientY: number }) => ({
    x: (e.clientX / innerWidth) * 2 - 1,
    y: -((e.clientY / innerHeight) * 2 - 1),
  });
  if (!reduced) {
    addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType === 'touch') return;
        const p = ndc(e);
        pointer.x = p.x;
        pointer.y = p.y;
        pointer.active = true;
        active = 1.5;
      },
      { passive: true }
    );
    root.addEventListener('pointerleave', () => (pointer.active = false));
    // a click or tap (never a scroll) drops a ripple into the thread
    addEventListener('click', (e) => {
      taps.push(ndc(e));
      active = 4;
    });
    const needsPrompt =
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission === 'function';
    if (coarse && !needsPrompt) {
      // tilting the phone turns the cloth, where the browser allows it without asking
      addEventListener(
        'deviceorientation',
        (e) => {
          if (e.beta == null || e.gamma == null) return;
          if (!tilt.has) {
            tilt.has = true;
            tilt.b0 = e.beta;
            tilt.g0 = e.gamma;
          }
          tilt.b0 += (e.beta - tilt.b0) * 0.01;
          tilt.g0 += (e.gamma - tilt.g0) * 0.01;
          pointer.x = Math.max(-1, Math.min(1, (e.gamma - tilt.g0) / 22));
          pointer.y = Math.max(-1, Math.min(1, -(e.beta - tilt.b0) / 22));
          active = 1;
        },
        { passive: true }
      );
    }
  }

  const put = (key: string, lx: number, ly: number, lz: number, alpha: number, dy = 0) => {
    const e = hud?.labels.get(key);
    if (!e) return;
    if (alpha < 0.03) {
      if (e.style.visibility !== 'hidden') {
        e.style.opacity = '0';
        e.style.visibility = 'hidden';
      }
      return;
    }
    vec.set(lx, ly, lz).applyMatrix4(group.matrixWorld).project(camera);
    const half = e.offsetWidth / 2 + 8;
    const px = Math.max(half, Math.min(W - half, (vec.x * 0.5 + 0.5) * W));
    const py = (-vec.y * 0.5 + 0.5) * H + dy;
    e.style.visibility = 'visible';
    e.style.opacity = alpha.toFixed(2);
    e.style.pointerEvents = alpha > 0.5 ? 'auto' : 'none';
    e.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%)`;
  };

  let shownStage = -1;
  let shownSpot = -1;

  const tick = (now: number) => {
    requestAnimationFrame(tick);
    if (document.hidden) {
      last = now;
      return;
    }
    const rawDt = Math.min((now - last) / 1000, 0.25);
    // when nothing is happening, ambient motion runs at half rate to save battery
    frame++;
    if (active <= 0 && frame % 2) return;
    last = now;
    active -= rawDt;
    if (!reduced) time += Math.min(rawDt, 0.05);

    const k = 1 - Math.exp(-rawDt * 4.5);
    // thick: the thread takes its time getting there, quicker only while a finger drags it
    const kStage = 1 - Math.exp(-rawDt * (touchOn ? 7 : 2.3));
    const ds = index + pull - stage;
    stage += ds * kStage;
    stageVel += ((stage - prevStage) / Math.max(rawDt, 0.008) - stageVel) * Math.min(1, k * 2);
    prevStage = stage;
    if (Math.abs(ds) > 0.002) active = Math.max(active, 0.3);
    const s = Math.min(Math.max(stage, 0), STAGES - 1);
    const a = Math.min(Math.floor(s), STAGES - 2);
    const fRaw = s - a;
    const f = ease(fRaw);
    const Wt = (i: number) => Math.max(0, 1 - Math.abs(s - i) * 1.5);
    // the cloth weaves itself once you arrive, and unpicks if you go back
    grow += ((s > 2.6 ? 1 : 0) - grow) * (1 - Math.exp(-rawDt * (s > 2.6 ? 0.55 : 2.5)));
    if (grow > 0.003 && grow < 0.997) active = Math.max(active, 0.3);

    const hoverBand = hud ? hud.hoverBand : -1;
    for (let b = 0; b < 3; b++) pluck[b] += ((hoverBand === b ? 1 : 0) - pluck[b]) * k;
    if (hoverBand >= 0) active = Math.max(active, 0.5);

    if (Wt(4) > 0.5) spot = hud && hud.spotLock >= 0 ? hud.spotLock : Math.floor(time / 2.6) % N_PROOF;

    pointer.sx += (pointer.x - pointer.sx) * k;
    pointer.sy += (pointer.y - pointer.sy) * k;
    pointer.a += ((pointer.active ? 1 : 0) - pointer.a) * k;

    // placement, from the live viewport
    const portrait = vw < vh * 0.85;
    const cols = portrait ? 2 : 4;
    const pa = place(a, vw, vh, portrait, cols), pb = place(a + 1, vw, vh, portrait, cols);
    const lerp = (i: number) => pa[i] + (pb[i] - pa[i]) * f;
    const sx = lerp(0), sy = lerp(1);
    const scale = Math.min(sx, sy);
    // the view follows the newest row up the cloth while it is being woven
    const follow = Wt(3) * (0.5 - grow) * L.HC * 0.18 * sy;
    // behind an inner page the thread rides up with the scroll and dims, leaving the text clear
    const scrolled = mode === 'page' ? scrollY / Math.max(1, H) : 0;
    fade += ((mode === 'page' ? (portrait ? 0.3 : 0.42) * clamp01(1 - scrolled * 1.5) : 1) - fade) * k;
    group.position.set(lerp(2), lerp(3) + follow + scrolled * vh * 0.6, 0);
    group.scale.set(sx, sy, (sx + sy) / 2);
    group.rotation.x = lerp(4) - pointer.sy * (coarse ? 0.2 : 0.08);
    group.rotation.y = lerp(5) + pointer.sx * (coarse ? 0.35 : 0.16);
    group.updateMatrixWorld();
    inv.copy(group.matrixWorld).invert();

    // a ray from the eye through a screen point, met with the cloth plane (local z = 0)
    let hitX = 0, hitY = 0;
    const hit = (nx: number, ny: number) => {
      vec.set(0, 0, camera.position.z).applyMatrix4(inv);
      vec2.set((nx * vw) / 2, (ny * vh) / 2, 0).applyMatrix4(inv).sub(vec);
      if (Math.abs(vec2.z) < 1e-4) return false;
      const tp = -vec.z / vec2.z;
      if (tp <= 0) return false;
      hitX = vec.x + vec2.x * tp;
      hitY = vec.y + vec2.y * tp;
      return Math.abs(hitX) < 12 && Math.abs(hitY) < 12;
    };
    if (!coarse && pointer.a > 0.01 && hit(pointer.sx, pointer.sy)) un.uPointer.value.set(hitX, hitY, pointer.a);
    else un.uPointer.value.z = 0;
    while (taps.length) {
      const tap = taps.shift()!;
      if (hit(tap.x, tap.y)) un.uRip.value[ripIdx++ % 4].set(hitX, hitY, time, 1);
    }

    un.uScalePx.value = (H * renderer.getPixelRatio()) / (2 * Math.tan((camera.fov * Math.PI) / 360));
    un.uSize.value = (portrait ? 0.034 : 0.03) * Math.min(scale, 1.15);
    un.uCols.value = cols;
    un.uA.value = a;
    un.uB.value = a + 1;
    un.uMix.value = fRaw;
    un.uTime.value = time;
    un.uGrow.value = grow;
    un.uDraw.value = reduced ? 1 : ease(clamp01((now - born) / 2400));
    un.uDrag.value = reduced ? 0 : (stageVel * 0.16 * (1 - Wt(3)) * (1 - Wt(5))) / Math.max(sy, 0.2);
    un.uSpot.value = spot;
    un.uFade.value = fade;
    un.uPluck.value.set(pluck[0], pluck[1], pluck[2]);

    renderer.render(scene, camera);

    if (!hud) return;
    // ---- words: one line per scene, cross-fading in place
    for (let c = 0; c < STAGES; c++) {
      const dist = stage - c;
      const alpha = clamp01(1 - Math.abs(dist) * 2.3);
      const e = hud.caps[c];
      if (alpha < 0.02) {
        if (e.style.visibility !== 'hidden') {
          e.style.opacity = '0';
          e.style.visibility = 'hidden';
        }
        continue;
      }
      e.style.visibility = 'visible';
      e.style.opacity = alpha.toFixed(2);
      e.style.transform = `translate3d(0, ${(-dist * 46).toFixed(1)}px, 0)`;
    }

    // ---- labels, pinned with the same layout maths as the shader
    for (let b = 0; b < 3; b++) {
      const x = ((12 * b + 5.5) / (L.NW - 1) - 0.5) * L.WC + (b - 1) * L.GAP;
      put(`b${b}`, x, -L.HC / 2, 0, Wt(2), 26);
    }
    for (let m = 0; m < MILESTONES.length; m++) {
      const fr = 0.06 + (m / (MILESTONES.length - 1)) * 0.86;
      put(`m${m}`, 0, (fr - 0.5) * L.HC, 0.05, Wt(3) * clamp01((grow - fr + 0.06) / 0.08));
    }
    for (let p = 0; p < N_PROOF; p++) {
      const cx = ((p % cols) - (cols - 1) / 2) * 2 * L.SX;
      const cy = ((8 / cols - 1) / 2 - Math.floor(p / cols)) * L.SY;
      put(`p${p}`, cx, cy - L.SH / 2, p === spot ? 0.3 : 0, Wt(4), 14);
      hud.labels.get(`p${p}`)!.classList.toggle('on', p === spot);
    }

    const near = Math.round(s);
    if (near !== shownStage) {
      shownStage = near;
      hud.counter.innerHTML = `<b>0${near + 1}</b><i></i>${SCENES[near].name}`;
    }
    if (spot !== shownSpot) {
      shownSpot = spot;
      hud.spotName.textContent = PROOF[spot].name;
      hud.spotResult.innerHTML = `${PROOF[spot].result} <span>→</span>`;
      hud.spotLink.href = PROOF[spot].href;
    }
  };
  requestAnimationFrame(tick);
  root.classList.add('gl');

  return {
    story(h) {
      hud = h;
      mode = 'story';
      index = 0;
      pull = 0;
      shownStage = shownSpot = -1;
      born = performance.now();
      active = 3;
      root.classList.add('story');
      root.classList.remove('end');
    },
    page(scene) {
      hud = null;
      mode = 'page';
      index = Math.max(0, Math.min(STAGES - 1, scene));
      pull = 0;
      born = performance.now();
      active = 3;
      root.classList.remove('story', 'end');
    },
  };
}
