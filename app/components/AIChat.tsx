"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from '../context/TerminalContext';
import { useSound } from '../hooks/useSound';

interface AIChatProps {
  onExit: () => void;
}

export default function AIChat({ onExit }: AIChatProps) {
  const { state, dispatch } = useTerminal();
  const { playTypingSound, playCommandSound } = useSound();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  }, [state.history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'Escape') {
      onExit();
    } else if (e.key.length === 1) {
      playTypingSound(state.soundEnabled);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    setIsLoading(true);
    playCommandSound(state.soundEnabled);

    // Add user message to history
    const userMessageId = Date.now().toString();
    dispatch({
      type: 'ADD_HISTORY_ITEM',
      payload: {
        id: `${userMessageId}-user`,
        type: 'input',
        content: message,
        timestamp: new Date(),
      },
    });

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add AI response to history
      const aiMessageId = Date.now().toString() + '-ai';
      dispatch({
        type: 'ADD_HISTORY_ITEM',
        payload: {
          id: aiMessageId,
          type: 'output',
          content: (
            <div className="space-y-2">
              <div className="text-ai-accent font-bold">AI:</div>
              <div className="text-ai-text whitespace-pre-wrap">{data.response}</div>
            </div>
          ),
          timestamp: new Date(),
        },
      });

    } catch (error) {
      const errorId = Date.now().toString() + '-error';
      dispatch({
        type: 'ADD_HISTORY_ITEM',
        payload: {
          id: errorId,
          type: 'output',
          content: (
            <div className="text-red-400">
              <div className="font-bold">Error:</div>
              <div>{error instanceof Error ? error.message : 'Failed to get AI response'}</div>
            </div>
          ),
          timestamp: new Date(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPrompt = () => {
    return (
      <span className="text-ai-accent">
        AI:{state.theme === 'electric' ? '~' : '$'}&nbsp;
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-ai-bg text-ai-text transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* AI Mode Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-ai-accent font-bold text-lg">
            🤖 AI Chat Mode
          </div>
          <button
            onClick={onExit}
            className="px-3 py-1 bg-ai-accent/20 text-ai-accent border border-ai-accent/30 rounded text-sm hover:bg-ai-accent/30 transition-colors"
          >
            Exit AI Mode
          </button>
        </div>

        {/* Chat Window */}
        <div 
          ref={chatRef}
          className="bg-black/50 border border-ai-accent/30 rounded-lg p-6 h-96 overflow-y-auto font-mono text-sm"
        >
          <div className="space-y-3">
            <AnimatePresence>
              {state.history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.type === 'input' ? (
                    <div className="text-ai-accent">
                      You: {item.content}
                    </div>
                  ) : (
                    <div className="text-ai-text">
                      {item.content}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-ai-accent"
              >
                <div className="flex items-center space-x-2">
                  <div>AI is thinking</div>
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
              </motion.div>
            )}
          </div>

          {/* Input line */}
          <div className="flex items-center mt-4">
            {getPrompt()}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-ai-text caret-ai-accent disabled:opacity-50"
              placeholder={isLoading ? "AI is thinking..." : "Ask me anything about Mariya or technology..."}
              autoComplete="off"
              spellCheck="false"
            />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 bg-ai-accent ml-1"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-ai-accent/60">
          Press <span className="text-ai-accent">Enter</span> to send, <span className="text-ai-accent">Escape</span> to exit
        </div>
      </div>
    </div>
  );
}
