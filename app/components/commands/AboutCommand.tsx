"use client";

import { TerminalState } from '../../context/TerminalContext';

export default function AboutCommand(_args: string[], _state: TerminalState): React.ReactNode {
  return (
    <div className="space-y-4">
      <div className="text-terminal-accent font-bold text-lg">
        Mariya Baig
      </div>
      
      <div className="text-terminal-text">
        I&apos;m a 14-year-old homeschooled developer with a passion for technology and learning. 
        I&apos;m the youngest certified TensorFlow developer and love building things that solve 
        real problems. Currently preparing for my GCSEs while exploring the fascinating world 
        of AI and machine learning.
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
            <div className="text-terminal-text ml-4">Node.js, Express.js, PostgreSQL, MongoDB</div>
          </div>
          <div className="space-y-1">
            <div className="text-terminal-accent">AI/ML:</div>
            <div className="text-terminal-text ml-4">TensorFlow (certified), PyTorch, Python</div>
          </div>
          <div className="space-y-1">
            <div className="text-terminal-accent">Mobile & Other:</div>
            <div className="text-terminal-text ml-4">iOS (Swift/SwiftUI), Digital Marketing</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Currently Learning:</div>
        <div className="text-terminal-text">
          • Rust programming language<br/>
          • Arabic language<br/>
          • Advanced neural network architectures<br/>
          • Preparing for GCSEs (aiming to complete by next year)
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Academic Journey:</div>
        <div className="text-terminal-text">
          I&apos;m homeschooled and currently in Year 9. I&apos;ve finished my &quot;First Aid in Maths&quot; book 
          and am now working through Geography (learning about rocks!). I&apos;m honest about my 
          academic challenges - I struggle with subjects like Science, Geography, and History 
          because I don&apos;t get instant results or motivation from them. I&apos;m fine with basic Math 
          but need to work on Algebra. Programming gives me that instant feedback I crave!
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Hobbies & Interests:</div>
        <div className="text-terminal-text">
          • Painting and drawing<br/>
          • Writing stories<br/>
          • Reading (Harry Potter, Percy Jackson, Heroes of Olympus, Hitchhiker's Guide to Galaxy, and many more)<br/>
          • Exploring new technologies<br/>
          • Building creative projects
        </div>
      </div>

      <div>
        <div className="text-terminal-green font-bold mb-2">Philosophy:</div>
        <div className="text-terminal-text italic">
          &quot;I love programming because it gives me instant results and feedback. When I code, 
          I can see my ideas come to life immediately. Traditional subjects don&apos;t give me 
          that same satisfaction, but I&apos;m working on finding ways to make them more engaging 
          for myself.&quot;
        </div>
      </div>

      <div className="text-terminal-violet text-sm">
        Type <span className="text-terminal-accent">projects</span> to see my work, 
        <span className="text-terminal-accent"> ai</span> to chat with my AI assistant, or 
        <span className="text-terminal-accent"> contact</span> to get in touch!
      </div>
    </div>
  );
}
