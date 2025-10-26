"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal, type TerminalAction } from '../context/TerminalContext';
import { useSound } from '../hooks/useSound';

interface Location {
  name: string;
  description: string;
  exits: { direction: string; destination: string }[];
  items: string[];
  lore?: string;
}

const locations: Record<string, Location> = {
  hallway: {
    name: 'Main Hallway',
    description: 'You are in a wide, modern corridor. Soft light emanates from the walls. There are doors to the north, south, east, and west.',
    exits: [
      { direction: 'north', destination: 'lab' },
      { direction: 'east', destination: 'shelves' },
      { direction: 'south', destination: 'cores' },
      { direction: 'west', destination: 'hub' },
    ],
    items: [],
  },
  lab: {
    name: 'AI Lab',
    description: 'A state-of-the-art AI research facility. Holographic displays float in the air, showing neural network architectures.',
    lore: 'This is Mariya\'s core workspace. The youngest certified TensorFlow developer operates from here, building next-generation AI systems.',
    exits: [
      { direction: 'south', destination: 'hallway' },
      { direction: 'east', destination: 'secret' },
    ],
    items: ['TensorFlow Badge', 'Neural Network Blueprint'],
  },
  shelves: {
    name: 'Project Shelves',
    description: 'Rows of glowing project cards line the walls. Each card pulses with activity metrics and user engagement data.',
    lore: 'All of Mariya\'s projects live here. From IconLab (AI-powered icon generation) to Tasbihly (iOS counting app), innovation never stops.',
    exits: [
      { direction: 'west', destination: 'hallway' },
    ],
    items: ['IconLab Card', 'Tasbihly Card', 'Future Project Portal'],
  },
  cores: {
    name: 'System Cores',
    description: 'A circular chamber with towering skill cores rotating slowly. Each core glows with expertise level indicators.',
    lore: 'These cores represent different technologies Mariya has mastered: Next.js, React, TypeScript, Python, MongoDB, and more.',
    exits: [
      { direction: 'north', destination: 'hallway' },
    ],
    items: ['Next.js Core', 'React Core', 'TypeScript Core', 'Python Core'],
  },
  hub: {
    name: 'Communication Hub',
    description: 'A sleek interface connects you to the outside world. Contact forms, email clients, and social media links shimmer on display.',
    lore: 'Want to reach out? This is where collaboration begins. Mariya is always open to new projects and exciting opportunities.',
    exits: [
      { direction: 'east', destination: 'hallway' },
    ],
    items: ['Contact Form', 'LinkedIn Link', 'GitHub Access'],
  },
  secret: {
    name: 'Hidden Chamber',
    description: 'A secret room! The walls are covered with achievement certificates and hidden project prototypes. This is clearly the result of dedication.',
    lore: 'You\'ve found Mariya\'s treasure chamber. Years of learning, building, and pushing boundaries are archived here.',
    exits: [
      { direction: 'west', destination: 'lab' },
    ],
    items: ['TensorFlow Certificate', 'Hidden Project #1', 'Secret Achievement'],
  },
};

const commands = {
  look: (location: Location) => {
    let result = location.description;
    if (location.lore) {
      result += `\n\n💡 ${location.lore}`;
    }
    if (location.items.length > 0) {
      result += `\n\n📦 Items here: ${location.items.join(', ')}`;
    }
    result += `\n\n🚪 Exits: ${location.exits.map(e => e.direction).join(', ')}`;
    return result;
  },
  
  go: (location: Location, direction: string, gameState: { discoveredAreas: string[] }, dispatch: React.Dispatch<TerminalAction>) => {
    const exit = location.exits.find(e => 
      e.direction.toLowerCase() === direction.toLowerCase() ||
      e.direction.toLowerCase().startsWith(direction.toLowerCase())
    );
    
    if (!exit) {
      return `❌ Can't go ${direction}. Try: ${location.exits.map(e => e.direction).join(', ')}`;
    }
    
    const newLocation = locations[exit.destination];
    if (!gameState.discoveredAreas.includes(exit.destination)) {
      dispatch({ type: 'ADD_XP', payload: 10 });
      dispatch({ type: 'DISCOVER_AREA', payload: exit.destination });
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'Explorer' });
    }
    dispatch({ type: 'CHANGE_LOCATION', payload: exit.destination });
    dispatch({ type: 'ADD_XP', payload: 5 });
    
    return `You move ${exit.direction} to the ${newLocation.name}.\n\n${newLocation.description}`;
  },
  
  inspect: (location: Location, item: string) => {
    const foundItem = location.items.find(i => 
      i.toLowerCase().includes(item.toLowerCase())
    );
    
    if (!foundItem) {
      return `❌ No "${item}" found here. Items available: ${location.items.length > 0 ? location.items.join(', ') : 'none'}`;
    }
    
    const itemDescriptions: Record<string, string> = {
      'TensorFlow Badge': 'A golden badge certifying expertise in TensorFlow. The youngest certified developer! Try: take',
      'IconLab Card': 'An AI-powered icon generator. Visit iconlab.site to see it in action. Try: take',
      'Tasbihly Card': 'An elegant iOS app for spiritual counting. Beautiful design meets functionality. Try: take',
      'Next.js Core': 'Advanced React framework expertise. Master of server-side rendering. Try: take',
      'React Core': 'The UI library power of the modern web. Component-driven development. Try: take',
      'TypeScript Core': 'Type-safe JavaScript at scale. Try: take',
      'Python Core': 'Data science and ML expertise. Try: take',
      'Contact Form': 'Ready to collaborate? Reach out through the comm hub!',
      'LinkedIn Link': 'Professional network connection. Try: take',
      'GitHub Access': 'Open source contributions. Try: take',
      'TensorFlow Certificate': '🎉 CERTIFIED: Google TensorFlow Developer - Youngest Ever',
      'Hidden Project #1': 'A prototype of something amazing... Try: take',
      'Secret Achievement': '🌟 Achievement Unlocked: Deep Explorer',
      'Neural Network Blueprint': 'Deep learning architecture diagrams. Try: take',
      'Future Project Portal': 'Glimpse into upcoming innovations. Try: take',
    };
    
    return itemDescriptions[foundItem] || `A ${foundItem}. It looks interesting! Type 'take ${foundItem}' to collect it.`;
  },
  
  take: (location: Location, item: string, gameState: { inventory: string[] }, dispatch: React.Dispatch<TerminalAction>) => {
    const foundItem = location.items.find(i => 
      i.toLowerCase().includes(item.toLowerCase())
    );
    
    if (!foundItem) {
      return `❌ No "${item}" found here. Items available: ${location.items.length > 0 ? location.items.join(', ') : 'none'}`;
    }
    
    const alreadyTaken = gameState.inventory.includes(foundItem);
    if (alreadyTaken) {
      return `You already have the ${foundItem} in your inventory!`;
    }
    
    dispatch({ type: 'ADD_TO_INVENTORY', payload: foundItem });
    dispatch({ type: 'ADD_XP', payload: 15 });
    
    // Check for collection achievements
    const newInventoryLength = gameState.inventory.length + 1;
    if (newInventoryLength === 1) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'First Item' });
    } else if (newInventoryLength === 5) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'Collector' });
    } else if (newInventoryLength === 10) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'Master Collector' });
    }
    
    const itemMessages: Record<string, string> = {
      'TensorFlow Badge': '🎖️ You collect the TensorFlow Badge! +15 XP. This proves expertise!',
      'IconLab Card': '🎨 You collect the IconLab Card! +15 XP. Innovation captured!',
      'Tasbihly Card': '📱 You collect the Tasbihly Card! +15 XP. Beautiful design preserved!',
      'Next.js Core': '⚡ You collect the Next.js Core! +15 XP. Framework mastery!',
      'React Core': '⚛️ You collect the React Core! +15 XP. UI library power!',
      'TypeScript Core': '📘 You collect the TypeScript Core! +15 XP. Type safety achieved!',
      'Python Core': '🐍 You collect the Python Core! +15 XP. Data science unlocked!',
      'LinkedIn Link': '🔗 You collect the LinkedIn Link! +15 XP. Network connected!',
      'GitHub Access': '💻 You collect the GitHub Access! +15 XP. Open source ready!',
      'Neural Network Blueprint': '🧠 You collect the Neural Network Blueprint! +15 XP. Deep learning secured!',
      'Future Project Portal': '🔮 You collect the Future Project Portal! +15 XP. Innovation ahead!',
      'Hidden Project #1': '🎁 You collect the Hidden Project! +15 XP. Secret discovered!',
    };
    
    return itemMessages[foundItem] || `📦 You collect ${foundItem}! +15 XP`;
  },
  
  inventory: (gameState: { inventory: string[] }) => {
    if (gameState.inventory.length === 0) {
      return 'Your inventory is empty. Explore to find items!';
    }
    return `📦 Inventory:\n${gameState.inventory.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n')}`;
  },
  
  status: (gameState: { level: number; xp: number; location: string; discoveredAreas: string[]; achievements: string[]; inventory: string[] }) => {
    return `🎮 Status\n━━━━━━━━━━━━━━━━\nLevel: ${gameState.level}\nXP: ${gameState.xp}\nLocation: ${gameState.location}\nItems Collected: ${gameState.inventory.length}\nAreas Discovered: ${gameState.discoveredAreas.length}\nAchievements: ${gameState.achievements.length > 0 ? gameState.achievements.join(', ') : 'None yet'}\n\nNext Level: ${((gameState.level * 100) - gameState.xp)} XP needed`;
  },
  
  help: () => {
    return `🎮 Adventure Mode Commands:\n━━━━━━━━━━━━━━━━\n📝 look         - Describe current location\n🚶 go [direction] - Move to another area (north/south/east/west)\n🔍 inspect [item] - Examine an item\n📥 take [item]    - Collect an item (+15 XP!)\n📦 inventory     - Show your inventory\n📊 status        - Show XP and achievements\n🎭 sudo          - Secret: Root access\n🌌 matrix        - Secret: Enter the simulation\n❓ help          - Show this help\n🏠 exit          - Return to terminal mode\n\n💡 Collect items to gain XP and unlock achievements!`;
  },
  
  sudo: () => {
    return `🎭 Secret Command Activated!\n\nYou found the sudo command. You have achieved:\n\n🌟 ROOT ACCESS\n🌟 Super User Mode\n🌟 Behind the Scenes\n\nYou are now in developer mode. Explore hidden areas!`;
  },
  
  matrix: () => {
    return `🌌 MATRIX MODE ACTIVATED\n\n01101000 01100101 01101100 01101100 01101111\n\nYou've discovered the source code.\n\nMariya's portfolio runs on:\n• Next.js 15\n• TypeScript\n• Framer Motion\n• Gemini AI\n\nThe simulation is stable. Continue exploring.`;
  },
};

export default function Adventure() {
  const { state, dispatch } = useTerminal();
  const [input, setInput] = useState('');
  const [isNarrating, setIsNarrating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { playTypingSound, playCommandSound } = useSound();

  useEffect(() => {
    if (state.isBooted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isBooted]);

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
    } else if (e.key.length === 1) {
      playTypingSound(state.soundEnabled);
    }
  };

  const navigateHistory = useCallback((direction: number) => {
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
  }, [state.historyIndex, state.history, dispatch]);

  const executeCommand = useCallback(async () => {
    const command = input.trim().toLowerCase();
    if (!command) return;

    const location = locations[state.gameState.location];
    
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

    let output: string | React.ReactNode = '';

    // Handle commands
    if (command === 'exit' || command === 'quit') {
      dispatch({ type: 'SET_APP_MODE', payload: 'terminal' });
      setInput('');
      return;
    } else if (command === 'clear') {
      dispatch({ type: 'CLEAR_HISTORY' });
      setInput('');
      dispatch({ type: 'SET_HISTORY_INDEX', payload: -1 });
      return;
    } else if (command === 'look' || command === 'l') {
      output = commands.look(location);
    } else if (command.startsWith('go ')) {
      const direction = command.split(' ')[1];
      output = commands.go(location, direction, state.gameState, dispatch);
    } else if (command.startsWith('inspect ')) {
      const item = command.replace('inspect ', '');
      output = commands.inspect(location, item);
    } else if (command.startsWith('take ')) {
      const item = command.replace('take ', '');
      output = commands.take(location, item, state.gameState, dispatch);
    } else if (command === 'inventory' || command === 'inv' || command === 'i') {
      output = commands.inventory(state.gameState);
    } else if (command === 'status' || command === 'stat') {
      output = commands.status(state.gameState);
    } else if (command === 'help' || command === 'h' || command === '?') {
      output = commands.help();
    } else if (command === 'sudo') {
      output = commands.sudo();
      dispatch({ type: 'ADD_XP', payload: 50 });
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'Root Access' });
    } else if (command === 'matrix') {
      output = commands.matrix();
      dispatch({ type: 'ADD_XP', payload: 30 });
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'The Matrix' });
    } else if (command === 'clear') {
      dispatch({ type: 'CLEAR_HISTORY' });
      setInput('');
      return;
    } else {
      // Unknown command - use AI narrator as fallback
      setIsNarrating(true);
      try {
        const response = await fetch('/api/adventure-narrator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            command,
            locationName: location.name,
            locationDescription: location.description,
            inventory: state.gameState.inventory,
            xp: state.gameState.xp,
          }),
        });
        const data = await response.json();
        output = data.response || `❌ Unknown command: "${command}". Type 'help' for available commands.`;
      } catch {
        output = `❌ The narrator falls silent. Try 'help' for available commands.`;
      } finally {
        setIsNarrating(false);
      }
    }

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
  }, [input, state, dispatch]);

  useEffect(() => {
    if (state.history.length === 0 && state.appMode === 'adventure') {
      const location = locations[state.gameState.location];
      dispatch({
        type: 'ADD_HISTORY_ITEM',
        payload: {
          id: `welcome-${Date.now()}`,
          type: 'output',
          content: `🎮 Welcome to Adventure Mode!\n━━━━━━━━━━━━━━━━\n\nYou are in the ${location.name}.\n\n${location.description}\n\nType 'help' for commands or 'look' to examine your surroundings.`,
          timestamp: new Date(),
        },
      });
    }
  }, [state.history.length, state.appMode, state.gameState.location, dispatch]);

  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
      <div className="terminal-window w-full max-w-4xl">
        {/* Title Bar */}
        <div className="title-bar relative px-4 py-3 flex items-center justify-between">
          <div className="window-dots">
            <div className="window-dot red"></div>
            <div className="window-dot yellow"></div>
            <div className="window-dot green"></div>
          </div>
          <div className="text-terminal-secondary text-sm font-medium">
            MariyaOS — Adventure Mode
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-terminal-secondary">
              Level {state.gameState.level} • {state.gameState.xp} XP
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_APP_MODE', payload: 'terminal' })}
              className="text-xs text-terminal-secondary hover:text-terminal-accent transition-colors px-2 py-1 border border-terminal-border rounded hover:border-terminal-accent"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Output Area */}
          <div 
            ref={terminalRef}
            className="overflow-y-auto mb-4 space-y-1 min-h-[400px] max-h-[500px] font-mono text-sm leading-relaxed"
          >
            <AnimatePresence>
              {state.history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.type === 'input' ? (
                    <div className="text-terminal-accent">
                      &gt; {item.content}
                    </div>
                  ) : (
                    <div className="text-terminal-text whitespace-pre-line">
                      {item.content}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Line */}
          <div className="flex items-center">
            <span className="text-terminal-accent font-mono">
              adventure@{state.gameState.location}:~$&nbsp;
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isNarrating}
              className="flex-1 bg-transparent outline-none text-terminal-text caret-terminal-accent disabled:opacity-50"
              autoComplete="off"
              spellCheck="false"
              placeholder={isNarrating ? "AI Narrator thinking..." : "Type a command..."}
            />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-0.5 h-4 bg-terminal-accent ml-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

