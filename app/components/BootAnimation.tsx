"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BootAnimationProps {
  onComplete: () => void;
}

const bootLines = [
  "Initializing MariyaOS v1.4.2...",
  "Loading neural modules...",
  "Connecting to AI node...",
  "Initializing terminal interface...",
  "System ready.",
];

export default function BootAnimation({ onComplete }: BootAnimationProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentLine, onComplete]);

  return (
    <div className="fixed inset-0 bg-terminal-bg flex items-center justify-center z-50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-terminal-bg via-terminal-bgSecondary to-terminal-bg" />
      
      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-terminal-bgSecondary/80 backdrop-blur-sm border border-terminal-border rounded-2xl p-8 shadow-terminal-glow relative z-10 min-w-[500px]"
      >
        {/* Terminal header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-terminal-border">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-terminal-textSecondary text-sm font-mono">
            MariyaOS Terminal
          </div>
        </div>

        {/* Boot messages */}
        <div className="space-y-2 font-mono text-terminal-text">
          {bootLines.slice(0, currentLine + 1).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2"
            >
              <span className="text-terminal-accent">{'>'}</span>
              <span className="text-terminal-text">{line}</span>
              {index === currentLine && !isComplete && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-terminal-accent ml-1"
                >
                  _
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Loading indicator */}
        {!isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 flex items-center space-x-2"
          >
            <div className="text-terminal-textSecondary text-sm">Loading</div>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-1 h-1 bg-terminal-accent rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Complete message */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 text-center"
            >
              <div className="text-terminal-accent font-bold text-lg neon-text">
                Welcome to MariyaOS
              </div>
              <div className="text-terminal-textSecondary text-sm mt-2">
                Press any key to continue...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Skip button */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
          className="absolute bottom-8 right-8 px-4 py-2 bg-terminal-bgSecondary/50 border border-terminal-border rounded-lg text-terminal-textSecondary hover:text-terminal-accent hover:border-terminal-accent transition-colors text-sm font-mono"
        >
          Skip Boot
        </motion.button>
      )}
    </div>
  );
}
