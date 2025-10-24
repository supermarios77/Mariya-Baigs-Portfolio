"use client";

import { useState } from 'react';
import { TerminalState } from '../../context/TerminalContext';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsCommand(_args: string[], _state: TerminalState): React.ReactNode {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Neural Image Classifier",
      description: "Advanced TensorFlow-based image classification system with 95% accuracy",
      tech: ["TensorFlow", "Python", "OpenCV", "Flask"],
      status: "completed",
      details: "Built a convolutional neural network that can classify images across 1000 categories. Implemented data augmentation, transfer learning, and real-time prediction API.",
      demo: "#",
      source: "#"
    },
    {
      id: 2,
      title: "AI-Powered Portfolio Terminal",
      description: "Interactive terminal-style portfolio with AI chat integration",
      tech: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
      status: "in-progress",
      details: "This very portfolio! A unique terminal interface that showcases projects through CLI commands and features an AI chat mode for interactive exploration.",
      demo: "#",
      source: "#"
    },
    {
      id: 3,
      title: "Real-time Chat Application",
      description: "Full-stack messaging app with real-time updates and file sharing",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      status: "completed",
      details: "Built a scalable chat application supporting multiple rooms, file uploads, emoji reactions, and real-time notifications. Handles 1000+ concurrent users.",
      demo: "#",
      source: "#"
    },
    {
      id: 4,
      title: "Rust Systems Programming",
      description: "Low-level system utilities and performance-critical applications",
      tech: ["Rust", "Tokio", "Serde", "Clap"],
      status: "learning",
      details: "Currently learning Rust by building system utilities, web servers, and exploring memory-safe concurrent programming patterns.",
      demo: null,
      source: "#"
    },
    {
      id: 5,
      title: "iOS SwiftUI Apps",
      description: "Native iOS applications with modern SwiftUI architecture",
      tech: ["Swift", "SwiftUI", "Core Data", "Combine"],
      status: "completed",
      details: "Developed several iOS apps including a productivity tracker and a minimalist note-taking app, focusing on clean UI/UX and Core Data integration.",
      demo: null,
      source: "#"
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
