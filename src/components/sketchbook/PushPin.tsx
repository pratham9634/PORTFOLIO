import React from 'react';

export type PushPinColor = 'red' | 'blue' | 'yellow' | 'green' | 'purple' | 'orange';

interface PushPinProps {
  color?: PushPinColor;
  className?: string;
  angle?: number;
  size?: 'sm' | 'md' | 'lg';
}

const PIN_PALETTES: Record<
  PushPinColor,
  {
    head: string;
    headDark: string;
    headLight: string;
    highlight: string;
    shadow: string;
  }
> = {
  red: {
    head: '#ef4444',
    headDark: '#991b1b',
    headLight: '#f87171',
    highlight: '#fee2e2',
    shadow: 'rgba(239, 68, 68, 0.4)',
  },
  blue: {
    head: '#0ea5e9',
    headDark: '#0369a1',
    headLight: '#38bdf8',
    highlight: '#e0f2fe',
    shadow: 'rgba(14, 165, 233, 0.4)',
  },
  yellow: {
    head: '#eab308',
    headDark: '#854d0e',
    headLight: '#facc15',
    highlight: '#fef9c3',
    shadow: 'rgba(234, 179, 8, 0.4)',
  },
  green: {
    head: '#10b981',
    headDark: '#065f46',
    headLight: '#34d399',
    highlight: '#d1fae5',
    shadow: 'rgba(16, 185, 129, 0.4)',
  },
  purple: {
    head: '#a855f7',
    headDark: '#6b21a8',
    headLight: '#c084fc',
    highlight: '#f3e8ff',
    shadow: 'rgba(168, 85, 247, 0.4)',
  },
  orange: {
    head: '#f97316',
    headDark: '#9a3412',
    headLight: '#fb923c',
    highlight: '#ffedd5',
    shadow: 'rgba(249, 115, 22, 0.4)',
  },
};

const SIZES = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
};

export const PushPin: React.FC<PushPinProps> = ({
  color = 'red',
  className = '',
  angle = -12,
  size = 'md',
}) => {
  const palette = PIN_PALETTES[color] || PIN_PALETTES.red;

  return (
    <div
      style={{ transform: `rotate(${angle}deg)` }}
      className={`relative inline-block select-none pointer-events-none ${SIZES[size]} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          {/* 3D Spherical Head Radial Gradient */}
          <radialGradient
            id={`pin-grad-${color}`}
            cx="35%"
            cy="35%"
            r="65%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor={palette.highlight} />
            <stop offset="45%" stopColor={palette.headLight} />
            <stop offset="75%" stopColor={palette.head} />
            <stop offset="100%" stopColor={palette.headDark} />
          </radialGradient>

          {/* Needle Metallic Linear Gradient */}
          <linearGradient id="needle-metal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#71717a" />
            <stop offset="40%" stopColor="#e4e4e7" />
            <stop offset="70%" stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>

          {/* Cast Shadow Blur Filter */}
          <filter id="pin-cast-shadow" x="-30%" y="-30%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
            <feOffset dx="2" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Needle Pin Point (Angled insertion) */}
        <g filter="url(#pin-cast-shadow)">
          {/* Steel Needle Shaft */}
          <polygon
            points="24,20 22,38 24,42 26,38"
            fill="url(#needle-metal)"
            stroke="#27272a"
            strokeWidth="0.5"
          />

          {/* Paper Pinhole Shadow Dot */}
          <ellipse cx="24" cy="40.5" rx="2.5" ry="1.2" fill="#18181b" opacity="0.6" />

          {/* Pushpin Plastic Grip / Flange */}
          <path
            d="M17 21 C17 18, 31 18, 31 21 C31 24, 28 26, 24 26 C20 26, 17 24, 17 21 Z"
            fill={palette.headDark}
          />
          <ellipse cx="24" cy="21" rx="7" ry="2.5" fill={palette.headLight} />

          {/* Pushpin Top Spherical Bulb Knob */}
          <circle
            cx="24"
            cy="15"
            r="9.5"
            fill={`url(#pin-grad-${color})`}
            stroke={palette.headDark}
            strokeWidth="0.8"
          />

          {/* Glossy Specular Light Reflection */}
          <ellipse
            cx="21"
            cy="12"
            rx="3.5"
            ry="2"
            transform="rotate(-25 21 12)"
            fill="#ffffff"
            opacity="0.85"
          />
          <circle cx="25.5" cy="10.5" r="1.2" fill="#ffffff" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};
