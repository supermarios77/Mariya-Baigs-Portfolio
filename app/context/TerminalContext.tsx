"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type TerminalMode = 'CLI' | 'AI';

export interface CommandHistoryItem {
  id: string;
  type: 'input' | 'output';
  content: string | React.ReactNode;
  timestamp: Date;
}

export interface TerminalState {
  mode: TerminalMode;
  history: CommandHistoryItem[];
  currentInput: string;
  historyIndex: number;
  isBooted: boolean;
  soundEnabled: boolean;
  theme: 'cyan' | 'violet' | 'emerald' | 'amber';
}

type TerminalAction =
  | { type: 'ADD_HISTORY_ITEM'; payload: CommandHistoryItem }
  | { type: 'SET_CURRENT_INPUT'; payload: string }
  | { type: 'SET_MODE'; payload: TerminalMode }
  | { type: 'SET_BOOTED'; payload: boolean }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'SET_HISTORY_INDEX'; payload: number }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_THEME'; payload: 'cyan' | 'violet' | 'emerald' | 'amber' };

const initialState: TerminalState = {
  mode: 'CLI',
  history: [],
  currentInput: '',
  historyIndex: -1,
  isBooted: false,
  soundEnabled: true,
  theme: 'cyan',
};

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
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
