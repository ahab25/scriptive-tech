"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import * as THREE from "three";

type Props = {
  children: ReactNode;
  className?: string;
  /** Camera FOV — lower = more telephoto / luxury feel. Default 35. */
  fov?: number;
};

/**
 * Shared R3F canvas wrapper tuned for this project:
 *   - ACES-filmic tone mapping → cinematic contrast
 *   - sRGB output colour space → colours match design tokens
 *   - DPR capped at 2 → retina without GPU thrash
 *   - alpha transparent → DOM gradient layers show through
 */
export function Scene({ children, className, fov = 35 }: Props) {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{
        antialias: true,
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
