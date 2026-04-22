"use client";

import { Environment, Float } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { CameraRig } from "./CameraRig";
import { HeroParticles } from "./HeroParticles";
import { HeroPostFX } from "./HeroPostFX";
import { PrismObject } from "./PrismObject";
import { Scene } from "./Scene";

/**
 * Composes the hero's 3D scene. Kept in one file so the <Hero />
 * section component can stay declarative and the 3D details
 * remain swappable.
 */
export function HeroScene() {
  // scrollProgress is a ref so updates don't trigger rerenders
  const scrollProgress = useRef(0);

  // Listen to window scroll and compute a normalized hero progress.
  // Attached once, cleaned up on unmount.
  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight;
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Scene className="!absolute inset-0" fov={32}>
      {/* Atmosphere */}
      <color attach="background" args={["#06060a"]} />
      <fog attach="fog" args={["#06060a", 6, 16]} />

      {/* Lighting — all subtle; the shader does most of the work */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={1.1} color="#00e5ff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.8} color="#8b5cf6" />

      {/* Environment gives the PrismMaterial's fresnel something to read */}
      <Environment preset="night" />

      {/* The flagship object — floats while the camera does its work */}
      <Float
        speed={1.2}
        rotationIntensity={0.4}
        floatIntensity={0.5}
        floatingRange={[-0.08, 0.08]}
      >
        <PrismObject scrollProgress={scrollProgress} />
      </Float>

      {/* Ambient particle field */}
      <HeroParticles count={1400} radius={8} />

      {/* Scroll-driven camera */}
      <CameraRig scrollProgress={scrollProgress} />

      {/* Post FX */}
      <HeroPostFX />
    </Scene>
  );
}
