"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typed from "typed.js";
import { Github, Linkedin, Dribbble, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(600);
  const el = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const aspectRatio = 16 / 9; // You can adjust this ratio as needed
        const calculatedHeight = width / aspectRatio;
        setContainerHeight(Math.max(600, Math.min(calculatedHeight, 800)));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      typed.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-background rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-16" style={{ minHeight: `${containerHeight}px` }}>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-lg font-semibold px-4 py-1"
            >
              Hello, I&apos;m Mariya Baig
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
              I&apos;m a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <span ref={el}></span>
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            At just 13, I&apos;m on a mission to change the world through code.
            Join me on this exciting journey of creativity and innovation!
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="rounded-full group">
              Explore My Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              Let&apos;s Connect
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex space-x-4 pt-4"
          >
            <TooltipProvider>
              {[
                { name: "GitHub", icon: Github },
                { name: "LinkedIn", icon: Linkedin },
                { name: "Dribbble", icon: Dribbble },
              ].map((platform) => (
                <Tooltip key={platform.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={`https://${platform.name.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform transition-transform hover:scale-110"
                      aria-label={platform.name}
                    >
                      <platform.icon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow me on {platform.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </motion.div>
        </div>
        <div className="relative h-full" style={{ minHeight: `${containerHeight / 2}px` }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-500/20 to-red-500/20 rounded-3xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 bg-background/70 rounded-3xl p-8 shadow-lg h-full"
          >
            {!isSplineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-3xl">
                <div className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Loading 3D Model...
                </div>
              </div>
            )}
            <div className="w-full h-full">
              <Spline
                scene="https://prod.spline.design/MPEemDIa9cB0UMgK/scene.splinecode"
                onLoad={() => setIsSplineLoaded(true)}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

