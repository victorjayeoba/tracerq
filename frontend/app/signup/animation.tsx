"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function DeepfakeScanAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });
    
    // Initial state
    tl.set(".scan-circle", { 
      borderColor: "rgba(146, 64, 14, 0.4)", // Using accent color
      scale: 0.95,
      rotation: 0
    })
    .set(".scan-line", { 
      opacity: 0.7,
      top: "-2px", // Start position at top
    })
    .set(".detection-label", { opacity: 0 })
    .set(".analysis-time", { opacity: 0 });
    
    // Animation sequence with horizontal scan line
    tl.to(".scan-circle", {
      borderColor: "rgba(146, 64, 14, 0.8)", // Using accent color
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".scan-circle", {
      rotate: 360,
      duration: 8,
      ease: "linear",
    }, "<")
    .to(".scan-line", {
      top: "100%", // Move to bottom
      duration: 4,
      ease: "power1.inOut",
      repeat: 1,
      yoyo: true, // Go back up
    }, "<")
    .to(".detection-label", {
      opacity: 1,
      duration: 0.5,
      delay: 0.5
    }, "-=3") // Start showing detection label earlier
    .to(".analysis-time", {
      opacity: 1,
      duration: 0.5
    }, "<")
    .to(".scan-circle", {
      borderColor: "rgba(146, 64, 14, 0.4)", // Using accent color
      scale: 0.95,
      duration: 0.8,
      delay: 2,
      ease: "power2.in"
    }, "-=1")
    .to(".detection-label, .analysis-time", {
      opacity: 0,
      duration: 0.5
    }, "<");
    
    return () => {
      tl.kill();
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
          src="/assets/signup/signupface.webp" 
          alt="Face analysis" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Scanning circle */}
      <div 
        ref={circleRef}
        className="scan-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-[3px] border-amber-700/50 pointer-events-none"
      ></div>

      {/* Horizontal scan line */}
      <div 
        ref={scanLineRef}
        className="scan-line absolute left-0 right-0 h-[2px] bg-amber-600 opacity-70 pointer-events-none z-10"
        style={{ boxShadow: '0 0 8px 2px rgba(146, 64, 14, 0.6)' }}
      ></div>

      {/* Detection label */}
      <div className="detection-label absolute bottom-10 left-10 bg-stone-900/80 text-white px-4 py-2 rounded-md opacity-0 z-20">
        <div className="text-sm font-bold">DEEPFAKE DETECTED</div>
      </div>

      {/* Analysis time */}
      <div className="analysis-time absolute top-10 right-10 bg-stone-900/80 text-white px-3 py-1.5 rounded-md text-xs opacity-0 flex items-center z-20">
        <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>UNDER 5 SEC</span>
      </div>

      {/* Center scan point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full z-10"></div>
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 z-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(146, 64, 14, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(146, 64, 14, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px"
        }}
      ></div>
    </div>
  );
}