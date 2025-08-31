import { LucideIcon, Blocks, Bot, ShoppingCart, LayoutDashboard, Globe, CreditCard } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: "Web" | "UI/UX" | "Bot" | "Marketing";
  links?: { demo?: string; github?: string };
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

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 86 },
      { name: "Express", level: 80 },
      { name: "Firebase", level: 78 },
      { name: "PostgreSQL", level: 74 },
    ],
  },
  {
    category: "Design",
    items: [
      { name: "UI/UX Design", level: 92 },
      { name: "Figma", level: 88 },
      { name: "Prototyping", level: 84 },
    ],
  },
  {
    category: "Specialized",
    items: [
      { name: "Telegram Bot Dev", level: 82 },
      { name: "E-commerce", level: 80 },
      { name: "SaaS Dashboards", level: 85 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git & GitHub", level: 88 },
      { name: "Jest", level: 70 },
      { name: "Vercel", level: 86 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce with product management, cart, and checkout.",
    image: "/images/projects/ecommerce.png",
    tech: ["Next.js", "Tailwind", "Stripe"],
    category: "Web",
    links: { demo: "#", github: "#" },
  },
  {
    id: "banking-ui",
    title: "Mobile Banking App (UI/UX)",
    description: "Clean, secure, and intuitive mobile banking interface.",
    image: "/images/projects/banking-ui.png",
    tech: ["Figma", "Prototyping"],
    category: "UI/UX",
    links: { demo: "#" },
  },
  {
    id: "telegram-bot",
    title: "Telegram Shopping Bot",
    description: "Conversational commerce experience via Telegram.",
    image: "/images/projects/telegram-bot.png",
    tech: ["Node.js", "Telegraf"],
    category: "Bot",
    links: { demo: "#", github: "#" },
  },
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    description: "Analytics, billing, and user management dashboard.",
    image: "/images/projects/saas-dashboard.png",
    tech: ["React", "Chart.js"],
    category: "Web",
    links: { demo: "#", github: "#" },
  },
  {
    id: "portfolio",
    title: "Portfolio Website (Current)",
    description: "Futuristic, smooth, and responsive portfolio experience.",
    image: "/images/projects/portfolio.png",
    tech: ["Next.js", "Framer Motion"],
    category: "Web",
    links: { demo: "#" },
  },
  {
    id: "landing",
    title: "Product Landing Page",
    description: "High-converting marketing landing page.",
    image: "/images/projects/landing.png",
    tech: ["Next.js", "A/B Testing"],
    category: "Marketing",
    links: { demo: "#" },
  },
];
