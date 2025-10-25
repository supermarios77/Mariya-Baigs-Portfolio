"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from '../context/TerminalContext';
import CommandHandler from './CommandHandler';
import CommandOutput from './CommandOutput';
import AIChat from './AIChat';
import { useSound } from '../hooks/useSound';

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
              <div className="text-terminal-accent font-bold text-lg">
                Welcome to Mariya's Terminal Portfolio! 🚀
              </div>
              <div className="text-terminal-text">
                I&apos;m Mariya, a 14-year-old full-stack developer and the youngest certified TensorFlow developer. 
                Explore my work through interactive commands!
              </div>
              <div className="text-terminal-green">
                <div className="font-bold mb-2">Quick Start:</div>
                <div className="space-y-1 text-sm">
                  <div>• Type <span className="text-terminal-accent">help</span> to see all available commands</div>
                  <div>• Type <span className="text-terminal-accent">about</span> to learn more about me</div>
                  <div>• Type <span className="text-terminal-accent">projects</span> to see my work</div>
                  <div>• Type <span className="text-terminal-accent">ai</span> to chat with my AI assistant</div>
                </div>
              </div>
              <div className="text-terminal-violet text-sm">
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
      // Play typing sound for regular character input
      playTypingSound(state.soundEnabled);
    }
  };

  const navigateHistory = (direction: number) => {
    const historyInputs = state.history
      .filter(item => item.type === 'input')
      .map(item => item.content as string)
      .reverse();

    if (historyInputs.length === 0) return;

    let newIndex = state.historyIndex + direction;
    
    if (newIndex < 0) {
      newIndex = -1;
      setInput('');
    } else if (newIndex >= historyInputs.length) {
      newIndex = historyInputs.length - 1;
    }

    dispatch({ type: 'SET_HISTORY_INDEX', payload: newIndex });
    
    if (newIndex >= 0) {
      setInput(historyInputs[newIndex]);
    }
  };

  const executeCommand = () => {
    if (!input.trim()) return;

    const commandId = Date.now().toString();
    const command = input.trim();
    
    // Add input to history
    dispatch({
      type: 'ADD_HISTORY_ITEM',
      payload: {
        id: `${commandId}-input`,
        type: 'input',
        content: command,
        timestamp: new Date(),
      },
    });

    // Handle special commands that change state
    if (command === 'ai') {
      dispatch({ type: 'SET_MODE', payload: 'AI' });
      // Don't add to history, just switch mode
      setInput('');
      dispatch({ type: 'SET_HISTORY_INDEX', payload: -1 });
      return;
    } else if (command === 'exit' && state.mode === 'AI') {
      dispatch({ type: 'SET_MODE', payload: 'CLI' });
      // Don't add to history, just switch mode
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
        id: `${commandId}-output`,
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
          AI:{state.theme === 'electric' ? '~' : '$'}&nbsp;
        </span>
      );
    }
    return (
      <span className={getPromptColor()}>
        visitor@{state.theme === 'electric' ? 'neuralos' : 'terminal'}:~$&nbsp;
      </span>
    );
  };

  const getThemeClasses = () => {
    if (state.mode === 'AI') {
      return 'bg-ai-bg text-ai-text';
    }
    return state.theme === 'electric' 
      ? 'bg-terminal-bg text-terminal-text' 
      : 'bg-black text-terminal-green';
  };


  const getPromptColor = () => {
    if (state.mode === 'AI') {
      return 'text-ai-accent';
    }
    return state.theme === 'electric' 
      ? 'text-terminal-green' 
      : 'text-terminal-green';
  };

  if (!state.isBooted) {
    return null;
  }

  // Show AI Chat component when in AI mode
  if (state.mode === 'AI') {
    return <AIChat onExit={() => dispatch({ type: 'SET_MODE', payload: 'CLI' })} />;
  }

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-colors duration-300 relative`}>
      {/* Terminal header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-terminal-bgSecondary/80 backdrop-blur-sm border-b border-terminal-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-terminal-textSecondary text-sm font-mono">
            MariyaOS v1.4.2
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-terminal-textSecondary text-xs">
              Terminal Mode
            </div>
            <div className="w-2 h-2 rounded-full bg-terminal-accent animate-glow-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl pt-20">
        {/* Mobile-friendly command buttons */}
        <div className="mb-6 flex flex-wrap gap-2 md:hidden">
          {['help', 'about', 'projects', 'contact', 'ai'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                playCommandSound(state.soundEnabled);
                setInput(cmd);
                setTimeout(() => executeCommand(), 100);
              }}
              className="px-3 py-1 bg-terminal-bgSecondary/50 text-terminal-accent border border-terminal-border rounded-lg text-sm hover:bg-terminal-accent/10 hover:border-terminal-accent transition-all duration-300 font-mono"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal window */}
        <motion.div 
          ref={terminalRef}
          className="bg-terminal-bgSecondary/80 backdrop-blur-sm border border-terminal-border rounded-2xl p-6 h-[600px] overflow-y-auto font-mono text-sm shadow-terminal-glow relative terminal-glow"
        >
          {/* Terminal content */}
          <div className="space-y-3">
            <AnimatePresence>
              {state.history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CommandOutput item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input line */}
          <div className="flex items-center mt-6 pt-4 border-t border-terminal-border">
            <span className={`${getPromptColor()} neon-text`}>
              {getPrompt()}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-terminal-text caret-terminal-accent ml-2"
              placeholder="Type a command..."
              autoComplete="off"
              spellCheck="false"
            />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 ml-1 bg-terminal-accent neon-text"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-terminal-textSecondary">
          Type <span className="text-terminal-accent neon-text">help</span> for available commands
        </div>
      </div>
    </div>
  );
}
