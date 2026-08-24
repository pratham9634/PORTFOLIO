import React from 'react';

interface HeadphoneListenerProps {
  isPlaying: boolean;
}

export const HeadphoneListenerAnimation: React.FC<HeadphoneListenerProps> = ({ isPlaying }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Floating Musical Notes when playing */}
      {isPlaying && (
        <>
          <span 
            className="absolute -top-3 left-1 text-xs text-amber-600 font-bold animate-bounce [animation-duration:1.2s] pointer-events-none select-none"
            style={{ animationDelay: '0ms' }}
          >
            ♪
          </span>
          <span 
            className="absolute -top-5 right-2 text-xs text-emerald-600 font-bold animate-bounce [animation-duration:1.4s] pointer-events-none select-none"
            style={{ animationDelay: '200ms' }}
          >
            ♫
          </span>
          <span 
            className="absolute -top-3 -right-2 text-[10px] text-purple-600 font-bold animate-bounce [animation-duration:1.6s] pointer-events-none select-none"
            style={{ animationDelay: '400ms' }}
          >
            ♬
          </span>
        </>
      )}

      {/* Headphone Character / Icon with Head-Bob & Pulse */}
      <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ede4d4] border-2 border-[#1c1917] flex items-center justify-center shadow-[2px_2.5px_0px_#1c1917] transition-all duration-300 ${
        isPlaying ? 'rotate-[-3deg] scale-105 animate-[spin_4s_linear_infinite]' : ''
      }`}>
        {/* Animated Headphone SVG */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className={`w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#1c1917] ${
            isPlaying ? 'animate-pulse' : ''
          }`}
        >
          {/* Headband */}
          <path
            d="M8 18C8 12.477 12.477 8 18 8C23.523 8 28 12.477 28 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Headband Padding Accent */}
          <path
            d="M13 9.5C14.5 9 16.2 8.8 18 8.8C19.8 8.8 21.5 9 23 9.5"
            stroke={isPlaying ? '#059669' : '#8c7b6d'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Left Earcup */}
          <rect
            x="5.5"
            y="17"
            width="5.5"
            height="9.5"
            rx="2.75"
            fill={isPlaying ? '#10b981' : '#ebdccb'}
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Right Earcup */}
          <rect
            x="25"
            y="17"
            width="5.5"
            height="9.5"
            rx="2.75"
            fill={isPlaying ? '#10b981' : '#ebdccb'}
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Speaker Sound Waves when playing */}
          {isPlaying && (
            <>
              <path
                d="M3 21C2.3 22 2.3 23 3 24"
                stroke="#059669"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="animate-ping"
              />
              <path
                d="M33 21C33.7 22 33.7 23 33 24"
                stroke="#059669"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="animate-ping"
              />
            </>
          )}
          {/* Center Face / Sound Node */}
          <circle cx="18" cy="20" r="2" fill={isPlaying ? '#059669' : 'currentColor'} />
          <path
            d="M16 24C17 25 19 25 20 24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Pulse Glow when Playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-xl border border-emerald-500/60 animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default HeadphoneListenerAnimation;
