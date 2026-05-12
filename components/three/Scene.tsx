"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import * as THREE from "three";

type Props = {
  children: ReactNode;
  className?: string;
  fov?: number;
  /** Cap DPR at 1.5 on mobile to reduce GPU load */
  isMobile?: boolean;
};

export function Scene({ children, className, fov = 35, isMobile = false }: Props) {
  return (
    <Canvas
      className={className}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{ position: [0, 0, 6], fov }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
