"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function AICommand(args: string[], state: TerminalState): React.ReactNode {
  if (state.mode === 'AI') {
    return (
      <div className="text-terminal-violet">
        <div>AI mode is already active!</div>
        <div className="text-terminal-green mt-1">
          Type <span className="text-terminal-accent">exit</span> to return to CLI mode
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-terminal-violet font-bold text-lg">
        🤖 AI Assistant Activated
      </div>
      
      <div className="text-terminal-text">
        Welcome to AI mode! I'm Mariya's AI assistant, powered by Gemini AI. 
        I can tell you about her coding journey, projects, learning goals, or just chat!
      </div>

      <div className="p-4 bg-ai-bg border border-ai-accent/30 rounded-lg">
        <div className="text-ai-accent font-bold mb-2">What I can help with:</div>
        <ul className="text-terminal-text text-sm space-y-1">
          <li>• Mariya's technical skills and achievements</li>
          <li>• Her current learning projects (Rust, Arabic, GCSE prep)</li>
          <li>• Her academic journey and challenges</li>
          <li>• Her hobbies and interests</li>
          <li>• General coding and AI/ML discussions</li>
        </ul>
      </div>

      <div className="text-terminal-green">
        <div>Switching to AI chat mode...</div>
        <div className="text-sm mt-1">
          Type <span className="text-terminal-accent">exit</span> to return to CLI mode
        </div>
      </div>
    </div>
  );
}

// Static method for exit command
AICommand.exit = function(args: string[], state: TerminalState): React.ReactNode {
  if (state.mode === 'CLI') {
    return (
      <div className="text-terminal-violet">
        <div>You're already in CLI mode!</div>
        <div className="text-terminal-green mt-1">
          Type <span className="text-terminal-accent">ai</span> to enter AI mode
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-terminal-green font-bold text-lg">
        👋 Returning to CLI Mode
      </div>
      
      <div className="text-terminal-text">
        Thanks for chatting! Feel free to explore more commands or come back anytime.
      </div>

      <div className="text-terminal-green">
        <div>Switching back to CLI mode...</div>
        <div className="text-sm mt-1">
          Type <span className="text-terminal-accent">help</span> to see available commands
        </div>
      </div>
    </div>
  );
};
