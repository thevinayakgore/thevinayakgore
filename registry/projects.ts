// registry/projects.ts
import * as LucideIcons from "lucide-react";

export interface ProjectFeature {
  title: string;
  desc: string;
}

export interface TechStack {
  icon: string; // public folder path to icon
}

export type LucideIconName = keyof typeof LucideIcons;

export interface ProjectData {
  name: string;
  category: string;
  categoryIcon?: LucideIconName;
  techs: TechStack[];
  createdAt: string;
  image?: string;
  desc: string;
  isPublished: boolean;
  demoUrl: string;
  githubUrl?: string;
  videoId?: string;
  videoFile?: string;
  gallery?: string[];
  features?: ProjectFeature[];
}

export const PROJECTS: ProjectData[] = [
  {
    name: "Venumity",
    category: "Web Platform",
    categoryIcon: "Globe",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
      { icon: "motion.webp" },
      { icon: "sanity.webp" },
    ],
    createdAt: "01-Jan-2026",
    image: "venumity.webp",
    desc: "A modern web platform for developers featuring UI components, templates, tutorials, and learning resources. Built to help developers discover, learn, and build beautiful digital experiences faster.",
    isPublished: true,
    demoUrl: "https://www.venumity.com",
    features: [
      {
        title: "Component Library",
        desc: "Browse reusable, production-ready UI components and templates",
      },
      {
        title: "Learning Resources",
        desc: "Tutorials, guides, and articles for modern frontend development",
      },
      {
        title: "Modern Developer Experience",
        desc: "Clean navigation, fast performance, and a minimal design system",
      },
      {
        title: "Responsive Design",
        desc: "Optimized for desktop, tablet, and mobile experiences",
      },
    ],
  },
  {
    name: "Venumity UI",
    category: "UI Design Systems",
    categoryIcon: "Palette",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
      { icon: "motion.webp" },
    ],
    createdAt: "26-Jan-2026",
    image: "ui.venumity.webp",
    desc: "Open-source UI library providing ready-to-use components, templates, and developer resources built with Next.js, Tailwind CSS, shadcn/ui, and Motion.",
    isPublished: true,
    demoUrl: "https://ui.venumity.com",
    githubUrl: "https://github.com/thevinayakgore/ui.venumity",
    features: [
      {
        title: "100+ Reusable Components",
        desc: "Self-contained, copy-paste-ready components for modern web apps",
      },
      {
        title: "Type-Safe Development",
        desc: "Built with TypeScript for reliable, scalable development",
      },
      {
        title: "Smooth Animations",
        desc: "Motion-powered interactions, transitions, and micro-animations",
      },
      {
        title: "Fully Customizable",
        desc: "Tailwind-based components with no vendor lock-in",
      },
      {
        title: "MIT Licensed",
        desc: "Free to use, modify, and distribute in personal or commercial projects",
      },
    ],
  },
  {
    name: "The Vinayak Gore",
    category: "Portfolio",
    categoryIcon: "User",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
      { icon: "motion.webp" },
      { icon: "resend.webp" },
    ],
    createdAt: "13-Jun-2026",
    image: "tvg.venumity.webp",
    desc: "A modern, minimal portfolio website built with Next.js, TypeScript & Tailwind CSS. A working contact and showcase of work and skills.",
    isPublished: true,
    demoUrl: "https://tvg.venumity.com",
    githubUrl: "https://github.com/thevinayakgore/thevinayakgore",
    features: [
      {
        title: "Modern Tech Stack",
        desc: "Built with Next.js, TypeScript, and Tailwind CSS",
      },
      {
        title: "Smooth Animations",
        desc: "Motion-powered animations for an engaging user experience",
      },
      {
        title: "Contact Form",
        desc: "Working contact form with Resend email integration",
      },
      {
        title: "Responsive Design",
        desc: "Fully responsive across all devices and screen sizes",
      },
      {
        title: "SEO Optimized",
        desc: "Complete SEO with metadata, Open Graph, and structured data",
      },
    ],
  },
  {
    name: "RecallCard Game",
    category: "Gaming & Fun",
    categoryIcon: "GraduationCap",
    techs: [
      { icon: "vite.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
      { icon: "motion.webp" },
    ],
    createdAt: "15-Jul-2025",
    image: "recallcard.webp",
    desc: "A modern memory game built with React, TypeScript, Tailwind CSS, and shadcn/ui. Flip cards, match pairs, and challenge your memory.",
    isPublished: true,
    demoUrl: "https://recallcard.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/recallcard",
    features: [
      {
        title: "32 Cards",
        desc: "4 rows by 8 columns with 16 unique React icons",
      },
      {
        title: "Flip Animation",
        desc: "Smooth horizontal 180-degree card flip using Tailwind CSS",
      },
      {
        title: "Timer & High Score",
        desc: "Track completion time and save your best score locally",
      },
      {
        title: "Celebration Animation",
        desc: "Enjoy a rewarding animation after completing the game",
      },
    ],
  },
];