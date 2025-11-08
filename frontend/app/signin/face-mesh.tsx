"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FaceMeshAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Animation for dots pulsing
    const dotsTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    dotsTimeline.to(".mesh-dot", {
      opacity: 0.5,
      scale: 0.8,
      duration: 2,
      stagger: {
        each: 0.2,
        from: "random",
        grid: "auto"
      },
      ease: "sine.inOut"
    });
    
    // Animation for lines fading/glowing
    const linesTimeline = gsap.timeline({
      repeat: -1
    });
    
    linesTimeline.to(".mesh-line", {
      opacity: 0.9,
      duration: 1.5,
      stagger: {
        each: 0.1,
        from: "random"
      },
      ease: "sine.inOut"
    })
    .to(".mesh-line", {
      opacity: 0.3,
      duration: 1.5,
      stagger: {
        each: 0.1,
        from: "random"
      },
      ease: "sine.inOut"
    });
    
    return () => {
      dotsTimeline.kill();
      linesTimeline.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden bg-stone-900"
    >
      {/* Full-width face image */}
      <div className="absolute inset-0">
        <img 
          src="/assets/signin/signin.webp" 
          alt="Face analysis" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Face mesh overlay centered on the face */}
      <div 
        ref={meshRef}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        {/* SVG mesh - positioned absolutely to cover the face */}
        <svg className="w-full h-full max-w-full max-h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g className="face-mesh">
            {/* Face mesh dots */}
            {[
              {x: 120, y: 80}, {x: 280, y: 80},  // Eyes
              {x: 200, y: 120}, {x: 160, y: 200}, {x: 240, y: 200},  // Nose and cheeks
              {x: 200, y: 240}, {x: 120, y: 270}, {x: 280, y: 270},  // Mouth and jaw
            ].map((dot, i) => (
              <circle 
                key={i} 
                cx={dot.x} 
                cy={dot.y} 
                r="6" 
                className="mesh-dot" 
                fill="rgba(16, 185, 129, 0.8)"
                style={{ filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.8))' }}
              />
            ))}
            
            {/* Face mesh lines */}
            <g className="mesh-lines" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5">
              <line className="mesh-line" x1="120" y1="80" x2="280" y2="80" />
              <line className="mesh-line" x1="120" y1="80" x2="200" y2="120" />
              <line className="mesh-line" x1="280" y1="80" x2="200" y2="120" />
              <line className="mesh-line" x1="120" y1="80" x2="160" y2="200" />
              <line className="mesh-line" x1="280" y1="80" x2="240" y2="200" />
              <line className="mesh-line" x1="200" y1="120" x2="160" y2="200" />
              <line className="mesh-line" x1="200" y1="120" x2="240" y2="200" />
              <line className="mesh-line" x1="160" y1="200" x2="200" y2="240" />
              <line className="mesh-line" x1="240" y1="200" x2="200" y2="240" />
              <line className="mesh-line" x1="160" y1="200" x2="120" y2="270" />
              <line className="mesh-line" x1="240" y1="200" x2="280" y2="270" />
              <line className="mesh-line" x1="200" y1="240" x2="120" y2="270" />
              <line className="mesh-line" x1="200" y1="240" x2="280" y2="270" />
              <line className="mesh-line" x1="120" y1="270" x2="280" y2="270" />
            </g>
          </g>
        </svg>
      </div>

      {/* Additional glowing dots - positioned absolutely */}
      <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-emerald-500 opacity-70" style={{ boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0.6)' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-emerald-500 opacity-70" style={{ boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0.6)' }}></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-emerald-500 opacity-70" style={{ boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0.6)' }}></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-emerald-500 opacity-70" style={{ boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0.6)' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-emerald-500 opacity-70" style={{ boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0.6)' }}></div>

      {/* Grid overlay - positioned absolutely */}
      <div 
        className="absolute inset-0 opacity-20 z-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px"
        }}
      ></div>
    </div>
  );
}
