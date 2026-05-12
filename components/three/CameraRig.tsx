"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type MutableRefObject } from "react";

type Props = {
  /** Ref holding the normalized hero scroll progress 0..1. */
  scrollProgress: MutableRefObject<number>;
};

/**
 * Drives the R3F camera based on hero scroll progress + cursor.
 * At the top of the page the camera sits forward and level.
 * As you scroll down the hero, it pulls back and rotates slightly
 * — a subtle cinematic push-out that reveals the mesh shrinking.
 */
export function CameraRig({ scrollProgress }: Props) {
  const { camera, pointer } = useThree();
  const target = useRef({ x: 0, y: 0, z: 6 });

  // Ensure we start from a consistent pose (avoids HMR drift)
  useEffect(() => {
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_, dt) => {
    const p = scrollProgress.current;

    // Target pose: z recedes from 6 → 9, y tilts up slightly
    target.current.x = pointer.x * 0.6;
    target.current.y = pointer.y * 0.4 + p * 0.6;
    target.current.z = 6 + p * 3;

    // dt-based lerp — framerate-independent (smooth on 60Hz AND 120Hz ProMotion)
    const t = 1 - Math.exp(-3 * dt);
    camera.position.x += (target.current.x - camera.position.x) * t;
    camera.position.y += (target.current.y - camera.position.y) * t;
    camera.position.z += (target.current.z - camera.position.z) * t;

    camera.lookAt(0, 0, 0);
  });

  return null;
}
