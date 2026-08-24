import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import {
  TIMELINE_DATA,
  TimelineCategory,
} from "../data/timelineData";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  Award,
} from "lucide-react";
import { MaskingTape, MoonStarsDoodle } from "./sketchbook/SketchDoodles";

gsap.registerPlugin(ScrollTrigger);

/** Top Spiral Coils for the Notepad Page (matching user's reference image) */
const TopSpiralBinding: React.FC<{ coils?: number }> = ({ coils = 12 }) => {
  return (
    <div className="relative w-full h-8 sm:h-9 flex items-center justify-between px-3 sm:px-6 select-none pointer-events-none -mt-4 sm:-mt-4.5 z-30">
      {Array.from({ length: coils }).map((_, i) => (
        <div key={i} className="relative flex flex-col items-center justify-center w-4 sm:w-5 h-8">
          {/* Punched hole in the paper card */}
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#3d332a]/90 shadow-inner border border-black/30" />

          {/* Metal Wire Ring Loop */}
          <svg
            viewBox="0 0 20 36"
            fill="none"
            className="absolute -top-3 w-4 sm:w-5 h-8 sm:h-9 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
          >
            {/* Wire Loop Top Arch */}
            <path
              d="M3 28 C3 4, 17 4, 17 28"
              stroke="#2c2824"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Inner Chrome / Silver Reflection Highlight */}
            <path
              d="M5 26 C5 7, 15 7, 15 26"
              stroke="#e7e5e4"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Dark contact shadow at bottom */}
            <circle cx="10" cy="27" r="2" fill="#1c1917" opacity="0.8" />
          </svg>
        </div>
      ))}
    </div>
  );
};

/** Vintage Sketch Rubber Stamp */
const SketchStamp: React.FC<{ text: string; color?: string; rotate?: number }> = ({
  text,
  color = "#ea580c",
  rotate = -5,
}) => {
  return (
    <div
      style={{
        transform: `rotate(${rotate}deg)`,
        borderColor: color,
        color: color,
      }}
      className="inline-flex items-center gap-1 px-2.5 py-0.5 border-2 border-dashed rounded-md font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest bg-white/70 backdrop-blur-xs select-none shadow-xs"
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {text}
    </div>
  );
};

export const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spineLineRef = useRef<SVGLineElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<TimelineCategory>("all");

  const filteredItems = TIMELINE_DATA.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the central drawing spine line
      if (spineLineRef.current && containerRef.current) {
        gsap.fromTo(
          spineLineRef.current,
          { strokeDashoffset: 1200 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Animate timeline notebook page cards cascading in
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-page-card");
      cards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.94,
            rotation: isEven ? -4 : 4,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: (card as any).dataset.rotate || 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 sm:py-32 lg:py-36 tactile-menu-bg text-neutral-900 flex flex-col items-center justify-center overflow-hidden z-10 select-none border-b border-[#1c1917]/15"
    >
      {/* 1. Seamless Long Sketchbook Sheet Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] -z-10"
        style={{
          backgroundImage: `radial-gradient(#26221d 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* 2. Side Drafting Ruler Marks on Desktop (Sketchbook Margin Aesthetic) */}
      <div className="hidden xl:flex absolute left-4 top-24 bottom-24 w-8 flex-col justify-between items-center opacity-35 pointer-events-none font-mono text-[9px] text-neutral-600 select-none">
        <span className="writing-vertical -rotate-90 tracking-widest uppercase">
          SKETCHBOOK LOG · MM SCALE
        </span>
        <div className="h-4/5 w-[1px] bg-neutral-800/40 relative">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-2.5 h-[1px] bg-neutral-800/60"
              style={{ top: `${(i / 24) * 100}%` }}
            />
          ))}
        </div>
        <span className="font-mono">PAGE 03</span>
      </div>

      <div className="hidden xl:flex absolute right-4 top-24 bottom-24 w-8 flex-col justify-between items-center opacity-35 pointer-events-none font-mono text-[9px] text-neutral-600 select-none">
        <span className="font-mono">EST. 2023</span>
        <div className="h-4/5 w-[1px] bg-neutral-800/40 relative">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute right-0 w-2.5 h-[1px] bg-neutral-800/60"
              style={{ top: `${(i / 24) * 100}%` }}
            />
          ))}
        </div>
        <span className="writing-vertical rotate-90 tracking-widest uppercase">
          DEV CAREER LOGBOOK
        </span>
      </div>

      {/* 3. Subtle Warm Studio Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-br from-amber-100/60 via-orange-100/30 to-transparent blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-100/40 via-blue-100/30 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* 4. Section Header Banner */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6 mb-12 sm:mb-16">
        {/* Washi tape on section badge */}
        <div className="relative inline-block mb-4">
          <MaskingTape
            rotate={-2.5}
            width="w-32"
            height="h-6"
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20"
          />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1c1917]/20 bg-[#fffdf9] shadow-[2px_2px_0px_rgba(28,25,23,0.15)] text-xs sm:text-sm text-neutral-900 tracking-wider uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            [ 04 — Journey & Timeline ]
          </div>
        </div>

        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Academics & Experience
        </h2>

        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal max-w-xl mx-auto">
          A chronicled sketchbook record of my formal academics, high school foundation, and practical industry internships.
        </p>

        {/* Hand-drawn Doodles Annotation */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-sketch text-neutral-800">
          <span>✎ Top spiral pages recorded in real-time</span>
          <MoonStarsDoodle className="w-5 h-5 text-neutral-800" />
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {[
            { id: "all" as TimelineCategory, label: "All Records", count: TIMELINE_DATA.length },
            {
              id: "internship" as TimelineCategory,
              label: "Internships & Experience",
              count: TIMELINE_DATA.filter((i) => i.category === "internship").length,
              icon: Briefcase,
            },
            {
              id: "education" as TimelineCategory,
              label: "Schooling & Academics",
              count: TIMELINE_DATA.filter((i) => i.category === "education").length,
              icon: GraduationCap,
            },
          ].map((tab) => {
            const isSelected = activeCategory === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 active:scale-95 cursor-pointer ${
                  isSelected
                    ? "bg-[#1c1917] text-white shadow-[3px_3px_0px_rgba(0,0,0,0.3)] scale-[1.03]"
                    : "bg-[#fffdf9] text-neutral-800 border border-[#1c1917]/25 hover:bg-neutral-100 shadow-[2px_2px_0px_rgba(28,25,23,0.1)]"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[11px] font-mono ${
                    isSelected ? "bg-white/20 text-white" : "bg-neutral-200/80 text-neutral-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Timeline Spine and Vertical Cascade Container */}
      <div ref={containerRef} className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central Connecting Sketch Dotted Line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none hidden sm:block">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              ref={spineLineRef}
              x1="50%"
              y1="40"
              x2="50%"
              y2="100%"
              stroke="#8c7a68"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeDashoffset="1200"
            />
          </svg>
        </div>

        {/* Mobile Left Connector Line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-[#8c7a68]/60 sm:hidden" />

        {/* Timeline Items List */}
        <div className="flex flex-col gap-12 sm:gap-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className={`relative flex flex-col sm:flex-row items-center w-full ${
                    isEven ? "sm:justify-start" : "sm:justify-end"
                  }`}
                >
                  {/* Central Node Badge with Year */}
                  <div className="hidden sm:flex absolute left-1/2 top-10 -translate-x-1/2 z-30 flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-[#fffdf9] border-2 border-[#1c1917] shadow-[2px_2px_0px_#1c1917] flex items-center justify-center font-mono font-bold text-xs text-neutral-900">
                      {item.category === "internship" ? (
                        <Briefcase className="w-4 h-4 text-orange-600" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <span className="mt-1 font-mono text-[10px] font-extrabold text-neutral-700 bg-white/90 px-1.5 py-0.5 rounded border border-black/15 shadow-2xs">
                      {item.year}
                    </span>
                  </div>

                  {/* Top Spiral Notepad Page Card */}
                  <div
                    data-rotate={item.rotate}
                    className={`timeline-page-card w-full sm:w-[46%] ml-10 sm:ml-0 group relative`}
                  >
                    {/* Realistic Top-Spiral Notepad Container */}
                    <div
                      style={{
                        transform: `rotate(${item.rotate}deg)`,
                      }}
                      className="relative bg-[#fffefb] rounded-2xl sm:rounded-3xl border-2 border-[#2b241c] p-5 sm:p-7 shadow-[5px_7px_0px_#2b241c,0_15px_35px_rgba(43,36,28,0.08)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-[7px_10px_0px_#2b241c,0_20px_45px_rgba(43,36,28,0.12)] hover:-translate-y-2 hover:scale-[1.02]"
                    >
                      {/* Top Spiral Rings from user reference */}
                      <TopSpiralBinding coils={10} />

                      {/* Micro-Perforation Tear Line beneath the spiral */}
                      <div className="w-full border-b-2 border-dashed border-neutral-300/80 my-3.5 relative">
                        <span className="absolute right-0 -top-4 font-mono text-[9px] text-neutral-400">
                          PERFORATED TEAR ✂
                        </span>
                      </div>

                      {/* Header Row: Category Badge + Period + Rubber Stamp */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${item.accentBg}`}
                          >
                            {item.category === "internship" ? (
                              <Briefcase className="w-3 h-3" />
                            ) : (
                              <GraduationCap className="w-3 h-3" />
                            )}
                            {item.badge}
                          </span>

                          <div className="flex items-center gap-1 text-xs text-neutral-600 font-mono">
                            <Calendar className="w-3 h-3 text-neutral-500" />
                            <span>{item.period}</span>
                          </div>
                        </div>

                        {/* Stamped Status */}
                        <SketchStamp
                          text={item.stamp}
                          color={item.stampColor}
                          rotate={item.category === "internship" ? -3 : 2}
                        />
                      </div>

                      {/* Role / Degree Title */}
                      <h3
                        className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight mb-1"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.role}
                      </h3>

                      {/* Organization & Location */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-[13px] text-neutral-700 font-medium mb-3">
                        <span className="font-semibold text-neutral-900">
                          {item.organization}
                        </span>
                        <span className="inline-flex items-center gap-1 text-neutral-500">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>

                      {/* Summary Description */}
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Highlights & Key Bullet Points */}
                      <div className="space-y-2 mb-4 bg-[#fbf9f4] p-3 sm:p-3.5 rounded-xl border border-neutral-200/80">
                        <div className="text-[11px] font-mono font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Key Highlights & Impact</span>
                        </div>
                        <ul className="space-y-1.5">
                          {item.highlights.map((point, hIdx) => (
                            <li
                              key={hIdx}
                              className="text-xs sm:text-[13px] text-neutral-800 flex items-start gap-2 leading-snug"
                            >
                              <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Skills & Coursework Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2 py-0.8 rounded-md text-[11px] font-medium bg-white text-neutral-800 border border-neutral-300 shadow-2xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Sticky Note Snippet attached on notepad footer */}
                      {item.noteSticky && (
                        <div
                          style={{ backgroundColor: item.noteSticky.color }}
                          className="relative p-3 rounded-lg border border-black/15 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] text-xs text-neutral-900 font-hand leading-tight select-none rotate-[-0.8deg] transition-transform hover:rotate-0"
                        >
                          {/* Pin / Tape */}
                          <div className="absolute -top-2 left-6 w-12 h-3.5 washi-tape opacity-85 rotate-[-2deg]" />
                          <p className="font-medium text-[13px] sm:text-[14px]">
                            {item.noteSticky.text}
                          </p>
                        </div>
                      )}

                      {/* Card Footer with Metric Badge */}
                      {item.metrics && (
                        <div className="mt-4 pt-3 border-t border-neutral-200/90 flex items-center justify-between text-xs">
                          <span className="font-mono text-neutral-600 text-[11px] uppercase">
                            {item.metrics.label}
                          </span>
                          <span className="font-mono font-bold text-neutral-950 px-2 py-0.5 rounded bg-amber-100 border border-amber-300">
                            {item.metrics.value}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Sketchbook Stamp & Summary Signoff */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl bg-[#fffdf9] border-2 border-dashed border-[#2b241c]/40 shadow-xs max-w-lg mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-800">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Continuous Growth & Engineering Craft</span>
            </div>
            <p className="text-xs text-neutral-600 font-normal">
              Always expanding technical depth across frontend architecture, distributed backend pipelines, and modern generative AI models.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
