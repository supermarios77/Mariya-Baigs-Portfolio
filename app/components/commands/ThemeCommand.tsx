"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function ThemeCommand(args: string[], state: TerminalState): React.ReactNode {
  const theme = args[0]?.toLowerCase();

  if (!theme) {
    return (
      <div className="space-y-2">
        <div className="text-terminal-accent font-bold">Available Themes:</div>
        <div className="space-y-1">
          <div className="text-terminal-green">• electric - Electric cyan on black (default)</div>
          <div className="text-terminal-green">• classic - Classic green on black</div>
        </div>
        <div className="text-terminal-text text-sm mt-2">
          Usage: <span className="text-terminal-accent">theme [electric|classic]</span>
        </div>
      </div>
    );
  }

  if (theme === 'electric' || theme === 'classic') {
    return (
      <div className="text-terminal-green">
        Theme switched to <span className="text-terminal-accent">{theme}</span>.
      </div>
    );
  }

  return (
    <div className="text-red-400">
      Invalid theme: {theme}. Available themes: electric, classic
    </div>
  );
}
