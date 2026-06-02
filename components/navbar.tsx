"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

//nav links for desktop and mobile
const links = [
  { href: "#stack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-slate-950/70 border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-mono group select-none">
          <img
            src="/berrylogo.svg"
            alt="berrydev logo"
            className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
            loading="eager"
          />
          <span className="font-bold text-sm tracking-wider text-slate-200">
            berrydev
          </span>
        </a>

        {/* RIGHT SIDE: desktop controls */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-7 text-xs font-mono tracking-tight text-slate-400">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-accent transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Glass Drawer Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5 font-mono text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
            {/* <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="glass-btn-primary text-center py-2.5 text-xs font-bold mt-2 flex items-center justify-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Hire me
            </a> */}
          </div>
        </div>
      )}
    </header>
  );
};