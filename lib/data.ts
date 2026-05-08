export type ServiceDetail = {
  description: string;
  deliverables: readonly string[];
  tech: readonly string[];
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  detail: ServiceDetail;
  tags: readonly string[];
  accent: "cyan" | "violet" | "magenta" | "lime";
  index: string;
};

export const SERVICES: readonly Service[] = [
  {
    id: "web",
    index: "01",
    title: "Website Development",
    summary:
      "Fast, accessible, beautifully-engineered sites built on modern frameworks. From marketing pages to complex web apps.",
    detail: {
      description:
        "We engineer websites that perform as well as they look — sub-2s loads, perfect Lighthouse scores, and code that's a pleasure to maintain. From a single landing page to a multi-region, edge-deployed web application, we treat every pixel and every millisecond as a competitive advantage for your brand.",
      deliverables: [
        "Custom design system & component library",
        "Responsive, accessible markup (WCAG AA)",
        "CMS integration (Sanity, Contentful, Payload)",
        "Core Web Vitals optimisation",
        "CI/CD pipeline & staging environments",
        "Performance & SEO audit report",
      ],
      tech: ["Next.js", "Astro", "TypeScript", "Tailwind CSS", "Vercel Edge", "Sanity"],
    },
    tags: ["Next.js", "Astro", "Headless CMS", "Edge"],
    accent: "cyan",
  },
  {
    id: "uiux",
    index: "02",
    title: "UI / UX Design",
    summary:
      "Interfaces that feel inevitable. Research-led, systems-thinking design that turns ambiguity into clarity.",
    detail: {
      description:
        "Great design is invisible — it removes friction before users notice it. We run structured discovery, map real user journeys, then design interfaces that guide people toward their goal with minimum resistance and maximum delight. Every component we produce is production-ready and lives in a shared design system your team can own.",
      deliverables: [
        "User research & journey mapping",
        "Information architecture",
        "Low & high-fidelity wireframes",
        "Interactive Figma prototype",
        "Design system (tokens, components, docs)",
        "Usability testing & iteration",
      ],
      tech: ["Figma", "FigJam", "Maze", "Zeroheight", "Storybook", "Lottie"],
    },
    tags: ["Discovery", "Prototyping", "Design Systems"],
    accent: "violet",
  },
  {
    id: "mobile",
    index: "03",
    title: "Mobile App Development",
    summary:
      "Native-feel iOS and Android products shipped on a single codebase. Built for performance and delight.",
    detail: {
      description:
        "We build mobile apps that feel genuinely native — smooth 60fps animations, instant gesture response, and offline-first architecture. A single React Native codebase lets us move fast without cutting corners, while platform-specific modules ensure the experience is indistinguishable from a fully native app.",
      deliverables: [
        "iOS & Android production-ready app",
        "Offline-first data layer",
        "Push notification integration",
        "App Store & Play Store submission",
        "OTA update pipeline (Expo EAS)",
        "Analytics & crash reporting setup",
      ],
      tech: ["React Native", "Expo EAS", "TypeScript", "Reanimated", "MMKV", "Sentry"],
    },
    tags: ["React Native", "Swift", "Kotlin"],
    accent: "magenta",
  },
  {
    id: "marketing",
    index: "04",
    title: "Digital Marketing",
    summary:
      "Performance marketing anchored to real business outcomes — SEO, paid, lifecycle, analytics.",
    detail: {
      description:
        "We treat marketing as an engineering discipline — hypothesis-driven, instrumented from day one, and relentlessly optimised toward the metrics that matter. Whether you need organic growth through technical SEO, paid acquisition that scales efficiently, or lifecycle email that converts and retains, we build systems, not just campaigns.",
      deliverables: [
        "Technical SEO audit & remediation",
        "Paid media strategy & creative testing",
        "Email & lifecycle automation build",
        "Attribution & analytics stack setup",
        "Monthly reporting dashboard (Looker Studio)",
        "Conversion rate optimisation roadmap",
      ],
      tech: ["GA4", "Segment", "Klaviyo", "Google Ads", "Meta Ads", "Ahrefs"],
    },
    tags: ["SEO", "PPC", "Email", "Analytics"],
    accent: "lime",
  },
  {
    id: "seo",
    index: "05",
    title: "SEO & Search Strategy",
    summary:
      "Organic growth engineered from the ground up — technical audits, content architecture, and authority building that compounds.",
    detail: {
      description:
        "We treat SEO as an engineering discipline, not a checklist. We audit your entire technical foundation, fix what's broken, architect content that earns rankings, and build authority through systematic link acquisition — producing compounding organic growth that doesn't evaporate when ad spend stops.",
      deliverables: [
        "Full technical SEO audit & remediation",
        "Keyword strategy & content gap analysis",
        "On-page optimisation (title, meta, schema)",
        "Core Web Vitals & crawlability fixes",
        "Link building & digital PR strategy",
        "Monthly rank tracking & reporting dashboard",
      ],
      tech: ["Ahrefs", "Screaming Frog", "Google Search Console", "GA4", "Semrush", "Schema.org"],
    },
    tags: ["Technical SEO", "Content", "Authority", "Analytics"],
    accent: "violet",
  },
  {
    id: "ai",
    index: "06",
    title: "AI Bot Integration",
    summary:
      "Production-grade LLM and agent workflows — support bots, copilots, retrieval pipelines, evaluation.",
    detail: {
      description:
        "We design and deploy AI systems that actually work in production — not demos. From a customer-support bot that deflects 70% of tickets, to a copilot embedded in your SaaS product, to a fully autonomous agent pipeline with human-in-the-loop escalation. Every system ships with an evaluation framework so you can measure and improve it.",
      deliverables: [
        "Requirements & data audit workshop",
        "RAG pipeline architecture & implementation",
        "LLM fine-tuning or prompt engineering",
        "Guardrails, evals, and monitoring setup",
        "Admin dashboard for content & feedback",
        "Handover documentation & runbook",
      ],
      tech: ["OpenAI", "Anthropic Claude", "LangChain", "Pinecone", "Supabase", "Vercel AI SDK"],
    },
    tags: ["LLMs", "RAG", "Agents", "Evals"],
    accent: "magenta",
  },
  {
    id: "ecommerce",
    index: "07",
    title: "E-commerce",
    summary:
      "Storefronts engineered for conversion. Shopify Hydrogen, headless Commerce, custom checkouts.",
    detail: {
      description:
        "Conversion is the only metric that matters for commerce. We build storefronts with obsessive attention to page speed, checkout UX, and merchandising flexibility. Whether you're migrating from a slow theme or launching a headless D2C brand from scratch, we ship stores that load fast, sell hard, and scale without pain.",
      deliverables: [
        "Shopify Hydrogen or headless storefront",
        "Custom product pages & collection templates",
        "Checkout optimisation (upsells, express pay)",
        "Inventory & ERP integration",
        "Email automation (abandon cart, win-back)",
        "Analytics & conversion tracking setup",
      ],
      tech: ["Shopify Hydrogen", "Stripe", "Next.js Commerce", "Klaviyo", "Algolia", "Recharge"],
    },
    tags: ["Shopify", "Stripe", "Headless"],
    accent: "lime",
  },
  {
    id: "3d",
    index: "08",
    title: "3D Animations",
    summary:
      "Real-time WebGL and rendered CG — the kind of craft that puts work on Awwwards.",
    detail: {
      description:
        "We sit at a rare intersection: 3D artists who can ship to the browser. Real-time WebGL scenes built with Three.js and React Three Fiber deliver immersive hero sections and product configurators with no plugin needed. For brand films and offline renders, we produce in Blender with full PBR shading, lighting, and VFX compositing.",
      deliverables: [
        "Real-time WebGL / Three.js scene",
        "Custom GLSL shader development",
        "3D product configurator",
        "Blender rendered brand film",
        "Optimised GLTF/DRACO asset pipeline",
        "Responsive performance budget & fallbacks",
      ],
      tech: ["Three.js", "React Three Fiber", "Blender", "GLSL", "Draco", "@react-three/drei"],
    },
    tags: ["Three.js", "Blender", "Shaders"],
    accent: "magenta",
  },
  {
    id: "custom",
    index: "09",
    title: "Custom Software",
    summary:
      "Bespoke platforms for teams that have outgrown off-the-shelf tools. Architected to scale.",
    detail: {
      description:
        "When no existing product fits your workflow, we build the one that does. We've shipped internal tooling, multi-tenant SaaS platforms, data pipelines, and real-time dashboards for teams ranging from 5 to 5,000. Architecture decisions are made with your five-year horizon in mind — not just this quarter's sprint.",
      deliverables: [
        "System architecture & ERD documentation",
        "API design (REST / GraphQL / tRPC)",
        "Database schema & migration strategy",
        "Authentication & authorisation layer",
        "Admin panel & internal tooling",
        "Infrastructure-as-code & observability",
      ],
      tech: ["Node.js", "PostgreSQL", "tRPC", "Prisma", "Redis", "AWS / GCP"],
    },
    tags: ["Architecture", "APIs", "Infra"],
    accent: "lime",
  },
] as const;

export const PROCESS_STEPS = [
  {
    index: "I",
    title: "Discover",
    body:
      "We sit with the problem. Stakeholder interviews, audits, and market framing produce a crisp brief everyone agrees on.",
  },
  {
    index: "II",
    title: "Design",
    body:
      "Concepts, wireframes, prototypes. We decide the shape of the thing before we build it — and we decide it together.",
  },
  {
    index: "III",
    title: "Build",
    body:
      "Short cycles, visible progress, honest communication. Production-ready code and content from day one.",
  },
  {
    index: "IV",
    title: "Launch",
    body:
      "Performance budgets, accessibility passes, observability. We ship with confidence and measure what matters.",
  },
  {
    index: "V",
    title: "Evolve",
    body:
      "Great products are never done. We partner for the long arc — iterating, experimenting, compounding results.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "SCRIPTIVE didn't just redesign our product — they rewrote our trajectory. Conversion is up 42% since launch.",
    name: "Amara Okafor",
    role: "CEO, Finchley Labs",
  },
  {
    quote:
      "The 3D hero they built became the most-shared asset in our launch. Clients keep asking where we found them.",
    name: "Daniel Reyes",
    role: "Head of Brand, Northbeam",
  },
  {
    quote:
      "Most vendors deliver to spec. SCRIPTIVE delivered to vision — and made the vision sharper along the way.",
    name: "Priya Shah",
    role: "VP Product, Mercato",
  },
  {
    quote:
      "The craft is obvious. Motion, typography, performance — everything considered. A true design partner.",
    name: "Takeshi Morita",
    role: "Creative Director, Kōen",
  },
] as const;

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  year: string;
  color: string;
  image: string;
  images: readonly string[];
};

export const PORTFOLIO: readonly PortfolioItem[] = [
  {
    slug: "helix-finance",
    title: "Helix Finance",
    category: "Web · Brand · 3D",
    year: "2025",
    color: "from-neon-cyan/20 to-neon-violet/20",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "orbit-labs",
    title: "Orbit Labs",
    category: "Mobile · AI",
    year: "2025",
    color: "from-neon-violet/20 to-neon-magenta/20",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "northbeam",
    title: "Northbeam",
    category: "Web · Motion",
    year: "2024",
    color: "from-neon-magenta/20 to-neon-cyan/20",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "mercato",
    title: "Mercato",
    category: "E-commerce · Brand",
    year: "2024",
    color: "from-neon-lime/20 to-neon-cyan/20",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "koen-studio",
    title: "Kōen Studio",
    category: "Identity · Site",
    year: "2024",
    color: "from-neon-cyan/20 to-neon-lime/20",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "finchley",
    title: "Finchley Labs",
    category: "SaaS · Design System",
    year: "2023",
    color: "from-neon-violet/20 to-neon-cyan/20",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
] as const;
