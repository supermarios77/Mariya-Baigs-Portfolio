"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function AboutCommand(args: string[], state: TerminalState): React.ReactNode {
  return (
    <div className="space-y-4">
      <div className="text-terminal-accent font-bold text-lg">
        Mariya Baig
      </div>
      
      <div className="text-terminal-text">
        I'm a 14-year-old homeschooled developer with a passion for AI/ML and full-stack development. 
        Despite being young, I've already achieved certification as the youngest TensorFlow developer 
        and love building both frontend and backend applications.
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Technical Skills:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="text-terminal-accent">Frontend:</div>
            <div className="text-terminal-text ml-4">Next.js, React, TypeScript, JavaScript</div>
          </div>
          <div className="space-y-1">
            <div className="text-terminal-accent">Backend:</div>
            <div className="text-terminal-text ml-4">Node.js, Express.js, MongoDB, PostgreSQL</div>
          </div>
          <div className="space-y-1">
            <div className="text-terminal-accent">AI/ML:</div>
            <div className="text-terminal-text ml-4">TensorFlow (certified!), PyTorch, Python</div>
          </div>
          <div className="space-y-1">
            <div className="text-terminal-accent">Other:</div>
            <div className="text-terminal-text ml-4">iOS Development, Digital Marketing</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Currently Learning:</div>
        <div className="text-terminal-text">
          • Rust programming (Udemy course)<br/>
          • Arabic language<br/>
          • Preparing for GCSEs (aiming to complete by 15!)
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Academic Journey:</div>
        <div className="text-terminal-text">
          I'm homeschooled and currently in Year 9. While I excel in programming and find instant 
          motivation in coding, I'm working on subjects like Geography (currently learning about rocks!), 
          Science, and improving my Algebra skills. I've completed "First Aid in Maths" and am 
          preparing for GCSEs next year.
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Hobbies & Interests:</div>
        <div className="text-terminal-text">
          • Painting and drawing<br/>
          • Writing stories<br/>
          • Reading (completed Harry Potter, Percy Jackson, Heroes of Olympus series, and more!)<br/>
          • Building cool projects
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Philosophy:</div>
        <div className="text-terminal-text italic">
          "Age is just a number when it comes to passion. I believe in learning through building, 
          and every line of code is a step toward something amazing. The best way to learn is 
          by doing, and that's exactly what I do every day."
        </div>
      </div>

      <div className="text-terminal-violet text-sm">
        Type <span className="text-terminal-accent">projects</span> to see my work, 
        or <span className="text-terminal-accent">ai</span> to chat with my AI assistant about my journey!
      </div>
    </div>
  );
}