"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTerminal } from '../context/TerminalContext';
import { useSound } from '../hooks/useSound';

interface AIChatProps {
  onExit: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AIChat({ onExit }: AIChatProps) {
  const { state, dispatch } = useTerminal();
  const { playTypingSound, playCommandSound } = useSound();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'Escape') {
      handleExit();
    } else if (e.key.length === 1) {
      playTypingSound(state.soundEnabled);
    }
  };

  const handleExit = () => {
    // Clear terminal history when exiting AI mode
    dispatch({ type: 'CLEAR_HISTORY' });
    onExit();
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    setIsLoading(true);
    playCommandSound(state.soundEnabled);

    // Add user message to chat history
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setChatHistory(prev => [...prev, userMessage]);

    try {
      // Prepare chat history for API
      const apiChatHistory = chatHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          chatHistory: apiChatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add AI response to chat history
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: data.response,
        timestamp: new Date(),
      };

      setChatHistory(prev => [...prev, aiMessage]);

    } catch (error) {
      let errorMessage = 'Failed to get AI response';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      // Add error message to chat history
      const errorMessageObj: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'ai',
        content: `Error: ${errorMessage}${errorMessage.includes('API key') ? '\n\nTo fix this:\n1. Get your Gemini API key from https://makersuite.google.com/app/apikey\n2. Create a .env.local file\n3. Add: GEMINI_API_KEY=your_key_here\n4. Restart the development server' : ''}`,
        timestamp: new Date(),
      };
      
      setChatHistory(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-terminal-bg text-ai-text transition-colors duration-300 relative">
      {/* AI Mode Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-ai-bgSecondary/80 backdrop-blur-sm border-b border-ai-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-ai-textSecondary text-sm font-mono">
            MariyaOS v1.4.2 - AI Mode
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-ai-textSecondary text-xs">AI Mode Active</div>
            <div className="w-2 h-2 rounded-full bg-ai-accent animate-glow-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl pt-20">
        {/* AI Mode Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-ai-accent font-bold text-xl neon-text">
            🤖 AI Chat Mode
          </div>
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-ai-bgSecondary/50 text-ai-accent border border-ai-border rounded-lg text-sm hover:bg-ai-accent/10 hover:border-ai-accent transition-all duration-300 font-mono"
          >
            Exit AI Mode
          </button>
        </div>

        {/* Chat Window */}
        <motion.div 
          ref={chatRef}
          className="bg-ai-bgSecondary/80 backdrop-blur-sm border border-ai-border rounded-2xl p-6 h-[500px] overflow-y-auto font-mono text-sm shadow-ai-glow relative ai-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            {/* Welcome message if no chat history */}
            {chatHistory.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <div className="text-ai-accent font-bold text-lg mb-2">Welcome to AI Chat!</div>
                <div className="text-ai-text/80 text-sm">
                  I'm Mariya's AI assistant. Ask me anything about her work, technology, or just have a friendly chat!
                </div>
              </div>
            )}

            {/* Show chat history */}
            {chatHistory.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {message.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-ai-accent/20 text-ai-accent px-4 py-2 rounded-lg max-w-[80%] border border-ai-accent/30">
                      <div className="font-semibold text-xs mb-1">You</div>
                      <div>{message.content}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="bg-ai-bg/50 text-ai-text px-4 py-3 rounded-lg max-w-[90%] border border-ai-accent/20">
                      <div className="text-ai-accent font-semibold text-xs mb-2">AI Assistant</div>
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-ai-bg/50 text-ai-text px-4 py-3 rounded-lg border border-ai-accent/20">
                  <div className="text-ai-accent font-semibold text-xs mb-2">AI Assistant</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-ai-text">Thinking</div>
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1 h-1 bg-ai-accent rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-1 h-1 bg-ai-accent rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-1 h-1 bg-ai-accent rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input line */}
          <div className="flex items-center mt-6 pt-4 border-t border-ai-border">
            <span className="text-ai-accent neon-text">
              AI:~$&nbsp;
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-ai-text caret-ai-accent disabled:opacity-50 ml-2"
              placeholder={isLoading ? "AI is thinking..." : "Ask me anything about Mariya or technology..."}
              autoComplete="off"
              spellCheck="false"
            />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 bg-ai-accent ml-1 neon-text"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-ai-textSecondary">
          Press <span className="text-ai-accent neon-text">Enter</span> to send, <span className="text-ai-accent neon-text">Escape</span> to exit
        </div>
      </div>
    </div>
  );
}
