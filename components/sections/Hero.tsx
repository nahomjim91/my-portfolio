// /components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import * as React from "react";

const roles = ["Web Designer", "Mobile App Developer", "Web Developer", "UI/UX Enthusiast", "Freelancer"];

function useTyped(words: string[], speed = 70, pause = 1200) {
  const [index, setIndex] = React.useState(0);
  const [sub, setSub] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = words[index % words.length];
    if (!deleting) {
      if (sub.length < current.length) {
        const t = setTimeout(() => setSub(current.slice(0, sub.length + 1)), speed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    } else {
      if (sub.length > 0) {
        const t = setTimeout(() => setSub(current.slice(0, sub.length - 1)), speed / 2);
        return () => clearTimeout(t);
      }
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
  }, [sub, deleting, index, words, speed, pause]);

  return sub;
}

export function Hero() {
  const typed = useTyped(roles);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 scrollbar-hide">
      <div className="container scrollbar-hide">
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="show" 
          className="max-w-5xl mx-auto text-center space-y-12 scrollbar-hide"
        >
          <motion.p 
            variants={fadeInUp} 
            className="text-lg uppercase tracking-[0.2em] text-muted font-light"
          >
            Web Designer & Developer
          </motion.p>
          
          <motion.h1 
            variants={fadeInUp} 
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.9]"
          >
            Selihom<br />
            <span className="font-extralight text-accent">Kidane</span>
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-2xl md:text-3xl font-light text-muted max-w-3xl mx-auto leading-relaxed">
              <span className="">{typed}</span>
              <span className="ml-1 inline-block h-8 w-[2px] animate-pulse bg-accent align-middle" />
            </p>
            <p className="text-xl font-light text-muted max-w-2xl mx-auto leading-relaxed">
              Creating digital experiences that merge form with function
            </p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 pt-8">
            <Button 
              size="lg" 
              className="group text-lg px-8 py-6 rounded-full font-light" 
              asChild
            >
              <a href="#projects">
                View Work
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group text-lg px-8 py-6 rounded-full font-light" 
              asChild
            >
              <a href="#contact">
                Get in Touch
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
