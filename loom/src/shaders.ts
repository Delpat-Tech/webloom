// The whole picture is ONE thread. Every point has a fixed place `u` (0..1) along it,
// and each scene is a different curve for that thread, worked out here on the GPU.

/** Cloth layout, shared with the label maths in main.ts. */
export const L = {
  WC: 3.2, // cloth width
  HC: 4.0, // cloth height
  NW: 36, // warp threads, 12 per band
  NR: 44, // weft rows
  GAP: 0.24, // space between the three bands
  SW: 1.4, // swatch width
  SH: 0.84, // swatch height
  SX: 0.82, // swatch column offset
  SY: 1.08, // swatch row pitch
  MARK: 2.7, // size of the logo woven into the cloth
};

const f = (n: number) => (Number.isInteger(n) ? `${n}.0` : `${n}`);

export const VERT = /* glsl */ `
  #define TAU 6.2831853
  #define PI 3.14159265
  const float WC = ${f(L.WC)};
  const float HC = ${f(L.HC)};
  const float NW = ${f(L.NW)};
  const float NR = ${f(L.NR)};
  const float GAP = ${f(L.GAP)};
  const float SW = ${f(L.SW)};
  const float SH = ${f(L.SH)};
  const float SX = ${f(L.SX)};
  const float SY = ${f(L.SY)};
  const float MARK = ${f(L.MARK)};

  attribute float aU;
  attribute vec4 aSeed;
  uniform int uA;
  uniform int uB;
  uniform float uMix;
  uniform float uTime;
  uniform float uDraw;   // 0..1: how much of the thread has been drawn in on load
  uniform float uGrow;   // 0..1: how much of the cloth is woven
  uniform float uDrag;
  uniform float uFade;   // overall brightness: 1 on the story, dimmer behind inner pages
  uniform float uSize;
  uniform float uScalePx;
  uniform float uMaxPx;
  uniform float uSpot;
  uniform float uCols;
  uniform float uLogoOn;
  uniform vec3 uPluck;
  uniform vec3 uPointer;
  uniform vec4 uRip[4];
  uniform sampler2D uLogo;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uHi;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vShine;

  float gLift; // extra glow and size a scene asks for at this point

  // 0: one long thread, hopelessly tangled
  vec3 tangle(float u) {
    float a = u * TAU;
    float t = uTime;
    return vec3(
      1.9 * sin(7.0 * a + 0.30 * t) * cos(3.0 * a) + 0.5 * sin(23.0 * a + 0.2 * t),
      1.15 * sin(11.0 * a + 1.0) * cos(2.0 * a + 0.2 * t) + 0.4 * cos(31.0 * a),
      0.9 * sin(5.0 * a + 0.15 * t) * sin(13.0 * a)
    );
  }

  // 1: pulled straight and spun into a wide two-strand spiral
  vec3 spun(float u, vec4 sd) {
    float y = (u - 0.5) * 7.5;
    float ang = u * TAU * 26.0 + uTime * 0.9 + step(0.5, sd.x) * PI;
    float r = 0.34 + 0.07 * sin(u * 34.0 + uTime * 0.6);
    float sway = sin(y * 0.8 + uTime * 0.9) * 0.12;
    // the strand nearer the viewer glows a little
    gLift += max(0.0, sin(ang)) * 0.35;
    return vec3(cos(ang) * r + sway + (sd.y - 0.5) * 0.04, y, sin(ang) * r + (sd.z - 0.5) * 0.04);
  }

  // vertical threads: up one, down the next, so it stays a single line
  vec3 warpAt(float q, float gap, out float j, out float v) {
    float g = clamp(q, 0.0, 0.99999) * NW;
    j = floor(g);
    v = fract(g);
    float vv = mod(j, 2.0) < 0.5 ? v : 1.0 - v;
    float x = (j / (NW - 1.0) - 0.5) * WC + (floor(j / 12.0) - 1.0) * gap;
    return vec3(x, (vv - 0.5) * HC, 0.0);
  }

  // 2: the warp, in three bands. A band can be plucked like a string.
  vec3 warp(float u) {
    float j; float v;
    vec3 p = warpAt(u, GAP, j, v);
    float band = floor(j / 12.0);
    float amp = band < 0.5 ? uPluck.x : band < 1.5 ? uPluck.y : uPluck.z;
    p.z += sin(v * PI) * sin(uTime * 13.0 + j) * 0.16 * amp;
    gLift += amp * 0.6;
    return p;
  }

  // 3 and 5: woven cloth. The first half of the thread is warp, the second half weft.
  // Weft that isn't woven yet is still wound on the shuttle, which rides the newest row.
  vec3 cloth(float u, vec4 sd, float grow) {
    float j; float v;
    if (u < 0.5) {
      vec3 p = warpAt(u * 2.0, 0.0, j, v);
      float rowf = (p.y / HC + 0.5) * (NR - 1.0);
      float woven = step(p.y, (grow - 0.5) * HC);
      p.z = 0.035 * cos(PI * j) * cos(PI * rowf) * woven;
      return p;
    }
    float g = clamp((u - 0.5) * 2.0, 0.0, 0.99999) * NR;
    float r = floor(g);
    float w = fract(g);
    float ww = mod(r, 2.0) < 0.5 ? w : 1.0 - w;
    if (r / NR > grow) {
      gLift += 1.0;
      float sx = sin(uTime * 2.4) * WC * 0.5;
      return vec3(sx + (sd.y - 0.5) * 0.16, (grow - 0.5) * HC + (sd.z - 0.5) * 0.05, 0.1);
    }
    float x = (ww - 0.5) * WC;
    float xf = (x / WC + 0.5) * (NW - 1.0);
    return vec3(x, (r / (NR - 1.0) - 0.5) * HC, -0.035 * cos(PI * r) * cos(PI * xf));
  }

  // 4: eight swatches, one per case study, each with its own weave
  vec3 swatches(float u) {
    float g = clamp(u, 0.0, 0.99999) * 8.0;
    float k = floor(g);
    float q = fract(g);
    float rows = 8.0 / uCols;
    vec2 c = vec2((mod(k, uCols) - (uCols - 1.0) * 0.5) * 2.0 * SX, ((rows - 1.0) * 0.5 - floor(k / uCols)) * SY);
    vec2 l;
    if (q < 0.5) {
      float h = q * 2.0 * 16.0;
      float jj = floor(h);
      float vv = mod(jj, 2.0) < 0.5 ? fract(h) : 1.0 - fract(h);
      l = vec2((jj / 15.0 - 0.5) * SW, (vv - 0.5) * SH);
    } else {
      float h = (q - 0.5) * 2.0 * 10.0;
      float rr = floor(h);
      float ww = mod(rr, 2.0) < 0.5 ? fract(h) : 1.0 - fract(h);
      l = vec2((ww - 0.5) * SW, (rr / 9.0 - 0.5) * SH);
    }
    float on = 1.0 - step(0.5, abs(k - uSpot));
    float z = 0.04 * sin(l.x * (9.0 + k * 3.0)) * sin(l.y * (11.0 + k * 2.0)) + on * 0.3;
    gLift += on * 0.9;
    return vec3(c + l * (1.0 + on * 0.06), z);
  }

  // 5: the finished cloth, with the logo raised out of the weave
  vec3 mark(float u, vec4 sd) {
    vec3 p = cloth(u, sd, 1.0);
    vec2 uv = p.xy / MARK + 0.5;
    float m = texture2D(uLogo, uv).r * uLogoOn;
    m *= step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
    p.z += m * 0.22;
    gLift += m * 1.7;
    return p;
  }

  vec3 scene(int s, float u, vec4 sd) {
    if (s == 0) return tangle(u);
    if (s == 1) return spun(u, sd);
    if (s == 2) return warp(u);
    if (s == 3) return cloth(u, sd, uGrow);
    if (s == 4) return swatches(u);
    return mark(u, sd);
  }

  void main() {
    gLift = 0.0;
    vec3 A = scene(uA, aU, aSeed);
    float liftA = gLift;
    gLift = 0.0;
    vec3 B = scene(uB, aU, aSeed);
    float liftB = gLift;

    // the head of the thread changes first, so you watch it travel
    float t = clamp(uMix * 1.6 - aU * 0.6, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(A, B, t);
    float lift = mix(liftA, liftB, t);

    // slack in the middle of a change
    float bell = 4.0 * t * (1.0 - t);
    p += vec3(sin(aU * 140.0 + uTime * 0.7), sin(aU * 90.0 - uTime * 0.6), sin(aU * 60.0 + uTime * 0.5)) * bell * 0.22;

    // weight: the thread trails the scroll
    p.y += uDrag * (0.2 + 0.8 * aSeed.x);

    // a finger under the cloth
    vec2 d = p.xy - uPointer.xy;
    float bulge = exp(-dot(d, d) * 2.6) * uPointer.z;
    p.z += bulge * 0.42;
    lift += bulge * 0.9;

    // ripples from taps
    for (int i = 0; i < 4; i++) {
      float age = uTime - uRip[i].z;
      if (age > 0.0 && age < 3.5) {
        vec2 rd = p.xy - uRip[i].xy;
        float l = length(rd) + 1e-4;
        float w = exp(-pow(l - age * 2.6, 2.0) * 2.2) * uRip[i].w * exp(-age * 1.1);
        p.z += w * 0.5;
        p.xy += rd / l * w * 0.12;
        lift += w * 1.2;
      }
    }

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float px = uSize * (1.0 + lift * 0.55) * (0.8 + 0.4 * aSeed.w) * uScalePx / max(0.5, -mv.z);
    // (shine is worked out below; it widens the point a touch)
    gl_PointSize = clamp(px, 1.0, uMaxPx);

    // light running along the thread like a sheen on silk, plus a little sparkle per point
    float glint = pow(max(0.0, sin(aU * TAU * 14.0 - uTime * 1.1)), 22.0);
    float twinkle = pow(max(0.0, sin(uTime * 2.3 + aSeed.z * TAU)), 18.0);
    vShine = clamp(glint * 0.9 + twinkle * 0.6 + lift * 0.35, 0.0, 1.6);

    vec3 c = aU < 0.3333 ? uC0 : aU < 0.6666 ? uC1 : uC2;
    vColor = mix(c, uHi, clamp(lift * 0.3 + glint * 0.3, 0.0, 0.7));

    // the thread draws itself in on load; its tip glows
    float drawn = step(aU, uDraw);
    float tip = smoothstep(0.02, 0.0, uDraw - aU) * step(uDraw, 0.999);
    vColor = mix(vColor, uHi, tip);
    // points smaller than a pixel fade instead of flickering
    vAlpha = clamp(px * px, 0.2, 1.0) * (0.85 + 0.15 * clamp(lift + tip, 0.0, 1.0)) * drawn * uFade;
  }
`;

export const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vShine;
  void main() {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    float d = dot(c, c);
    if (d > 1.0 || vAlpha <= 0.0) discard;
    // a crisp bright core, a white-hot centre, and a thin halo: reads as a lit bead, not a smudge
    float core = smoothstep(0.5, 0.08, d);
    float halo = (1.0 - d) * (1.0 - d) * 0.55;
    float hot = smoothstep(0.22, 0.0, d);
    vec3 col = vColor * (core * 1.35 + halo) + vec3(1.0) * hot * (0.06 + vShine * 0.85);
    gl_FragColor = vec4(col, (core + halo) * vAlpha);
  }
`;
