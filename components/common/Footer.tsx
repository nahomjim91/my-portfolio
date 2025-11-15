"use client";

import { Github, Linkedin, Instagram, ArrowUp, Mail } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as React from "react";

// Letter reveal animation (from Skills)
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
    },
  })as const,
};

export function Footer() {
  const footerRef = React.useRef<HTMLElement>(null);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scale = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.8]
  );

  const socialLinks = [
    { icon: Github, href: "https://github.com/nahomjim91", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/selihom-kidane-b50034276", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/selihom.k/", label: "Instagram" },
  ];

  const logoText = "SELIHOM".split("");

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/5 to-transparent" />
      
      {/* Gradient orb */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2"
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
      
      <div className="relative px-4 sm:px-6 lg:px-8">
        
        {/* Main footer content */}
        <div className="py-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              style={{ scale, opacity }}
              className="flex justify-between flex-col lg:flex-row gap-12 lg:gap-0"
            >
              {/* Logo and description */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  {/* Animated logo text */}
                  <div className="overflow-visible mb-4" style={{ perspective: "1000px" }}>
                    <h3 className="text-4xl font-light tracking-wider">
                      {logoText.map((letter, i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={letterVariants}
                          style={{
                            display: "inline-block",
                            transformOrigin: "50% 50%",
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </h3>
                  </div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg font-light text-muted leading-relaxed max-w-md"
                  >
                    Crafting digital experiences that inspire, engage, and deliver results.
                  </motion.p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex items-center gap-6"
                >
                  {socialLinks.map(({ icon: Icon, href, label }, index) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-accent/50 hover:text-accent transition-all duration-300"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: 0.7 + (index * 0.1),
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Contact info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-8"
              >
                <h4 className="text-xl font-light tracking-wide text-foreground">
                  Let&apos;s Connect
                </h4>
                <div className="space-y-4">
                  <motion.a 
                    href="mailto:selihom2001@gmail.com"
                    className="flex items-center gap-3 text-lg font-light text-muted hover:text-accent transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    selihom2001@gmail.com
                  </motion.a>
                  <p className="text-lg font-light text-muted">
                    Addis Ababa, Ethiopia
                  </p>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={scrollToTop}
                    variant="outline"
                    className="group font-light rounded-full px-6 py-3"
                  >
                    Back to Top
                    <ArrowUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="border-t border-border/20"
        >
          <div className="py-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm font-light text-muted tracking-wide">
                © {new Date().getFullYear()} Selihom Kidane. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}