"use client";

import { useState } from 'react';
import { TerminalState } from '../../context/TerminalContext';

export default function AICommand(args: string[], state: TerminalState): React.ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleAIActivation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Test the API connection
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello! Are you working?'
        }),
      });

      if (!response.ok) {
        throw new Error('API connection failed');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // If successful, the mode will be switched by the Terminal component
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to AI');
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-red-400 font-bold">
          ⚠️ AI Connection Error
        </div>
        <div className="text-terminal-text">
          {error}
        </div>
        <div className="text-terminal-green text-sm">
          <div className="font-bold mb-2">To fix this:</div>
          <div>1. Get your Gemini API key from <span className="text-terminal-accent">https://makersuite.google.com/app/apikey</span></div>
          <div>2. Create a <span className="text-terminal-accent">.env.local</span> file</div>
          <div>3. Add: <span className="text-terminal-accent">GEMINI_API_KEY=your_key_here</span></div>
          <div>4. Restart the development server</div>
        </div>
        <button
          onClick={handleAIActivation}
          className="px-4 py-2 bg-terminal-green/20 text-terminal-green border border-terminal-green/30 rounded hover:bg-terminal-green/30 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-terminal-violet font-bold text-lg">
        🤖 AI Assistant Activation
      </div>
      
      <div className="text-terminal-text">
        Welcome to AI mode! I'm your digital assistant, ready to chat about technology, 
        answer questions about Mariya's work, or just have a friendly conversation.
      </div>

      <div className="p-4 bg-ai-bg border border-ai-accent/30 rounded-lg">
        <div className="text-ai-accent font-bold mb-2">AI Capabilities:</div>
        <ul className="text-terminal-text text-sm space-y-1">
          <li>• Answer questions about Mariya's projects and skills</li>
          <li>• Discuss AI/ML concepts and technologies</li>
          <li>• Provide coding tips and best practices</li>
          <li>• Share random tech facts and jokes</li>
          <li>• Help navigate the portfolio</li>
          <li>• Chat about books, hobbies, and learning</li>
        </ul>
      </div>

      {isLoading ? (
        <div className="text-terminal-accent">
          <div>Connecting to AI...</div>
          <div className="text-sm mt-1">Please wait while I initialize the AI assistant</div>
        </div>
      ) : (
        <div className="text-terminal-green">
          <div>Ready to activate AI mode!</div>
          <div className="text-sm mt-1">
            Type <span className="text-terminal-accent">exit</span> to return to CLI mode
          </div>
        </div>
      )}
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
