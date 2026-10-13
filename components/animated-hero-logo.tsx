"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

// Coordinates follow the painted tips in the original 1642 × 958 artwork.
const drips = [
  { x: 150, y: 492, color: "#ff3b0b", size: .8, duration: 5.8, delay: -2.1 },
  { x: 290, y: 870, color: "#ff420e", size: 1.1, duration: 6.1, delay: -4.2 },
  { x: 603, y: 628, color: "#fff0df", size: .65, duration: 4.8, delay: -.9 },
  { x: 720, y: 648, color: "#ff3b0b", size: .9, duration: 5.5, delay: -3.8 },
  { x: 818, y: 803, color: "#fff0df", size: .85, duration: 5.2, delay: -2.7 },
  { x: 887, y: 668, color: "#fff0df", size: .65, duration: 6.3, delay: -4.8 },
  { x: 1042, y: 680, color: "#ff3b0b", size: .95, duration: 5.9, delay: -1.5 },
  { x: 1310, y: 650, color: "#fff0df", size: .6, duration: 4.9, delay: -3.2 },
  { x: 1394, y: 767, color: "#ff420e", size: 1, duration: 6.4, delay: -5.2 },
];

export function AnimatedHeroLogo() {
  const logoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const target = logo?.closest("section")?.querySelector("[data-hero-drip-target]");
    if (!logo || !target) return;
    const measure = () => {
      const bounds = logo.getBoundingClientRect();
      if (!bounds.width) return;
      const dateBounds = target.getBoundingClientRect();
      const end = (dateBounds.top + dateBounds.height / 2 - bounds.top) * 1642 / bounds.width;
      logo.style.setProperty("--hero-drip-end", `${end}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(logo);
    observer.observe(target);
    measure();
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  return <span ref={logoRef} className="hero-logo">
    <Image src="/branding/techkriti-splatter-white.png" alt="Techkriti" width={1642} height={958} priority sizes="(max-width: 1400px) 100vw, 1304px" className="h-auto w-full" />
    <svg className="hero-logo-drips" viewBox="0 0 1642 958" fill="none" aria-hidden="true" focusable="false">
        {drips.map((drip) => <g key={drip.x} transform={`translate(${drip.x} ${drip.y})`} fill={drip.color} style={{ "--drip-duration": `${drip.duration}s`, "--drip-delay": `${drip.delay}s`, "--drip-fall": `calc(var(--hero-drip-end, 1300px) - ${drip.y}px)` } as CSSProperties}>
          <g transform={`scale(${drip.size})`}>
            <path className="hero-drip-neck" d="M-4-6Q-2 5-3 19Q0 25 3 19Q2 5 4-6Z" />
          </g>
          <g className="hero-drip-drop">
            <path transform={`scale(${drip.size})`} d="M0-10C-2-2-12 10-12 18C-12 34 12 34 12 18C12 10 2-2 0-10Z" />
          </g>
        </g>)}
    </svg>
  </span>;
}
