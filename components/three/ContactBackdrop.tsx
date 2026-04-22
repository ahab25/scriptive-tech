"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Scene } from "./Scene";

/**
 * A trio of wireframe icosahedrons drifting behind the contact form.
 * Cheap to render (wireframe, small poly count) so it doesn't tax
 * the GPU on a section that's already at the bottom of the page.
 */
function Shape({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.2;
    ref.current.rotation.y += dt * 0.25;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
    </Float>
  );
}

export function ContactBackdrop() {
  return (
    <Scene className="!absolute inset-0" fov={40}>
      <ambientLight intensity={0.5} />
      <Shape position={[-2.5, 1.2, -2]} color="#00e5ff" scale={0.9} />
      <Shape position={[2.8, -1.6, -1]} color="#8b5cf6" scale={1.2} />
      <Shape position={[0, 2, -3]} color="#ff2d95" scale={0.6} />
    </Scene>
  );
}
