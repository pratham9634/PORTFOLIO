import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WelcomeIntroProps {
  onComplete?: () => void;
}

const PAPER_BG_IMAGE =
  'https://imgs.search.brave.com/sWQKHw6OsiBmcRUYQnN2LOfxSibJnpSTbF1kvRp2J5I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzM3Lzg1LzA4/LzM2MF9GXzgzNzg1/MDgwN19VSjZ5SUtB/MnJGU2pPQnBaN2xN/YUNycDhpNm94VWN2/SS5qcGc';

export const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const timerCardRef = useRef<HTMLDivElement>(null);
  const paperCardRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'paper' | 'done'>('loading');

  // Preload paper image immediately on mount so it appears instantaneously
  useEffect(() => {
    const img = new Image();
    img.src = PAPER_BG_IMAGE;
  }, []);

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = 'hidden';

    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // Step 1: 0% -> 100% Counter (Exactly 2.0s duration as requested)
      // ----------------------------------------------------
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: 5.0,
        ease: 'power1.inOut',
        onUpdate: () => {
          const current = Math.floor(counter.val);
          setPercent(current);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${current}%`;
          }
        },
        onComplete: () => {
          // Fade out timer card and switch to paper phase
          if (timerCardRef.current) {
            gsap.to(timerCardRef.current, {
              opacity: 0,
              y: -20,
              scale: 0.95,
              duration: 0.35,
              ease: 'power2.in',
              onComplete: () => {
                setPhase('paper');
              },
            });
          } else {
            setPhase('paper');
          }
        },
      });
    }, overlayRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // ----------------------------------------------------
  // Step 2 & 3: When phase changes to 'paper', animate paper entrance & Welcome drawing
  // ----------------------------------------------------
  useEffect(() => {
    if (phase !== 'paper') return;

    const paper = paperCardRef.current;
    const overlay = overlayRef.current;
    if (!paper || !overlay) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setPhase('done');
          if (onComplete) onComplete();
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        },
      });

      // Animate Paper Card into view
      tl.fromTo(
        paper,
        {
          opacity: 0,
          scale: 0.92,
          y: 20,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
        }
      )
        // Hold for the animated Welcome SVG to draw across the paper
        .to({}, { duration: 1.8 })
        // Smoothly dissolve paper and lift out
        .to(paper, {
          opacity: 0,
          scale: 1.04,
          y: -18,
          filter: 'blur(10px)',
          duration: 0.7,
          ease: 'power3.inOut',
        })
        // Fade out white overlay curtain
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.55,
            ease: 'power2.inOut',
            pointerEvents: 'none',
          },
          '-=0.3'
        );
    }, overlayRef);

    return () => {
      ctx.revert();
    };
  }, [phase, onComplete]);

  // Instant skip on click
  const handleSkip = () => {
    document.body.style.overflow = '';
    setPhase('done');
    if (onComplete) onComplete();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  if (phase === 'done') return null;

  return (
    <aside
      ref={overlayRef}
      onClick={handleSkip}
      aria-label="Welcome Introduction"
      className="fixed inset-0 z-[9999] w-screen h-screen bg-[#fafaf9] text-neutral-900 select-none cursor-pointer overflow-hidden flex flex-col justify-between"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Soft Ambient Studio Lighting Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(244,244,240,0.85)_60%,rgba(230,230,224,0.95)_100%)]" />

      {/* Top Status Header */}
      <div className="relative z-10 w-full px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between text-xs font-mono text-neutral-600">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="font-bold text-neutral-900 tracking-wider">
            [ PRATHAM PETWAL // 2026 ARCHIVE ]
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-neutral-500">
          <span>PORTFOLIO LOAD</span>
          <span>•</span>
          <span className="text-neutral-900 font-semibold">PRATHAM.DEV</span>
        </div>
      </div>

      {/* Center Screen Content */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center p-4 sm:p-8">
        {/* PHASE 1: Loading Timer (0% to 100% in 2.0s) */}
        {phase === 'loading' && (
          <div
            ref={timerCardRef}
            className="max-w-md w-full flex flex-col items-center text-center will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-xs font-mono font-semibold text-neutral-800 uppercase mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
              <span>INITIALIZING SYSTEM</span>
            </div>

            <h1
              className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-neutral-950 mb-6 font-mono"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {percent < 10 ? '0' : ''}
              {percent}%
            </h1>

            {/* Progress Bar */}
            <div className="w-48 sm:w-64 h-1.5 bg-neutral-200/90 rounded-full overflow-hidden mb-4 shadow-inner">
              <div
                ref={progressBarRef}
                className="h-full bg-neutral-950 rounded-full transition-all duration-75 w-0"
              />
            </div>

            <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
              Loading creative assets & 3D canvases
            </p>
          </div>
        )}

        {/* PHASE 2: Sketchbook Page Image with Animated Welcome.svg */}
        {phase === 'paper' && (
          <div
            ref={paperCardRef}
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.18),0_10px_30px_rgba(0,0,0,0.1)] border border-stone-300/80 bg-[#f7f3e8] p-8 sm:p-12 md:p-14 flex flex-col items-center justify-center text-center will-change-transform"
            style={{
              backgroundImage: `url('${PAPER_BG_IMAGE}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Washi Tape Header */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-7 bg-[#dfd7c2]/90 border border-stone-400/40 shadow-sm rotate-[-1deg] pointer-events-none" />

            {/* Animated Welcome SVG freshly mounted so stroke animation starts at 0.0s */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[460px] md:max-w-[500px] mx-auto py-3 sm:py-6">
              <img
                key="welcome-anim"
                src={`/Welcome.svg?t=${Date.now()}`}
                alt="Welcome Animation"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
              />
            </div>

            {/* Sub-label */}
            <div className="relative z-10 mt-2 sm:mt-4 space-y-1.5">
              <h2
                className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-stone-900"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Pratham Petwal
              </h2>
              <p className="text-xs sm:text-sm font-sketch font-semibold text-stone-700 max-w-sm mx-auto">
                Full Stack Developer & AI Engineer • 2026 Portfolio
              </p>
            </div>

            <div className="absolute bottom-4 right-5 text-xs font-sketch text-stone-600 pointer-events-none">
              ✦ handmade with code
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer / Skip Prompt */}
      <div className="relative z-10 w-full px-6 sm:px-12 pb-6 sm:pb-8 flex items-center justify-between text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
          <span>[ TAP ANYWHERE TO SKIP ]</span>
        </div>

        <div className="hover:text-neutral-900 transition-colors font-bold underline underline-offset-2">
          [ SKIP → ]
        </div>
      </div>
    </aside>
  );
};

export default WelcomeIntro;
