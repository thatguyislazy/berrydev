// File: app/page.tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { TechStack } from "@/components/tech-stack";
import { Projects } from "@/components/projects";
import AutomationSection from "@/components/automation";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen flex-col bg-transparent text-slate-100 antialiased">
        <section id="top">
          <Hero />
        </section>

        <Showcase />

        <section id="stack">
          <TechStack />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <AutomationSection />

        <section id="services">
          <Services />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
