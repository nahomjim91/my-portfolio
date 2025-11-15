import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// Professional skill logos with real CDN URLs
const skillLogos = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "#000000",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    color: "#F24E1E",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "#F05032",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "#4169E1",
  },
];

// Letter reveal animation
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    } as const,
  }),
};

// Floating particles
function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gray-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const sectionRef = React.useRef<HTMLElement>(null);

  // Scroll-based animations - same as Hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale: grows from 0.8 to 1 as it enters, then shrinks to 0.7 as it exits
  const scale = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.7]
  );

  // Opacity: fades in and out
  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3]
  );

  const title = "Skills & Tools".split("");

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative scroll-mt-12 my-16 overflow-hidden"
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Gradient orb */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          style={{ scale, opacity }}
          className="text-center space-y-16"
        >
          <div className="space-y-6">
            {/* Animated title */}
            <div className="overflow-visible" style={{ perspective: "1000px" }}>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight text-accent text-center">
                {title.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{  }}
                    variants={letterVariants}
                    style={{
                      display: "inline-block",
                      transformOrigin: "50% 50%",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl font-light max-w-2xl mx-auto leading-relaxed"
            >
              Technologies and platforms I work with to bring ideas to life
            </motion.p>
          </div>

          {/* Scrolling Skills Container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative overflow-hidden py-8"
          >
            {/* Gradient overlays for fade effect */}
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-scroll_fadding)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-scroll_fadding)] to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div className="skills-scroll flex items-center">
              {/* First set of logos */}
              {skillLogos.map((skill, index) => (
                <SkillLogo key={`set1-${index}`} {...skill} />
              ))}
              {/* Duplicate sets for seamless loop */}
              {skillLogos.map((skill, index) => (
                <SkillLogo key={`set2-${index}`} {...skill} />
              ))}
              {skillLogos.map((skill, index) => (
                <SkillLogo key={`set3-${index}`} {...skill} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillLogo({
  name,
  logo,
}: {
  name: string;
  logo: string;
  color: string;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="flex-shrink-0 mx-8 group cursor-pointer"
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        <Image
          src={logo}
          alt={name}
          width={12}
          height={12}
          className="w-12 h-12 object-contain transition-all duration-300"
          style={{
            filter: isHovered
              ? "grayscale(0%) brightness(1)"
              : "grayscale(100%) brightness(0.7)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
      <motion.div
        className="text-xs text-center mt-2 text-gray-500 font-light tracking-wide"
        animate={{
          color: isHovered ? "#000000" : "#6b7280",
        }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.div>
    </motion.div>
  );
}
