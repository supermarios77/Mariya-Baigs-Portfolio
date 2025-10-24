"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function AboutCommand(args: string[], state: TerminalState): React.ReactNode {
  return (
    <div className="space-y-4">
      <div className="text-terminal-accent font-bold text-lg">
        Mariya Baig
      </div>
      
      <div className="text-terminal-text">
        Full-stack developer with advanced AI/ML expertise, blending technical precision 
        with creative problem-solving. Currently exploring the intersection of artificial 
        intelligence and human creativity.
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Core Skills:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="text-terminal-accent">Frontend:</div>
            <div className="text-terminal-text ml-4">Next.js, React, TypeScript</div>
          </div>
          <div className="space-y-1">
            <div className="text-terminal-accent">Backend:</div>
            <div className="text-terminal-text ml-4">Node.js, Express.js, PostgreSQL, MongoDB</div>
          </div>
          <div className="space-y-1">
            <div className="text-terminal-accent">AI/ML:</div>
            <div className="text-terminal-text ml-4">TensorFlow (certified), PyTorch</div>
          </div>
          <div className="space-y-1">
            <div className="text-terminal-accent">Other:</div>
            <div className="text-terminal-text ml-4">Python, Rust (learning), iOS dev, Digital Marketing</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Currently Learning:</div>
        <div className="text-terminal-text">
          • Rust programming language<br/>
          • Arabic language<br/>
          • Advanced neural network architectures
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Philosophy:</div>
        <div className="text-terminal-text italic">
          "Code is poetry written in logic. Every function tells a story, 
          every algorithm solves a puzzle, and every bug is just a feature 
          waiting to be discovered."
        </div>
      </div>

      <div className="text-terminal-violet text-sm">
        Type <span className="text-terminal-accent">projects</span> to see my work, 
        or <span className="text-terminal-accent">ai</span> to chat with my AI assistant.
      </div>
    </div>
  );
}
