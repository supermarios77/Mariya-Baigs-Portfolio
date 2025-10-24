"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function ClearCommand(args: string[], state: TerminalState): React.ReactNode {
  return (
    <div className="text-terminal-green">
      Terminal cleared. Type <span className="text-terminal-accent">help</span> to see available commands.
    </div>
  );
}
