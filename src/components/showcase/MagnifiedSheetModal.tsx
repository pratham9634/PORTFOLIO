import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectVolume } from "../../data/projectsData";
import { BinderClip } from "../sketchbook/SketchDoodles";
import {
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

interface MagnifiedSheetModalProps {
  project: ProjectVolume | null;
  onClose: () => void;
}

const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PAGES = [
  { id: 0, key: "overview", label: "01. UI & Overview" },
  { id: 1, key: "architecture", label: "02. Architecture & Flow" },
  { id: 2, key: "specs", label: "03. Tech Specs & Code" },
];

export const MagnifiedSheetModal: React.FC<MagnifiedSheetModalProps> = ({
  project,
  onClose,
}) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Reset to Page 0 when project opens
  useEffect(() => {
    setPageIndex(0);
    setDirection(0);
  }, [project]);

  // Prevent background scroll interference from Lenis while modal is open
  useEffect(() => {
    if (project) {
      const lenis = (window as any).lenis;
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    }
    return () => {
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    };
  }, [project]);

  const goToPage = (nextPage: number) => {
    if (nextPage === pageIndex || nextPage < 0 || nextPage >= PAGES.length) return;
    setDirection(nextPage > pageIndex ? 1 : -1);
    setPageIndex(nextPage);
    // Smoothly reset scroll position to top of new page
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Keyboard navigation & Esc listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        goToPage(pageIndex + 1);
      } else if (e.key === "ArrowLeft") {
        goToPage(pageIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageIndex, onClose]);

  if (!project) return null;

  // Realistic 3D Book Page Flip Variants
  const pageFlipVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 70 : -70,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? "left center" : "right center",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: "left center",
      boxShadow: "0 15px 35px rgba(43,37,31,0.12)",
      transition: {
        type: "spring" as const,
        stiffness: 180,
        damping: 22,
        mass: 0.85,
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -75 : 75,
      opacity: 0,
      scale: 0.97,
      transformOrigin: dir > 0 ? "left center" : "right center",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.32,
        ease: [0.34, 1.2, 0.64, 1] as const,
      },
    }),
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none overflow-hidden">
        {/* Darkroom Ambient Backdrop with Soft Vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#141210]/80 backdrop-blur-md transition-opacity"
        />

        {/* Magnified Project Sheet Stack Container - Optimized scale (not overly zoomed) */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            damping: 26,
            stiffness: 280,
            mass: 0.85,
          }}
          className="relative w-full max-w-2xl sm:max-w-3xl z-10 pt-6 sm:pt-7"
          style={{ perspective: 1600 }}
        >
          {/* Top Metal Spring Binder Clip Holding the Stack */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <BinderClip className="w-9 h-12 sm:w-11 sm:h-14 drop-shadow-xl" />
          </div>

          {/* Close Action Top Right Pill */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-1.5 right-1 sm:right-0 z-40 px-3 py-1 rounded-full bg-stone-900/90 text-stone-200 hover:text-white hover:bg-black text-[11px] font-mono font-medium flex items-center gap-1.5 shadow-lg border border-stone-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clip back to wire [Esc]</span>
          </button>

          {/* ================= MULTI-SHEET TABS HEADER ================= */}
          <div className="relative z-30 flex items-end gap-1 px-4 sm:px-7 mb-[-1px]">
            {PAGES.map((p) => {
              const isActive = pageIndex === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goToPage(p.id)}
                  className={`px-3 sm:px-5 py-1.5 rounded-t-lg sm:rounded-t-xl text-[11px] sm:text-xs font-mono font-bold tracking-tight transition-all cursor-pointer border-t border-x flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#faf8f2] text-[#1c1917] border-[#beaf9a] shadow-sm z-30 pt-2 pb-1.5 -translate-y-0.5"
                      : "bg-[#e2d6c3] text-[#6b5a48] border-[#b8a792] hover:bg-[#ebdfcb] z-10"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-amber-600" : "bg-[#a89680]"
                    }`}
                  />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* ================= PHYSICAL STACK WRAPPER WITH PROPORTIONED HEIGHT ================= */}
          <div className="relative w-full h-[80vh] max-h-[680px] rounded-2xl rounded-tl-none bg-[#faf8f2] border-2 border-[#beaf9a] shadow-[0_25px_60px_rgba(0,0,0,0.4),0_6px_16px_rgba(43,37,31,0.12)] text-[#1c1917] flex flex-col overflow-hidden">
            {/* Left Binding Spine Margin Accent (Perforated holes) */}
            <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-3.5 bg-gradient-to-r from-[#d9ccb9] via-[#ede3d4] to-transparent pointer-events-none z-30 border-r border-[#d4c6b2]/40 flex flex-col justify-around py-8 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8c7b67]/35 shadow-inner" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#8c7b67]/35 shadow-inner" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#8c7b67]/35 shadow-inner" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#8c7b67]/35 shadow-inner" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#8c7b67]/35 shadow-inner" />
            </div>

            {/* Bottom-right Underneath Stacked Page Edges */}
            <div className="absolute right-0 bottom-0 pointer-events-none z-10 flex flex-col items-end">
              <div className="w-14 h-1 bg-[#ede4d4] border-t border-[#d1c2ad]" />
              <div className="w-10 h-1 bg-[#e4d8c6] border-t border-[#c7b7a0]" />
            </div>

            {/* DEDICATED NATIVE SCROLL CONTAINER (lenis-prevent prevents parent scroll conflicts) */}
            <div
              ref={scrollableRef}
              data-lenis-prevent="true"
              className="lenis-prevent flex-1 w-full overflow-y-auto pl-5 sm:pl-8 pr-3 sm:pr-6 pt-4 sm:pt-6 pb-6 overscroll-contain scroll-smooth"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#c4b59f #faf8f2",
              }}
            >
              <AnimatePresence custom={direction} mode="wait">
                {/* ================= PAGE 0: UI & VISUAL CRAFT ================= */}
                {pageIndex === 0 && (
                  <motion.div
                    key="page-0"
                    custom={direction}
                    variants={pageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-4"
                  >
                    {/* Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#e2d6c3]">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#786653] mb-0.5">
                          <span className="font-bold text-[#1c1917] uppercase">
                            {project.categoryLabel}
                          </span>
                          <span>·</span>
                          <span>{project.discipline}</span>
                          <span>·</span>
                          <span>{project.roman}</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#1c1917]">
                          {project.title}
                        </h2>
                      </div>

                      {/* Action Pill Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-b from-[#1e3a8a] to-[#172554] text-white hover:brightness-110 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#ede4d4] hover:bg-white text-[#1c1917] border border-[#a8957f] text-xs font-mono font-medium flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95 transition-all"
                          >
                            <GitHubIcon className="w-3.5 h-3.5" />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Proportioned Mockup Container - Visible without forcing excessive scrolling */}
                    <div className="relative w-full h-[180px] sm:h-[220px] rounded-lg overflow-hidden bg-[#e0d3bf] border border-[#b5a38c] shadow-md group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute bottom-2 left-2 bg-[#1c1917]/85 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono text-white flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Interactive Work</span>
                      </div>
                    </div>

                    {/* Overview & Purpose */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      <div className="sm:col-span-2 flex flex-col gap-2">
                        <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#705e4c]">
                          Project Overview & Purpose
                        </h4>
                        <p className="text-xs sm:text-sm text-[#382d23] font-sans leading-relaxed">
                          {project.deck}
                        </p>
                        <p className="text-[11px] sm:text-xs text-[#5c4c3d] font-sans leading-relaxed">
                          {project.note}
                        </p>
                      </div>

                      {/* Stamped Metric Badges */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#705e4c]">
                          Key Telemetry
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                          {project.stats?.map((stat, i) => (
                            <div
                              key={i}
                              className="p-2 rounded-lg bg-[#f0e8d8] border border-[#cfbfa8] flex flex-col items-start justify-center shadow-xs"
                            >
                              <span className="text-[9px] font-mono text-[#786653] uppercase">
                                {stat.label}
                              </span>
                              <span className="text-xs sm:text-sm font-mono font-bold text-[#1c1917]">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dog-Ear Corner: Flip to Next Page */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => goToPage(1)}
                        className="group relative px-3.5 py-1.5 rounded-lg bg-[#ede4d4] hover:bg-[#e4d6bf] text-[#1c1917] border border-[#b8a792] shadow-xs flex items-center gap-1.5 text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>Flip to Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white/70 rotate-45 border-l border-b border-[#b8a792] pointer-events-none" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ================= PAGE 1: ARCHITECTURE & SYSTEM FLOW ================= */}
                {pageIndex === 1 && (
                  <motion.div
                    key="page-1"
                    custom={direction}
                    variants={pageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-[#786653] uppercase tracking-wider">
                        Page 02 // Engineering Architecture
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1c1917] mt-0.5">
                        System Architecture & Key Features
                      </h3>
                    </div>

                    {/* Architecture Description Box */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#ede3cf] border border-[#b8a790] shadow-sm">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#2b2118] mb-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#2563eb]" />
                        <span>Core Architectural Pipeline</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#423528] font-sans leading-relaxed">
                        {project.architecture ||
                          "Engineered with a decoupled state-driven pipeline, reactive micro-frontends, and low-latency client synchronization."}
                      </p>
                    </div>

                    {/* Features Checklist */}
                    <div>
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#705e4c] mb-2">
                        Functional Highlights & Modules
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features?.map((feat, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-white/75 border border-[#d6c7b2] flex items-start gap-2 shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-xs text-[#2b2118] font-sans leading-snug">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chapters / Milestones */}
                    {project.chapters && project.chapters.length > 0 && (
                      <div className="pt-1 border-t border-[#e2d6c3]">
                        <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#705e4c] mb-1.5">
                          Project Chapters
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.chapters.map((ch, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 rounded-md bg-[#eee5d4] border border-[#cfbeaa] text-[11px] font-mono text-[#423528]"
                            >
                              § {i + 1}. {ch}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dual Page Turn Controls */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#e2d6c3]">
                      <button
                        type="button"
                        onClick={() => goToPage(0)}
                        className="group px-3 py-1.5 rounded-lg bg-[#eee5d4] hover:bg-white text-[#1c1917] border border-[#b8a792] shadow-xs flex items-center gap-1.5 text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        <span>⮌ Back to Overview</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => goToPage(2)}
                        className="group relative px-3.5 py-1.5 rounded-lg bg-[#ede4d4] hover:bg-[#e4d6bf] text-[#1c1917] border border-[#b8a792] shadow-xs flex items-center gap-1.5 text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>Flip to Tech Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white/70 rotate-45 border-l border-b border-[#b8a792] pointer-events-none" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ================= PAGE 2: TECH SPECS & MATRIX ================= */}
                {pageIndex === 2 && (
                  <motion.div
                    key="page-2"
                    custom={direction}
                    variants={pageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-[#786653] uppercase tracking-wider">
                        Page 03 // Technical Blueprint
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1c1917] mt-0.5">
                        Tech Stack Matrix & Specifications
                      </h3>
                    </div>

                    {/* Technologies Pills Matrix */}
                    <div>
                      <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#705e4c] mb-2">
                        Technologies & Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.techStack.map((tech) => (
                          <div
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-white border border-[#c9b79e] text-xs font-mono font-bold text-[#1c1917] shadow-xs flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Engineering Specs Table */}
                    <div className="rounded-xl overflow-hidden border border-[#cfbeaa] bg-white/75">
                      <table className="w-full text-xs font-mono">
                        <tbody>
                          <tr className="border-b border-[#e2d6c3]">
                            <td className="px-3.5 py-2 bg-[#f0e8d8] text-[#705e4c] font-bold w-1/3">
                              Format & Edition
                            </td>
                            <td className="px-3.5 py-2 text-[#1c1917]">
                              {project.format || "Interactive Digital Edition"}
                            </td>
                          </tr>
                          <tr className="border-b border-[#e2d6c3]">
                            <td className="px-3.5 py-2 bg-[#f0e8d8] text-[#705e4c] font-bold">
                              Binding Spec
                            </td>
                            <td className="px-3.5 py-2 text-[#1c1917]">
                              {project.binding || "Sapphire Cloth · Silver Foil"}
                            </td>
                          </tr>
                          <tr className="border-b border-[#e2d6c3]">
                            <td className="px-3.5 py-2 bg-[#f0e8d8] text-[#705e4c] font-bold">
                              Design Motif
                            </td>
                            <td className="px-3.5 py-2 text-[#1c1917]">
                              {project.motif || "Connected nodes & reactive waves"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3.5 py-2 bg-[#f0e8d8] text-[#705e4c] font-bold">
                              Palette Scheme
                            </td>
                            <td className="px-3.5 py-2 text-[#1c1917]">
                              {project.paletteLabel || "Sapphire · Bone · Ice Blue"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Engineering Takeaway & Live Build Cue */}
                    <div className="p-3.5 rounded-xl bg-[#eee5d4] border border-[#cfbeaa] flex items-center justify-between">
                      <div className="text-xs text-[#524335]">
                        <span className="font-bold text-[#1c1917]">Seed: #{project.seed}</span> · Verified production build
                      </div>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono font-bold text-[#2563eb] hover:underline flex items-center gap-1"
                          >
                            <span>Inspect Build</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Turn back to Architecture */}
                    <div className="pt-2 flex justify-start border-t border-[#e2d6c3]">
                      <button
                        type="button"
                        onClick={() => goToPage(1)}
                        className="group px-3 py-1.5 rounded-lg bg-[#eee5d4] hover:bg-white text-[#1c1917] border border-[#b8a792] shadow-xs flex items-center gap-1.5 text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        <span>⮌ Back to Architecture</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Book Page Flip Indicator & Controls (Fixed at bottom of modal) */}
            <div className="pt-2.5 pb-2.5 px-5 sm:px-8 border-t border-[#e2d6c3] bg-[#f5efdf]/95 backdrop-blur-xs flex items-center justify-between text-xs font-mono text-[#786653] shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="text-[#1c1917] font-bold">
                  Page {pageIndex + 1} of {PAGES.length}
                </span>
                <span className="hidden sm:inline text-[#a39280]">
                  · {PAGES[pageIndex].label}
                </span>
              </div>

              {/* Prev / Next Page Turn Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => goToPage(pageIndex - 1)}
                  disabled={pageIndex === 0}
                  className="px-2.5 py-1 rounded bg-[#eee5d4] disabled:opacity-30 hover:bg-white text-[#1c1917] border border-[#b8a792] transition-all cursor-pointer font-bold text-xs"
                >
                  ◀ Prev
                </button>
                <button
                  type="button"
                  onClick={() => goToPage(pageIndex + 1)}
                  disabled={pageIndex === PAGES.length - 1}
                  className="px-2.5 py-1 rounded bg-[#eee5d4] disabled:opacity-30 hover:bg-white text-[#1c1917] border border-[#b8a792] transition-all cursor-pointer font-bold text-xs"
                >
                  Next ▶
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MagnifiedSheetModal;
