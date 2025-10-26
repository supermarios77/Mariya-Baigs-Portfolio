"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function HelpCommand(_args: string[], _state: TerminalState): React.ReactNode {
  const commands = [
    { name: 'help', description: 'Show this help message' },
    { name: 'about', description: 'Learn about Mariya Baig' },
    { name: 'projects', description: 'View my portfolio projects' },
    { name: 'contact', description: 'Get in touch with me' },
    { name: 'ai', description: 'Enter AI chat mode' },
    { name: 'adventure', description: 'Switch to Adventure mode (game)' },
    { name: 'clear', description: 'Clear the terminal screen' },
    { name: 'theme', description: 'Switch between cyan, violet, emerald, amber' },
    { name: 'sound', description: 'Toggle typing sound effects' },
  ];

  const easterEggs = [
    { name: 'sudo', description: 'Try to gain admin privileges' },
    { name: 'coffee', description: 'Brew some motivation' },
    { name: 'motivation', description: 'Get a random pep talk' },
    { name: 'paint', description: 'Open ASCII art mode' },
    { name: 'geography', description: 'Learn about rocks' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-terminal-accent font-bold">
        Available Commands:
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {commands.map((cmd) => (
          <div key={cmd.name} className="flex items-start space-x-4">
            <span className="text-terminal-green font-bold w-16">{cmd.name}</span>
            <span className="text-terminal-text">{cmd.description}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="text-terminal-violet font-bold mb-2">
          Easter Eggs:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {easterEggs.map((cmd) => (
            <div key={cmd.name} className="flex items-start space-x-4">
              <span className="text-terminal-violet font-bold w-16">{cmd.name}</span>
              <span className="text-terminal-text">{cmd.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-terminal-green/70 text-sm">
        Use arrow keys ↑↓ to navigate command history
      </div>
    </div>
  );
}
