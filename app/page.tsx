'use client';
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";

const Projects = dynamic(() => import("@/components/sections/Projects").then(m => m.Projects), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact").then(m => m.Contact), { ssr: false });

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}