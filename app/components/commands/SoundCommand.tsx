"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function SoundCommand(args: string[], state: TerminalState): React.ReactNode {
  const action = args[0]?.toLowerCase();

  if (!action) {
    return (
      <div className="space-y-2">
        <div className="text-terminal-accent font-bold">Sound Settings:</div>
        <div className="text-terminal-text">
          Current status: <span className={state.soundEnabled ? 'text-terminal-green' : 'text-red-400'}>
            {state.soundEnabled ? 'ON' : 'OFF'}
          </span>
        </div>
        <div className="text-terminal-text text-sm mt-2">
          Usage: <span className="text-terminal-accent">sound [on|off|toggle]</span>
        </div>
      </div>
    );
  }

  if (action === 'toggle' || action === 'on' || action === 'off') {
    const newState = action === 'toggle' ? !state.soundEnabled : action === 'on';
    return (
      <div className="text-terminal-green">
        Sound effects <span className="text-terminal-accent">{newState ? 'enabled' : 'disabled'}</span>.
      </div>
    );
  }

  return (
    <div className="text-red-400">
      Invalid action: {action}. Use: on, off, or toggle
    </div>
  );
}
