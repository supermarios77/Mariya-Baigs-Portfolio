"use client";

import { TerminalState } from '../../context/TerminalContext';

const EasterEggCommands = {
  sudo: (_args: string[], _state: TerminalState): React.ReactNode => (
    <div className="space-y-2">
      <div className="text-red-400">sudo: permission denied</div>
      <div className="text-terminal-green">Nice try! Admin privileges denied.</div>
      <div className="text-terminal-text text-sm">
        This is Mariya&apos;s portfolio, not a real terminal 😉
      </div>
    </div>
  ),

  coffee: (_args: string[], _state: TerminalState): React.ReactNode => (
    <div className="space-y-2">
      <div className="text-terminal-accent">☕ Brew initiated...</div>
      <div className="text-terminal-green">You now run on caffeine.</div>
      <div className="text-terminal-text text-sm">
        Productivity level: +200% | Sleep level: -50%
      </div>
    </div>
  ),

  motivation: (_args: string[], _state: TerminalState): React.ReactNode => {
    const quotes = [
      "Code is like humor. When you have to explain it, it's bad.",
      "The best error message is the one that never shows up.",
      "There are only two hard things in Computer Science: cache invalidation and naming things.",
      "First, solve the problem. Then, write the code.",
      "The only way to go fast, is to go well.",
      "Clean code always looks like it was written by someone who cares.",
      "Programs must be written for people to read, and only incidentally for machines to execute.",
      "The best way to get a project done faster is to start sooner.",
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
      <div className="space-y-2">
        <div className="text-terminal-violet font-bold">💡 Daily Motivation:</div>
        <div className="text-terminal-text italic">&quot;{randomQuote}&quot;</div>
        <div className="text-terminal-green text-sm">
          Keep coding, keep learning, keep building! 🚀
        </div>
      </div>
    );
  },

  paint: (_args: string[], _state: TerminalState): React.ReactNode => (
    <div className="space-y-2">
      <div className="text-terminal-accent">🎨 ASCII Art Mode Activated</div>
      <div className="text-terminal-text font-mono text-xs">
        {`
    ╔══════════════════════════════╗
    ║        ASCII ART GALLERY     ║
    ╚══════════════════════════════╝
    
    🎯 Here's a simple ASCII art:
    
        /\\_/\\  
       ( o.o ) 
        > ^ <
    
    🚀 And a rocket:
    
           /\\
          /  \\
         /____\\
        |      |
        |  🚀  |
        |______|
    
    💡 Tip: Try creating your own ASCII art!
        `}
      </div>
      <div className="text-terminal-green text-sm">
        ASCII art mode complete. Type <span className="text-terminal-accent">help</span> for more commands.
      </div>
    </div>
  ),

  geography: (_args: string[], _state: TerminalState): React.ReactNode => (
    <div className="space-y-2">
      <div className="text-terminal-accent">🌍 Geography Check:</div>
      <div className="text-terminal-green">Rocks still exist. They&apos;re fine.</div>
      <div className="text-terminal-text text-sm">
        Mountains: Still tall<br/>
        Oceans: Still wet<br/>
        Continents: Still drifting (very slowly)<br/>
        Earth: Still spinning
      </div>
      <div className="text-terminal-violet text-sm">
        Geography status: ✅ All systems nominal
      </div>
    </div>
  ),
};

export default EasterEggCommands;
