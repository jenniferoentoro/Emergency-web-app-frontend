//@ts-nocheck

import React, { useRef, useEffect } from "react";
import gsap, { Sine } from "gsap";

const Loader: React.FC = () => {
  let loading_screen = useRef<HTMLDivElement | null>(null);
  let logo_1 = useRef<HTMLDivElement | null>(null);
  let logo_2 = useRef<HTMLDivElement | null>(null);
  let logo_3 = useRef<HTMLDivElement | null>(null);
  let logo_4 = useRef<HTMLDivElement | null>(null);
  let logo_5 = useRef<HTMLDivElement | null>(null);
  let logo_6 = useRef<HTMLDivElement | null>(null);

  const timeline = gsap.timeline();

  useEffect(() => {
    timeline.from(logo_1, {
      opacity: 0,
      duration: 0.5,
      skewX: 10,
      y: -200,
      ease: Sine.easeInOut,
    });

    timeline.from(
      logo_2,
      {
        opacity: 0,
        duration: 0.5,
        skewX: 10,
        x: 200,
        ease: Sine.easeInOut,
      },
      "-=.2"
    );

    timeline.from(
      logo_3,
      {
        opacity: 0,
        duration: 0.5,
        skewX: 10,
        y: 200,
        ease: Sine.easeInOut,
      },
      "-=.2"
    );

    timeline.from(
      logo_4,
      {
        opacity: 0,
        duration: 0.5,
        skewX: 10,
        x: -200,
        ease: Sine.easeInOut,
      },
      "-=.2"
    );

    timeline.from(
      logo_5,
      {
        opacity: 0,
        duration: 0.5,
        skewX: 10,
        y: -200,
        ease: Sine.easeInOut,
      },
      "-=.2"
    );

    timeline.from(
      logo_6,
      {
        opacity: 0,
        duration: 0.5,
        skewX: 10,
        x: 200,
        ease: Sine.easeInOut,
      },
      "-=.2"
    );

    timeline.from(logo_2, {
      delay: 0.5,
      duration: 0.5,
      opacity: 0,
      ease: Sine.easeInOut,
      x: -200,
    });

    timeline.to(
      logo_5,
      {
        duration: 0.5,
        opacity: 0,
        ease: Sine.easeInOut,
        x: 300,
      },
      "-=.2"
    );

    timeline.to(
      logo_3,
      {
        duration: 0.5,
        opacity: 0,
        ease: Sine.easeInOut,
        x: -300,
      },
      "-=.2"
    );

    timeline.to(
      logo_6,
      {
        duration: 0.5,
        opacity: 0,
        ease: Sine.easeInOut,
        x: 300,
      },
      "-=.2"
    );

    timeline.to(
      logo_4,
      {
        duration: 0.5,
        opacity: 0,
        ease: Sine.easeInOut,
        x: -300,
      },
      "-=.2"
    );

    timeline.to(logo_1, {
      fontSize: "2vmax",
      ease: Sine.easeInOut,
    });
  }, [timeline]);

  return (
    <div className="text-[#000000] uppercase">
      <div
        ref={(el) => (loading_screen = el)}
        className="fixed top-0 left-0 h-screen w-full z-50 bg-[#FBF6F0]"
      >
        <div>
          <div className="flex absolute items-center justify-center w-full h-screen">
            <div
              ref={(el) => (logo_1 = el)}
              className="font-semibold text-[#FFC1B4] text-[3vmax] md:text-[6.1vmax] mix-blend-difference leading-none"
            >
              DUTCH CRISIS SUPPORT
            </div>
          </div>
          <div className="flex absolute items-center justify-center w-full h-screen">
            <div
              ref={(el) => (logo_2 = el)}
              className="font-semibold text-[#FE8A7F] text-[3.1vmax] md:text-[6.2vmax] mix-blend-difference leading-none"
            >
              DUTCH CRISIS SUPPORT
            </div>
          </div>
          <div className="flex absolute items-center justify-center w-full h-screen">
            <div
              ref={(el) => (logo_3 = el)}
              className="font-semibold text-[#C1554E] text-[3.2vmax] md:text-[6.3vmax] mix-blend-difference leading-none"
            >
              DUTCH CRISIS SUPPORT
            </div>
          </div>
          <div className="flex absolute items-center justify-center w-full h-screen">
            <div
              ref={(el) => (logo_4 = el)}
              className="font-semibold text-[#BFA888] text-[3.3max] md:text-[6.4vmax] mix-blend-difference leading-none"
            >
              DUTCH CRISIS SUPPORT
            </div>
          </div>
          <div className="flex absolute items-center justify-center w-full h-screen">
            <div
              ref={(el) => (logo_5 = el)}
              className="font-semibold text-[#FFCEB1] text-[3.4vmax] md:text-[6.5vmax] mix-blend-difference leading-none"
            >
              DUTCH CRISIS SUPPORT
            </div>
          </div>
          <div className="flex absolute items-center justify-center w-full h-screen">
            <div
              ref={(el) => (logo_6 = el)}
              className="font-semibold text-[#FFE4CB] text-[3.5vmax] md:text-[6.6vmax] mix-blend-difference leading-none"
            >
              DUTCH CRISIS SUPPORT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
