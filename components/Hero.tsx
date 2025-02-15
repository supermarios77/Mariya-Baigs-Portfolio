"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Typed from "typed.js";
import { Code2, Rocket, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS, STATS } from "@/constants";

export default function Hero() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Certified TensorFlow Developer",
        "Fullstack Web Developer",
        "Python Programmer",
        "iOS Developer",
        "Machine Learning Engineer",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="inline-block bg-[#FFE66D] px-6 py-3 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-bold text-black flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Hello, I&apos;m Mariya Baig
            </h2>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white leading-tight">
            I create{" "}
            <span className="bg-[#FF6B6B] px-4 py-2 rounded-xl border-4 border-black inline-block transform -rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              awesome
            </span>
            {" "}digital experiences
          </h1>

          <div className="bg-[#4ECDC4] p-4 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-2xl md:text-3xl font-bold text-black">
              <span ref={el}></span>
            </span>
          </div>

          <p className="text-xl text-black dark:text-white font-medium">
            At just 13, I&apos;m on a mission to change the world through code.
            Join me on this exciting journey of creativity and innovation!
          </p>

          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg"
              className="bg-black text-white border-4 border-black rounded-xl font-bold text-lg px-8 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px]"
            >
              <Code2 className="mr-2 h-5 w-5" />
              View Projects
            </Button>
            <Button 
              size="lg"
              className="bg-[#95E1D3] text-black border-4 border-black rounded-xl font-bold text-lg px-8 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px]"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Let&apos;s Connect
            </Button>
          </div>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${platform.color} p-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px]`}
              >
                <platform.icon className="h-6 w-6 text-black" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-6">
            {STATS.map((stat, index) => (
              <div
                key={stat.title}
                className={`${stat.color} p-6 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
              >
                <h3 className="text-xl font-bold text-black mb-2">{stat.title}</h3>
                <p className="text-3xl font-black text-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

