import { ArrowRight, Mail, MapPin, Cpu, Code2, Smartphone, Briefcase, Sparkles } from "lucide-react";
import { timeline } from "@/lib/data"; // collecting data from data.ts for hero section w/ timeline

export function Hero() {
  // Dynamic calculation placeholder or manually defined total metrics
  const totalYearsOfExperience = timeline.length > 0 ? `${timeline.length}+ Years` : "3+ Years";

  return (
    <section id="top" className="relative pt-36 pb-24 overflow-hidden bg-transparent">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-30 pointer-events-none" />

      {/* Responsive Layout Wrapper */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* LEFT SIDE: HERO CONTENT (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col h-full justify-center">
            
            {/* HIRE ME ONLY: Sa pinakataas ng pangalan mo */}
            <div className="mb-5 self-start">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-500/30 px-3 py-1.5 rounded-2xl relative overflow-hidden hover:border-emerald-400/60 hover:bg-emerald-950/40 transition-all duration-300 group/hire"
              >
                {/* Concentric Heartbeat Radar Waves */}
                <span className="absolute flex h-2 w-2 left-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                
                <span className="pl-3.5 flex items-center gap-1 font-semibold">
                  Available For Hire 
                </span>
              </a>
            </div>

            {/* Pangalan */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.0rem] font-bold tracking-tight leading-[0.95] max-w-2xl text-white">
              Marc Adrian M. Cuano
            </h1>
            
            {/* Secondary Metadata Badges Cluster */}
            <div className="flex flex-wrap items-center gap-2 mt-4 mb-4 self-start">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-1 font-mono text-xs text-slate-300 glass px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <MapPin className="w-3.5 h-3.5 text-accent" /> Batangas City, Philippines
              </div>

              {/* IBINALIK ANG EMERALD GREEN: Total Experience Badge */}
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1.5 rounded-2xl">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{totalYearsOfExperience} Experience</span>
              </div>
            </div>

            <p className="mt-2 font-mono text-sm md:text-base text-accent/90 tracking-wide">
              Full Stack Developer | AI Automation Specialist <span className="text-slate-600">·</span> QA Test Specialist{" "}
              <span className="text-slate-600">·</span> Embedded Systems Programmer
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#projects" className="glass-btn-primary">
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="glass-btn">
                <Mail className="w-4 h-4" /> Contact Me
              </a>
            </div>
           
          </div>

          {/* RIGHT SIDE: TIMELINE (5 Columns) */}
          <div className="lg:col-span-5 lg:pl-10 mt-12 lg:mt-4">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white tracking-tight font-display">
                Experience
              </h2>
            </div>

            {/* Vertical Tree Line */}
            <div className="relative border-l-2 border-white/10 space-y-8 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
              {timeline.map((t, index) => (
                <div key={t.period || index} className="relative pl-6 flex justify-between items-start group">
                  
                  {/* Left Custom Node Markers */}
                  {index === 0 ? (
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 bg-white border border-white rounded-sm group-hover:bg-accent group-hover:border-accent transition-colors duration-200" />
                  ) : (
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 bg-[#0b0f19] border-2 border-white/20 rounded-sm group-hover:border-accent transition-colors duration-200" />
                  )}

                  {/* Left Block: Core Metadata */}
                  <div className="flex-1 pr-4">
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-accent transition-colors duration-200">
                      {t.role}
                    </h3>
                    <div className="text-slate-400 text-sm mt-0.5 font-normal">
                      {t.org}
                    </div>
                    {t.text && (
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed font-normal max-w-sm hidden group-hover:block transition-all">
                        {t.text}
                      </p>
                    )}
                  </div>

                  {/* Right Block: Pure Aligned Year Node Layout */}
                  <div className="font-mono text-xs text-slate-400 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded group-hover:text-accent group-hover:border-accent/20 transition-colors duration-200 whitespace-nowrap">
                    {t.period}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}