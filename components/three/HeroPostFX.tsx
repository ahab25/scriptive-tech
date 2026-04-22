"use client";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

/**
 * The post FX chain that gives the hero its "premium" finish:
 *   - Bloom: neon highlights bleed into their surroundings
 *   - Chromatic aberration: a hair of RGB split at the edges
 *   - Vignette: subtle darkened corners keep focus centered
 *
 * Tuned conservatively — aggressive post makes sites feel cheap.
 */
export function HeroPostFX() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
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
