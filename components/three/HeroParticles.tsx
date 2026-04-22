"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  count?: number;
  radius?: number;
};

/**
 * A field of soft particles drifting through space behind the hero.
 * Points are distributed inside a sphere with biased radius so the
 * density looks organic (not a shell). A lightweight custom vertex
 * shader handles per-point size based on distance for a depth cue.
 */
export function HeroParticles({ count = 1400, radius = 8 }: Props) {
  const pointsRef = useRef<THREE.Points>(null);

  // Build geometry once
  const { positions, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Uniform distribution in a ball (not a shell)
      const u = Math.random();
      const r = radius * Math.cbrt(u);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 0.6 + Math.random() * 1.4;
      speeds[i] = 0.04 + Math.random() * 0.12;
    }

    return { positions, sizes, speeds };
  }, [count, radius]);

  useFrame((_, dt) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    // Slow vertical drift with wrap — feels like snow in zero-G
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i]! * dt;
      if (arr[i * 3 + 1] > radius) {
        arr[i * 3 + 1] = -radius;
      }
    }
    pos.needsUpdate = true;

    // Gentle rotation of the whole field
    pointsRef.current.rotation.y += dt * 0.015;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        {/* R3F v8: pass the typed array directly via `array`; no `args` */}
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.65}
        color="#9fd4ff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
