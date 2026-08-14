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
  slug: string;
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
    name: "Venumity UI - Component Library",
    slug: "uivenumity",
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
    createdAt: "2025-07-20T06:31:00.000Z",
    image: "ui.venumity.png",
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
    name: "DailyTik - Daily Task Manager",
    slug: "dailytik",
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
    createdAt: "2025-06-22T06:31:00.000Z",
    image: "dailytik.png",
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
    name: "AI Code Reviewer",
    slug: "ai-code-reviewer",
    category: "Gemini AI API",
    categoryIcon: "Bot",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
    ],
    createdAt: "2025-03-16T06:31:00.000Z",
    image: "aicodereview.png",
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
    name: "RecallCard - Memory Game",
    slug: "recallcard",
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
    createdAt: "2025-07-15T06:31:00.000Z",
    image: "recallcard.png",
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
    name: "KeyStore - Password Manager",
    slug: "keystore",
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
    createdAt: "2025-04-10T06:31:00.000Z",
    image: "keystore.png",
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
    name: "FingSprint - Typing Speed Test",
    slug: "fingsprint",
    category: "Gaming & Fun",
    categoryIcon: "Keyboard",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "shadcnui.webp" },
    ],
    createdAt: "2025-06-28T06:31:00.000Z",
    image: "fingsprint.png",
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
    name: "Weather Dashboard",
    slug: "weather-dashboard",
    category: "API Integration",
    categoryIcon: "Cloud",
    techs: [
      { icon: "nextjs.webp" },
      { icon: "react.webp" },
      { icon: "typescript.webp" },
      { icon: "tailwindcss.webp" },
      { icon: "motion.webp" },
    ],
    createdAt: "2025-02-01T06:31:00.000Z",
    image: "weather-dashboard.png",
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
    name: "Textify - Text Utilities",
    slug: "textify",
    category: "Developer Tools",
    categoryIcon: "FileText",
    techs: [
      { icon: "react.webp" },
      { icon: "javascript.webp" },
      { icon: "tailwindcss.webp" },
    ],
    createdAt: "2025-03-05T06:31:00.000Z",
    image: "textify.png",
    desc: "Collection of text utilities including case converter, word counter, character counter, text formatter, and more for developers and content creators.",
    isPublished: true,
    demoUrl: "https://mytextify.vercel.app",
    githubUrl: "https://github.com/thevinayakgore/mytextify",
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
    name: "DooZen - Todo App",
    slug: "doozen",
    category: "Developer Tools",
    categoryIcon: "ListTodo",
    techs: [{ icon: "react.webp" }, { icon: "javascript.webp" }],
    createdAt: "2025-06-04T06:31:00.000Z",
    image: "doozen.png",
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
];
