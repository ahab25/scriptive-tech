"use client";

import { Float } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { CameraRig } from "./CameraRig";
import { GlobeObject } from "./GlobeObject";
import { HeroParticles } from "./HeroParticles";
import { HeroPostFX } from "./HeroPostFX";
import { Scene } from "./Scene";

export function HeroScene() {
  const scrollProgress = useRef(0);
  const [showRings, setShowRings] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const touch = window.matchMedia("(hover: none)");
    setShowRings(!mq.matches);
    setIsMobile(touch.matches);
    const onMq    = (e: MediaQueryListEvent) => setShowRings(!e.matches);
    const onTouch = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onMq);
    touch.addEventListener("change", onTouch);
    return () => {
      mq.removeEventListener("change", onMq);
      touch.removeEventListener("change", onTouch);
    };
  }, []);

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
    <Scene className="!absolute inset-0" fov={32} isMobile={isMobile}>
      {/* Navy atmosphere */}
      <color attach="background" args={["#04091a"]} />
      <fog attach="fog" args={["#04091a", 7, 18]} />

      {/* Subtle scene lighting — globe uses MeshBasic so these mainly tint particles */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={0.9} color="#1D6AFF" />
      <directionalLight position={[-5, -3, -4]} intensity={0.6} color="#2B5CE8" />
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#1D6AFF" distance={8} />

      {/* Tech globe — gently floats */}
      <Float
        speed={1.0}
        rotationIntensity={0.2}
        floatIntensity={0.4}
        floatingRange={[-0.06, 0.06]}
      >
        <GlobeObject scrollProgress={scrollProgress} showRings={showRings} />
      </Float>

      {/* Fewer particles on mobile to maintain 60fps */}
      <HeroParticles count={isMobile ? 400 : 1200} radius={9} />

      {/* Scroll-driven camera pull-back */}
      <CameraRig scrollProgress={scrollProgress} />

      {/* Post FX: full on desktop, vignette-only on mobile */}
      <HeroPostFX isMobile={isMobile} />
    </Scene>
  );
}
