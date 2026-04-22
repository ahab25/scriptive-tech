"use client";

import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- Simplex-ish noise, cheap but good-looking -----------------
const noiseGLSL = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

export const PrismMaterial = shaderMaterial(
  {
    uTime: 0,
    uDistort: 0.35,
    uSpeed: 0.45,
    uColorA: new THREE.Color("#00e5ff"), // cyan
    uColorB: new THREE.Color("#8b5cf6"), // violet
    uColorC: new THREE.Color("#06060a"), // core (deep obsidian)
    uFresnel: 3.2,
    uPointer: new THREE.Vector2(0, 0),
  },
  /* vertex */ `
    uniform float uTime;
    uniform float uDistort;
    uniform float uSpeed;
    uniform vec2 uPointer;

    varying vec3 vNormal;
    varying vec3 vViewPos;
    varying float vNoise;

    ${noiseGLSL}

    void main() {
      vec3 pos = position;
      vec3 seed = pos * 1.1 + vec3(uPointer * 0.6, 0.0);
      float n = snoise(seed + vec3(uTime * uSpeed));
      pos += normal * n * uDistort;

      vNoise = n;
      vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      vViewPos = -mv.xyz;
      gl_Position = projectionMatrix * mv;
    }
  `,
  /* fragment */ `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform float uFresnel;

    varying vec3 vNormal;
    varying vec3 vViewPos;
    varying float vNoise;

    void main() {
      vec3 V = normalize(vViewPos);
      vec3 N = normalize(vNormal);
      float f = pow(1.0 - max(dot(N, V), 0.0), uFresnel);

      vec3 base = mix(uColorA, uColorB, 0.5 + 0.5 * vNoise);
      vec3 color = mix(uColorC, base, f);
      color += base * f * 0.4;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
);

export type PrismMaterialImpl = InstanceType<typeof PrismMaterial> & {
  uTime: number;
  uDistort: number;
  uSpeed: number;
  uFresnel: number;
  uniforms: {
    uPointer: { value: { x: number; y: number; set: (x: number, y: number) => void } };
    [key: string]: { value: unknown };
  };
};
