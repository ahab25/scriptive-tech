/**
 * types/global.d.ts
 * Ambient type declarations for the entire project.
 */

// ---------------------------------------------------------------------------
// Environment variables — typed so `process.env.X` is always a string or
// undefined; prevents accidental use of unset vars at runtime.
// ---------------------------------------------------------------------------
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SITE_URL?: string;
    readonly RESEND_API_KEY?: string;
    readonly CONTACT_EMAIL_TO?: string;
    readonly NODE_ENV: "development" | "test" | "production";
  }
}

// ---------------------------------------------------------------------------
// Lenis on window — typed so components can call window.__lenis.scrollTo
// without casting.
// ---------------------------------------------------------------------------
interface Window {
  __lenis?: import("lenis").default;
}

// ---------------------------------------------------------------------------
// SVG imports — allow `import icon from "./icon.svg"` in React components.
// ---------------------------------------------------------------------------
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
