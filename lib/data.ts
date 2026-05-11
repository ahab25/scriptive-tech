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
      "SCRIPTIVE transformed Bella Noor from a local skincare brand into a premium digital experience. Our online sales doubled within 60 days of launch — the site sells for us around the clock.",
    name: "Noor Al-Rashid",
    role: "Founder, Bella Noor Skincare",
  },
  {
    quote:
      "We needed a storefront as bold as our cases. SCRIPTIVE nailed it — the design system they built scales across every campaign we run. Our conversion rate has never been higher.",
    name: "Emre Demir",
    role: "Head of E-commerce, Burga",
  },
  {
    quote:
      "The Tikl platform had to feel effortless for creators and technically airtight under the hood. SCRIPTIVE delivered both. The team understood product at a level most design studios simply don't.",
    name: "Lars Eriksson",
    role: "Co-founder & CPO, Tikl.io",
  },
  {
    quote:
      "DeFi interfaces are notoriously intimidating. SCRIPTIVE made StellaSwap feel approachable without dumbing anything down. Liquidity participation jumped 38% after the redesign.",
    name: "Marcus Vance",
    role: "Product Lead, StellaSwap",
  },
  {
    quote:
      "Online enquiries tripled in two months. The brand identity they built gave us the credibility to compete with agencies three times our size. Best investment we've made in the business.",
    name: "Tariq Hussain",
    role: "Director, Deluxe Holidays",
  },
  {
    quote:
      "Every detail of the Ivory Aesthetics site was considered — the typography, the photography treatment, the micro-animations. Clients comment on the website before they even walk through the door.",
    name: "Dr. Layla Hassan",
    role: "Founder & Clinical Director, Ivory Aesthetics",
  },
] as const;

export type ProjectPhase = {
  phase: string;
  title: string;
  description: string;
  duration: string;
  deliverables: readonly string[];
};

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  year: string;
  location: string;
  color: string;
  image: string;
  images: readonly string[];
  liveUrl: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: readonly { value: string; label: string }[];
  phases: readonly ProjectPhase[];
};

export const PORTFOLIO: readonly PortfolioItem[] = [
  {
    slug: "bella-noor-skincare",
    title: "Bella Noor Skincare",
    category: "E-commerce · Brand Identity",
    year: "2024",
    location: "USA",
    color: "from-neon-magenta/30 to-neon-cyan/20",
    liveUrl: "https://bellanoorskincare.com/",
    image: "/images/Project/bellanoor.png",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
    ],
    overview: "Bella Noor Skincare is a luxury skincare brand targeting the US market with a range of clean, ingredient-led formulations. They came to us needing an e-commerce presence that matched the premium quality of their products — one that could convert first-time visitors into loyal subscribers.",
    challenge: "The brand had beautiful products but a basic Shopify theme that undercut their premium positioning. Cart abandonment was high, product pages weren't communicating ingredient stories effectively, and there was no subscription offering — a critical missed revenue stream.",
    solution: "We rebuilt the storefront from scratch with custom Shopify sections, a rich ingredient storytelling layer on product pages, a subscription and bundle model powered by Recharge, and a streamlined express checkout flow. Brand identity was refreshed with refined typography and a warmer colour palette.",
    outcome: "Conversion rate improved 41% in the first 60 days. Average order value rose 28% after bundling was introduced. Subscription signups went from zero to 200+ in the first six weeks. The brand is now expanding into two new retail channels.",
    metrics: [
      { value: "41%", label: "Conversion lift" },
      { value: "28%", label: "Higher AOV" },
      { value: "200+", label: "Subscribers in 6wks" },
    ],
    phases: [
      { phase: "01", title: "Discovery", duration: "Week 1–2", description: "Brand audit, competitor analysis, and customer journey mapping. We interviewed the founder and reviewed purchase data to identify the biggest conversion leaks.", deliverables: ["Brand & competitor audit", "Customer journey map", "Conversion gap analysis", "Project brief & KPIs"] },
      { phase: "02", title: "Brand Refinement", duration: "Week 2–3", description: "Refined the visual identity — typography, colour palette, photography art direction, and tone of voice — to communicate premium quality consistently across every touchpoint.", deliverables: ["Updated brand guidelines", "Typography & colour system", "Photography brief", "Tone of voice document"] },
      { phase: "03", title: "UX & Design", duration: "Week 3–5", description: "Designed all key pages in Figma: homepage, PDP, collection, cart, and checkout. Interactive prototype tested with 6 real customers before development began.", deliverables: ["Wireframes (all key pages)", "High-fidelity Figma designs", "Interactive prototype", "Usability test report"] },
      { phase: "04", title: "Shopify Development", duration: "Week 5–8", description: "Custom Shopify theme built from scratch. Integrated Recharge for subscriptions, Klaviyo for lifecycle email, and Algolia for search. All sections are editable by the client.", deliverables: ["Custom Shopify theme", "Recharge subscription setup", "Klaviyo email flows", "CMS training & documentation"] },
      { phase: "05", title: "QA & Launch", duration: "Week 8–9", description: "Full QA pass across 12 devices, checkout flow stress testing, Core Web Vitals audit, and SEO meta review. Launched with a coordinated email and social campaign.", deliverables: ["Cross-device QA report", "Performance audit (CWV)", "Launch checklist", "Go-live support"] },
    ],
  },
  {
    slug: "burga",
    title: "Burga",
    category: "E-commerce · Headless · Web",
    year: "2024",
    location: "Turkey",
    color: "from-neon-violet/30 to-neon-magenta/20",
    liveUrl: "https://burga.com/",
    image: "/images/Project/burga.png",
    images: [
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1200&q=80",
    ],
    overview: "Burga is one of Europe's fastest-growing premium phone case and accessories brands, operating from Turkey with a global customer base. We were brought in to architect a headless e-commerce rebuild capable of handling their massive product catalogue and high-traffic drop events without performance degradation.",
    challenge: "The existing Shopify theme couldn't handle the variant complexity — hundreds of phone models cross-referenced with dozens of designs — without degrading page performance. During drop events, load times spiked above 4 seconds, directly costing conversions. International expansion to 12 markets added further complexity.",
    solution: "We architected a Shopify Hydrogen headless storefront with edge-deployed product pages, a custom variant selector built for performance, and a CDN-backed image pipeline optimised for the product catalogue. A server-side rendering strategy kept all pages fast even under peak load.",
    outcome: "Page load time reduced from 4.2s to 1.1s. Drop events now handled without performance degradation. The Hydrogen architecture supports 12 international markets with localised pricing and content. Core Web Vitals score hit 98.",
    metrics: [
      { value: "1.1s", label: "Avg page load" },
      { value: "12", label: "Markets served" },
      { value: "98", label: "CWV score" },
    ],
    phases: [
      { phase: "01", title: "Technical Discovery", duration: "Week 1–2", description: "Deep-dive into existing Shopify architecture, traffic patterns, and bottlenecks. Load-tested the current theme to identify exactly where performance broke down during high-traffic events.", deliverables: ["Performance audit report", "Architecture review", "Traffic & bottleneck analysis", "Headless migration plan"] },
      { phase: "02", title: "Architecture Design", duration: "Week 2–4", description: "Designed the headless Hydrogen architecture: edge deployment strategy, data fetching layer, image CDN pipeline, and variant selector performance model. API contracts defined before any UI work began.", deliverables: ["Technical architecture doc", "API contract definitions", "CDN & image pipeline spec", "Variant model design"] },
      { phase: "03", title: "UI & Component System", duration: "Week 4–6", description: "Built a lean React component library in Figma first, then code. Every component was performance-budgeted before implementation. The design system supports all 12 market locales.", deliverables: ["Figma component library", "Design tokens (per locale)", "Responsive layout specs", "Motion & interaction guide"] },
      { phase: "04", title: "Hydrogen Development", duration: "Week 6–10", description: "Full Hydrogen build: storefront, product pages, variant selector, cart, checkout, and admin integration. Edge deployment configured for all 12 regional domains with localised pricing.", deliverables: ["Shopify Hydrogen storefront", "Custom variant selector", "Edge deployment config", "Localisation setup (12 markets)"] },
      { phase: "05", title: "Load Testing & Launch", duration: "Week 10–12", description: "Simulated drop-event traffic at 10× normal load. Tuned caching strategies and CDN rules until performance held under pressure. Phased rollout to all markets over 48 hours.", deliverables: ["Load test reports (3 rounds)", "Cache & CDN configuration", "Phased rollout plan", "Post-launch monitoring setup"] },
    ],
  },
  {
    slug: "tikl",
    title: "Tikl.io",
    category: "SaaS · UI/UX · Web App",
    year: "2024",
    location: "Europe",
    color: "from-neon-cyan/30 to-neon-violet/20",
    liveUrl: "https://www.tikl.io/",
    image: "/images/Project/tikl.png",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    ],
    overview: "Tikl is a European SaaS platform connecting service professionals — plumbers, electricians, cleaners — with customers who need reliable on-demand help. They needed a complete product redesign and a marketing site that could convert curious visitors into active platform users across multiple European markets.",
    challenge: "The existing app was functional but confusing — a low activation rate suggested users were getting lost before reaching their first successful booking. The marketing site had strong traffic but poor conversion, suggesting the value proposition wasn't landing clearly enough.",
    solution: "We ran a three-week discovery sprint: user interviews with both service providers and customers, activation funnel analysis, and competitive benchmarking. The full app interface was redesigned with a focus on the onboarding flow. The marketing site was rebuilt with a clear narrative that separated the two user types from the first scroll.",
    outcome: "User activation rate improved 52% in the first month. Marketing site trial signups up 67%. Time-to-first-booking reduced from 8 minutes to under 3. The redesigned onboarding became a template for their expansion into 3 new markets.",
    metrics: [
      { value: "52%", label: "Activation lift" },
      { value: "67%", label: "More trial signups" },
      { value: "3min", label: "Time to first booking" },
    ],
    phases: [
      { phase: "01", title: "User Research", duration: "Week 1–3", description: "Conducted 14 user interviews split between service providers and customers. Mapped both journeys end-to-end, identified the activation drop-off point, and ran a heuristic evaluation of the existing app.", deliverables: ["Interview transcripts & synthesis", "Dual journey maps", "Activation funnel analysis", "Heuristic evaluation report"] },
      { phase: "02", title: "Information Architecture", duration: "Week 3–4", description: "Redesigned the IA to separate the two user types clearly from login. Card sorting sessions with 20 users helped validate the new navigation structure before any visual design began.", deliverables: ["Revised IA & sitemap", "Card sorting results", "Navigation model", "Content hierarchy doc"] },
      { phase: "03", title: "Design & Prototype", duration: "Week 4–7", description: "High-fidelity designs for all key screens: onboarding, search/match, booking, profiles, and the provider dashboard. Clickable prototype tested in two rounds with real users.", deliverables: ["Full Figma design system", "High-fidelity screen designs", "Clickable prototype", "Two rounds of usability testing"] },
      { phase: "04", title: "Marketing Site", duration: "Week 7–9", description: "Next.js marketing site built with a dual-audience narrative — one path for customers, one for service providers. Animated illustrations built in Lottie. Multi-language support for 3 markets.", deliverables: ["Next.js marketing site", "Dual-audience narrative", "Lottie animations", "i18n for 3 languages"] },
      { phase: "05", title: "App Development", duration: "Week 9–13", description: "Full front-end implementation of the redesigned app. React Native for mobile, aligned with the web design system. New onboarding flow with contextual tooltips and progress indicators.", deliverables: ["React Native app (iOS & Android)", "Onboarding flow implementation", "Design system in code", "QA & accessibility audit"] },
    ],
  },
  {
    slug: "stellaswap",
    title: "StellaSwap",
    category: "DeFi · Web3 · UI/UX",
    year: "2024",
    location: "USA",
    color: "from-neon-violet/40 to-neon-cyan/20",
    liveUrl: "https://stellaswap.com/",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    ],
    overview: "StellaSwap is the leading DEX and DeFi hub on the Moonbeam network, offering token swaps, liquidity pools, yield farming, and cross-chain bridging. We were engaged to deliver a comprehensive platform redesign that brought institutional-grade UX to a complex DeFi product.",
    challenge: "The original interface was built quickly to meet market demand — inconsistent components, confusing swap and liquidity flows, and no design system to scale from. The challenge was making genuinely complex DeFi mechanics feel simple without dumbing them down for experienced users.",
    solution: "We built a complete design system in Figma, establishing tokens, components, and interaction patterns for every surface. The swap interface was redesigned with progressive disclosure — casual users see a clean one-screen flow, while power users can access advanced routing and slippage controls. Animated micro-interactions guide users through multi-step processes.",
    outcome: "Total Value Locked increased 340% in the quarter following launch. Daily active users up 180%. The design system now powers three sub-products. StellaSwap became a reference DeFi UI cited by multiple protocol teams.",
    metrics: [
      { value: "340%", label: "TVL growth" },
      { value: "180%", label: "DAU increase" },
      { value: "3", label: "Products powered" },
    ],
    phases: [
      { phase: "01", title: "Protocol Research", duration: "Week 1–2", description: "Deep-dive into the Moonbeam ecosystem, StellaSwap's smart contract architecture, and competitive DeFi UIs. Interviewed power users to understand the mental models behind liquidity provision and yield strategies.", deliverables: ["Protocol architecture review", "Competitive DeFi UI audit", "Power user interviews (8)", "UX opportunity map"] },
      { phase: "02", title: "Design System Foundation", duration: "Week 2–5", description: "Built the design system foundation in Figma: colour tokens, typography scale, spacing system, icon library, and the base component set. Web3-specific components (wallet connectors, transaction states, gas indicators) designed from scratch.", deliverables: ["Design token system", "Base component library", "Web3 UI component set", "Dark mode specifications"] },
      { phase: "03", title: "Core Flows", duration: "Week 5–8", description: "Designed all primary user flows: swap, liquidity provision, yield farming, bridging, and portfolio view. Progressive disclosure model tested with both novice and expert users.", deliverables: ["Swap interface redesign", "Liquidity pool flows", "Yield farming dashboard", "Bridge interface", "Portfolio view"] },
      { phase: "04", title: "Front-End Implementation", duration: "Week 8–13", description: "Full React implementation against the Figma design system. Animated micro-interactions with Framer Motion. Real-time data from on-chain sources with optimistic UI patterns for transaction states.", deliverables: ["React implementation", "Framer Motion animations", "Real-time data integration", "Transaction state system"] },
      { phase: "05", title: "Audit & Launch", duration: "Week 13–14", description: "Accessibility audit, security review of the front-end (no smart contracts modified), cross-browser QA, and a coordinated launch with the StellaSwap community. Post-launch analytics dashboards set up to track key UX metrics.", deliverables: ["Accessibility audit", "Front-end security review", "Community launch campaign", "Analytics & UX metrics setup"] },
    ],
  },
  {
    slug: "deluxe-holidays",
    title: "Deluxe Holidays",
    category: "Web Design · Brand · Travel",
    year: "2025",
    location: "USA",
    color: "from-neon-lime/30 to-neon-cyan/20",
    liveUrl: "https://deluxeholidays.com/",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
    ],
    overview: "Deluxe Holidays is a premium travel agency offering curated domestic and international holiday packages. With a loyal offline client base but no meaningful digital presence, they needed a brand and website that could capture the online travel market — mobile-first, booking-ready, and aspirational.",
    challenge: "The previous website was outdated, not mobile-responsive, and had no online booking or enquiry capability. The brand felt generic in a market where trust and aspiration drive purchase decisions. The agency was losing younger customers to competitors with polished digital experiences.",
    solution: "We developed a full brand identity — logo, colour palette, typography, and photography style — then built a Next.js website with destination-first navigation, a curated package showcase, and a streamlined enquiry flow. WhatsApp integration for instant enquiries matched how travellers naturally communicate.",
    outcome: "Online enquiries tripled within two months of launch. Mobile sessions now account for 71% of all traffic. Bounce rate dropped from 68% to 29%. The agency onboarded a dedicated digital team six months after launch to manage the incoming volume.",
    metrics: [
      { value: "3×", label: "Online enquiries" },
      { value: "71%", label: "Mobile traffic" },
      { value: "29%", label: "Bounce rate" },
    ],
    phases: [
      { phase: "01", title: "Discovery & Brand Brief", duration: "Week 1–2", description: "Stakeholder workshops to understand the agency's positioning, target customers, and competitive landscape. Defined the brand personality and the digital strategy before touching any visuals.", deliverables: ["Brand positioning brief", "Target audience personas", "Competitive landscape map", "Digital strategy document"] },
      { phase: "02", title: "Brand Identity", duration: "Week 2–4", description: "Created the full brand identity: logotype, colour system, typography, and photography style guide. The identity needed to feel premium and trustworthy — a step above generic travel branding.", deliverables: ["Logo & logotype system", "Colour palette & usage", "Typography selection", "Photography style guide"] },
      { phase: "03", title: "UX & Content Strategy", duration: "Week 4–5", description: "Mapped the information architecture around destination discovery, package browsing, and enquiry conversion. Content strategy defined to support both organic search and direct navigation.", deliverables: ["Sitemap & IA", "Content strategy", "SEO keyword framework", "Wireframes (mobile-first)"] },
      { phase: "04", title: "Design & Prototyping", duration: "Week 5–7", description: "High-fidelity designs for all key pages built mobile-first. Package cards, destination heroes, and the enquiry flow were all validated with real potential customers.", deliverables: ["Mobile-first Figma designs", "Interactive prototype", "User testing (8 participants)", "Design refinements"] },
      { phase: "05", title: "Development & Launch", duration: "Week 7–10", description: "Next.js website built with a headless CMS so the agency team can manage packages independently. WhatsApp enquiry integration, Google Maps embeds for destinations, and full SEO optimisation on launch.", deliverables: ["Next.js website", "CMS setup & training", "WhatsApp enquiry integration", "Launch SEO optimisation"] },
    ],
  },
  {
    slug: "ivory-aesthetics",
    title: "Ivory Aesthetics",
    category: "Web Design · Brand Identity · UI/UX",
    year: "2025",
    location: "UAE",
    color: "from-neon-cyan/25 to-neon-magenta/20",
    liveUrl: "https://ivoryaesthetics.com/",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    ],
    overview: "Ivory Aesthetics is a premium medical aesthetics clinic based in the UAE, offering advanced skin treatments, body contouring, and wellness services. They needed a brand identity and digital presence that conveyed clinical authority while feeling warm, luxurious, and deeply welcoming to their high-end clientele.",
    challenge: "The clinic had an exceptional reputation built entirely through word of mouth, but no digital presence to match it. Competitors in the UAE aesthetics market had polished, high-budget websites. Ivory needed to leapfrog the competition and establish itself as the definitive premium destination — without looking clinical or cold.",
    solution: "We developed a refined brand identity anchored in ivory, warm gold, and deep navy — luxurious without being loud. The website was designed around patient confidence: trust signals, treatment storytelling, and a seamless booking journey. Every page was built to convert a high-intent visitor into a booked consultation.",
    outcome: "Online consultation bookings increased 4× within 90 days of launch. The website became the clinic's primary acquisition channel, surpassing referrals for the first time. The brand identity was rolled out across the clinic's physical space, uniforms, and packaging.",
    metrics: [
      { value: "4×", label: "Consultation bookings" },
      { value: "90", label: "Days to ROI" },
      { value: "#1", label: "Acquisition channel" },
    ],
    phases: [
      { phase: "01", title: "Brand Strategy", duration: "Week 1–2", description: "Defined the brand positioning: premium, clinical confidence meets warm luxury. Competitor audit across 12 UAE aesthetics brands. Customer persona development based on the clinic's existing client profiles.", deliverables: ["Brand positioning statement", "Competitor audit (12 brands)", "Target persona profiles", "Tone of voice guide"] },
      { phase: "02", title: "Visual Identity", duration: "Week 2–4", description: "Created the complete visual identity — wordmark, colour palette (ivory, warm gold, deep navy), typography system, and iconography. The identity needed to work equally well on digital, print, and in-clinic signage.", deliverables: ["Logo & wordmark system", "Colour palette & usage rules", "Typography system", "Icon & pattern library"] },
      { phase: "03", title: "UX Design", duration: "Week 4–6", description: "Mapped the patient journey from first search to booked consultation. Designed the full site architecture around three goals: build trust, communicate expertise, and make booking frictionless. Mobile-first throughout.", deliverables: ["Patient journey map", "Site architecture", "Mobile-first wireframes", "Booking flow design"] },
      { phase: "04", title: "Web Design & Prototype", duration: "Week 6–8", description: "High-fidelity designs across all pages: homepage, treatment pages, team profiles, before/after gallery, and contact. Subtle animations and micro-interactions validated in an interactive Figma prototype.", deliverables: ["Full Figma design (all pages)", "Interactive prototype", "Animation & motion guide", "Client review & sign-off"] },
      { phase: "05", title: "Development & Launch", duration: "Week 8–11", description: "Next.js website with a CMS for the clinic team to manage treatments, team profiles, and news independently. Integrated booking widget, WhatsApp CTA, and a before/after gallery with privacy controls.", deliverables: ["Next.js website", "CMS integration & training", "Booking widget & WhatsApp CTA", "Before/after gallery", "SEO & analytics setup"] },
    ],
  },
] as const;
