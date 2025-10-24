"use client";

import { CommandHistoryItem, useTerminal } from '../context/TerminalContext';

interface CommandOutputProps {
  item: CommandHistoryItem;
}

export default function CommandOutput({ item }: CommandOutputProps) {
  const { state } = useTerminal();

  if (item.type === 'input') {
    const promptColor = state.mode === 'AI' 
      ? 'text-ai-accent' 
      : state.theme === 'electric' 
        ? 'text-terminal-green' 
        : 'text-terminal-green';
    
    const hostname = state.mode === 'AI' 
      ? 'AI' 
      : state.theme === 'electric' 
        ? 'neuralos' 
        : 'terminal';

    return (
      <div className={promptColor}>
        {state.mode === 'AI' ? 'AI:~$' : `visitor@${hostname}:~$`} {item.content}
      </div>
    );
  }

  const textColor = state.mode === 'AI' 
    ? 'text-ai-text' 
    : state.theme === 'electric' 
      ? 'text-terminal-text' 
      : 'text-terminal-green';

  return (
    <div className={textColor}>
      {item.content}
    </div>
  );
}
