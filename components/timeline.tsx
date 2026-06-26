import { Section } from "./section";
import { timeline } from "@/lib/data";

export function Timeline() {
  return (
    <Section
      id="experience"
      eyebrow="05 — Experience"
      title="A working timeline."
      description="Roles where I've shipped software, hardware, and quality."
    >
      <div className="relative pl-6 md:pl-8 border-l border-white/[0.08] space-y-10 reveal">
        {timeline.map((t, idx) => (
          <div key={t.period} className="relative group">
            <span className="absolute -left-[33px] md:-left-[37px] top-1.5 w-3 h-3 rounded-full bg-accent shadow-glow ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all duration-300" />
            <div className="font-mono text-xs text-accent">{t.period}</div>
            <h3 className="font-display text-xl font-semibold mt-1 group-hover:text-accent transition-colors duration-200">
              {t.role}
            </h3>
            <div className="text-slate-400 text-sm mt-0.5">{t.org}</div>
            <p className="text-slate-300 mt-3 leading-relaxed max-w-2xl">{t.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
