"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function AICommand(_args: string[], state: TerminalState): React.ReactNode {
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
        🤖 AI Assistant Activation
      </div>
      
      <div className="text-terminal-text">
        Welcome to AI mode! I&apos;m your digital assistant, ready to chat about technology, 
        answer questions about Mariya&apos;s work, or just have a friendly conversation.
      </div>

      <div className="p-4 bg-ai-bg border border-ai-accent/30 rounded-lg">
        <div className="text-ai-accent font-bold mb-2">AI Capabilities:</div>
        <ul className="text-terminal-text text-sm space-y-1">
          <li>• Answer questions about Mariya&apos;s projects and skills</li>
          <li>• Discuss AI/ML concepts and technologies</li>
          <li>• Provide coding tips and best practices</li>
          <li>• Share random tech facts and jokes</li>
          <li>• Help navigate the portfolio</li>
          <li>• Chat about books, hobbies, and learning</li>
        </ul>
      </div>

      <div className="text-terminal-green">
        <div>Switching to AI mode...</div>
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
        <div>You&apos;re already in CLI mode!</div>
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
