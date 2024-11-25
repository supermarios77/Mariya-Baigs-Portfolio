"use client";

import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import Typed from "typed.js";

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

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="dark:bg-black dark:text-white bg-white text-black">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 space-y-6 mb-8 lg:mb-0">
          <p className="text-gray-400 text-sm">HI, I AM MARIYA BAIG</p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            I&apos;m a <span ref={el} />
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Hey there! I&apos;m Mariya Baig, a 13-year-old full-stack developer
            certified in TensorFlow and skilled in Python programming. When
            I&apos;m not diving into code, you can find me sketching, having
            adventures with Sylvanian Families, and writing down stories.
          </p>

          <div className="pt-4">
            <span className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm">
              Example Status
            </span>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="w-full h-[700px] overflow-hidden">
            <Spline scene="https://prod.spline.design/MPEemDIa9cB0UMgK/scene.splinecode" />
          </div>
        </div>
      </div>
    </div>
  );
}
