"use client";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

type Props = { isMobile: boolean };

/**
 * Post FX chain — full on desktop, vignette-only on mobile.
 * Bloom + chromatic aberration are GPU-expensive; skip them on
 * touch devices to maintain 60fps on mid-range Android/iOS.
 */
export function HeroPostFX({ isMobile }: Props) {
  if (isMobile) {
    return (
      <EffectComposer multisampling={0}>
        <Vignette eskil={false} offset={0.2} darkness={0.5} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        mipmapBlur
        intensity={0.9}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.2}
        radius={0.85}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0008, 0.0012)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.2} darkness={0.6} />
    </EffectComposer>
  );
}
