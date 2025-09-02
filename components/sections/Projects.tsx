// /components/sections/Projects.tsx
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { projects } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Web Design",
  "UI/UX",
  "Branding",
  "E-commerce",
] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const list =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="mt-24 py-28 ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto scrollbar-hide ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-20"
          >
            <div className="text-center space-y-8">
              <h2 className="text-5xl md:text-6xl font-light tracking-tight">
                Selected Work
              </h2>
              <p className="text-xl font-light text-muted max-w-2xl mx-auto leading-relaxed">
                A collection of projects that showcase my approach to digital
                design
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pb-12">
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
            </div>

            <div className="grid gap-12 md:gap-20">
              {list.map((project, index) => (
                <ProjectCard key={project.id} {...project} index={index} />
              ))}
            </div>
          </motion.div>
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
  const isEven = index % 2 === 0;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reset to beginning
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to beginning
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`grid gap-12 lg:gap-20 items-center ${
        isEven ? "lg:grid-cols-2" : "lg:grid-cols-2"
      }`}
    >
      <div className={`space-y-8 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <div className="space-y-6">
          <h3 className="text-3xl md:text-4xl font-light tracking-tight">
            {title}
          </h3>
          <p className="text-lg font-light text-muted leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {tech.slice(0, 4).map((t) => (
            <Badge
              key={t}
              className="text-sm font-light px-4 py-2 rounded-full bg-muted/10 text-muted border-0"
            >
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          {links?.demo && (
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
          )}
          {links?.github && (
            <Button variant="ghost" className="font-light rounded-full" asChild>
              <a href={links.github} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/50 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Static Image */}
          <Image
            src={image}
            alt={title}
            fill
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

          {/* Optional: Play indicator */}
          {links?.video && !isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-6 h-6 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
