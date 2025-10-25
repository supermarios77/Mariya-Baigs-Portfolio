"use client";

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
      <div className="terminal-window w-full max-w-2xl p-6">
        <div className="text-center space-y-4">
          <div className="text-red-400 text-xl font-bold">
            ⚠️ Terminal Error
          </div>
          <div className="text-terminal-text">
            Something went wrong with the terminal interface.
          </div>
          <div className="text-terminal-secondary text-sm">
            {error.message}
          </div>
          <button
            onClick={resetError}
            className="px-4 py-2 bg-terminal-accent/20 text-terminal-accent border border-terminal-accent/30 rounded hover:bg-terminal-accent/30 transition-colors"
          >
            Restart Terminal
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
