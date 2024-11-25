"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function Certificate() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Certified <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                TensorFlow Developer
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/certificate.png`}
          alt="certificate"
          height={500}
          width={900}
          className="mx-auto rounded-2xl  w-full"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
