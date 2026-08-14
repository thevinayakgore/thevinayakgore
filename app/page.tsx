import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Youtube from "@/components/sections/youtube";
import FAQ from "./faq/page";
import CTA from "@/components/sections/cta";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Youtube />
      <FAQ />
      <Contact />
      <CTA />
    </>
  );
}
