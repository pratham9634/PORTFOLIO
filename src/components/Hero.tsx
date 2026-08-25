import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileDown, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROLES = ['Software Developer', 'Full Stack Developer', 'AI Engineer'];

interface HeroProps {
  ready?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ ready = true }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const whitesmokeBgRef = useRef<HTMLDivElement>(null);
  const paperWrapRef = useRef<HTMLDivElement>(null);

  // Text overlay refs
  const greetRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const thoughtRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // Role cycling
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 380);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;

    const ctx = gsap.context(() => {
      const spring = 'back.out(1.5)';
      const expo = 'expo.out';

      // ── Paper block entrance ──
      if (paperWrapRef.current) {
        gsap.fromTo(
          paperWrapRef.current,
          { x: -50, opacity: 0, scale: 0.9, rotate: -2 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.3,
            ease: spring,
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Greeting ──
      if (greetRef.current) {
        gsap.fromTo(
          greetRef.current,
          { y: -18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: expo,
            delay: 0.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Name chars staggered ──
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { yPercent: 130, opacity: 0, rotate: 10 },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.72,
            stagger: 0.026,
            ease: spring,
            delay: 0.32,
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Paperplane entrance ──
      if (planeRef.current) {
        gsap.fromTo(
          planeRef.current,
          { scale: 0.65, opacity: 0, x: 30, y: -10, rotate: -15 },
          {
            scale: 2,
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            duration: 1.4,
            ease: spring,
            delay: 0.48,
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Role badge ──
      if (roleRef.current) {
        gsap.fromTo(
          roleRef.current,
          { x: -18, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: spring,
            delay: 0.62,
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Divider ──
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.75,
            ease: expo,
            delay: 0.76,
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Thought ──
      if (thoughtRef.current) {
        gsap.fromTo(
          thoughtRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: spring,
            delay: 0.88,
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Social badges staggered ──
      if (socialRef.current) {
        const badges = socialRef.current.querySelectorAll('.badge');
        gsap.fromTo(
          badges,
          { y: 18, opacity: 0, scale: 0.82 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.58,
            stagger: 0.09,
            ease: spring,
            delay: 1.04,
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Scroll-Driven Pinning & Card Centering ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Move paper card to horizontal dead-center simultaneously
      scrollTl.to(
        paperWrapRef.current,
        {
          x: () => {
            if (!paperWrapRef.current) return 0;
            const rect = paperWrapRef.current.getBoundingClientRect();
            const currentX = (gsap.getProperty(paperWrapRef.current, 'x') as number) || 0;
            const initialLeft = rect.left - currentX;
            const targetLeft = (window.innerWidth - rect.width) / 2;
            return targetLeft - initialLeft;
          },
          scale: 1.05,
          rotate: 0,
          duration: 1,
          ease: 'power1.inOut',
        },
        0
      );

      // 2. Spread About-matching background simultaneously from outer screen edge-to-edge
      if (whitesmokeBgRef.current) {
        scrollTl.to(
          whitesmokeBgRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut',
          },
          0
        );
      }

      // 3. Ambient depth scaling on paperplane simultaneously
      if (planeRef.current) {
        scrollTl.to(
          planeRef.current,
          {
            scale: 1.85,
            y: -6,
            duration: 1,
            ease: 'power1.inOut',
          },
          0
        );
      }
    }, section);

    return () => ctx.revert();
  }, [ready]);

  // Char splitter for name stagger
  const splitChars = (text: string) =>
    text.split('').map((ch, i) => (
      <span
        key={i}
        className="char inline-block will-change-transform"
        style={{ opacity: 0 }}
      >
        {ch === ' ' ? '\u00a0' : ch}
      </span>
    ));

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full z-[1] flex items-center justify-center overflow-hidden select-none border-none outline-none"
    >
      {/* ── Full-screen background covering the entire viewport matching About section's tactile sketchbook style ── */}
      <div
        ref={whitesmokeBgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0 tactile-menu-bg will-change-[opacity] border-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,236,226,0.85)_0%,rgba(250,247,242,1)_100%)] pointer-events-none" />
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYOUT — Full-width Container (Edge-to-Edge, Borderless)
                   Left half: paper + all text overlay on it
                   Right half: empty (video shows through)
      ══════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 w-full h-screen flex items-center px-6 sm:px-10 md:px-14 lg:px-16 pt-20 border-none outline-none"
      >
        {/* ── Paper block + all text ON TOP of it ── */}
        <div
          ref={paperWrapRef}
          className="group relative w-full max-w-[520px] xl:max-w-[560px] flex-shrink-0 cursor-pointer will-change-transform"
          style={{
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.045) translateY(-6px) rotate(0.4deg)';
            (e.currentTarget as HTMLDivElement).style.filter = 'drop-shadow(0 32px 64px rgba(0,0,0,0.38)) drop-shadow(0 8px 24px rgba(0,0,0,0.22))';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1) translateY(0px) rotate(0deg)';
            (e.currentTarget as HTMLDivElement).style.filter = 'none';
          }}
        >
          {/* Ambient glow — blooms on hover */}
          <div
            className="absolute inset-[-8%] rounded-3xl blur-3xl pointer-events-none -z-10 opacity-25 group-hover:opacity-50 transition-opacity duration-500"
            style={{ background: 'radial-gradient(ellipse at 40% 50%, #c9baa3 0%, transparent 70%)' }}
          />

          {/* Hidden SVG — defines the organic torn-paper clip shape */}
          <svg
            width="0"
            height="0"
            className="absolute"
            aria-hidden="true"
            style={{ position: 'absolute' }}
          >
            <defs>
              <clipPath id="torn-paper-clip" clipPathUnits="objectBoundingBox">
                {/*
                  Each edge has its own organic curve:
                  - Top-left corner is tucked in slightly
                  - Top edge dips then rises — like a fold
                  - Top-right corner sticks out a hair
                  - Right edge has a subtle belly
                  - Bottom-right corner is pulled inward
                  - Bottom edge has a slight wave — torn feel
                  - Bottom-left corner juts out softly
                  - Left edge curves inward in the middle
                */}
                <path d="
                  M 0.030,0.028
                  C 0.060,0.008 0.140,0.012 0.240,0.006
                  C 0.340,0.000 0.420,0.014 0.500,0.004
                  C 0.590,0.012 0.680,0.002 0.760,0.010
                  C 0.840,0.000 0.920,0.008 0.968,0.022
                  C 0.992,0.030 1.000,0.055 0.996,0.095
                  C 1.002,0.180 0.994,0.270 1.000,0.360
                  C 0.998,0.450 1.004,0.540 0.998,0.630
                  C 1.002,0.720 0.996,0.810 1.000,0.890
                  C 1.002,0.940 0.990,0.972 0.964,0.984
                  C 0.930,0.998 0.860,0.992 0.770,1.000
                  C 0.670,0.994 0.570,1.002 0.470,0.996
                  C 0.370,1.004 0.280,0.994 0.190,1.000
                  C 0.110,1.006 0.050,0.996 0.022,0.980
                  C 0.004,0.968 0.000,0.942 0.006,0.900
                  C 0.002,0.820 0.010,0.730 0.004,0.640
                  C 0.000,0.550 0.008,0.460 0.002,0.370
                  C 0.006,0.280 0.000,0.190 0.006,0.110
                  C 0.004,0.068 0.012,0.042 0.030,0.028
                  Z
                " />
              </clipPath>
            </defs>
          </svg>

          {/* The paper image — clipped to organic torn shape */}
          <img
            src="/images/page.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-auto block object-contain"
            style={{
              clipPath: 'url(#torn-paper-clip)',
              filter: 'drop-shadow(0 24px 52px rgba(0,0,0,0.34)) drop-shadow(0 6px 16px rgba(0,0,0,0.18))',
            }}
          />

          {/* ── All text absolutely positioned ON the paper ── */}
          <div className="absolute inset-0 flex flex-col justify-between px-[8%] py-[7%]">

            {/* TOP: greeting + name + role */}
            <div className="flex flex-col gap-1.5 sm:gap-2">

              {/* Greeting */}
              <div
                ref={greetRef}
                className="flex items-center gap-2"
                style={{ opacity: 0 }}
              >
                <span
                  className="text-[#3d2b1f]/80 text-sm sm:text-base tracking-wide"
                  style={{ fontFamily: 'var(--font-kalam)' }}
                >
                  Hey there, I'm
                </span>
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-65" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>

              {/* Name + Paperplane Row */}
              <div className="relative flex items-center justify-between gap-1 sm:gap-2">
                {/* Big name ON paper */}
                <div
                  ref={nameRef}
                  className="overflow-visible leading-none flex-1 min-w-0"
                  aria-label="Pratham Petwal"
                >
                  <div className="overflow-hidden">
                    <span
                      className="block text-[#1a0f09] text-[40px] sm:text-[52px] md:text-[60px] font-bold leading-[0.95] tracking-[-0.01em]"
                      style={{ fontFamily: 'var(--font-hand)' }}
                    >
                      {splitChars('Pratham')}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span
                      className="block text-[40px] sm:text-[52px] md:text-[60px] font-bold leading-[0.95] tracking-[-0.01em]"
                      style={{
                        fontFamily: 'var(--font-hand)',
                        color: 'transparent',
                        WebkitTextStroke: '1.5px rgba(60,30,10,0.55)',
                      }}
                    >
                      {splitChars('Petwal')}
                    </span>
                  </div>
                </div>

                {/* Animated Paperplane SVG */}
                <div
                  ref={planeRef}
                  className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-28 md:w-36 md:h-32 -mr-1 sm:-mr-3 -mt-1 select-none pointer-events-none"
                  style={{ opacity: 0 }}
                  title="Flying Paperplane"
                >
                  <img
                    src="/Loading%2040%20_%20Paperplane.svg"
                    alt="Paperplane"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Cycling role */}
              <div
                ref={roleRef}
                className="flex items-center gap-2 mt-1"
                style={{ opacity: 0 }}
              >
                <span
                  className="text-[#5c3d14]/55 font-mono text-xs tracking-widest"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  //
                </span>
                <div className="overflow-hidden h-6 sm:h-7 flex items-center">
                  <span
                    className="text-[#7c3b0a] text-sm sm:text-base font-semibold tracking-wide"
                    style={{
                      fontFamily: 'var(--font-kalam)',
                      display: 'inline-block',
                      opacity: roleVisible ? 1 : 0,
                      transform: roleVisible ? 'translateY(0px)' : 'translateY(-10px)',
                      transition:
                        'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ROLES[roleIdx]}
                  </span>
                </div>
              </div>
            </div>

            {/* MIDDLE: divider + thought */}
            <div className="flex flex-col gap-2.5 sm:gap-3 my-auto py-3">
              {/* Divider */}
              <div
                ref={dividerRef}
                className="flex items-center gap-2"
                style={{ opacity: 0 }}
              >
                <div className="h-px flex-1 bg-gradient-to-r from-[#8c6b47]/50 via-[#8c6b47]/20 to-transparent" />
                <span
                  className="text-[#8c6b47]/60 text-xs"
                  style={{ fontFamily: 'var(--font-kalam)' }}
                >
                  ✦
                </span>

               
              </div>

              {/* Visionary thought */}
              <div ref={thoughtRef} style={{ opacity: 0 }}>
                <p
                  className="text-[#2a1a0e]/85 text-base sm:text-lg leading-snug font-medium"
                  style={{ fontFamily: 'var(--font-hand)' }}
                >
                  "Building things that{' '}
                  <em className="not-italic text-[#7c3b0a] font-bold">feel alive</em>
                  {' '}— one intentional line at a time."
                </p>
                <p
                  className="text-[#5c4030]/60 text-xs sm:text-sm mt-2 leading-relaxed tracking-wide"
                  style={{ fontFamily: 'var(--font-kalam)' }}
                >
                  React · Next.js · TypeScript · Node.js · LLM / RAG
                </p>
              </div>
            </div>

            {/* BOTTOM: social + resume badges */}
            <div
              ref={socialRef}
              className="flex flex-wrap gap-2 items-center"
            >
              {/* Resume */}
              <a
                href="/PRATHAM_RESUME_J.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="badge group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a0f09]/85 text-white font-bold text-xs tracking-wide shadow-md hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ fontFamily: 'var(--font-kalam)', opacity: 0 }}
              >
                <FileDown className="w-3.5 h-3.5 text-amber-400 group-hover:animate-bounce" />
                <span>Resume</span>
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/pratham9634"
                target="_blank"
                rel="noreferrer"
                className="badge group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 backdrop-blur-sm text-[#1a0f09] border border-[#1a0f09]/20 font-semibold text-xs hover:bg-white/90 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm"
                style={{ fontFamily: 'var(--font-kalam)', opacity: 0 }}
              >
                <svg className="w-3.5 h-3.5 text-[#1a0f09]/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/prathampetwal"
                target="_blank"
                rel="noreferrer"
                className="badge group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 backdrop-blur-sm text-[#1a0f09] border border-[#1a0f09]/20 font-semibold text-xs hover:bg-[#0077b5]/15 hover:border-[#0077b5]/40 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm"
                style={{ fontFamily: 'var(--font-kalam)', opacity: 0 }}
              >
                <svg className="w-3.5 h-3.5 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* Email copy */}
              <EmailCopy />
            </div>

          </div>{/* end text overlay */}

          {/* Corner decorative hand-labels */}
          <div
            className="absolute -top-3 -right-5 px-2.5 py-1 rounded-lg border border-white/20 bg-black/25 backdrop-blur-md text-white/80 text-[10px] font-bold tracking-widest shadow pointer-events-none"
            style={{ transform: 'rotate(4deg)', fontFamily: 'var(--font-kalam)' }}
          >
            ✦ 2026
          </div>
          <div
            className="absolute -bottom-2 -left-4 px-2.5 py-1 rounded-lg border border-emerald-400/30 bg-emerald-950/55 backdrop-blur-md text-emerald-300 text-[10px] font-bold shadow pointer-events-none"
            style={{ transform: 'rotate(-3deg)', fontFamily: 'var(--font-kalam)' }}
          >
            Open to work ●
          </div>

        </div>{/* end paper + text block */}

      </div>
    </section>
  );
};

// ── Inline email copy badge ──
const EmailCopy: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('prathampetwal100@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* ignore */ }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copy email"
      className="badge group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 backdrop-blur-sm text-[#1a0f09] border border-[#1a0f09]/20 font-mono font-semibold text-[11px] hover:bg-white/90 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm cursor-pointer"
      style={{ opacity: 0 }}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-700">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5 text-[#1a0f09]/60 group-hover:text-[#1a0f09] transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>Email</span>
        </>
      )}
    </button>
  );
};

export default Hero;
