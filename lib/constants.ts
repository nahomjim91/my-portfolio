export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category:
    | "Commerce"
    | "Luxury & Brand"
    | "Local Business"
    | "Creative Portfolio"
    | "Product & SaaS"
    | "Automation & Bot";
  featured?: boolean;
  priority?: number; // lower number = higher position
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
  // =========================
  // TIER 1 — FEATURED
  // =========================

  {
    id: "cornerstone-barbershop",
    title: "Cornerstone Barbershop",
    description:
      "Premium grooming brand platform engineered for appointment conversion, refined visual hierarchy, and strong local authority positioning.",
    image: "/images/projects/cornerstone-barber.png",
    tech: ["Next.js", "TailwindCSS", "Responsive Design", "SEO"],
    category: "Local Business",
    featured: true,
    priority: 1,
    links: {
      demo: "http://cornerstonebarber.com/",
    },
  },

  {
    id: "bethelhem-touch-cakes",
    title: "Bethelhem Touch Cakes",
    description:
      "Elegant cake brand experience centered on craftsmanship storytelling, emotional visual direction, and structured custom order flow.",
    image: "/images/projects/bethelhem-touch.png",
    tech: ["Next.js", "TailwindCSS", "Brand Layout System"],
    category: "Luxury & Brand",
    featured: true,
    priority: 2,
    links: {
      demo: "https://bethelhemtouch.ca/",
    },
  },

  {
    id: "mebrat-spa",
    title: "Mebrat Spa",
    description:
      "Luxury spa digital presence designed with refined aesthetic control, premium service clarity, and structured client inquiry experience.",
    image: "/images/projects/mebrat-spa.png",
    tech: ["Next.js", "TailwindCSS", "Performance Optimization"],
    category: "Luxury & Brand",
    featured: true,
    priority: 3,
    links: {
      demo: "https://mebratspa.ca/",
    },
  },

  {
    id: "zoskales-jewelry",
    title: "Zoskales Jewelry – Diamonds & Ruby",
    description:
      "High-end jewelry showcase platform reflecting exclusivity through structured product hierarchy and luxury-focused UI composition.",
    image: "/images/projects/zoskales-jewelry.png",
    tech: ["Next.js", "TailwindCSS", "Luxury Branding"],
    category: "Commerce",
    featured: true,
    priority: 4,
    links: {
      demo: "https://zoskales-jewelry.vercel.app/",
    },
  },

  // =========================
  // TIER 2 — SECONDARY
  // =========================

  {
    id: "ruth-human-hair",
    title: "Ruth Human Hair",
    description:
      "Beauty commerce platform built to emphasize product quality, trust-building visuals, and structured collection navigation.",
    image: "/images/projects/ruth-human-hair.png",
    tech: ["Next.js", "TailwindCSS", "Product Showcase"],
    category: "Commerce",
    priority: 5,
    links: {
      demo: "https://ruth-hair.vercel.app/",
    },
  },

  {
    id: "dagim-habesha-jeweler",
    title: "Dagim Habesha Jeweler",
    description:
      "Cultural jewelry commerce experience blending traditional Habesha craftsmanship with modern presentation systems.",
    image: "/images/projects/dagim-jeweler.png",
    tech: ["Next.js", "TailwindCSS", "Product Galleries"],
    category: "Commerce",
    priority: 6,
    links: {
      demo: "https://dagimjewel.vercel.app/",
    },
  },

  {
    id: "kal-cloth-brand",
    title: "KAL Cloth Brand",
    description:
      "Fashion brand platform focused on visual storytelling, collection emphasis, and structured modern apparel presentation.",
    image: "/images/projects/kal-cloth.png",
    tech: ["Next.js", "TailwindCSS"],
    category: "Luxury & Brand",
    priority: 7,
    links: {
      demo: "https://kale1.vercel.app/",
    },
  },

  // =========================
  // TIER 3 — SUPPORTING
  // =========================

  {
    id: "mikkey-barber-shop",
    title: "Mikkey Barber Shop",
    description:
      "Conversion-driven barber shop website designed for service clarity, mobile-first access, and brand credibility reinforcement.",
    image: "/images/projects/mikkey-barber.png",
    tech: ["Next.js", "TailwindCSS"],
    category: "Local Business",
    priority: 8,
    links: {
      demo: "https://mikkeybarber.vercel.app/",
    },
  },

  {
    id: "primaeri",
    title: "Primaeri",
    description:
      "Professional photography portfolio engineered for high-resolution media display and structured service visibility.",
    image: "/images/projects/primaeri.png",
    tech: ["Next.js", "Framer Motion", "SEO"],
    category: "Creative Portfolio",
    priority: 9,
    links: {
      demo: "https://primaeri.com/",
    },
  },
  {
    id: "spice-marketplace",
    title: "Spice Marketplace",
    description:
      "Scalable multi-product commerce architecture built with structured component systems and performance-focused UI execution.",
    image: "/images/projects/spice-marketplace.png",
    tech: ["React", "TypeScript", "Vite", "TailwindCSS"],
    category: "Commerce",
    priority: 10,
    links: {
      demo: "https://spice-marketplace.vercel.app/",
      github: "https://github.com/nahomjim91/spice-marketplace/",
    },
  },

  {
    id: "luxury-perfume",
    title: "Luxury Fragrance Store",
    description:
      "Premium fragrance commerce experience focused on product storytelling and checkout integration.",
    image: "/images/projects/luxury-perfume.png",
    tech: ["Next.js", "TailwindCSS", "Stripe"],
    category: "Commerce",
    priority: 11,
    links: {
      demo: "https://luxury-perfume-ecommerce-ten.vercel.app/",
      github: "https://github.com/nahomjim91/luxury-perfume-ecommerce",
    },
  },

  {
    id: "telegram-bot",
    title: "Telegram Dating Bot",
    description:
      "Interactive matchmaking automation platform handling user flows, filtering logic, and engagement automation via Telegram API.",
    image: "/images/projects/telegram-bot.png",
    tech: ["Node.js", "Telegraf", "Firebase"],
    category: "Automation & Bot",
    priority: 12,
    links: {
      demo: "https://t.me/fyl_datingbot",
    },
  },

  {
    id: "wedding-photographer",
    title: "Enchanting Wedding Photography",
    description:
      "Gallery-driven photography platform structured for emotional storytelling and visual immersion.",
    image: "/images/projects/wedding-photographer.png",
    tech: ["Next.js", "Framer Motion"],
    category: "Creative Portfolio",
    priority: 13,
    links: {
      demo: "https://wedding-photographer-portfolio-3wcw.vercel.app/",
    },
  },

  {
    id: "sweet-jerry-bakery",
    title: "Sweet Jerry Bakery",
    description:
      "Brand-focused bakery website structured for product showcase and inquiry flow.",
    image: "/images/projects/sweet-jerry-bakery.png",
    tech: ["Next.js", "TailwindCSS"],
    category: "Creative Portfolio",
    priority: 14,
    links: {
      demo: "https://sweet-jerry-bakery.vercel.app/",
    },
  },

  {
    id: "portfolio",
    title: "Portfolio Website (Current)",
    description:
      "High-performance personal platform showcasing structured project categorization and interaction-driven UI.",
    image: "/images/projects/portfolio.png",
    tech: ["Next.js", "Framer Motion"],
    category: "Product & SaaS",
    priority: 15,
    links: {
      demo: "#",
    },
  },
];

export default projects;
