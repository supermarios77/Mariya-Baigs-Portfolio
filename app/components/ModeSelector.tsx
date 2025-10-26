"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

export type SelectedMode = 'terminal' | 'adventure' | null;

interface ModeSelectorProps {
  onSelect: (mode: 'terminal' | 'adventure') => void;
}

export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  const [hoveredMode, setHoveredMode] = useState<'terminal' | 'adventure' | null>(null);

  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
      <div className="terminal-window w-full max-w-3xl">
        {/* macOS-style Title Bar */}
        <div className="title-bar relative px-4 py-3 flex items-center justify-between">
          <div className="window-dots">
            <div className="window-dot red"></div>
            <div className="window-dot yellow"></div>
            <div className="window-dot green"></div>
          </div>
          <div className="text-terminal-secondary text-sm font-medium">
            MariyaOS — Mode Selector
          </div>
          <div className="w-12"></div> {/* Spacer */}
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-terminal-accent font-mono">
                MariyaOS — v1.5
              </h1>
              <p className="text-terminal-secondary text-sm">
                Select your interface mode
              </p>
            </div>

            {/* Mode Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Terminal Mode */}
              <motion.button
                onHoverStart={() => setHoveredMode('terminal')}
                onHoverEnd={() => setHoveredMode(null)}
                onClick={() => onSelect('terminal')}
                className="group relative border border-terminal-border rounded-lg p-6 text-left hover:border-terminal-accent transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="text-terminal-accent text-2xl font-bold font-mono">
                      &gt;
                    </div>
                    <h2 className="text-xl font-bold text-terminal-text">
                      Terminal Mode
                    </h2>
                  </div>
                  <p className="text-terminal-secondary text-sm leading-relaxed">
                    Fast, minimal, professional. Classic terminal interface with
                    commands, AI chat, and instant navigation.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['help', 'about', 'projects', 'ai'].map((cmd) => (
                      <span
                        key={cmd}
                        className="px-2 py-1 bg-terminal-accent/10 text-terminal-accent/70 text-xs rounded border border-terminal-accent/20"
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>
                {hoveredMode === 'terminal' && (
                  <motion.div
                    layoutId="hover"
                    className="absolute inset-0 border-2 border-terminal-accent/30 rounded-lg pointer-events-none"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>

              {/* Adventure Mode */}
              <motion.button
                onHoverStart={() => setHoveredMode('adventure')}
                onHoverEnd={() => setHoveredMode(null)}
                onClick={() => onSelect('adventure')}
                className="group relative border border-terminal-border rounded-lg p-6 text-left hover:border-terminal-accent transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="text-terminal-accent text-2xl font-bold font-mono">
                      🎮
                    </div>
                    <h2 className="text-xl font-bold text-terminal-text">
                      Adventure Mode
                    </h2>
                  </div>
                  <p className="text-terminal-secondary text-sm leading-relaxed">
                    Explore an interactive text-based game. Visit labs, discover
                    projects, unlock achievements, and level up your XP.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['look', 'go left', 'inspect', 'open'].map((cmd) => (
                      <span
                        key={cmd}
                        className="px-2 py-1 bg-violet-500/10 text-violet-400/70 text-xs rounded border border-violet-500/20"
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>
                {hoveredMode === 'adventure' && (
                  <motion.div
                    layoutId="hover"
                    className="absolute inset-0 border-2 border-violet-500/30 rounded-lg pointer-events-none"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <div className="text-center text-terminal-secondary text-xs border-t border-terminal-border pt-6">
              <p>Both modes feature the same content in different experiences.</p>
              <p className="mt-1">You can switch modes anytime via the main menu.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

