import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

const roles = [
  "Web Designer",
  "Mobile App Developer",
  "Web Developer",
  "UI/UX Enthusiast",
  "Freelancer",
];

function useTyped(words: string[], speed = 70, pause = 1200) {
  const [index, setIndex] = React.useState(0);
  const [sub, setSub] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = words[index % words.length];
    if (!deleting) {
      if (sub.length < current.length) {
        const t = setTimeout(
          () => setSub(current.slice(0, sub.length + 1)),
          speed
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    } else {
      if (sub.length > 0) {
        const t = setTimeout(
          () => setSub(current.slice(0, sub.length - 1)),
          speed / 2
        );
        return () => clearTimeout(t);
      }
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
  }, [sub, deleting, index, words, speed, pause]);

  return sub;
}

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = React.useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  React.useEffect(() => {
    // Generate particles only on the client side after mount
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }))
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
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    } as const,
  }),
} as const;

// Slide in from edge
const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

// Scale in
const scaleIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

export function Hero() {
  const typed = useTyped(roles);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Mouse position tracking for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Scroll-based animations for scale effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring physics for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale: starts at 1, shrinks to 0.7 as you scroll down
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.7]);

  // Opacity: fades out as you scroll
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Y position: moves up slightly as you scroll
  const scrollY = useTransform(smoothProgress, [0, 1], [0, -100]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center, normalized
      const distX = (e.clientX - centerX) / rect.width;
      const distY = (e.clientY - centerY) / rect.height;

      mouseX.set(distX * 30);
      mouseY.set(distY * 30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const firstName = "Selihom".split("");
  const lastName = "Kidane".split("");

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden "
    >
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
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
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className=" relative z-10">
        <motion.div
          ref={contentRef}
          style={{
            x,
            y: useTransform(
              [y, scrollY],
              ([mouseY, scrollY]) => (mouseY as number) + (scrollY as number)
            ),
            scale,
            opacity,
          }}
          className="max-w-5xl mx-auto text-center space-y-10 md:space-y-6 px-4"
        >
          {/* Subtitle */}
          <motion.div variants={slideIn} initial="hidden" animate="visible">
            <p className="text-sm md:text-lg uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground/80 font-light">
              Web Designer & Developer
            </p>
          </motion.div>

          {/* Main heading with letter animation */}
          <div className="space-y-2">
            <div className="flex justify-center gap-1 md:gap-2">
              {firstName.map((letter, i) => (
                <motion.span
                  key={`first-${i}`}
                  custom={i}
                  variants={letterVariants}
                  viewport={{ once: false }}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="flex justify-center gap-1 md:gap-2">
              {lastName.map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  custom={i + firstName.length}
                  variants={letterVariants}
                  viewport={{}}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight inline-block text-accent bg-gradient-to-r from-accent to-accent/60 bg-clip-text"
                  style={{ transformOrigin: "bottom" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Typed text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-3 md:space-y-2"
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <span className="inline-block min-h-[1.2em]">{typed}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="ml-1 inline-block h-6 md:h-8 w-[2px] bg-accent align-middle"
              />
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-base md:text-xl font-light text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed"
            >
              Creating digital experiences that merge form with function
            </motion.p>
          </motion.div>

          {/* Buttons with staggered animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 1.4,
                },
              },
            }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 py-2 md:py-8"
          >
            <motion.div variants={scaleIn}>
              <Button
                size="lg"
                className="group text-lg px-8 py-3 rounded-full font-light hover:scale-105 transition-transform"
                asChild
              >
                <a href="#projects">
                  View Work
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
            <motion.div variants={scaleIn}>
              <Button
                variant="outline"
                size="lg"
                className="group text-lg px-8 py-3 rounded-full font-light hover:scale-105 transition-transform"
                asChild
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
