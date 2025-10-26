"use client";

import { useState, useEffect } from 'react';
import { TerminalProvider, useTerminal } from './context/TerminalContext';
import BootAnimation from './components/BootAnimation';
import ModeSelector from './components/ModeSelector';
import Terminal from './components/Terminal';
import Adventure from './components/Adventure';
import ErrorBoundary from './components/ErrorBoundary';

function TerminalApp() {
  const { state, dispatch } = useTerminal();
  const [showBoot, setShowBoot] = useState(true);
  const [showModeSelector, setShowModeSelector] = useState(false);

  useEffect(() => {
    // Load game state from localStorage on mount
    const savedGameState = localStorage.getItem('adventure_gameState');
    if (savedGameState) {
      try {
        const gameState = JSON.parse(savedGameState);
        dispatch({ type: 'LOAD_GAME_STATE', payload: gameState });
      } catch (e) {
        console.error('Failed to load game state:', e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Save game state to localStorage whenever it changes
    if (state.gameState && state.appMode === 'adventure') {
      localStorage.setItem('adventure_gameState', JSON.stringify(state.gameState));
    }
  }, [state.gameState, state.appMode]);

  const handleBootComplete = () => {
    setShowBoot(false);
    dispatch({ type: 'SET_BOOTED', payload: true });
    setShowModeSelector(true);
  };

  const handleModeSelect = (mode: 'terminal' | 'adventure') => {
    dispatch({ type: 'SET_APP_MODE', payload: mode });
    dispatch({ type: 'SET_BOOTED', payload: true });
    setShowModeSelector(false);
  };

  if (showBoot) {
    return <BootAnimation onComplete={handleBootComplete} />;
  }

  if (showModeSelector && !state.isBooted) {
    return <ModeSelector onSelect={handleModeSelect} />;
  }

  if (state.appMode === 'adventure') {
    return <Adventure />;
  }

  return <Terminal />;
}

export default function Home() {
  return (
    <ErrorBoundary>
      <TerminalProvider>
        <TerminalApp />
      </TerminalProvider>
    </ErrorBoundary>
  );
}
