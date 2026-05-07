"use client";

import { Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type OrbitProps = {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  opacity: number;
};

/** A single orbital ring with two satellite nodes that rotate around the globe. */
function OrbitRing({ radius, tube, tilt, speed, color, opacity }: OrbitProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.z += dt * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={groupRef}>
        {/* Ring path */}
        <mesh>
          <torusGeometry args={[radius, tube, 2, 256]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
        </mesh>
        {/* Leading satellite */}
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[tube * 6, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {/* Trailing satellite — smaller */}
        <mesh position={[0, -radius, 0]}>
          <sphereGeometry args={[tube * 4, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.75} />
        </mesh>
      </group>
    </group>
  );
}

/** Dot markers distributed at strategic lat/lon positions on the globe surface. */
function SurfaceDots({ radius }: { radius: number }) {
  const positions = useMemo<[number, number, number][]>(() => {
    const pts: [number, number][]=  [
      [40.7, -74.0],   // New York
      [51.5, -0.1],    // London
      [35.7, 139.7],   // Tokyo
      [22.3, 114.2],   // Hong Kong
      [1.3, 103.8],    // Singapore
      [48.9, 2.3],     // Paris
      [37.6, -122.4],  // San Francisco
      [19.1, 72.9],    // Mumbai
      [-33.9, 151.2],  // Sydney
      [55.8, 37.6],    // Moscow
    ];
    return pts.map(([lat, lon]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      ];
    });
  }, [radius]);

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.022, 6, 6]} />
          <meshBasicMaterial color="#4D8FFF" />
        </mesh>
      ))}
    </>
  );
}

type Props = {
  scrollProgress?: MutableRefObject<number>;
  showRings?: boolean;
};

export function GlobeObject({ scrollProgress, showRings = true }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  useFrame((_, dt) => {
    if (!groupRef.current) return;

    // Slow auto-rotation around Y axis (globe spinning)
    groupRef.current.rotation.y += dt * 0.06;

    // Subtle pointer tilt
    const targetX = pointer.y * 0.12;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;

    // Scroll-driven shrink + move up
    const p = scrollProgress?.current ?? 0;
    const s = 1 - p * 0.35;
    groupRef.current.scale.setScalar(Math.max(0.1, s));
    groupRef.current.position.y = -p * viewport.height * 0.28;
  });

  return (
    <group ref={groupRef}>
      {/* ── Core dark fill (gives the globe depth against particles) ── */}
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshBasicMaterial color="#020a1e" />
      </mesh>

      {/* ── Lat/lon wireframe overlay ── */}
      <mesh>
        <sphereGeometry args={[1.17, 36, 24]} />
        <meshBasicMaterial
          color="#1D6AFF"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* ── Soft atmospheric rim (back-face glow) ── */}
      <mesh>
        <sphereGeometry args={[1.28, 32, 32]} />
        <meshBasicMaterial
          color="#1D6AFF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Surface city dots ── */}
      <SurfaceDots radius={1.19} />

      {/* ── Orbital rings — mobile only ── */}
      {showRings && (
        <>
          <OrbitRing
            radius={1.78}
            tube={0.009}
            tilt={[0, 0, 0]}
            speed={0.38}
            color="#1D6AFF"
            opacity={0.7}
          />
          <OrbitRing
            radius={2.12}
            tube={0.007}
            tilt={[Math.PI / 3, 0, 0.15]}
            speed={-0.24}
            color="#4D8FFF"
            opacity={0.5}
          />
          <OrbitRing
            radius={2.48}
            tube={0.005}
            tilt={[-Math.PI / 5, 0.4, 0.1]}
            speed={0.16}
            color="#7AACFF"
            opacity={0.32}
          />
        </>
      )}

      {/* ── Sparkle particles near globe surface ── */}
      <Sparkles
        count={50}
        scale={3.2}
        size={0.7}
        speed={0.06}
        opacity={0.55}
        color="#4D8FFF"
      />
    </group>
  );
}
