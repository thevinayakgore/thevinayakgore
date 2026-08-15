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
    name: "The Vinayak Gore - Portfolio",
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
    image: "portfolio.webp",
    desc: "A modern, minimal portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and Shadcn UI. Features smooth animations, contact form with Resend, and a clean design to showcase my work and skills.",
    isPublished: true,
    demoUrl: "https://tvg.venumity.com",
    githubUrl: "https://github.com/thevinayakgore/thevinayakgore",
    features: [
      {
        title: "Modern Tech Stack",
        desc: "Built with Next.js 16, TypeScript, and Tailwind CSS",
      },
      {
        title: "Smooth Animations",
        desc: "Framer Motion powered animations for engaging UX",
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
        title: "Shadcn UI Components",
        desc: "Beautiful, accessible UI components from Shadcn",
      },
      {
        title: "SEO Optimized",
        desc: "Complete SEO with metadata, Open Graph, and JSON-LD",
      },
    ],
  },
  {
    name: "Venumity UI - Component Library",
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
    desc: "Open-Source UI library providing ready-to-use components, templates and developer resources built with Next.js, Tailwind CSS, ShadCN UI, and Framer Motion.",
    isPublished: true,
    demoUrl: "https://ui.venumity.com",
    githubUrl: "https://github.com/thevinayakgore/ui.venumity",
    features: [
      {
        title: "Auto-dependency installation",
        desc: "Detects and installs npm & shadcn/ui dependencies",
      },
      {
        title: "Folder-based components",
        desc: "Supports multi-file components like personal-panel-1",
      },
      {
        title: "Next.js + TypeScript",
        desc: "Optimized for modern React development",
      },
      {
        title: "Zero configuration",
        desc: "Just run and go",
      },
    ],
  },
  {
    name: "AI Code Reviewer",
    category: "Gemini AI API",
    categoryIcon: "Bot",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
    ],
    createdAt: "16-Mar-2025",
    image: "aicodereview.webp",
    desc: "AI-integrated web project that reviews your code for better and faster development. Powered by Google Gemini AI, this tool analyzes your code in real-time and gives helpful suggestions.",
    isPublished: true,
    demoUrl: "https://my-ai-codereviewer.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/AI-Code-Reviewer",
    features: [
      {
        title: "Real-time AI code analysis",
        desc: "Powered by Google Gemini AI",
      },
      {
        title: "Markdown editor",
        desc: "Built-in editor with syntax highlighting",
      },
      {
        title: "Responsive UI",
        desc: "Built with Tailwind CSS + Shadcn UI",
      },
      {
        title: "Token-based prompt handling",
        desc: "For reviewing specific parts of code",
      },
    ],
  },
  {
    name: "Weather Dashboard",
    category: "API Integration",
    categoryIcon: "Cloud",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "motion.webp" },
    ],
    createdAt: "25-Aug-2025",
    image: "weather-dashboard.webp",
    desc: "A modern, responsive weather dashboard built with Next.js, TypeScript, and Tailwind CSS that provides real-time weather information and forecasts for any location.",
    isPublished: true,
    demoUrl: "https://weather-dashboard-tvg.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/weather-dashboard",
    features: [
      {
        title: "Real-time Weather Data",
        desc: "Get current weather conditions for any city worldwide",
      },
      {
        title: "5-Day Forecast",
        desc: "View detailed weather forecasts for the upcoming days",
      },
      {
        title: "Search Functionality",
        desc: "Quickly find weather information for any location",
      },
      {
        title: "Dark/Light Mode",
        desc: "Toggle between themes for comfortable viewing",
      },
    ],
  },
  {
    name: "RecallCard - Memory Game",
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
    desc: "A modern memory game built with React, TypeScript, Tailwind CSS, and shadcn/ui. Flip cards, match pairs, and challenge your memory!",
    isPublished: true,
    demoUrl: "https://recallcard.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/recallcard",
    features: [
      {
        title: "32 cards",
        desc: "4 rows x 8 columns with 16 unique React icons",
      },
      {
        title: "Flip animation",
        desc: "Horizontal 180° using Tailwind CSS",
      },
      {
        title: "Timer & High Score",
        desc: "High score saved in localStorage",
      },
      {
        title: "Celebration animation",
        desc: "On winning the game",
      },
    ],
  },
  {
    name: "DailyTik - Daily Task Manager",
    category: "Productivity",
    categoryIcon: "CheckSquare",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
      { icon: "clerk.webp" },
    ],
    createdAt: "19-Jun-2025",
    image: "dailytik.webp",
    desc: "DailyTik helps you organize your day with todos, notes, and more. Boost your productivity with a simple, beautiful, and powerful daily tracker.",
    isPublished: true,
    demoUrl: "https://dailytik.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/dailytik",
    features: [
      {
        title: "Daily Tasks",
        desc: "Create and manage daily tasks easily",
      },
      {
        title: "Focus Mode",
        desc: "Distraction-free focus mode for deep work",
      },
      {
        title: "Streak Tracking",
        desc: "Track your productivity streaks",
      },
      {
        title: "Progress Analytics",
        desc: "Visual insights into your productivity patterns",
      },
    ],
  },
  {
    name: "FingSprint - Typing Speed Test",
    category: "Gaming & Fun",
    categoryIcon: "Keyboard",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
    ],
    createdAt: "26-Jun-2025",
    image: "fingsprint.webp",
    desc: "Test and improve your typing speed with real-time metrics. Track your WPM, accuracy, and progress over time.",
    isPublished: true,
    demoUrl: "https://fingsprint.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/fingsprint",
    features: [
      {
        title: "WPM Tracking",
        desc: "Track your words per minute in real-time",
      },
      {
        title: "Accuracy Metrics",
        desc: "Detailed accuracy and error tracking",
      },
      {
        title: "Multiple Languages",
        desc: "Practice typing in multiple languages",
      },
      {
        title: "Leaderboard",
        desc: "Compete with others on the leaderboard",
      },
    ],
  },
  {
    name: "KeyStore - Password Manager",
    category: "Security & Tools",
    categoryIcon: "Key",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
      { icon: "clerk.webp" },
    ],
    createdAt: "26-Jun-2025",
    image: "keystore.webp",
    desc: "Secure password manager with end-to-end encryption, password generator, and secure vault for storing all your credentials safely.",
    isPublished: true,
    demoUrl: "https://mykeystore.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/mykeystore",
    features: [
      {
        title: "End-to-End Encryption",
        desc: "Your data is encrypted and only accessible to you",
      },
      {
        title: "Password Generator",
        desc: "Generate strong, unique passwords instantly",
      },
      {
        title: "Secure Vault",
        desc: "Store all your credentials in one secure place",
      },
      {
        title: "Auto-fill",
        desc: "Auto-fill passwords on websites and apps",
      },
    ],
  },
  {
    name: "Weather Web App",
    category: "API Integration",
    categoryIcon: "Cloud",
    techs: [
      { icon: "html.webp" },
      { icon: "javascript.webp" },
      { icon: "tailwindcss.webp" },
    ],
    createdAt: "27-Sep-2024",
    image: "weather-web-app.webp",
    desc: "A modern, responsive weather dashboard built with Next.js, TypeScript, and Tailwind CSS that provides real-time weather information and forecasts for any location.",
    isPublished: true,
    demoUrl: "https://weather-dashboard-tvg.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/Weather-web-app",
    features: [
      {
        title: "Real-time Weather Data",
        desc: "Get current weather conditions for any city worldwide",
      },
      {
        title: "5-Day Forecast",
        desc: "View detailed weather forecasts for the upcoming days",
      },
      {
        title: "Search Functionality",
        desc: "Quickly find weather information for any location",
      },
      {
        title: "Dark/Light Mode",
        desc: "Toggle between themes for comfortable viewing",
      },
    ],
  },
  {
    name: "DooZen - Todo App",
    category: "Developer Tools",
    categoryIcon: "ListTodo",
    techs: [{ icon: "react.webp" }, { icon: "javascript.webp" }],
    createdAt: "06-Jul-2024",
    image: "doozen.webp",
    desc: "A simple and elegant To-Do web app built with React to help you stay organized and productive.",
    isPublished: true,
    demoUrl: "https://doozen.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/doozen",
    features: [
      {
        title: "Task Management",
        desc: "Create, complete, and delete tasks",
      },
      {
        title: "Simple & Clean UI",
        desc: "Minimal design for focused productivity",
      },
      {
        title: "Responsive Design",
        desc: "Works on all devices",
      },
    ],
  },
  {
    name: "Textify - Text Utilities",
    category: "Developer Tools",
    categoryIcon: "FileText",
    techs: [
      { icon: "react.webp" },
      { icon: "javascript.webp" },
      { icon: "tailwindcss.webp" },
    ],
    createdAt: "27-Jun-2024",
    image: "textify.webp",
    desc: "Collection of text utilities including case converter, word counter, character counter, text formatter, and more for developers and content creators.",
    isPublished: true,
    demoUrl: "https://mytextify.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/textify",
    features: [
      {
        title: "Case Converter",
        desc: "Convert text between different cases",
      },
      {
        title: "Word Counter",
        desc: "Count words, characters, and paragraphs",
      },
      {
        title: "Text Formatter",
        desc: "Format and clean up text content",
      },
      {
        title: "Export Options",
        desc: "Export formatted text in various formats",
      },
    ],
  },
  {
    name: "Snake Game",
    category: "Gaming & Fun",
    categoryIcon: "Gamepad2",
    techs: [
      { icon: "html.webp" },
      { icon: "css.webp" },
      { icon: "javascript.webp" },
    ],
    createdAt: "22-Sep-2023",
    image: "snakegame.webp",
    desc: "A classic Snake game built with plain HTML, CSS, and JavaScript. Control the snake, eat food, grow longer, and avoid hitting the walls or yourself.",
    isPublished: true,
    demoUrl: "https://thevinayakgore.github.io/Snake-Game",
    githubUrl: "https://github.com/thevinayakgore/Snake-Game",
    features: [
      {
        title: "Classic Gameplay",
        desc: "Move the snake, eat food, and grow while avoiding collisions",
      },
      {
        title: "Score Tracking",
        desc: "Real-time score display based on food consumed",
      },
      {
        title: "Keyboard Controls",
        desc: "Use arrow keys to change direction and control the snake",
      },
      {
        title: "Responsive Design",
        desc: "Playable on desktop and mobile browsers",
      },
    ],
  },
];
