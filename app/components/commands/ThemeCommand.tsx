"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function ThemeCommand(args: string[], _state: TerminalState): React.ReactNode {
  if (args.length === 0) {
    return (
      <div className="space-y-2">
        <div className="text-terminal-accent font-medium">Available themes:</div>
        <div className="space-y-1 text-sm">
          <div>• <span className="text-terminal-accent">cyan</span> — Default cyan accent (current)</div>
          <div>• <span className="text-violet-accent">violet</span> — Purple accent</div>
          <div>• <span className="text-emerald-accent">emerald</span> — Green accent</div>
          <div>• <span className="text-amber-accent">amber</span> — Orange accent</div>
        </div>
        <div className="text-terminal-secondary text-sm mt-2">
          Usage: <span className="text-terminal-accent">theme [color]</span>
        </div>
      </div>
    );
  }

  const theme = args[0].toLowerCase();
  const validThemes = ['cyan', 'violet', 'emerald', 'amber'];

  if (!validThemes.includes(theme)) {
    return (
      <div className="text-red-400">
        Invalid theme: {theme}
        <div className="text-terminal-secondary text-sm mt-1">
          Available themes: {validThemes.join(', ')}
        </div>
      </div>
    );
  }

  const themeColors = {
    cyan: '#22D3EE',
    violet: '#C084FC',
    emerald: '#10B981',
    amber: '#F59E0B',
  };

  return (
    <div className="space-y-2">
      <div className="text-terminal-accent">
        Theme changed to <span className="font-medium">{theme}</span>
      </div>
      <div className="text-terminal-secondary text-sm">
        Accent color: <span style={{ color: themeColors[theme as keyof typeof themeColors] }}>{themeColors[theme as keyof typeof themeColors]}</span>
      </div>
      <div className="text-terminal-secondary text-sm">
        Terminal glow and cursor color updated
      </div>
    </div>
  );
}