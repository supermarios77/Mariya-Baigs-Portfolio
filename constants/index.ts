import { Github, Linkedin, Twitter } from 'lucide-react';
import { Project, SocialLink, Stat } from '@/types';

export const SOCIAL_LINKS: SocialLink[] = [
  { 
    name: "GitHub",
    icon: Github,
    color: "bg-[#FF6B6B]",
    url: "https://github.com/mariyabaig"
  },
  { 
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-[#4ECDC4]",
    url: "https://linkedin.com/in/mariyabaig"
  },
  { 
    name: "Twitter",
    icon: Twitter,
    color: "bg-[#FFE66D]",
    url: "https://twitter.com/mariyabaig"
  }
];

export const STATS: Stat[] = [
  { title: "Projects", value: "5+", color: "bg-[#FF6B6B]" },
  { title: "Experience", value: "3 Years", color: "bg-[#4ECDC4]" },
  { title: "Technologies", value: "15+", color: "bg-[#FFE66D]" },
  { title: "Certificates", value: "5+", color: "bg-[#95E1D3]" }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "IconLab",
    description: "AI-powered SaaS platform that generates beautiful app icons from text descriptions",
    tags: ["Next.js", "Hugging Face", "TailwindCSS", "TypeScript", "Stripe"],
    link: "#",
    color: "bg-[#FF6B6B]",
    githubUrl: "https://github.com/mariyabaig/iconlab",
    liveUrl: "https://iconlab.vercel.app",
    coverImage: "/projects/iconlab.png"
  },
  {
    id: 2,
    title: "Tasbihly",
    description: "A modern iOS app for digital dhikr tracking with beautiful UI and custom animations",
    tags: ["Swift", "SwiftUI", "SwiftData"],
    link: "#",
    color: "bg-[#4ECDC4]",
    liveUrl: "https://apps.apple.com/app/tasbihly",
    coverImage: "/projects/tasbihly.png"
  },
  {
    id: 3,
    title: "QuickSum",
    description: "Chrome extension that uses AI to generate quick summaries of web pages",
    tags: ["JavaScript", "Chrome API", "Chrome Built-In AI", "HTML/CSS"],
    link: "#",
    color: "bg-[#FFE66D]",
    githubUrl: "https://github.com/mariyabaig/quicksum",
    liveUrl: "https://chrome.google.com/webstore/detail/quicksum",
    coverImage: "/projects/quicksum.png"
  },
  {
    id: 4,
    title: "Panda Buddy",
    description: "AI-powered learning platform that helps students understand complex topics",
    tags: ["Next.js", "AI/ML", "Firebase", "Gemini API"],
    link: "#",
    color: "bg-[#95E1D3]",
    githubUrl: "https://github.com/mariyabaig/panda-buddy",
    liveUrl: "https://pandabuddy.vercel.app",
    coverImage: "/projects/panda-buddy.png"
  }
]; 