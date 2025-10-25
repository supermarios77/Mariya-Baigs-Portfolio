"use client";

import { CommandHistoryItem, useTerminal } from '../context/TerminalContext';

interface CommandOutputProps {
  item: CommandHistoryItem;
}

export default function CommandOutput({ item }: CommandOutputProps) {
  const { state } = useTerminal();

  if (item.type === 'input') {
    const promptColor = state.mode === 'AI'
      ? 'text-ai-accent text-glow'
      : 'text-terminal-accent text-glow';

    const hostname = state.mode === 'AI'
      ? 'AI:~$'
      : 'visitor@mariyaos:~$';

    return (
      <div className={promptColor}>
        {hostname} {item.content}
      </div>
    );
  }

  const textColor = state.mode === 'AI'
    ? 'text-ai-text'
    : 'text-terminal-text';

  return (
    <div className={textColor}>
      {item.content}
    </div>
  );
}
