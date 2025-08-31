
// /components/common/Footer.tsx
"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, ArrowUp, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/nahomjim91", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/selihom-kidane-b50034276", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/selihom.k/", label: "Instagram" },
  ];
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/5 to-transparent" />
      
      <div className="relative px-4 sm:px-6 lg:px-8">
        
        {/* Main footer content */}
        <div className=" py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-between flex-col lg:flex-row gap-12 lg:gap-0"
            >
              {/* Logo and description */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h3 className="text-4xl font-light tracking-wider mb-4">
                    SELIHOM
                  </h3>
                  <p className="text-lg font-light text-muted leading-relaxed max-w-md">
                    Crafting digital experiences that inspire, engage, and deliver results.
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      aria-label={label}
                      className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-accent/50 hover:text-accent transition-all duration-300 hover:scale-110"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

             

              {/* Contact info */}
              <div className="space-y-8">
                <h4 className="text-xl font-light tracking-wide text-foreground">
                  Let's Connect
                </h4>
                <div className="space-y-4">
                  <a 
                    href="mailto:hello@selihom.com"
                    className="flex items-center gap-3 text-lg font-light text-muted hover:text-accent transition-colors duration-300 group"
                  >
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    selihom2001@gmail.com
                  </a>
                  <p className="text-lg font-light text-muted">
                    Addis Ababa, Ethiopia
                  </p>
                </div>
                
                <Button
                  onClick={scrollToTop}
                  variant="outline"
                  className="group font-light rounded-full px-6 py-3"
                >
                  Back to Top
                  <ArrowUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/20">
          <div className=" py-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm font-light text-muted tracking-wide">
                © {new Date().getFullYear()} Selihom Kidane. All rights reserved.
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
