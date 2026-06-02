import React from 'react';

const exactLogoMap: { [key: string]: { url: string; shadowColor: string } } = {
  // Development Frameworks & Web
  "React": { url: "https://cdn.simpleicons.org/react/61DAFB", shadowColor: "rgba(97,218,251,0.2)" },
  // "Next.js": { url: "https://cdn.simpleicons.org/nextdotjs/000000", shadowColor: "rgba(255,255,255,0.15)" }, 
  "TypeScript": { url: "https://cdn.simpleicons.org/typescript/3178C6", shadowColor: "rgba(49,120,198,0.2)" },
  "JavaScript": { url: "https://cdn.simpleicons.org/javascript/F7DF1E", shadowColor: "rgba(247,223,30,0.2)" },
  "TailwindCSS": { url: "https://cdn.simpleicons.org/tailwindcss/06B6D4", shadowColor: "rgba(6,182,212,0.2)" },
  "PHP": { url: "https://cdn.simpleicons.org/php/777BB4", shadowColor: "rgba(119,123,180,0.2)" },
  "C": { url: "https://cdn.simpleicons.org/c/A8B9CC", shadowColor: "rgba(168,185,204,0.2)" },

  // Hardware & Embedded Systems
  "Arduino": { url: "https://cdn.simpleicons.org/arduino/00979D", shadowColor: "rgba(0,151,157,0.2)" },
  "Raspberry Pi": { url: "https://cdn.simpleicons.org/raspberrypi/A22846", shadowColor: "rgba(162,40,70,0.2)" },
  "Espressif (ESP32/ESP8266)": { url: "https://cdn.simpleicons.org/espressif/E7352C", shadowColor: "rgba(231,53,44,0.2)" },
  "STM32": { url: "https://cdn.simpleicons.org/stmicroelectronics/003E5A", shadowColor: "rgba(0,62,90,0.2)" },
  "Seeeduino": { url: "https://img.shields.io/badge/-Seeed_Studio-94C11F", shadowColor: "rgba(148,193,31,0.2)" }, 

  //Engineering Tools
  "Proteus": { url: "https://cdn.simpleicons.org/proteus/00539B", shadowColor: "rgba(0,83,155,0.2)" },
  "KiCad": { url: "https://cdn.simpleicons.org/kicad/314E86", shadowColor: "rgba(49,78,134,0.2)" },
  "CNC Programming": { url: "https://cdn.simpleicons.org/autodesk/06B6D4", shadowColor: "rgba(6,182,212,0.1)" }, 

  // UI/UX & Creative Design
  "Figma": { url: "https://cdn.simpleicons.org/figma/F24E1E", shadowColor: "rgba(242,78,30,0.2)" },
  "SketchUp": { url: "https://cdn.simpleicons.org/sketchup/005A9C", shadowColor: "rgba(0,90,156,0.2)" },

  // LLM API's & Voice AI
  "ElevenLabs": { url: "https://cdn.simpleicons.org/elevenlabs/FFFFFF", shadowColor: "rgba(255,255,255,0.15)" },
  "Gemini": { url: "https://cdn.simpleicons.org/google/4285F4", shadowColor: "rgba(66,133,244,0.2)" },
  "ChatGPT": { url: "/chatgptlogo.png", shadowColor: "rgba(116,165,126,0.2)" },
  "Claude": { url: "/claude.png", shadowColor: "rgba(0,0,0,0.15)" },

  //Mobile Development
  "Android Studio": { url: "https://cdn.simpleicons.org/androidstudio/3DDC84", shadowColor: "rgba(61,220,132,0.2)"},
  "Flutter": { url: "https://cdn.simpleicons.org/flutter/02569B", shadowColor: "rgba(2,86,155,0.2)" },
  "Kotlin": { url: "https://cdn.simpleicons.org/kotlin/7F52FF", shadowColor: "rgba(127,82,255,0.2)" },

  //Machine Learning Tools & Frameworks
  "TensorFlow": { url: "https://cdn.simpleicons.org/tensorflow/FF6F00", shadowColor: "rgba(255,111,0,0.2)" },
  "PyTorch": { url: "https://cdn.simpleicons.org/pytorch/EE4C2C", shadowColor: "rgba(238,76,44,0.2)" },  
  "Roboflow": { url: "https://cdn.simpleicons.org/roboflow/94C11F", shadowColor: "rgba(148,193,31,0.2)" },
  "Python": { url: "https://cdn.simpleicons.org/python/3776AB", shadowColor: "rgba(55,118,171,0.2)" },
  "OpenCV": { url: "https://cdn.simpleicons.org/opencv/5C3EE8", shadowColor: "rgba(92,62,232,0.2)" },

  //Database & Cloud Services
  "Firebase": { url: "https://cdn.simpleicons.org/firebase/FFCA28", shadowColor: "rgba(255,202,40,0.2)" },
  "Supabase": { url: "https://cdn.simpleicons.org/supabase/333333", shadowColor: "rgba(51,51,51,0.2)" },
  "mySQL": { url: "https://cdn.simpleicons.org/mysql/4479A1", shadowColor: "rgba(68,121,161,0.2)" },
  "sqlite": { url: "https://cdn.simpleicons.org/sqlite/003B57", shadowColor: "rgba(0,59,87,0.2)" },

  //Version Control & Deployment
  "Github": { url: "https://cdn.simpleicons.org/github/181717", shadowColor: "rgba(24,23,23,0.2)" },
  "Render": { url: "https://cdn.simpleicons.org/render/000000", shadowColor: "rgba(0,0,0,0.2)" },
  "Vercel": { url: "https://cdn.simpleicons.org/vercel/000000", shadowColor: "rgba(0,0,0,0.2)" },
  "Railway": { url: "https://cdn.simpleicons.org/railway/000000", shadowColor: "rgba(0,0,0,0.2)" }

};

export function TechStack() {
  const skillCategories = [
    {
      title: "Development Frameworks & Web",
      skills: ["React", "TypeScript", "JavaScript", "TailwindCSS", "PHP"]
    },
    {
      title: "Hardware & Embedded Systems",
      skills: ["Arduino", "Raspberry Pi", "Espressif (ESP32/ESP8266)", "STM32", "Seeeduino"]
    },
    {
      title: "AI, Machine Learning & Engineering Tools",
      skills: ["Proteus", "Python", "Firebase", "CNC Programming", "Roboflow"]
    },
    {
      title: "UI/UX & Creative Design",
      skills: ["Figma", "SketchUp"]
    },
    {
      title: "LLM API's & Voice AI",
      skills: ["Gemini", "ChatGPT", "Claude", "ElevenLabs"]
    },
    {
      title: "Mobile Development",
      skills: ["Android Studio", "Flutter", "Kotlin"]
    },

    {
      title: "Machine Learning Tools & Frameworks",
      skills: ["TensorFlow", "PyTorch", "Roboflow", "Python", "OpenCV"]
    },

    {
      title: "Database & Cloud Services",
      skills: ["Firebase", "Supabase", "mySQL", "sqlite"]
    },

    {
      title: "Version Control & Deployment",
      skills: ["Github", "Render", "Vercel", "Railway"]
    }
    
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0b0f19]">
      <div className="mb-16">
        <h3 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Tech Stack & Skill Set
        </h3>
      </div>

      {/* Grid Layout configured to cleanly wrap asymmetrical items without stretching */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {skillCategories.map((category, idx) => (
          <div 
            key={idx} 
            className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/50 to-slate-950/70 border border-white/5 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-sm shadow-xl min-h-[160px] flex flex-col justify-between"
          >
            {/* Ambient Background Radial Highlight */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/0 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-4">
                <h4 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors duration-200 tracking-tight">
                  {category.title}
                </h4>
              </div>

              {/* Badges Layout with Exact Image Logos */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => {
                  const logoConfig = exactLogoMap[skill];
                  return (
                    <div 
                      key={sIdx} 
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/80 border border-white/[0.04] hover:bg-slate-900/90 text-sm text-slate-300 font-medium font-mono hover:text-white transition-all duration-200"
                    >
                      {/* Exact official brand logo image wrapper */}
                      {logoConfig ? (
                        <img 
                          src={logoConfig.url} 
                          alt={`${skill} logo`}
                          className="w-4 h-4 object-contain opacity-85 group-hover:opacity-100 transition-transform duration-300 hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-teal-500/50 transition-colors duration-300" />
                      )}
                      <span>{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}