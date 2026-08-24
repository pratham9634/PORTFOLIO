import React from 'react';

/** Realistic Spring Steel Binder Clip for the sticky note */
export const BinderClip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 70 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-11 h-13 drop-shadow-md select-none pointer-events-none ${className}`}
  >
    {/* Wire Handle Loop (top) */}
    <path
      d="M26 40V14C26 8.477 30.477 4 36 4H38C43.523 4 48 8.477 48 14V40"
      stroke="#737373"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <path
      d="M27 40V15C27 10 31 6 36 6H38C43 6 47 10 47 15V40"
      stroke="#a3a3a3"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Black Steel Spring Clamp Body */}
    <rect
      x="12"
      y="38"
      width="48"
      height="26"
      rx="3"
      fill="#1c1917"
      stroke="#0c0a09"
      strokeWidth="1.5"
    />
    {/* Metal Lip Highlights */}
    <rect x="15" y="41" width="42" height="3" rx="1.5" fill="#44403c" />
    <rect x="14" y="60" width="44" height="2" rx="1" fill="#292524" />

    {/* Bottom clamping lip edge on paper */}
    <path
      d="M10 64C10 62 14 62 18 62H54C58 62 62 62 62 64C62 66 58 66 54 66H18C14 66 10 66 10 64Z"
      fill="#0c0a09"
    />
  </svg>
);

/** Translucent Masking / Washi Tape with torn edges */
export const MaskingTape: React.FC<{
  className?: string;
  width?: string;
  height?: string;
  rotate?: number;
}> = ({ className = '', width = 'w-24', height = 'h-7', rotate = 0 }) => (
  <div
    style={{ transform: `rotate(${rotate}deg)` }}
    className={`${width} ${height} washi-tape rounded-xs opacity-90 transition-transform duration-300 pointer-events-none select-none ${className}`}
  >
    {/* Subtle tape texture stripes */}
    <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(0,0,0,0.4)_3px,rgba(0,0,0,0.4)_6px)]" />
  </div>
);

/** Hand-drawn Glowing Lightbulb Doodle */
export const LightbulbDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-14 h-14 text-neutral-800 pointer-events-none select-none ${className}`}
  >
    {/* Radiating Idea Rays */}
    <path d="M45 4V14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M74 16L66 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 16L24 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M85 45H75" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M5 45H15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

    {/* Bulb Glass Contour (Hand-drawn sketchy) */}
    <path
      d="M31 52C26 47 24 41 24 35C24 23.4 33.4 14 45 14C56.6 14 66 23.4 66 35C66 41 64 47 59 52C56.5 54.5 55 58 55 62H35C35 58 33.5 54.5 31 52Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Internal Filament Loop */}
    <path
      d="M40 45V34C40 31 43 28 45 28C47 28 50 31 50 34V45"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M42 36C44 34 46 34 48 36"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Screw Base & Terminal */}
    <path d="M36 67H54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M38 72H52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M41 77H49" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/** Hand-drawn Graphite Pencil Doodle */
export const PencilDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-36 h-12 text-neutral-800 pointer-events-none select-none ${className}`}
  >
    {/* Pencil Body Shaft */}
    <path
      d="M35 15L145 15C148 15 150 17 150 20V30C150 33 148 35 145 35L35 35L35 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Wood Rib Lines */}
    <path d="M35 21H148" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
    <path d="M35 28H148" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />

    {/* Sharpened Cone Tip */}
    <path
      d="M35 15L8 25L35 35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Graphite Lead Point */}
    <polygon points="8,25 18,21.5 18,28.5" fill="currentColor" />

    {/* Metal Ferrule & Eraser */}
    <rect x="135" y="15" width="8" height="20" fill="currentColor" opacity="0.2" />
    <path d="M135 15V35" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M145 15H150C154 15 156 18 156 25C156 32 154 35 150 35H145"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Subtle Crosshatching Shadow */}
    <line x1="30" y1="38" x2="40" y2="44" stroke="currentColor" strokeWidth="1" />
    <line x1="45" y1="38" x2="55" y2="44" stroke="currentColor" strokeWidth="1" />
    <line x1="60" y1="38" x2="70" y2="44" stroke="currentColor" strokeWidth="1" />
    <line x1="75" y1="38" x2="85" y2="44" stroke="currentColor" strokeWidth="1" />
    <line x1="90" y1="38" x2="100" y2="44" stroke="currentColor" strokeWidth="1" />
  </svg>
);

/** Hand-drawn Botanical Leaf Sprig Doodle */
export const BotanicalLeafDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-28 h-24 text-neutral-800 pointer-events-none select-none ${className}`}
  >
    {/* Main Curved Stem */}
    <path
      d="M110 90C95 75 75 55 45 40C30 32 15 25 5 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Leaf 1 (Top Left) */}
    <path
      d="M20 28C10 20 8 10 18 6C28 2 35 14 32 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M18 10C24 15 28 20 28 22" stroke="currentColor" strokeWidth="1.2" />
    <line x1="22" y1="12" x2="26" y2="10" stroke="currentColor" strokeWidth="0.8" />
    <line x1="24" y1="15" x2="28" y2="13" stroke="currentColor" strokeWidth="0.8" />

    {/* Leaf 2 (Upper Right) */}
    <path
      d="M48 38C52 24 64 16 72 20C80 24 74 38 60 42"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M54 34C62 28 68 24 70 22" stroke="currentColor" strokeWidth="1.2" />
    <line x1="60" y1="31" x2="65" y2="34" stroke="currentColor" strokeWidth="0.8" />
    <line x1="64" y1="27" x2="69" y2="30" stroke="currentColor" strokeWidth="0.8" />

    {/* Leaf 3 (Middle Left) */}
    <path
      d="M50 48C35 45 25 54 28 64C31 74 46 68 56 56"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M34 60C40 56 48 54 52 52" stroke="currentColor" strokeWidth="1.2" />

    {/* Leaf 4 (Lower Right) */}
    <path
      d="M75 62C88 52 100 56 102 66C104 76 90 82 78 72"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M82 66C88 64 96 64 100 66" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

/** Cute Hand-drawn Coffee Cup Doodle */
export const CoffeeCupDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 40 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-7 h-6 inline-block text-neutral-800 ${className}`}
  >
    {/* Cup Body */}
    <path
      d="M6 10H28C27 18 25 24 17 24C9 24 7 18 6 10Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Handle */}
    <path
      d="M27 12C32 12 34 16 32 19C30 21 27 21 26 20"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Saucer */}
    <path d="M3 26H31" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    {/* Steam lines */}
    <path
      d="M11 6C11 4 13 4 13 2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M17 7C17 5 19 5 19 3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M23 6C23 4 25 4 25 2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

/** Cute Moon & Stars Doodle */
export const MoonStarsDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 36 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-7 h-6 inline-block text-neutral-800 ${className}`}
  >
    {/* Crescent Moon */}
    <path
      d="M14 6C14 16 23 20 22 22C14 24 4 18 6 9C7 5 10 3 14 6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Star 1 */}
    <path d="M26 7L28 11L32 11L29 13L30 17L26 14L22 17L23 13L20 11L24 11Z" fill="currentColor" />
    {/* Star 2 */}
    <circle cx="30" cy="22" r="1.2" fill="currentColor" />
  </svg>
);

/** Sketchy Arrow connector */
export const SketchyArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 40 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-7 sm:w-9 h-4 text-neutral-700 pointer-events-none select-none ${className}`}
  >
    <path
      d="M2 8C12 7.5 24 8.2 36 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M28 2C31 4 35 7 37 8C35 9 31 12 28 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Central Realistic Double-Coil Spiral Binding */
export const SpiralSpine: React.FC<{ loops?: number; className?: string }> = ({
  loops = 11,
  className = '',
}) => {
  return (
    <div
      className={`relative z-20 flex flex-col justify-between items-center h-full py-4 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: loops }).map((_, i) => (
        <div key={i} className="relative flex items-center justify-center w-12 sm:w-14 h-7 my-1">
          {/* Left Punched Hole in Paper */}
          <div className="absolute left-1 w-2.5 sm:w-3 h-4 rounded-sm bg-neutral-900 shadow-inner border border-neutral-700/50 opacity-80" />

          {/* Right Punched Hole in Paper */}
          <div className="absolute right-1 w-2.5 sm:w-3 h-4 rounded-sm bg-neutral-900 shadow-inner border border-neutral-700/50 opacity-80" />

          {/* Realistic Dual Wire Ring Loop */}
          <svg viewBox="0 0 54 24" fill="none" className="w-full h-full drop-shadow-md">
            {/* Dark Under Shadow */}
            <path
              d="M6 14 C12 22, 42 22, 48 14"
              stroke="#0a0a0a"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Base Metallic Dark Charcoal Wire */}
            <path
              d="M6 11 C12 2, 42 2, 48 11"
              stroke="#262626"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Top Shiny Silver Chrome Highlight */}
            <path
              d="M8 9.5 C14 3.5, 40 3.5, 46 9.5"
              stroke="#e5e5e5"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
