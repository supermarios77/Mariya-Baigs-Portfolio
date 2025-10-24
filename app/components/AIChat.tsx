"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTerminal } from '../context/TerminalContext';
import { getGeminiResponse } from '../services/geminiService';

interface AIChatProps {
  onExit: () => void;
}

export default function AIChat({ onExit }: AIChatProps) {
  const { state } = useTerminal();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai' as const,
      content: "Hi! I'm Mariya's AI assistant! 🤖 I can tell you about her coding journey, her projects, her learning goals, or just chat about anything. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getGeminiResponse(input.trim());
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai' as const,
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai' as const,
        content: "Oops! Something went wrong. Please try again!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-ai-accent font-bold text-lg">
          🤖 AI Chat Mode
        </div>
        <button
          onClick={onExit}
          className="text-terminal-green hover:text-terminal-accent transition-colors text-sm"
        >
          [exit]
        </button>
      </div>

      <div className="bg-black/30 border border-ai-accent/30 rounded-lg p-4 h-80 overflow-y-auto">
        <div className="space-y-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-ai-accent/20 text-ai-text' 
                  : 'bg-terminal-green/10 text-terminal-text'
              }`}>
                <div className="text-xs text-terminal-green/70 mb-1">
                  {message.type === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div className="text-sm">{message.content}</div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-terminal-green/10 text-terminal-text p-3 rounded-lg">
                <div className="text-xs text-terminal-green/70 mb-1">AI Assistant</div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-ai-accent rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-ai-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-ai-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <span className="text-ai-accent">AI:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about Mariya..."
          className="flex-1 bg-transparent outline-none text-ai-text caret-ai-accent"
          disabled={isLoading}
        />
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-4 bg-ai-accent"
        />
      </form>

      <div className="text-terminal-violet text-xs">
        💡 Try asking: "What projects has Mariya built?" or "What's she learning right now?"
      </div>
    </div>
  );
}
