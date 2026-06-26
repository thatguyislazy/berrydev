import { Globe, Smartphone, Cpu, ShieldCheck, Workflow, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Full-stack Web Applications",
    text: "Next.js and React platforms — from marketing sites to complex realtime dashboards, with clean architecture and measurable performance budgets.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    text: "Flutter and Kotlin apps with offline-first sync, on-device ML, and native-feeling UX on Android.",
    tags: ["Flutter", "Kotlin", "Dart", "Firebase"],
  },
  {
    icon: Cpu,
    title: "IoT Prototyping & Firmware",
    text: "ESP32, Arduino, Raspberry Pi, and STM32 builds — sensor networks, custom circuits, and PCB-ready prototypes.",
    tags: ["Arduino", "ESP32", "Raspberry Pi", "C++"],
  },
  {
    icon: Workflow,
    title: "AI Automation & Workflows",
    text: "n8n automations powered by Claude AI — email triage, content generation, applicant screening, and proposal drafting that save hours of manual work daily.",
    tags: ["n8n", "Claude AI", "APIs", "Automation"],
    highlight: true,
  },
  {
    icon: ShieldCheck,
    title: "QA Engineering Consulting",
    text: "Test planning, UAT, validation systems, and bug-tracking workflows that lift release confidence and reduce regressions.",
    tags: ["UAT", "Regression", "Test Plans", "CI/CD"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] bg-transparent">
      {/* Header — matches Projects / Automation layout */}
      <div className="mb-16 reveal">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-3">
          04 — Services
        </p>
        <h3 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl font-display">
          What I can build for you.
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 backdrop-blur-sm gradient-border overflow-hidden reveal reveal-delay-${Math.min(idx + 1, 5)} ${
                s.highlight
                  ? "bg-gradient-to-b from-accent/[0.04] to-transparent border-accent/20 hover:border-accent/40 md:col-span-2 lg:col-span-1"
                  : "bg-gradient-to-b from-white/[0.03] to-transparent border-white/[0.06] hover:border-accent/30"
              }`}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 via-transparent to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/0 group-hover:bg-accent/[0.04] blur-3xl transition-all duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="mb-5">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300 group-hover:scale-105 ${
                    s.highlight
                      ? "bg-accent/10 border-accent/20 text-accent group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                      : "bg-white/[0.04] border-white/[0.06] text-slate-300 group-hover:text-accent group-hover:border-accent/20"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold mb-2 text-white group-hover:text-accent transition-colors duration-200 tracking-tight">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed font-normal mb-5 flex-1">
                  {s.text}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-500 group-hover:text-slate-400 group-hover:border-white/[0.1] transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <ArrowUpRight className="w-4 h-4 text-accent/40" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
