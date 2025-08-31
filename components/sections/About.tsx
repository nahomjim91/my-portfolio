// /components/sections/About.tsx
"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import * as React from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-32">
      <div className="">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="grid gap-24 lg:grid-cols-2 items-center"
          >
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl font-light tracking-tight">
                  About Me
                </h2>
                <div className="space-y-6 text-xl font-light leading-relaxed text-muted max-w-xl">
                  <p>
                    I&apos;m a passionate web designer who believes great design is invisible—it just works beautifully.
                  </p>
                  <p>
                    My approach combines strategic thinking with meticulous attention to detail, creating digital experiences that not only look stunning but perform flawlessly.
                  </p>
                  <p>
                    When I&apos;m not designing, you&apos;ll find me exploring new technologies, studying user behavior, or perfecting the art of minimalist interfaces.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-light text-accent">50+</div>
                  <div className="text-sm uppercase tracking-wider text-muted">Projects</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-light text-accent">5+</div>
                  <div className="text-sm uppercase tracking-wider text-muted">Years</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-light text-accent">100%</div>
                  <div className="text-sm uppercase tracking-wider text-muted">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] relative overflow-hidden rounded-2xl">
                <Image 
                  src="/images/about.png" 
                  alt="About Selihom Kidane" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
