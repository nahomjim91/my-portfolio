// /components/sections/Projects.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const categories = [
  "All",
  "Commerce",
  "Luxury & Brand",
  "Local Business",
  "Creative Portfolio",
  "Product & SaaS",
  "Automation & Bot",
] as const;

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

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    // Generate particles only on the client side after mount
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })),
    );
  }, []);

  // Don't render anything until particles are generated on client
  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent/20"
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

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const list =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const title = "Selected Work".split("");

  return (
    <section
      // ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-16  overflow-hidden"
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Gradient orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
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

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Sticky Header with its own animations */}
          <div className="">
            <motion.div className="text-center space-y-8">
              <div
                className="overflow-visible"
                style={{ perspective: "1000px" }}
              >
                <h2 className="text-5xl md:text-6xl font-light tracking-tight text-accent text-center">
                  {title.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{}}
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
                A collection of projects that showcase my approach to digital
                design
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-wrap justify-center gap-4"
              >
                {categories.map((c) => (
                  <Button
                    key={c}
                    variant={c === filter ? "default" : "ghost"}
                    onClick={() => setFilter(c)}
                    className="text-base font-light px-6 py-3 rounded-full"
                  >
                    {c}
                  </Button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Projects Grid - removed scale/opacity from wrapper */}
          <div className="grid gap-12 md:gap-20 pt-12 px-6">
            {list.map((project, index) => (
              <ProjectCard key={project.id} {...project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  description,
  image,
  tech,
  links,
  index,
}: (typeof projects)[number] & { index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  // Individual card scroll animation
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale: starts small, grows to normal, then shrinks as it exits
  const cardScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0.85, 1, 1, 0.85],
  );

  // Opacity: fades in and out
  const cardOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  // Stagger animations for content
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) =>
      ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.3,
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        },
      }) as const,
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: cardOpacity, scale: cardScale }}
      className={`grid gap-12 lg:gap-20 items-center ${
        isEven ? "lg:grid-cols-2" : "lg:grid-cols-2"
      }`}
    >
      <div className={`space-y-8 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={contentVariants}
          className="space-y-6"
        >
          <motion.h3
            className="text-3xl md:text-4xl font-light tracking-tight"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {title}
          </motion.h3>
          <p className="text-lg font-light text-muted leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={contentVariants}
          className="flex flex-wrap gap-3"
        >
          {tech.slice(0, 4).map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Badge className="text-sm font-light px-4 py-2 rounded-full bg-muted/10 text-muted border-0">
                {t}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={contentVariants}
          className="flex gap-4 pt-4"
        >
          {links?.demo && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="group font-light rounded-full"
                asChild
              >
                <a href={links.demo} target="_blank" rel="noreferrer">
                  View Live
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </motion.div>
          )}
          {links?.github && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                className="font-light rounded-full"
                asChild
              >
                <a href={links.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={contentVariants}
        className={`${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/50 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.02, rotate: isEven ? 1 : -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Animated border glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: isHovered
                ? "0 0 30px rgba(99, 102, 241, 0.3)"
                : "0 0 0px rgba(99, 102, 241, 0)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Static Image */}
          <Image
            src={image}
            alt={title}
            fill
            loading="lazy" // default
            className={`object-cover transition-all duration-700 ${
              isHovered && links?.video
                ? "opacity-0 scale-105"
                : "opacity-100 hover:scale-105"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Video Overlay */}
          {links?.video && (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              muted
              playsInline
              preload="metadata"
            >
              <source src={links.video} type="video/mp4" />
            </video>
          )}

          {/* Play indicator with animation */}
          {links?.video && !isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-6 h-6 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
