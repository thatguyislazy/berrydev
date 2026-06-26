"use client";

import React from "react";

// App images first, then web images
const ordered = [
  "/projects/aqua halo - app.png",
  "/projects/auxilium - app.png",
  "/projects/bagong tubig - app.png",
  "/projects/child tracker - app.png",
  "/projects/greenhouse -app.png",
  "/projects/skillhub - app.png",
  "/projects/ats - scanner - web.png",
  "/projects/bificial - web.png",
  "/projects/charging - web.png",
  "/projects/econnect - web.png",
];

export function Showcase() {
  const doubled = [...ordered, ...ordered];

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <h3 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Designed. Developed.{" "}
          <span className="text-gradient">Delivered.</span>
        </h3>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-scroll w-max items-center">
          {doubled.map((src, idx) => (
            <div key={idx} className="flex-shrink-0 w-[420px] h-[420px] flex items-center justify-center px-4">
              <img
                src={src}
                alt=""
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
