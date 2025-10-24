"use client";

import { TerminalState } from '../context/TerminalContext';
import HelpCommand from './commands/HelpCommand';
import AboutCommand from './commands/AboutCommand';
import ProjectsCommand from './commands/ProjectsCommand';
import ContactCommand from './commands/ContactCommand';
import AICommand from './commands/AICommand';
import ClearCommand from './commands/ClearCommand';
import ThemeCommand from './commands/ThemeCommand';
import SoundCommand from './commands/SoundCommand';
import EasterEggCommands from './commands/EasterEggCommands';

export default function CommandHandler(input: string, state: TerminalState): React.ReactNode {
  const [command, ...args] = input.trim().split(' ');

  const commands: Record<string, (args: string[], state: TerminalState) => React.ReactNode> = {
    help: HelpCommand,
    about: AboutCommand,
    projects: ProjectsCommand,
    contact: ContactCommand,
    ai: AICommand,
    clear: ClearCommand,
    theme: ThemeCommand,
    sound: SoundCommand,
    // Easter eggs
    sudo: EasterEggCommands.sudo,
    coffee: EasterEggCommands.coffee,
    motivation: EasterEggCommands.motivation,
    paint: EasterEggCommands.paint,
    geography: EasterEggCommands.geography,
    // AI mode commands
    exit: AICommand.exit,
  };

  const commandHandler = commands[command.toLowerCase()];
  
  if (commandHandler) {
    return commandHandler(args, state);
  }

  // Unknown command
  return (
    <div className="text-red-400">
      <div>Command not found: {command}</div>
      <div className="text-terminal-green mt-1">
        Type <span className="text-terminal-accent">help</span> to see available commands
      </div>
    </div>
  );
}
