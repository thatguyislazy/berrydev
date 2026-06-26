import { Globe, Cpu, ShieldCheck } from "lucide-react";

const focus = [
  {
    icon: Globe,
    title: "Web & Mobile Development",
    text: "Performant, offline-first applications across React/Next.js and Flutter/Kotlin — from realtime dashboards to mobile-grade ML experiences.",
  },
  {
    icon: Cpu,
    title: "Embedded Systems & Hardware",
    text: "Firmware, sensor systems, custom circuits, and PCB layouts on Arduino, ESP32, Raspberry Pi, and STM32 platforms.",
  },
  {
    icon: ShieldCheck,
    title: "QA Engineering",
    text: "Test strategy, UAT planning, regression coverage, and edge-case-first engineering to reduce defect escape across releases.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="mb-12 reveal">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-3">
          01 — About
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 font-display">
          Bridging{" "}
          <span className="text-gradient">physical microarchitectures</span>{" "}
          with modern software ecosystems.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-5 text-slate-300 leading-relaxed reveal reveal-delay-1">
          <p>
            I&apos;m a software engineer with deep roots in hardware. My work spans
            full-stack web platforms, mobile applications with on-device machine
            learning, and embedded systems — from prototyping sensors on a
            breadboard to deploying production firmware on custom PCBs.
          </p>

          <p>
            I hold a{" "}
            <span className="text-slate-100 font-medium">
              BS in Industrial Technology (Computer Technology)
            </span>{" "}
            from{" "}
            <span className="text-slate-100 font-medium">
              Batangas State University
            </span>
            , and bring a QA Test Specialist&apos;s discipline to every project:
            test plans, UAT, and edge-case validation are first-class citizens
            in my workflow.
          </p>
        </div>

        <div className="glass-strong p-5 space-y-3 reveal reveal-delay-2">
          {[
            { k: "Focus", v: "Web · Mobile · IoT · QA" },
            { k: "Based in", v: "Batangas City, PH" },
            { k: "Education", v: "BSIT — BatStateU" },
            { k: "Discipline", v: "Edge-case first" },
          ].map((i) => (
            <div
              key={i.k}
              className="flex justify-between border-b border-white/[0.06] py-2 font-mono text-sm last:border-0"
            >
              <span className="text-slate-400">{i.k}</span>
              <span className="text-slate-100">{i.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {focus.map((f, idx) => {
          const Icon = f.icon;

          return (
            <div
              key={f.title}
              className={`glass p-6 hover:border-accent/30 transition-all duration-500 gradient-border reveal reveal-delay-${Math.min(idx + 1, 3)}`}
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent mb-4 border border-accent/20">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>

              <p className="text-slate-400 text-sm leading-relaxed">{f.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
