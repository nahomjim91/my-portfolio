
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category:
    | "Web"
    | "UI/UX"
    | "Bot"
    | "Marketing"
    | "E-Commerce"
    | "Portfolio"
    | "Business";
  links?: { demo?: string; github?: string; video?: string };
};

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { label: "Years Experience", value: 5 },
  { label: "Projects Completed", value: 48 },
  { label: "Happy Clients", value: 22 },
];

export const projects: Project[] = [
  {
    id: "spice-marketplace",
    title: "Spice Marketplace",
    description:
      "Modern e-commerce platform for premium spices with React, TypeScript, and ShadCN UI.",
    image: "/images/projects/spice-marketplace.png",
    tech: ["React", "TypeScript", "Vite", "TailwindCSS", "ShadCN UI"],
    category: "E-Commerce",
    links: {
      demo: "https://spice-marketplace.vercel.app/",
      github: "https://github.com/nahomjim91/spice-marketplace/",
      // video: "/videos/projects/spice-marketplace-demo.mp4"
    },
  },
  {
    id: "primaeri",
    title: "Primaeri",
    description:
      "A Modern portfolio website for well known Eritrean Photographer Filipo. Show his work and services.",
    image: "/images/projects/primaeri.png",
    tech: [
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "SEO Optimization",
      "Image Optimization",
    ],
    category: "Portfolio",
    links: {
      demo: "https://primaeri.com/",
      // video: "/videos/projects/primaeri.mp4"
    },
  },

  {
    id: "luxury-perfume",
    title: "Luxury Fragrance Store",
    description:
      "Premium e-commerce experience for luxury perfumes with signature scent discovery.",
    image: "/images/projects/luxury-perfume.png",
    tech: ["React", "Next.js", "TailwindCSS", "Stripe"],
    category: "E-Commerce",
    links: {
      demo: "https://luxury-perfume-ecommerce-ten.vercel.app/",
      github: "https://github.com/nahomjim91/luxury-perfume-ecommerce",
      // video: "/videos/projects/luxury-perfume-demo.mp4"
    },
  },

  {
    id: "photographer-portfolio",
    title: "MESK Photography Studio",
    description:
      "Professional photographer portfolio showcasing wedding, engagement, and studio work.",
    image: "/images/projects/photographer-portfolio.png",
    tech: ["React", "Next.js", "TailwindCSS", "Image Optimization"],
    category: "Portfolio",
    links: {
      demo: "https://test2-khaki-theta.vercel.app/",
      // video: "/videos/projects/photography-portfolio-tour.mp4"
    },
  },
  {
    id: "sweet-jerry-bakery",
    title: "Sweet Jerry Bakery",
    description:
      "Charming bakery website with custom cake ordering and sweet memory creation.",
    image: "/images/projects/sweet-jerry-bakery.png",
    tech: ["React", "Next.js", "TailwindCSS", "Contact Forms"],
    category: "Portfolio",
    links: {
      demo: "https://sweet-jerry-bakery.vercel.app/",
      github: "https://github.com/nahomjim91/sweet-jerry-bakery",
      // video: "/videos/projects/bakery-experience.mp4"
    },
  },
  {
    id: "wedding-photographer",
    title: "Enchanting Wedding Photography",
    description:
      "Elegant wedding photography portfolio with stunning galleries and client testimonials.",
    image: "/images/projects/wedding-photographer.png",
    tech: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
    category: "Portfolio",
    links: {
      demo: "https://wedding-photographer-portfolio-3wcw.vercel.app/",
      github: "https://github.com/nahomjim91/wedding-photographer-portfolio",
      // video: "/videos/projects/wedding-portfolio-showcase.mp4"
    },
  },
  {
    id: "telegram-bot",
    title: "Telegram Dating Bot",
    description: "Engaging and interactive dating experience via Telegram.",
    image: "/images/projects/telegram-bot.png",
    tech: ["Node.js", "Telegraf"],
    category: "Bot",
    links: {
      demo: "https://t.me/fyl_datingbot",
      // video: "/videos/projects/telegram-bot-demo.mp4"
    },
  },

  {
    id: "portfolio",
    title: "Portfolio Website (Current)",
    description: "Futuristic, smooth, and responsive portfolio experience.",
    image: "/images/projects/portfolio.png",
    tech: ["Next.js", "Framer Motion"],
    category: "UI/UX",
    links: {
      demo: "#",
      // video: "/videos/projects/portfolio-animations.mp4"
    },
  },
];

export default projects;
