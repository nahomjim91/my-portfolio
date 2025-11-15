import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import * as React from "react";

// Letter reveal animation (from Hero)
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
    }as const,
  }),
};

// Slide in animations
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
}as const;

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}as const;

// Scale in animation
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
}as const;

// Floating particles component (adapted from Hero)
function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
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

export function About() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Scroll-based animations - similar to Hero
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

  const title = "About Me".split("");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-24  overflow-hidden "
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
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
        <div className="max-w-7xl mx-auto overflow-hidden">
          <motion.div
            ref={contentRef}
            style={{ opacity, scale }}
            className="grid gap-24 lg:grid-cols-2 items-center"
          >
            {/* Left column - Text content */}
            <motion.div
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-8">
                {/* Animated title */}
                <div className="flex gap-2">
                  {title.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ }}
                      className="text-5xl md:text-6xl font-light tracking-tight text-accent inline-block"
                      style={{ transformOrigin: "bottom" }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </div>

                {/* Paragraphs with staggered animation */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                  className="space-y-6 text-xl font-light leading-relaxed  max-w-xl"
                >
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8 },
                      },
                    }}
                  >
                    I&apos;m a passionate web designer who believes great design
                    is invisible—it just works beautifully.
                  </motion.p>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8 },
                      },
                    }}
                  >
                    My approach combines strategic thinking with meticulous
                    attention to detail, creating digital experiences that not
                    only look stunning but perform flawlessly.
                  </motion.p>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8 },
                      },
                    }}
                  >
                    When I&apos;m not designing, you&apos;ll find me exploring
                    new technologies, studying user behavior, or perfecting the
                    art of minimalist interfaces.
                  </motion.p>
                </motion.div>
              </div>

              {/* Stats with scale animation */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.8,
                    },
                  },
                }}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                <motion.div
                  variants={scaleIn}
                  className="text-center space-y-2"
                >
                  <motion.div
                    className="text-4xl font-light "
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    23<span className="text-accent font-extralight">+</span>
                  </motion.div>
                  <div className="text-sm uppercase tracking-wider text-gray-500">
                    Projects
                  </div>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  className="text-center space-y-2"
                >
                  <motion.div
                    className="text-4xl font-light"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    3<span className="text-accent font-extralight">+</span>
                  </motion.div>
                  <div className="text-sm uppercase tracking-wider text-gray-500">
                    Years
                  </div>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  className="text-center space-y-2"
                >
                  <motion.div
                    className="text-4xl font-light "
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    100<span className="text-accent font-extralight">%</span>
                  </motion.div>
                  <div className="text-sm uppercase tracking-wider text-gray-500">
                    Satisfaction
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right column - Image with parallax */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                style={{ y: useTransform(smoothProgress, [0, 1], [50, -50]) }}
                className="aspect-[3/4] relative overflow-hidden rounded-2xl "
              >
                {/* Placeholder for image */}
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="flex items-center justify-center h-full">
                    <Image
                      src="/images/profile.png"
                      alt="About Selihom Kidane"
                      fill
                      className="object-cover md:grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </motion.div>

                {/* Overlay effect on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"
                />
              </motion.div>

              {/* Decorative floating element */}
              <motion.div
                className="absolute -z-10 -right-8 -bottom-8 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
