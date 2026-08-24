import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Layers, 
  Award, 
  Send, 
  ArrowUpRight, 
  FileDown, 
  Clock, 
  Sparkle,
  X
} from 'lucide-react';

interface MenuItem {
  id: string;
  number: string;
  label: string;
  subtitle: string;
  href: string;
  tag: string;
  tagColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'projects',
    number: '01',
    label: 'Works & Projects',
    subtitle: '3D Bookshelf & Selected Works',
    href: '#projects',
    tag: 'Featured',
    tagColor: 'bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]',
    icon: BookOpen,
  },
  {
    id: 'skills',
    number: '02',
    label: 'Skills & Stack',
    subtitle: 'Interactive Tech Arsenal',
    href: '#skills',
    tag: 'Expertise',
    tagColor: 'bg-[#f3e8ff] text-[#6b21a8] border-[#d8b4fe]',
    icon: Sparkles,
  },
  {
    id: 'about',
    number: '03',
    label: 'About & Practice',
    subtitle: 'Journal & Design Philosophy',
    href: '#about',
    tag: 'Story',
    tagColor: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]',
    icon: Compass,
  },
  {
    id: 'timeline',
    number: '04',
    label: 'Timeline & Journey',
    subtitle: 'Education & Career Milestones',
    href: '#timeline',
    tag: 'Chronicle',
    tagColor: 'bg-[#dcfce7] text-[#166534] border-[#86efac]',
    icon: Layers,
  },
  {
    id: 'achievements',
    number: '05',
    label: 'Achievements & Stats',
    subtitle: 'Sticky Notes & Certifications',
    href: '#achievements',
    tag: 'Pinboard',
    tagColor: 'bg-[#fef9c3] text-[#854d0e] border-[#fef08a]',
    icon: Award,
  },
  {
    id: 'contact',
    number: '06',
    label: 'Get In Touch',
    subtitle: "Let's Build Something Together",
    href: '#contact',
    tag: 'Inquiries',
    tagColor: 'bg-[#ffe4e6] text-[#9f1239] border-[#fecdd3]',
    icon: Send,
  },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/pratham9634' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/prathampetwal' },
  { name: 'Twitter / X', href: 'https://twitter.com' },
  { name: 'Email', href: 'mailto:prathampetwal100@gmail.com' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuCardRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const isHero = activeSection === 'hero';

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Navigate to section with smooth scroll and close menu
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();

    // Re-enable Lenis scroll and smoothly move to target
    setTimeout(() => {
      const lenis = (window as any).lenis;
      if (href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          if (lenis) {
            lenis.start();
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: 0,
              duration: 1.4,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }, 50);
  };

  // Live IST Clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ScrollSpy to detect which section is currently on screen
  useEffect(() => {
    const sectionIds = ['projects', 'skills', 'about', 'timeline', 'achievements', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener: 'M' or 'm' toggles menu, 'Escape' closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        menuCardRef.current &&
        !menuCardRef.current.contains(e.target as Node) &&
        triggerBtnRef.current &&
        !triggerBtnRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Stop / Resume scrolling completely across all devices when menu is open
  useEffect(() => {
    const lenis = (window as any).lenis;

    if (isOpen) {
      // Freeze page scroll
      if (lenis) {
        lenis.stop();
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Unfreeze page scroll
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // GSAP Elastic Spring Ribbon Unfold & Rollup Animation
  useEffect(() => {
    const card = menuCardRef.current;
    if (!card) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      gsap.set(card, { 
        scale: 0, 
        opacity: 0, 
        rotate: -3, 
        transformOrigin: 'top right',
        display: 'none' 
      });
      return;
    }

    if (isOpen) {
      gsap.killTweensOf(card);
      gsap.set(card, { display: 'flex' });
      
      const tl = gsap.timeline();
      
      // Elastic spring container unfold with tactile wobble
      tl.fromTo(
        card,
        { scale: 0.1, opacity: 0, rotate: -4, transformOrigin: 'top right' },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.75,
          ease: 'elastic.out(1.15, 0.42)',
          transformOrigin: 'top right',
        }
      );

      // Staggered bouncy entry for nav items
      if (itemsContainerRef.current) {
        const items = itemsContainerRef.current.querySelectorAll('.menu-row-item');
        tl.fromTo(
          items,
          { opacity: 0, y: -12, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.035,
            duration: 0.4,
            ease: 'back.out(2)',
          },
          '-=0.55'
        );
      }
    } else {
      gsap.killTweensOf(card);
      gsap.to(card, {
        scale: 0.4,
        opacity: 0,
        rotate: 3,
        duration: 0.3,
        ease: 'power3.inOut',
        transformOrigin: 'top right',
        onComplete: () => {
          gsap.set(card, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  // Split-text character arrays for kinetic rolling hover animation
  const nameLetters = ['P', 'R', 'A', 'T', 'H', 'A', 'M'];
  const menuBtnLetters = isOpen ? ['C', 'L', 'O', 'S', 'E'] : ['I', 'N', 'D', 'E', 'X'];

  return (
    <>
      {/* Soft Ambient Backdrop with Blur */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[4px] transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Main Top Floating Header Bar */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 md:px-12 py-3 sm:py-4.5 flex justify-between items-center pointer-events-none select-none">
        
        {/* Left: Adaptive Editorial Brand Capsule (Crisp & High-Contrast in ALL sections) */}
        <a
          href="#"
          className={`pointer-events-auto group flex items-center gap-3 py-1.5 px-2.5 sm:px-3.5 rounded-2xl transition-all duration-300 focus:outline-none ${
            isHero
              ? 'bg-black/35 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-black/50 hover:border-white/40'
              : 'bg-[#fbf8f1]/92 backdrop-blur-md border-2 border-[#1c1917] shadow-[2.5px_3.5px_0px_#1c1917] hover:shadow-[3.5px_5px_0px_#1c1917] hover:-translate-y-0.5'
          }`}
        >
          {/* Tactile Monogram Stamp Badge with GSAP Spring Rotation */}
          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-105 shrink-0 ${
            isHero
              ? 'bg-[#fbf8f1] border-[#1c1917] text-[#1c1917] shadow-sm'
              : 'bg-[#1c1917] border-[#1c1917] text-[#fbf8f1] shadow-sm'
          }`}>
            <span 
              className="text-xs sm:text-sm font-black leading-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              P
            </span>
          </div>

          {/* Name & Dynamic Tag with Kinetic Split-Text Reveal */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              {/* Kinetic Rolling Letter Reveal for PRATHAM */}
              <span
                className={`text-sm sm:text-base font-bold tracking-[0.14em] uppercase leading-none flex items-center overflow-hidden transition-colors duration-300 ${
                  isHero ? 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]' : 'text-[#1c1917]'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {nameLetters.map((char, index) => (
                  <span
                    key={index}
                    className="relative inline-block overflow-hidden h-[1.15em] align-top"
                  >
                    {/* Primary Letter */}
                    <span 
                      className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                      style={{ transitionDelay: `${index * 22}ms` }}
                    >
                      {char}
                    </span>
                    {/* Secondary Roll Reveal Letter */}
                    <span 
                      className={`absolute top-0 left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 ${
                        isHero ? 'text-emerald-400 font-black' : 'text-emerald-700 font-black'
                      }`}
                      style={{ transitionDelay: `${index * 22}ms` }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>

              {/* Status Pulse Badge */}
              <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.2 rounded-full border text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider transition-colors duration-300 ${
                isHero
                  ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-300 backdrop-blur-md'
                  : 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-sm'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE
              </span>
            </div>

            {/* Handwritten Subtitle with interactive spin */}
            <span
              className={`text-[9.5px] sm:text-[10px] font-medium tracking-[0.2em] uppercase mt-0.5 leading-tight font-sketch flex items-center gap-1 transition-colors duration-300 ${
                isHero ? 'text-white/80' : 'text-[#6e5e4f]'
              }`}
            >
              <span>Creative Engineer &amp; Dev</span>
              <span className="inline-block transition-transform duration-500 group-hover:rotate-180 text-amber-500 font-bold">
                ✦
              </span>
            </span>
          </div>
        </a>

        {/* Right: Tactile Craft Ribbon Trigger Pill */}
        <div className="relative pointer-events-auto">
          <button
            ref={triggerBtnRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation directory"
            className="sketch-pill-btn group relative z-50 flex items-center gap-2 sm:gap-2.5 py-1.5 sm:py-2 px-3 sm:px-4 rounded-2xl cursor-pointer select-none focus:outline-none"
          >
            {/* Washi Tape Accent on Top Edge */}
            <div className="absolute -top-1.5 left-3 sm:left-4 w-7 sm:w-8 h-2 washi-tape opacity-85 pointer-events-none rotate-[-4deg]" />

            {/* Menu Label with Kinetic Letter Roll & Keyboard Cue */}
            <div className="flex items-center gap-1.5">
              <span
                className="text-xs sm:text-sm font-bold tracking-wider text-[#1c1917] uppercase flex items-center overflow-hidden"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {menuBtnLetters.map((char, index) => (
                  <span
                    key={`${char}-${index}-${isOpen}`}
                    className="relative inline-block overflow-hidden h-[1.2em] align-top"
                  >
                    <span 
                      className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                      style={{ transitionDelay: `${index * 20}ms` }}
                    >
                      {char}
                    </span>
                    <span 
                      className="absolute top-0 left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 text-emerald-800 font-black"
                      style={{ transitionDelay: `${index * 20}ms` }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono font-semibold text-[#8c7b6d] bg-[#ebdccb]/60 px-1.5 py-0.2 rounded border border-[#c4b3a0]">
                M
              </span>
            </div>

            {/* Bouncy Morphing Sketch Hamburger */}
            <div className="w-4 h-3.5 relative flex flex-col justify-center items-center gap-[4px]">
              <span
                className={`h-[2px] w-full rounded-full bg-[#1c1917] transition-all duration-300 ease-out origin-center ${
                  isOpen ? 'rotate-45 translate-y-[3px] w-3.5' : 'w-full'
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-full bg-[#1c1917] transition-all duration-300 ease-out origin-center ${
                  isOpen ? '-rotate-45 -translate-y-[3px] w-3.5' : 'w-full'
                }`}
              />
            </div>
          </button>

          {/* ================= TACTILE EDITORIAL RIBBON PANEL (Screen Height Constrained) ================= */}
          <div
            ref={menuCardRef}
            className="sketch-ribbon-card menu-scrollbar absolute top-0 right-0 z-40 w-[92vw] max-w-[380px] sm:max-w-[420px] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] overflow-y-auto overflow-x-hidden origin-top-right rounded-3xl p-4 sm:p-5 flex flex-col gap-2.5 sm:gap-3 transform-gpu will-change-transform"
          >
            {/* Top Washi Tape Corner Tape Accent */}
            <div className="absolute -top-3 left-8 w-14 h-4 washi-tape opacity-90 rotate-[-2deg] pointer-events-none" />
            <div className="absolute -top-3 right-14 w-10 h-4 washi-tape opacity-80 rotate-[3deg] pointer-events-none" />

            {/* Panel Top Header Bar: Title, Local IST Clock, Close */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-[#1c1917]/20 pt-0.5 shrink-0">
              <div className="flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-[#1c1917] fill-[#1c1917]" />
                <span 
                  className="text-xs sm:text-[12.5px] font-bold uppercase tracking-widest text-[#1c1917]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Journal Directory
                </span>
              </div>

              {/* Real-time IST Clock & Status */}
              <div className="flex items-center gap-1.5 bg-[#ebdccb]/60 px-2 py-0.5 rounded-lg border border-[#d6c3ad]">
                <Clock className="w-2.5 h-2.5 text-[#6b5847]" />
                <span className="text-[10px] font-mono font-medium text-[#4a3b2c]">
                  {currentTime || '00:00:00'} <span className="text-[8.5px] text-[#7a6857]">IST</span>
                </span>
              </div>

              {/* Close Button Icon */}
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close directory"
                className="w-6 h-6 rounded-lg bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center text-black/70 hover:text-black transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-90"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Navigation List Container (Compact to guarantee full screen fit) */}
            <nav 
              ref={itemsContainerRef}
              className="flex flex-col gap-1 sm:gap-1.5 shrink-0"
            >
              {MENU_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const isCurrentActive = activeSection === item.id;
                const isHovered = hoveredIndex === index;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`menu-row-item group relative flex items-center justify-between px-3 py-2 sm:py-2.2 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                      isCurrentActive
                        ? 'bg-white shadow-[2px_2.5px_0px_#1c1917] border-2 border-[#1c1917]'
                        : 'hover:bg-white/80 hover:shadow-[1.5px_2px_0px_rgba(28,25,23,0.3)] border border-transparent hover:border-[#1c1917]/30'
                    }`}
                  >
                    {/* Left: Number + Icon + Title & Subtitle */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      {/* Number Stamp */}
                      <span className="text-[10px] font-mono font-bold text-[#8a7968] group-hover:text-[#1c1917] transition-colors w-4">
                        {item.number}
                      </span>

                      {/* Tactile Icon Box */}
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-6 group-hover:scale-110 shrink-0 ${
                        isCurrentActive 
                          ? 'bg-[#1c1917] text-white shadow-sm' 
                          : 'bg-[#ebdccb]/70 text-[#4a3b2c] group-hover:bg-[#1c1917] group-hover:text-white'
                      }`}>
                        <Icon className="w-3.5 h-3.5 transition-transform duration-200" />
                      </div>

                      {/* Labels */}
                      <div className="flex flex-col items-start">
                        <div className="relative flex items-center gap-1.5">
                          <span
                            className="text-sm sm:text-[15px] font-bold text-[#1c1917] tracking-tight group-hover:translate-x-0.5 transition-transform duration-200"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {item.label}
                          </span>

                          {/* Dynamic SVG Squiggle Underline on Hover */}
                          {isHovered && (
                            <svg
                              className="absolute -bottom-0.5 left-0 w-full h-1.5 pointer-events-none"
                              viewBox="0 0 100 8"
                              fill="none"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0,4 Q25,0 50,4 T100,4"
                                stroke="#1c1917"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                className="animate-squiggle"
                              />
                            </svg>
                          )}
                        </div>

                        <span className="text-[9.5px] sm:text-[10.5px] font-medium text-[#7a6b5c] group-hover:text-[#42372c] transition-colors leading-tight">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Right: Section Badge Tag & Arrow */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[8.5px] sm:text-[9.5px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-md border sketch-tag-badge transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${item.tagColor} ${
                          isHovered ? 'scale-110 rotate-[-2.5deg]' : ''
                        }`}
                      >
                        {item.tag}
                      </span>

                      <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:text-[#1c1917] group-hover:bg-black/10 group-hover:translate-x-0.5 transition-all duration-200">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </nav>

            {/* Bottom Panel Footer: CV Action & Social Links (Clean & Compact) */}
            <div className="pt-2.5 border-t-2 border-dashed border-[#1c1917]/20 flex flex-col gap-2 shrink-0">
              {/* Quick Resume Download Pill Action */}
              <a
                href="/PRATHAM_RESUME_J.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full py-2 px-3.5 rounded-xl bg-[#1c1917] text-white flex items-center justify-between shadow-[2px_3px_0px_#8c7b6d] hover:shadow-[3px_4px_0px_#8c7b6d] hover:-translate-y-1 hover:scale-[1.025] active:translate-y-0.5 active:scale-[0.96] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileDown className="w-3.5 h-3.5 text-emerald-400 group-hover:animate-bounce" />
                  <span
                    className="text-xs sm:text-[12.5px] font-bold tracking-wider uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Curriculum Vitae
                  </span>
                </div>
                <span className="text-[9.5px] font-mono text-white/60 group-hover:text-white transition-colors">
                  PDF ↗
                </span>
              </a>

              {/* Social Channels Row */}
              <div className="grid grid-cols-4 gap-1">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1 px-0.5 rounded-lg bg-white/70 hover:bg-white border border-[#1c1917]/20 hover:border-[#1c1917] text-center text-[9.5px] sm:text-[10px] font-bold text-[#42372c] hover:text-[#1c1917] shadow-sm hover:shadow-[1.5px_2px_0px_#1c1917] hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  >
                    {social.name}
                  </a>
                ))}
              </div>

              {/* Footer Subtext / Shortcuts Guide */}
              <div className="flex items-center justify-between text-[9px] font-mono text-[#8a7968] pt-0.5">
                <span>[M] TOGGLE • ESC EXIT</span>
                <span className="font-sketch text-[10px] text-[#5e4f41]">Handcrafted with craft ✦</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
