"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type TerminalMode = 'CLI' | 'AI';
export type AppMode = 'terminal' | 'adventure';

export interface CommandHistoryItem {
  id: string;
  type: 'input' | 'output';
  content: string | React.ReactNode;
  timestamp: Date;
}

export interface GameState {
  xp: number;
  level: number;
  location: string;
  inventory: string[];
  discoveredAreas: string[];
  achievements: string[];
}

export interface TerminalState {
  appMode: AppMode;
  mode: TerminalMode;
  history: CommandHistoryItem[];
  currentInput: string;
  historyIndex: number;
  isBooted: boolean;
  soundEnabled: boolean;
  theme: 'cyan' | 'violet' | 'emerald' | 'amber';
  gameState: GameState;
}

export type TerminalAction =
  | { type: 'SET_APP_MODE'; payload: AppMode }
  | { type: 'ADD_HISTORY_ITEM'; payload: CommandHistoryItem }
  | { type: 'SET_CURRENT_INPUT'; payload: string }
  | { type: 'SET_MODE'; payload: TerminalMode }
  | { type: 'SET_BOOTED'; payload: boolean }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'SET_HISTORY_INDEX'; payload: number }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_THEME'; payload: 'cyan' | 'violet' | 'emerald' | 'amber' }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'CHANGE_LOCATION'; payload: string }
  | { type: 'ADD_TO_INVENTORY'; payload: string }
  | { type: 'DISCOVER_AREA'; payload: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'LOAD_GAME_STATE'; payload: GameState };

const initialState: TerminalState = {
  appMode: 'terminal',
  mode: 'CLI',
  history: [],
  currentInput: '',
  historyIndex: -1,
  isBooted: false,
  soundEnabled: true,
  theme: 'cyan',
  gameState: {
    xp: 0,
    level: 1,
    location: 'hallway',
    inventory: [],
    discoveredAreas: ['hallway'],
    achievements: [],
  },
};

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case 'SET_APP_MODE':
      return {
        ...state,
        appMode: action.payload,
        history: [],
        historyIndex: -1,
      };
    case 'ADD_HISTORY_ITEM':
      return {
        ...state,
        history: [...state.history, action.payload],
        historyIndex: -1,
      };
    case 'SET_CURRENT_INPUT':
      return {
        ...state,
        currentInput: action.payload,
      };
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
      };
    case 'SET_BOOTED':
      return {
        ...state,
        isBooted: action.payload,
      };
    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
        historyIndex: -1,
      };
    case 'SET_HISTORY_INDEX':
      return {
        ...state,
        historyIndex: action.payload,
      };
    case 'TOGGLE_SOUND':
      return {
        ...state,
        soundEnabled: !state.soundEnabled,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'ADD_XP':
      const newXP = state.gameState.xp + action.payload;
      const newLevel = Math.floor(newXP / 100) + 1;
      return {
        ...state,
        gameState: {
          ...state.gameState,
          xp: newXP,
          level: newLevel,
        },
      };
    case 'CHANGE_LOCATION':
      return {
        ...state,
        gameState: {
          ...state.gameState,
          location: action.payload,
        },
      };
    case 'ADD_TO_INVENTORY':
      return {
        ...state,
        gameState: {
          ...state.gameState,
          inventory: [...state.gameState.inventory, action.payload],
        },
      };
    case 'DISCOVER_AREA':
      const alreadyDiscovered = state.gameState.discoveredAreas.includes(action.payload);
      return {
        ...state,
        gameState: {
          ...state.gameState,
          discoveredAreas: alreadyDiscovered
            ? state.gameState.discoveredAreas
            : [...state.gameState.discoveredAreas, action.payload],
        },
      };
    case 'UNLOCK_ACHIEVEMENT':
      const alreadyUnlocked = state.gameState.achievements.includes(action.payload);
      return {
        ...state,
        gameState: {
          ...state.gameState,
          achievements: alreadyUnlocked
            ? state.gameState.achievements
            : [...state.gameState.achievements, action.payload],
        },
      };
    case 'LOAD_GAME_STATE':
      return {
        ...state,
        gameState: action.payload,
      };
    default:
      return state;
  }
}

const TerminalContext = createContext<{
  state: TerminalState;
  dispatch: React.Dispatch<TerminalAction>;
} | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  return (
    <TerminalContext.Provider value={{ state, dispatch }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
