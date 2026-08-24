import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  AboutData,
  DEFAULT_ABOUT_DATA,
} from "../data/aboutData";
import {
  BinderClip,
  MaskingTape,
  LightbulbDoodle,
  PencilDoodle,
  BotanicalLeafDoodle,
  CoffeeCupDoodle,
  MoonStarsDoodle,
  SketchyArrow,
  SpiralSpine,
} from "./sketchbook/SketchDoodles";
import { RoughBox } from "./sketchbook/RoughBox";
import { HeadphoneListenerAnimation } from "./sketchbook/HeadphoneListenerAnimation";
import {
  Layers,
  Rocket,
  Square,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";

export interface AboutProps {
  data?: Partial<AboutData>;
}

export const About: React.FC<AboutProps> = ({ data: userOverrides }) => {
  // Merge user overrides into default data
  const [data, setData] = useState<AboutData>({
    ...DEFAULT_ABOUT_DATA,
    ...userOverrides,
    header: { ...DEFAULT_ABOUT_DATA.header, ...userOverrides?.header },
    whoAmI: { ...DEFAULT_ABOUT_DATA.whoAmI, ...userOverrides?.whoAmI },
    beliefs: { ...DEFAULT_ABOUT_DATA.beliefs, ...userOverrides?.beliefs },
    character: { ...DEFAULT_ABOUT_DATA.character, ...userOverrides?.character },
    journey: { ...DEFAULT_ABOUT_DATA.journey, ...userOverrides?.journey },
    whatIDo: { ...DEFAULT_ABOUT_DATA.whatIDo, ...userOverrides?.whatIDo },
    polaroid: { ...DEFAULT_ABOUT_DATA.polaroid, ...userOverrides?.polaroid },
    funFacts: { ...DEFAULT_ABOUT_DATA.funFacts, ...userOverrides?.funFacts },
    doodles: { ...DEFAULT_ABOUT_DATA.doodles, ...userOverrides?.doodles },
    resume: { ...DEFAULT_ABOUT_DATA.resume, ...userOverrides?.resume },
  });

  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlaySong = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback issue:", err);
          setIsPlaying(false);
        });
    }
  };

  // Toggle checklist items interactively
  const handleToggleBelief = (id: string) => {
    setData((prev) => ({
      ...prev,
      beliefs: {
        ...prev.beliefs,
        items: prev.beliefs.items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        ),
      },
    }));
  };

  // Helper for timeline milestone icons
  const renderMilestoneIcon = (icon: string) => {
    switch (icon) {
      case "laptop":
        return (
          <svg className="w-8 h-8 mx-auto" viewBox="0 0 40 32" fill="none">
            <rect
              x="5"
              y="3"
              width="30"
              height="20"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <line x1="8" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M2 27C2 25 5 25 10 25H30C35 25 38 25 38 27H2Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="currentColor"
              fillOpacity="0.1"
            />
          </svg>
        );
      case "code":
        return (
          <span className="text-2xl font-mono font-bold tracking-tighter text-neutral-900 block">
            &lt;/&gt;
          </span>
        );
      case "cube":
        return (
          <svg className="w-8 h-8 mx-auto" viewBox="0 0 36 36" fill="none">
            <path
              d="M18 4L32 11V25L18 32L4 25V11L18 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M18 4V32" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 11L18 18L32 11" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M25 14.5L11 21.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
          </svg>
        );
      case "rocket":
        return (
          <svg className="w-8 h-8 mx-auto" viewBox="0 0 36 36" fill="none">
            <path
              d="M28 4C28 4 22 7 17 12C12 17 9 23 9 23L13 27C13 27 19 24 24 19C29 14 32 8 32 8L28 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="21" cy="15" r="2.5" fill="currentColor" />
            <path d="M11 25L5 29L7 23L11 25Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M19 24L17 31L13 27" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 29L3 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      default:
        return <Rocket className="w-6 h-6 mx-auto" />;
    }
  };

  // Helper for "What I Do" icons
  const renderServiceIcon = (icon: string) => {
    switch (icon) {
      case "globe":
        return (
          <svg className="w-5 h-5 inline-block shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.5" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case "layers":
        return (
          <svg className="w-5 h-5 inline-block shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "puzzle":
        return (
          <svg className="w-5 h-5 inline-block shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 11V6C4 4.89543 4.89543 4 6 4H11C11 5.65685 12.3431 7 14 7C15.6569 7 17 5.65685 17 4H20C21.1046 4 22 4.89543 22 6V11C20.3431 11 19 12.3431 19 14C19 15.6569 20.3431 17 22 17V20C22 21.1046 21.1046 22 20 22H17C17 20.3431 15.6569 19 14 19C12.3431 19 11 20.3431 11 22H6C4.89543 22 4 21.1046 4 20V17C5.65685 17 7 15.6569 7 14C7 12.3431 5.65685 11 4 11Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "book":
        return (
          <svg className="w-5 h-5 inline-block shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5C4 18.12 5.12 17 6.5 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M6.5 2H20V22H6.5C5.12 22 4 20.88 4 19.5V4.5C4 3.12 5.12 2 6.5 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      default:
        return <Layers className="w-5 h-5 text-neutral-800" />;
    }
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-20 sm:py-28 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16 tactile-menu-bg text-neutral-900 flex flex-col items-center justify-center overflow-hidden z-10 select-none border-t border-[#1c1917]/15"
    >
      {/* Background Ambient Warm Glows & Studio Desk Aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,236,226,0.85)_0%,rgba(250,247,242,1)_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-amber-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-orange-300/10 blur-[130px] pointer-events-none" />

      {/* Subtle Studio Texture Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000000 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-neutral-800 border border-black/10 backdrop-blur-md text-xs font-mono font-semibold tracking-widest uppercase mb-3.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {data.header.badgeText}
        </div>
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {data.header.sectionTitle}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-normal max-w-xl mx-auto">
          {data.header.description}
        </p>
      </div>

      {/* ================= MASTER OPEN SPIRAL SKETCHBOOK CONTAINER ================= */}
      <div className="relative w-full max-w-[1080px] mx-auto z-10">
        
        {/* Book Outer Drop Shadow & Natural Cover Edge */}
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-2.5 sm:p-4 bg-[#e8ded0] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15),0_10px_25px_-5px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.08)]">
          
          {/* Notebook Paper Surface (Dual Pages with central spiral) */}
          <div className="relative sketchbook-paper rounded-[1.6rem] sm:rounded-[2rem] border border-[#d6caba] shadow-inner overflow-hidden">
            
            {/* Subtle Paper Fiber Grid & Vintage Page Crease */}
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.03)_100%)]" />

            {/* Book Spine Center Shadow Gradient */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-20 bg-gradient-to-r from-transparent via-black/[0.12] to-transparent pointer-events-none z-10" />

            {/* Layout Grid: Left Page (lg:col-span-6) + Center Spiral + Right Page (lg:col-span-6) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 relative min-h-[760px] sm:min-h-[820px] lg:min-h-[860px]">
              
              {/* ============================================================== */}
              {/* ======================== LEFT PAGE =========================== */}
              {/* ============================================================== */}
              <div className="lg:col-span-6 p-6 sm:p-9 md:p-12 lg:pr-10 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#d8ccbb]/70">
                
                {/* Top: ABOUT ME Heading + Radiating Doodle Rays */}
                <div className="relative mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 inline-block font-sketch leading-none select-none"
                      >
                        ABOUT ME
                      </h1>
                      {/* Radiating Accent Doodle Rays */}
                      <svg
                        className="w-10 h-10 -mt-10 ml-[230px] sm:ml-[280px] text-neutral-800 inline-block pointer-events-none"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <line x1="8" y1="12" x2="2" y2="6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="16" y1="8" x2="16" y2="1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="24" y1="12" x2="30" y2="6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>

                      {/* Sketchy Dual Underline Marker */}
                      <div className="w-52 sm:w-64 h-2 mt-1 relative pointer-events-none">
                        <svg viewBox="0 0 260 12" fill="none" className="w-full h-full text-neutral-900">
                          <path
                            d="M2 4C80 2 180 3 255 4"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10 9C90 7 190 8 240 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Left Grid: Sticky Notes & Main Sketch Developer Character */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 relative flex-1 items-start">
                  
                  {/* Left Column of Left Page: 2 Taped / Clipped Notes */}
                  <div className="sm:col-span-5 flex flex-col gap-6 relative z-10">
                    
                    {/* 1. "WHO AM I?" Sticky Note with Black Metal Binder Clip & Rough.js Sketchy Border */}
                    <div
                      className="relative transition-transform duration-300 group"
                      style={{ transform: `rotate(${data.whoAmI.rotation ?? -2.5}deg)` }}
                    >
                      {/* Binder Clip Clamped at Top Center */}
                      {data.doodles.showClip && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30">
                          <BinderClip />
                        </div>
                      )}

                      <RoughBox
                        fill="#fef9c3"
                        fillStyle="solid"
                        roughness={1.5}
                        bowing={1.3}
                        stroke="#292524"
                        strokeWidth={1.8}
                        className="w-[30vw] rounded-xl p-4 sm:p-4.5 text-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                      >
                        <h3 className="text-lg sm:text-xl font-bold font-sketch tracking-wide text-neutral-900 pb-1 border-b border-neutral-800/20 mb-2 mt-1">
                          {data.whoAmI.title}
                        </h3>
                        <p className="text-sm sm:text-base font-hand leading-relaxed text-neutral-800">
                          {data.whoAmI.description}
                        </p>
                      </RoughBox>
                    </div>

                    {/* 2. "I BELIEVE IN" Scrap Paper with Masking Tape & Rough.js Sketchy Border */}
                    <div
                      className="relative transition-transform duration-300"
                      style={{ transform: `rotate(${data.beliefs.rotation ?? 1.5}deg)` }}
                    >
                      {/* Top Masking Tape Strip */}
                      {data.doodles.showTape && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                          <MaskingTape width="w-28" height="h-7" rotate={-1} />
                        </div>
                      )}

                      <RoughBox
                        fill="#fffef7"
                        fillStyle="solid"
                        roughness={1.6}
                        bowing={1.2}
                        stroke="#292524"
                        strokeWidth={1.8}
                        className="rounded-xl p-4 sm:p-5 text-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                      >
                        <h3 className="text-lg sm:text-xl font-bold font-sketch tracking-wide text-neutral-900 pb-1.5 border-b border-neutral-300 mb-3 mt-1">
                          {data.beliefs.title}
                        </h3>

                        <ul className="space-y-2 font-hand text-base sm:text-lg">
                          {data.beliefs.items.map((item) => (
                            <li
                              key={item.id}
                              onClick={() => handleToggleBelief(item.id)}
                              className="flex items-center gap-2.5 cursor-pointer group hover:text-amber-800 transition-colors"
                            >
                              <span className="text-neutral-900 group-hover:scale-110 transition-transform">
                                {item.checked ? (
                                  <svg className="w-5 h-5 text-neutral-900" viewBox="0 0 20 20" fill="none">
                                    <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M5 10L8.5 13.5L15 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ) : (
                                  <Square className="w-5 h-5 text-neutral-500" />
                                )}
                              </span>
                              <span className={item.checked ? "text-neutral-900 font-semibold" : "text-neutral-500 line-through"}>
                                {item.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </RoughBox>
                    </div>

                    {/* Hand-drawn Pencil Doodle at bottom of left column */}
                    {data.doodles.showPencil && (
                      <div className="relative mt-2 -ml-2 select-none pointer-events-none hidden sm:block">
                        <PencilDoodle />
                      </div>
                    )}
                  </div>

                  {/* Right Column of Left Page: Main Ink/Graphite Character Sketch & Resume Button */}
                  <div className="sm:col-span-7 flex flex-col items-center justify-between relative h-full min-h-[380px] sm:min-h-[460px]">
                    <div className="relative w-full flex-1 flex items-center justify-center">
                      <img
                        src={data.character.image}
                        alt={data.character.alt}
                        className="w-full max-w-[320px] sm:max-w-[380px] h-auto object-contain mix-blend-multiply drop-shadow-sm select-none pointer-events-none transform transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Sketch-Themed Resume Download Button with Rough.js border */}
                    {data.resume?.showButton && (
                      <motion.div
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative group mt-3 select-none"
                        style={{ transform: "rotate(-1deg)" }}
                      >
                        {/* Mini Washi Tape on the button */}
                        <div className="absolute -top-2.5 right-3 z-30 pointer-events-none">
                          <MaskingTape width="w-12" height="h-4" rotate={-5} />
                        </div>

                        <a
                          href={data.resume.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block cursor-pointer"
                        >
                          <RoughBox
                            fill="#fffdf5"
                            fillStyle="solid"
                            roughness={1.5}
                            bowing={1.2}
                            stroke="#1c1917"
                            strokeWidth={2}
                            className="px-4 py-2 sm:py-2.5 rounded-xl shadow-[3px_3px_0px_#1c1917] group-hover:shadow-[5px_5px_0px_#1c1917] transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              {/* Hand-Drawn Document Icon */}
                              <div className="w-8 h-8 rounded-lg bg-amber-100/90 border border-neutral-900 flex items-center justify-center shrink-0 group-hover:bg-amber-200 transition-colors">
                                <svg className="w-4 h-4 text-neutral-900" viewBox="0 0 24 24" fill="none">
                                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                  <path d="M8 13H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 1.5" />
                                  <path d="M8 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 1.5" />
                                </svg>
                              </div>

                              {/* Text Info */}
                              <div className="text-left flex-1 min-w-0 pr-1">
                                <div className="font-sketch text-sm sm:text-base font-bold tracking-wide text-neutral-950 flex items-center gap-1.5 leading-tight">
                                  <span>{data.resume.buttonText}</span>
                                  <span className="text-xs">↗</span>
                                </div>
                                <div className="font-mono text-[10px] text-neutral-600 font-semibold tracking-tight">
                                  {data.resume.subText || "PDF • Updated 2026"}
                                </div>
                              </div>

                              {/* Hand-Drawn Animated External / Open Icon */}
                              <div className="w-6 h-6 rounded-md bg-neutral-950 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <svg className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                              </div>
                            </div>
                          </RoughBox>
                        </a>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Bottom Left Page: Handwritten Quote */}
                <div className="relative mt-6 pt-4 border-t border-[#dfd4c3]/60 flex items-start justify-center text-center">
                  <div className="max-w-md">
                    <p className="font-hand text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
                      <span className="text-2xl sm:text-3xl text-neutral-950 mr-1 font-serif">❝</span>
                      {data.character.quote}
                      <span className="text-2xl sm:text-3xl text-neutral-950 ml-1 font-serif">❞</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Central Spiral Binding Wire Spine (Visible on Desktop) */}
              <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <SpiralSpine loops={13} />
              </div>

              {/* ============================================================== */}
              {/* ======================== RIGHT PAGE ========================== */}
              {/* ============================================================== */}
              <div className="lg:col-span-6 p-6 sm:p-9 md:p-12 lg:pl-10 flex flex-col justify-between relative">
                
                {/* Top: "MY JOURNEY" Header + Story + Glowing Bulb Doodle */}
                <div className="relative mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-extrabold font-sketch tracking-tight text-neutral-900 leading-none">
                        {data.journey.title}
                      </h2>
                      {/* Double Underline */}
                      <div className="w-36 sm:w-44 h-1.5 mt-1 pointer-events-none">
                        <svg viewBox="0 0 180 8" fill="none" className="w-full h-full text-neutral-900">
                          <path d="M2 3C60 2 120 3 175 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M8 6C65 5 125 6 160 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Glowing Idea Bulb Doodle at Top Right */}
                    {data.doodles.showBulb && (
                      <div className="-mt-3 -mr-2">
                        <LightbulbDoodle />
                      </div>
                    )}
                  </div>

                  {/* Journey Story Paragraph */}
                  <p className="font-marker text-sm sm:text-base text-neutral-800 leading-relaxed mt-3 max-w-lg">
                    {data.journey.story}
                  </p>
                </div>

                {/* Interactive Horizontal Flowchart Timeline with Rough.js Sketchy Outline */}
                <div className="relative my-4">
                  <RoughBox
                    fill="rgba(0,0,0,0.02)"
                    fillStyle="solid"
                    roughness={1.4}
                    bowing={1.2}
                    stroke="#44403c"
                    strokeWidth={1.5}
                    className="p-3 sm:p-4 pb-4 sm:pb-5 rounded-2xl"
                  >
                    <div className="flex items-start justify-between relative w-full gap-0.5 sm:gap-1">
                      {data.journey.milestones.map((milestone, idx) => (
                        <React.Fragment key={milestone.title + idx}>
                          {/* Milestone Node */}
                          <div
                            onMouseEnter={() => setActiveMilestone(idx)}
                            onMouseLeave={() => setActiveMilestone(null)}
                            className="flex-1 flex flex-col items-center text-center group cursor-pointer px-1 py-1 rounded-xl hover:bg-white/70 transition-all duration-200"
                          >
                            {/* Milestone Icon (Moved Up) */}
                            <div className="h-10 sm:h-12 w-full flex items-center justify-center text-neutral-900 group-hover:scale-115 group-hover:-translate-y-1.5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                              {renderMilestoneIcon(milestone.icon)}
                            </div>

                            {/* Milestone Title */}
                            <span className="font-sketch text-xs sm:text-[13px] font-bold text-neutral-950 leading-tight mt-1.5 min-h-[32px] sm:min-h-[36px] flex items-center justify-center max-w-[85px] sm:max-w-[105px]">
                              {milestone.title}
                            </span>

                            {/* Milestone Year */}
                            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-neutral-600 mt-0.5">
                              {milestone.year}
                            </span>

                            {/* Hover Tooltip / Detail */}
                            {milestone.description && activeMilestone === idx && (
                              <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 z-50 bg-neutral-950 text-white text-[11px] font-sans px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150 border border-neutral-700">
                                {milestone.description}
                              </div>
                            )}
                          </div>

                          {/* Connector Arrow placed at icon level */}
                          {idx < data.journey.milestones.length - 1 && (
                            <div className="h-10 sm:h-12 flex items-center justify-center shrink-0 px-0.5 pointer-events-none">
                              <SketchyArrow className="w-5 sm:w-7 md:w-8 text-neutral-800" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </RoughBox>
                </div>

                {/* Middle Right Grid: "WHAT I DO" Taped Card & Mountain Polaroid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 relative my-4 items-start">
                  
                  {/* Left Box: "WHAT I DO" Taped Card with Rough.js Sketchy Border */}
                  <div className="sm:col-span-7 relative">
                    {/* Top Masking Tape Strip */}
                    {data.doodles.showTape && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                        <MaskingTape width="w-24" height="h-6" rotate={1} />
                      </div>
                    )}

                    <RoughBox
                      fill="#fffef7"
                      fillStyle="solid"
                      roughness={1.6}
                      bowing={1.3}
                      stroke="#292524"
                      strokeWidth={1.8}
                      className="rounded-xl p-4 sm:p-5 text-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                    >
                      <h3 className="text-lg sm:text-xl font-bold font-sketch tracking-wide text-neutral-900 pb-1.5 border-b border-neutral-300 mb-3 mt-1">
                        {data.whatIDo.title}
                      </h3>

                      <ul className="space-y-2.5 font-marker text-sm sm:text-base">
                        {data.whatIDo.items.map((item) => (
                          <li key={item.id} className="flex items-center gap-2.5 text-neutral-800 hover:translate-x-1.5 transition-transform duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                            {renderServiceIcon(item.icon)}
                            <span className="font-semibold">{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </RoughBox>
                  </div>

                  {/* Right Box: Taped Mountain Landscape Polaroid with Rough.js border */}
                  <div className="sm:col-span-5 flex flex-col items-center">
                    <div
                      className="relative max-w-[190px] sm:max-w-[210px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:-translate-y-1.5"
                      style={{ transform: `rotate(${data.polaroid.rotation ?? 2.5}deg)` }}
                    >
                      {/* Polaroid Top Tape Strip */}
                      {data.doodles.showTape && (
                        <div className="absolute -top-3.5 right-3 z-30 pointer-events-none">
                          <MaskingTape width="w-20" height="h-6" rotate={-6} />
                        </div>
                      )}

                      <RoughBox
                        fill="#ffffff"
                        fillStyle="solid"
                        roughness={1.4}
                        bowing={1.1}
                        stroke="#292524"
                        strokeWidth={1.6}
                        className="p-2.5 pb-4 shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                      >
                        {/* Polaroid Mountain Sketch Image */}
                        <div className="w-full aspect-square bg-[#ece4d6] border border-neutral-400 overflow-hidden mb-2">
                          <img
                            src={data.polaroid.image}
                            alt={data.polaroid.alt ?? "Mountain sketch"}
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        </div>

                        {/* Handwritten Polaroid Caption */}
                        <div className="text-center font-sketch text-xs sm:text-sm font-bold text-neutral-900 tracking-wider">
                          {data.polaroid.caption}
                        </div>
                      </RoughBox>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: "FUN FACTS" (Full Line Width) + Audio Player + Plant Doodle */}
                <div className="relative mt-3 pt-3 border-t border-[#dfd4c3]/60 flex flex-col gap-3">
                  {/* Hidden Audio Element for Song.mp3 */}
                  <audio
                    ref={audioRef}
                    src="/Song.mp3"
                    preload="metadata"
                    onEnded={() => setIsPlaying(false)}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                  />

                  {/* Header Row: Highlighter Banner (Left) + Tactile Audio Player (Right) */}
                  <div className="w-full flex flex-wrap items-center justify-between gap-3">
                    {/* Highlighter Brush Header */}
                    <div>
                      <span className="inline-block px-3 py-1 bg-neutral-950 text-white font-sketch text-sm sm:text-base font-bold tracking-wider rounded-sm transform -rotate-1 shadow-sm">
                        {data.funFacts.title}
                      </span>
                    </div>

                    {/* Tactile Audio Player + Headphone Listener Badge */}
                    <div className="relative group select-none">
                      {/* Washi Tape Badge on Top Edge */}
                      <div className="absolute -top-2 left-3 z-10 w-14 h-3 washi-tape opacity-90 -rotate-3 pointer-events-none" />

                      <div className="sketch-pill-btn bg-[#fbf8f1] border-2 border-[#1c1917] p-1.5 sm:p-2 rounded-2xl flex items-center gap-2 sm:gap-2.5 shadow-[2px_2.5px_0px_#1c1917] hover:shadow-[3px_3.5px_0px_#1c1917] transition-all">
                        {/* Play/Pause Button */}
                        <button
                          type="button"
                          onClick={togglePlaySong}
                          aria-label={isPlaying ? "Pause track" : "Play favorite track"}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border border-[#1c1917] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                            isPlaying
                              ? "bg-[#1c1917] text-emerald-400 scale-105"
                              : "bg-[#ebdccb] text-[#1c1917] hover:bg-[#1c1917] hover:text-white"
                          }`}
                        >
                          {isPlaying ? (
                            <Pause className="w-3 h-3 fill-current" />
                          ) : (
                            <Play className="w-3 h-3 fill-current translate-x-0.5" />
                          )}
                        </button>

                        {/* Song Details & Visualizer */}
                        <div className="flex flex-col pr-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#1c1917] tracking-tight">
                              Song.mp3
                            </span>
                            {isPlaying && (
                              <span className="flex items-center gap-0.5 h-2">
                                <span className="w-0.5 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-0.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-0.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" />
                              </span>
                            )}
                          </div>
                          <span className="font-sketch text-[9.5px] sm:text-[10px] text-[#7a6b5c] font-medium leading-none">
                            {isPlaying ? "Now Playing 🎵" : "Favorite Track ✦"}
                          </span>
                        </div>

                        {/* Headphone Listening Animation Badge */}
                        <HeadphoneListenerAnimation isPlaying={isPlaying} />
                      </div>
                    </div>
                  </div>

                  {/* Fun Facts List spanning full width (Single Full Lines) */}
                  <div className="relative w-full flex items-end justify-between">
                    <ul className="w-full space-y-1.5 font-hand text-base sm:text-lg text-neutral-900 pr-2">
                      {data.funFacts.facts.map((fact) => (
                        <li key={fact.id} className="flex items-center gap-2 whitespace-normal sm:whitespace-nowrap">
                          <span className="text-neutral-700 font-bold shrink-0">•</span>
                          <span className="leading-snug">{fact.text}</span>
                          {fact.doodle === "coffee" && <CoffeeCupDoodle />}
                          {fact.doodle === "moon" && <MoonStarsDoodle />}
                          {fact.doodle === "pencil" && (
                            <svg className="w-4 h-4 inline-block text-neutral-800 -rotate-45 shrink-0" viewBox="0 0 24 24" fill="none">
                              <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                          )}
                          {fact.doodle === "sparkles" && (
                            <Sparkles className="w-4 h-4 inline-block text-amber-600 shrink-0" />
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Botanical Leaf Doodle at Bottom Right */}
                    {data.doodles.showPlant && (
                      <div className="relative -mb-3 -mr-3 shrink-0 hidden sm:block pointer-events-none">
                        <BotanicalLeafDoodle />
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
