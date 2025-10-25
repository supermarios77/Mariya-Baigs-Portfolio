"use client";

import { useState } from 'react';
import { TerminalProvider, useTerminal } from './context/TerminalContext';
import BootAnimation from './components/BootAnimation';
import Terminal from './components/Terminal';
import ErrorBoundary from './components/ErrorBoundary';

function TerminalApp() {
  const { dispatch } = useTerminal();
  const [showBoot, setShowBoot] = useState(true);

  const handleBootComplete = () => {
    setShowBoot(false);
    dispatch({ type: 'SET_BOOTED', payload: true });
  };

  if (showBoot) {
    return <BootAnimation onComplete={handleBootComplete} />;
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
