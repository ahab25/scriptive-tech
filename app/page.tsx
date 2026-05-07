import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { Navigation } from "@/components/ui/Navigation";

const MARQUEE_ITEMS = [
  "Web Development",
  "UI/UX Design",
  "Mobile Apps",
  "3D Animation",
  "AI Integration",
  "SEO Strategy",
  "E-commerce",
  "Digital Marketing",
  "Custom Software",
  "Video Editing",
] as const;

const COLLABORATORS = [
  "Helix Finance",
  "Orbit Labs",
  "Northbeam",
  "Mercato",
  "Kōen Studio",
  "Finchley Labs",
  "TechVenture Co.",
  "Nova Digital",
  "Apex Brands",
  "Pulse Media",
  "Crest Studio",
  "Elevate Corp",
] as const;

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main" className="grain">
        <Hero />
        <About />
        <Marquee items={MARQUEE_ITEMS} />
        <Services />
        <Marquee items={COLLABORATORS} variant="collaborators" />
        <Portfolio />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
