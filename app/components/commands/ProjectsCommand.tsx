"use client";

import { useState } from 'react';
import { TerminalState } from '../../context/TerminalContext';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsCommand(_args: string[], _state: TerminalState): React.ReactNode {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "IconLab",
      description: "AI-powered app icon generator with intelligent design suggestions",
      tech: ["Next.js", "TypeScript", "AI/ML", "TailwindCSS", "Framer Motion"],
      status: "completed",
      details: "A sophisticated web application that generates custom app icons using AI. Features intelligent design suggestions, multiple style options, and high-resolution exports. Built with modern web technologies and AI integration for seamless user experience.",
      demo: "https://iconlab.site",
      source: "https://github.com/supermarios77/iconlab"
    },
    {
      id: 2,
      title: "Tasbihly",
      description: "iOS app for counting dhikr with beautiful, intuitive interface",
      tech: ["Swift", "SwiftUI", "iOS", "Core Data"],
      status: "completed",
      details: "A beautifully designed iOS application for counting dhikr (Islamic remembrance). Features intuitive gesture controls, customizable counters, and elegant animations. Built with SwiftUI for a native iOS experience with smooth performance.",
      demo: "https://apps.apple.com/app/tasbihly",
      source: "https://github.com/supermarios77/tasbihly"
    },
    {
      id: 3,
      title: "AI Terminal Portfolio",
      description: "Interactive terminal-style portfolio with AI chat integration",
      tech: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS", "Gemini AI"],
      status: "completed",
      details: "This very portfolio! A unique terminal interface that showcases projects through CLI commands and features an AI chat mode for interactive exploration. Built with modern web technologies and integrated with Google Gemini AI for conversational interactions.",
      demo: "https://mariya-baigs-portfolio.vercel.app",
      source: "https://github.com/supermarios77/Mariya-Baigs-Portfolio"
    },
    {
      id: 4,
      title: "Neural Image Classifier",
      description: "Advanced TensorFlow-based image classification system",
      tech: ["TensorFlow", "Python", "OpenCV", "Flask", "Deep Learning"],
      status: "completed",
      details: "Built a convolutional neural network that can classify images across 1000 categories. Implemented data augmentation, transfer learning, and real-time prediction API. Achieved 95% accuracy on test datasets.",
      demo: null,
      source: "https://github.com/supermarios77/neural-classifier"
    },
    {
      id: 5,
      title: "Real-time Chat Application",
      description: "Full-stack messaging app with real-time updates",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      status: "completed",
      details: "Built a scalable chat application supporting multiple rooms, file uploads, emoji reactions, and real-time notifications. Handles 1000+ concurrent users with WebSocket connections and MongoDB for data persistence.",
      demo: null,
      source: "https://github.com/supermarios77/realtime-chat"
    },
    {
      id: 6,
      title: "Rust Systems Programming",
      description: "Learning Rust for systems programming and performance",
      tech: ["Rust", "Systems Programming", "Performance"],
      status: "learning",
      details: "Currently learning Rust for systems programming. Exploring memory safety, concurrency, and performance optimization. Building small projects to understand Rust's unique features and ecosystem.",
      demo: null,
      source: "https://github.com/supermarios77/rust-learning"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-terminal-green';
      case 'in-progress': return 'text-terminal-accent';
      case 'learning': return 'text-terminal-violet';
      default: return 'text-terminal-text';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in-progress': return '⚡';
      case 'learning': return '📚';
      default: return '•';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-terminal-accent font-bold text-lg">
        Portfolio Projects
      </div>
      
      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="border border-terminal-green/30 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-terminal-accent font-bold">{project.title}</span>
                  <span className={`text-sm ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)} {project.status}
                  </span>
                </div>
                <div className="text-terminal-text mb-2">{project.description}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-terminal-green/20 text-terminal-green text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-3">
              <button
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                className="text-terminal-accent hover:text-terminal-green transition-colors text-sm"
              >
                {expandedProject === project.id ? 'Hide Details' : 'Show Details'}
              </button>
              
              {project.demo && (
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-terminal-green hover:text-terminal-accent transition-colors text-sm"
                >
                  <ExternalLink size={14} />
                  <span>Demo</span>
                </a>
              )}
              
              {project.source && (
                <a 
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-terminal-green hover:text-terminal-accent transition-colors text-sm"
                >
                  <Github size={14} />
                  <span>Source</span>
                </a>
              )}
            </div>

            {expandedProject === project.id && (
              <div className="mt-3 pt-3 border-t border-terminal-green/20">
                <div className="text-terminal-text text-sm">{project.details}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-terminal-violet text-sm">
        Type <span className="text-terminal-accent">contact</span> to get in touch about collaborations!
      </div>
    </div>
  );
}
