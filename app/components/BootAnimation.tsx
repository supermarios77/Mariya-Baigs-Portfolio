"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BootAnimationProps {
  onComplete: () => void;
}

const bootLines = [
  "Booting MariyaOS v1.4...",
  "Initializing modules...",
  "Loading AI subsystems...",
  "Connecting to neural networks...",
  "System ready.",
];

export default function BootAnimation({ onComplete }: BootAnimationProps) {
  const [currentLine, setCurrentLine] = useState(0);
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
      }, 600);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentLine, onComplete]);

  return (
    <div className="fixed inset-0 bg-terminal-bg flex items-center justify-center z-50">
      <div className="text-terminal-text font-mono text-lg">
        {bootLines.slice(0, currentLine + 1).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-1"
          >
            {line}
            {index === currentLine && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                _
              </motion.span>
            )}
          </motion.div>
        ))}
        
        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onComplete}
            className="mt-8 text-terminal-green hover:text-terminal-accent transition-colors text-sm"
          >
            [Press any key to skip]
          </motion.button>
        )}
      </div>
    </div>
  );
}
