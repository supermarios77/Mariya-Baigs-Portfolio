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
            <div className="space-y-3">
              <div className="text-terminal-accent font-medium">
                MariyaOS — Terminal
              </div>
              <div className="text-terminal-text">
                Welcome to Mariya&apos;s terminal interface. I&apos;m a 14-year-old full-stack developer 
                and the youngest certified TensorFlow developer.
              </div>
              <div className="text-terminal-secondary text-sm">
                <div className="font-medium mb-1">Available commands:</div>
                <div className="space-y-0.5">
                  <div>• <span className="text-terminal-accent">help</span> — Show all commands</div>
                  <div>• <span className="text-terminal-accent">about</span> — Learn about Mariya</div>
                  <div>• <span className="text-terminal-accent">projects</span> — View portfolio</div>
                  <div>• <span className="text-terminal-accent">ai</span> — Enter AI mode</div>
                  <div>• <span className="text-terminal-accent">theme</span> — Change accent color</div>
                </div>
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
      if (theme === 'cyan' || theme === 'violet' || theme === 'emerald' || theme === 'amber') {
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
        <span className="text-ai-accent">
          AI:~$&nbsp;
        </span>
      );
    }
    return (
      <span className="text-terminal-accent">
        visitor@mariyaos:~$&nbsp;
      </span>
    );
  };

  const getWindowClass = () => {
    const baseClass = "terminal-window";
    if (state.mode === 'AI') return `${baseClass} ai-mode`;
    if (state.theme === 'violet') return `${baseClass} violet-theme`;
    if (state.theme === 'emerald') return `${baseClass} emerald-theme`;
    if (state.theme === 'amber') return `${baseClass} amber-theme`;
    return baseClass;
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
      <div className={`${getWindowClass()} w-full max-w-4xl`}>
        {/* macOS-style Title Bar */}
        <div className="title-bar relative px-4 py-3 flex items-center justify-between">
          <div className="window-dots">
            <div className="window-dot red"></div>
            <div className="window-dot yellow"></div>
            <div className="window-dot green"></div>
          </div>
          <div className="text-terminal-secondary text-sm font-medium">
            MariyaOS — Terminal
          </div>
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>

        {/* Terminal Content */}
        <div className="p-6">
          {/* Mobile-friendly command buttons */}
          <div className="mb-4 flex flex-wrap gap-2 md:hidden">
            {['help', 'about', 'projects', 'ai'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  playCommandSound(state.soundEnabled);
                  setInput(cmd);
                  setTimeout(() => executeCommand(), 100);
                }}
                className="px-3 py-1 bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/20 rounded text-sm hover:bg-terminal-accent/20 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Output Area */}
          <div 
            ref={terminalRef}
            className="smooth-scroll overflow-y-auto mb-4 space-y-1 min-h-[400px] max-h-[500px]"
          >
            <AnimatePresence>
              {state.history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="slide-up"
                >
                  <CommandOutput item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Line */}
          <div className="flex items-center">
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
              className="w-0.5 h-4 bg-terminal-accent ml-1 cursor-blink"
            />
          </div>
        </div>
      </div>
    </div>
  );
}