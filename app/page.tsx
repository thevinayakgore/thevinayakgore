// app/page.tsx
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Youtube from "@/components/sections/youtube";
import FAQ from "./faq/page";
import CTA from "@/components/sections/cta";
import Contact from "@/components/sections/contact";
import Creator from "@/app/creator/page";

export default function Home() {
  return (
    <main>
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="about">
        <Creator />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="youtube">
        <Youtube />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="actions">
        <CTA />
      </section>
    </main>
  );
}
