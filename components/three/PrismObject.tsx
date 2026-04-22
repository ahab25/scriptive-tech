"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { PrismMaterial, type PrismMaterialImpl } from "./PrismMaterial";

type Props = {
  scrollProgress?: MutableRefObject<number>;
};

export function PrismObject({ scrollProgress }: Props) {
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();

  // Create the material imperatively — avoids extend() catalogue lookup entirely
  const mat = useMemo(() => new PrismMaterial() as PrismMaterialImpl, []);

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const m = mesh.current;

    mat.uTime += dt;
    mat.uniforms.uPointer.value.set(pointer.x, pointer.y);

    const targetRotX = pointer.y * 0.35;
    const targetRotY = pointer.x * 0.6;
    m.rotation.x += (targetRotX - m.rotation.x) * 0.04;
    m.rotation.y += (targetRotY - m.rotation.y) * 0.04;
    m.rotation.z += dt * 0.08;

    const p = scrollProgress?.current ?? 0;
    const s = 1 - p * 0.35;
    m.scale.setScalar(Math.max(0.1, s));
    m.position.y = -p * viewport.height * 0.3;
  });

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <torusKnotGeometry args={[1.15, 0.36, 220, 48, 2, 3]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}
