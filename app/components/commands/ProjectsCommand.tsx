"use client";

import { TerminalState } from '../../context/TerminalContext';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsCommand(_args: string[], _state: TerminalState): React.ReactNode {

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

            <div className="mt-3 pt-3 border-t border-terminal-green/20">
              <div className="text-terminal-text text-sm mb-3">{project.details}</div>
              
              <div className="flex items-center space-x-4">
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
            </div>
          </div>
        ))}
      </div>

      <div className="text-terminal-violet text-sm">
        Type <span className="text-terminal-accent">contact</span> to get in touch about collaborations!
      </div>
    </div>
  );
}
