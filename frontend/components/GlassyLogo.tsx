// "use client";

// import GlassSurface from "./GlassSurface";

// interface GlassyLogoProps {
//   size?: number;
//   className?: string;
//   logoSize?: string;
// }

// export default function GlassyLogo({ size = 150, className = "", logoSize = "h-10" }: GlassyLogoProps) {
//   return (
//     <GlassSurface
//       width={size}
//       height={size * 0.5}
//       borderRadius={size * 0.2}
//       backgroundOpacity={0.1}
//       brightness={55}
//       opacity={0.85}
//       blur={8}
//       displace={2}
//       distortionScale={-170}
//       redOffset={5}
//       greenOffset={15}
//       blueOffset={25}
//       className={`inline-flex items-center justify-center ${className}`}
//     >
//       <img 
//         src="/tracer-logo-enhanced.svg" 
//         alt="tЯacer" 
//         className={`${logoSize} mx-auto`} 
//         style={{ filter: "drop-shadow(0 0 8px rgba(146, 64, 14, 0.3))" }}
//       />
//     </GlassSurface>
//   );
// }
