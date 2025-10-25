"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from '../context/TerminalContext';
import { useSound } from '../hooks/useSound';
import CommandHandler from './CommandHandler';
import CommandOutput from './CommandOutput';
import AIChat from './AIChat';

export default function Terminal() {
  const { state, dispatch } = useTerminal();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { playTypingSound, playCommandSound } = useSound();

  useEffect(() => {
    if (state.isBooted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isBooted]);

  // Add welcome message only once when terminal is first booted
  useEffect(() => {
    if (state.isBooted && state.history.length === 0) {
      const welcomeId = `welcome-${Date.now()}`;
      dispatch({
        type: 'ADD_HISTORY_ITEM',
        payload: {
          id: welcomeId,
          type: 'output',
          content: (
            <div className="space-y-4">
              <div className="text-terminal-accent text-glow font-medium text-lg">
                Welcome to MariyaOS v2.0
              </div>
              <div className="text-terminal-text">
                I&apos;m Mariya, a 14-year-old full-stack developer and the youngest certified TensorFlow developer. 
                Explore my work through interactive commands!
              </div>
              <div className="text-terminal-secondary">
                <div className="font-medium mb-2">Quick Start:</div>
                <div className="space-y-1 text-sm">
                  <div>• Type <span className="text-terminal-accent text-glow">help</span> to see all available commands</div>
                  <div>• Type <span className="text-terminal-accent text-glow">about</span> to learn more about me</div>
                  <div>• Type <span className="text-terminal-accent text-glow">projects</span> to see my work</div>
                  <div>• Type <span className="text-terminal-accent text-glow">ai</span> to chat with my AI assistant</div>
                </div>
              </div>
              <div className="text-terminal-secondary text-sm">
                💡 Pro tip: Use arrow keys ↑↓ to navigate command history
              </div>
            </div>
          ),
          timestamp: new Date(),
        },
      });
    }
  }, [state.isBooted, state.history.length, dispatch]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [state.history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      playCommandSound(state.soundEnabled);
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory(1);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // TODO: Implement autocomplete
    } else if (e.key.length === 1) {
      playTypingSound(state.soundEnabled);
    }
  };

  const navigateHistory = (direction: number) => {
    const newIndex = state.historyIndex + direction;
    if (newIndex >= -1 && newIndex < state.history.length) {
      dispatch({ type: 'SET_HISTORY_INDEX', payload: newIndex });
      if (newIndex === -1) {
        setInput('');
      } else {
        const historyItem = state.history[state.history.length - 1 - newIndex];
        if (historyItem.type === 'input') {
          setInput(historyItem.content as string);
        }
      }
    }
  };

  const executeCommand = () => {
    const command = input.trim();
    if (!command) return;

    // Add command to history
    dispatch({
      type: 'ADD_HISTORY_ITEM',
      payload: {
        id: Date.now().toString(),
        type: 'input',
        content: command,
        timestamp: new Date(),
      },
    });

    // Handle special commands that change state
    if (command === 'ai') {
      dispatch({ type: 'SET_MODE', payload: 'AI' });
      setInput('');
      dispatch({ type: 'SET_HISTORY_INDEX', payload: -1 });
      return;
    } else if (command === 'exit' && state.mode === 'AI') {
      dispatch({ type: 'SET_MODE', payload: 'CLI' });
      setInput('');
      dispatch({ type: 'SET_HISTORY_INDEX', payload: -1 });
      return;
    } else if (command === 'clear') {
      dispatch({ type: 'CLEAR_HISTORY' });
      setInput('');
      dispatch({ type: 'SET_HISTORY_INDEX', payload: -1 });
      return;
    } else if (command.startsWith('theme ')) {
      const theme = command.split(' ')[1];
      if (theme === 'electric' || theme === 'classic') {
        dispatch({ type: 'SET_THEME', payload: theme });
      }
    } else if (command.startsWith('sound ')) {
      const action = command.split(' ')[1];
      if (action === 'toggle' || action === 'on' || action === 'off') {
        dispatch({ type: 'TOGGLE_SOUND' });
      }
    }

    // Process command and add output to history
    const output = CommandHandler(command, state);
    
    dispatch({
      type: 'ADD_HISTORY_ITEM',
      payload: {
        id: Date.now().toString() + '-output',
        type: 'output',
        content: output,
        timestamp: new Date(),
      },
    });

    setInput('');
    dispatch({ type: 'SET_HISTORY_INDEX', payload: -1 });
  };

  const getPrompt = () => {
    if (state.mode === 'AI') {
      return (
        <span className="text-ai-accent text-glow">
          AI:~$&nbsp;
        </span>
      );
    }
    return (
      <span className="text-terminal-accent text-glow">
        visitor@mariyaos:~$&nbsp;
      </span>
    );
  };

  const getContainerClass = () => {
    const baseClass = "terminal-container min-h-screen flex flex-col";
    return state.mode === 'AI' ? `${baseClass} ai-mode mode-transition` : baseClass;
  };

  if (!state.isBooted) {
    return null;
  }

  // Show AI Chat component when in AI mode
  if (state.mode === 'AI') {
    return <AIChat onExit={() => dispatch({ type: 'SET_MODE', payload: 'CLI' })} />;
  }

  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
      <div className={`${getContainerClass()} w-full max-w-4xl p-6`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <div className="text-terminal-accent text-glow font-medium text-lg">
            MariyaOS v2.0
          </div>
          <div className="text-terminal-secondary text-sm">
            ⏻
          </div>
        </div>

        {/* Mobile-friendly command buttons */}
        <div className="mb-4 flex flex-wrap gap-2 md:hidden">
          {['help', 'about', 'projects', 'contact', 'ai'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                playCommandSound(state.soundEnabled);
                setInput(cmd);
                setTimeout(() => executeCommand(), 100);
              }}
              className="px-3 py-1 bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/20 rounded text-sm hover:bg-terminal-accent/20 transition-colors text-glow"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Output Area */}
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto mb-4 space-y-2 min-h-[400px] max-h-[600px]"
        >
          <AnimatePresence>
            {state.history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="typing-effect"
              >
                <CommandOutput item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Line */}
        <div className="flex items-center border-t border-white/5 pt-4">
          {getPrompt()}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-terminal-text caret-terminal-accent"
            autoComplete="off"
            spellCheck="false"
            placeholder="Type a command..."
          />
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-4 bg-terminal-accent ml-1 cursor-blink"
          />
        </div>
      </div>
    </div>
  );
}