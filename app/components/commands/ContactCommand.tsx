"use client";

import { TerminalState } from '../../context/TerminalContext';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function ContactCommand(_args: string[], _state: TerminalState): React.ReactNode {
  const contacts = [
    {
      platform: 'Email',
      value: 'mariya.baig@example.com',
      icon: Mail,
      link: 'mailto:mariya.baig@example.com',
      color: 'text-terminal-accent'
    },
    {
      platform: 'GitHub',
      value: '@mariyabaig',
      icon: Github,
      link: 'https://github.com/mariyabaig',
      color: 'text-terminal-green'
    },
    {
      platform: 'LinkedIn',
      value: 'Mariya Baig',
      icon: Linkedin,
      link: 'https://linkedin.com/in/mariyabaig',
      color: 'text-terminal-accent'
    },
    {
      platform: 'Twitter',
      value: '@mariyacodes',
      icon: Twitter,
      link: 'https://twitter.com/mariyacodes',
      color: 'text-terminal-violet'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-terminal-accent font-bold text-lg">
        Get In Touch
      </div>
      
      <div className="text-terminal-text">
        I&apos;m always excited to discuss new opportunities, collaborate on interesting projects, 
        or just chat about technology and AI. Feel free to reach out!
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => {
          const IconComponent = contact.icon;
          return (
            <div key={contact.platform} className="flex items-center space-x-4">
              <IconComponent size={20} className={contact.color} />
              <div className="flex-1">
                <div className="text-terminal-green font-bold">{contact.platform}</div>
                <a 
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${contact.color} hover:underline transition-colors`}
                >
                  {contact.value}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-terminal-green/10 border border-terminal-green/30 rounded-lg">
        <div className="text-terminal-green font-bold mb-2">Let&apos;s Collaborate!</div>
        <div className="text-terminal-text text-sm">
          I&apos;m particularly interested in:
        </div>
        <ul className="text-terminal-text text-sm mt-2 space-y-1">
          <li>• AI/ML projects and research</li>
          <li>• Full-stack web applications</li>
          <li>• Open source contributions</li>
          <li>• Technical writing and mentoring</li>
          <li>• Creative coding experiments</li>
        </ul>
      </div>

      <div className="text-terminal-violet text-sm">
        Type <span className="text-terminal-accent">ai</span> to chat with my AI assistant, 
        or <span className="text-terminal-accent">projects</span> to see more of my work.
      </div>
    </div>
  );
}
