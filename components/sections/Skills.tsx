// /components/sections/Skills.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";

// Professional skill logos with real CDN URLs
const skillLogos = [
  { 
    name: "React", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61DAFB" 
  },
  { 
    name: "Next.js", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "#000000" 
  },
  { 
    name: "TypeScript", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "#3178C6" 
  },
  { 
    name: "JavaScript", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "#F7DF1E" 
  },
  { 
    name: "Node.js", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "#339933" 
  },
  { 
    name: "Tailwind CSS", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4" 
  },
  { 
    name: "Figma", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    color: "#F24E1E" 
  },
  { 
    name: "Git", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "#F05032" 
  },
  { 
    name: "MongoDB", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    color: "#47A248" 
  },
  { 
    name: "PostgreSQL", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "#4169E1" 
  },

];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-32">
      <div className="max-w-7xl mx-auto px-6">

         <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
           className="text-center space-y-16"
          >
        

          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">
              Skills & Tools
            </h2>
            <p className="text-xl font-light text-muted max-w-2xl mx-auto leading-relaxed">
              Technologies and platforms I work with to bring ideas to life
            </p>
          </div>

          {/* Scrolling Skills Container */}
          <div className="relative overflow-hidden py-8">

            {/* Scrolling container */}
            <div className="skills-scroll flex items-center">
              {/* First set of logos */}
              {skillLogos.map((skill, index) => (
                <SkillLogo key={`set1-${index}`} {...skill} />
              ))}
              {/* Duplicate set for seamless loop */}
              {skillLogos.map((skill, index) => (
                <SkillLogo key={`set2-${index}`} {...skill} />
              ))}
            </div>
          </div>
      
        </motion.div>
      </div>

      <style jsx>{`
        .skills-scroll {
          animation: scroll-left 50s linear infinite;
          width: fit-content;
        }

        .skills-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

function SkillLogo({ name, logo, color }: { name: string; logo: string; color: string }) {
  return (
    <div className="flex-shrink-0 mx-8 group cursor-pointer">
      <div className="w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1">
        <img 
          src={logo} 
          alt={name}
          className="w-12 h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
          style={{
            filter: 'grayscale(100%) brightness(0.7)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'grayscale(0%) brightness(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'grayscale(100%) brightness(0.7)';
          }}
        />
      </div>
      <div className="text-xs text-center mt-2 text-muted/60 font-light tracking-wide group-hover:text-muted transition-colors duration-300">
        {name}
      </div>
    </div>
  );
}
