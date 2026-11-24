import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ProjectVolume } from "../../data/projectsData";
import { BinderClip } from "../sketchbook/SketchDoodles";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from "lucide-react";

interface HangingWireTrackProps {
  projects: ProjectVolume[];
  onSelectProject: (project: ProjectVolume) => void;
  categoryLabel: string;
}

export const HangingWireTrack: React.FC<HangingWireTrackProps> = ({
  projects,
  onSelectProject,
  categoryLabel,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [projects]);

  // Translate vertical wheel scroll to horizontal scroll when hovering wire
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollContainerRef.current.scrollBy({
        left: e.deltaY * 1.2,
        behavior: "auto",
      });
    }
  };

  const scrollByAmount = (offset: number) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  // Compute natural catenary sag and tilt angle for each hanging card
  const getCardPhysics = (index: number, total: number) => {
    if (total <= 1) return { sagY: 18, tilt: 0 };
    const normalizedPos = (index + 0.5) / total; // 0 to 1
    // Parabolic catenary sag: max 26px sag in the center
    const sagY = 4 * 26 * normalizedPos * (1 - normalizedPos) + 8;
    // Physical tilt toward center of gravity + subtle organic jitter
    const jitter = ((index * 7) % 5 - 2) * 0.4;
    const tilt = (normalizedPos - 0.5) * -5.5 + jitter;
    return { sagY, tilt };
  };

  return (
    <div className="relative w-full py-6 select-none flex flex-col justify-center">
      {/* Top Gallery Status & Navigation Controls */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between mb-3">
        {/* Left Status Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#5c4e40]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-[#1c1917]">{categoryLabel}</span>
          <span className="text-[#8f7e6c]">·</span>
          <span>
            {projects.length} {projects.length === 1 ? "Sheet" : "Sheets"} on Wire
          </span>
          <span className="hidden sm:inline text-[#8f7e6c]">
            · Click sheet to magnify
          </span>
        </div>

        {/* Right Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-380)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`w-8 h-8 rounded-full border border-[#8a7662] flex items-center justify-center transition-all ${
              canScrollLeft
                ? "bg-[#ede4d4] text-[#1c1917] hover:bg-white hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                : "bg-[#e5dccb]/50 text-[#a39483] opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(380)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`w-8 h-8 rounded-full border border-[#8a7662] flex items-center justify-center transition-all ${
              canScrollRight
                ? "bg-[#ede4d4] text-[#1c1917] hover:bg-white hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                : "bg-[#e5dccb]/50 text-[#a39483] opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Wire & Hanging Track Area */}
      <div className="relative w-full pt-8 pb-10 overflow-hidden">
        {/* Left Industrial Brass Eyelet Bracket */}
        <div className="absolute left-1 sm:left-4 top-[24px] z-30 pointer-events-none flex items-center">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-stone-600 via-stone-800 to-stone-900 border-2 border-stone-900 shadow-md flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-500/80 shadow-inner" />
          </div>
          <div className="w-3 h-1.5 bg-stone-800 rounded-r-xs" />
        </div>

        {/* Right Industrial Brass Eyelet Bracket */}
        <div className="absolute right-1 sm:right-4 top-[24px] z-30 pointer-events-none flex items-center">
          <div className="w-3 h-1.5 bg-stone-800 rounded-l-xs" />
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-stone-600 via-stone-800 to-stone-900 border-2 border-stone-900 shadow-md flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-500/80 shadow-inner" />
          </div>
        </div>

        {/* HAND-DRAWN BENDING CABLE SVG WITH REALISTIC CATENARY SAG & SKETCH STROKES */}
        <svg
          className="absolute left-0 right-0 top-[18px] w-full h-[54px] pointer-events-none z-20 overflow-visible"
          viewBox="0 0 1000 50"
          preserveAspectRatio="none"
        >
          {/* Subtle warm ambient drop shadow cast by bending cable */}
          <path
            d="M 12 18 Q 260 48 500 54 Q 740 48 988 18"
            stroke="rgba(43, 37, 31, 0.22)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Hand-drawn organic sketch line (jitter strand 1) */}
          <path
            d="M 12 16.5 Q 260 46.5 500 52.5 Q 740 46.5 988 16.5"
            stroke="#5c4a3b"
            strokeWidth="1.2"
            strokeDasharray="14 3 22 4 10 3"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />

          {/* Main Hand-drawn Steel Wire Cable Body */}
          <path
            d="M 12 16 Q 260 46 500 52 Q 740 46 988 16"
            stroke="#1c1917"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Secondary hand-drawn pencil strand (jitter strand 2) */}
          <path
            d="M 12 15.5 Q 260 45.2 500 51.5 Q 740 45.2 988 15.5"
            stroke="#3a2f26"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />

          {/* Top highlight catching studio light */}
          <path
            d="M 12 14.8 Q 260 44.8 500 50.8 Q 740 44.8 988 14.8"
            stroke="rgba(255, 255, 255, 0.55)"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Horizontal Scrolling Sheets Track */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="w-full overflow-x-auto overflow-y-visible scrollbar-none px-6 sm:px-12 flex items-start gap-6 sm:gap-10 pt-2 pb-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, idx) => {
            const { sagY, tilt } = getCardPhysics(idx, projects.length);
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={project.id}
                layoutId={`project-sheet-${project.id}`}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  // Sag follows wire droop; lifts on hover
                  y: isHovered ? sagY - 14 : sagY,
                  // Straightens on hover; tilts along wire naturally
                  rotate: isHovered ? 0 : tilt,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                  mass: 0.85,
                }}
                className="group relative shrink-0 w-[290px] sm:w-[320px] pt-7 cursor-pointer snap-center select-none"
              >
                {/* Metallic Spring Binder Clip Clamping Top of Paper to the Bending Cable */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-transform duration-300"
                  style={{
                    transform: `translateX(-50%) translateY(${isHovered ? -2 : 0}px) scale(${
                      isHovered ? 1.08 : 1
                    })`,
                  }}
                >
                  <BinderClip className="w-8 h-10 sm:w-9 sm:h-11 drop-shadow-md" />
                </div>

                {/* The Paper Project Sheet with COMMON UNIFORM SIZE (Exact fixed height & layout) */}
                <div className="relative w-full h-[430px] sm:h-[455px] rounded-xl bg-[#fcfaf4] border border-[#d6c7b2] p-4 sm:p-5 flex flex-col justify-between shadow-[0_12px_28px_rgba(43,37,31,0.14),0_2px_5px_rgba(43,37,31,0.06)] transition-all duration-300 group-hover:shadow-[0_22px_42px_rgba(43,37,31,0.2),0_6px_10px_rgba(43,37,31,0.09)] group-hover:border-[#9c8973]">
                  {/* Subtle draft registration marks at 4 corners */}
                  <span className="absolute top-2 left-2 text-[10px] text-[#b8a792] font-mono select-none">
                    ┌
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] text-[#b8a792] font-mono select-none">
                    ┐
                  </span>
                  <span className="absolute bottom-2 left-2 text-[10px] text-[#b8a792] font-mono select-none">
                    └
                  </span>
                  <span className="absolute bottom-2 right-2 text-[10px] text-[#b8a792] font-mono select-none">
                    ┘
                  </span>

                  {/* Top: Header Info */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#82715e] mb-2 pt-1">
                    <span className="font-bold uppercase tracking-wider text-[#1c1917] truncate max-w-[170px]">
                      {project.roman || `№ ${idx + 1}`} // {project.discipline}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#ede5d6] text-[#524436] shrink-0 font-medium">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Top-Mid: Common Fixed-Height Image Viewport Frame */}
                  <div className="relative w-full h-[145px] sm:h-[160px] rounded-md overflow-hidden bg-[#e8ded0] border border-[#cfbeaa] shadow-inner shrink-0 mb-2.5">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80";
                      }}
                    />

                    {/* Hover Magnify Overlay Badge */}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 backdrop-blur-[2px]">
                      <span className="px-3.5 py-1.5 rounded-full bg-white text-[#1c1917] text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                        Inspect Sheet
                      </span>
                    </div>
                  </div>

                  {/* Mid: Uniform Title & Deck */}
                  <div className="flex flex-col flex-1 justify-start mb-2">
                    <h3 className="text-base sm:text-[17px] font-bold text-[#1c1917] font-display tracking-tight leading-snug line-clamp-1 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#5e4f40] font-sans line-clamp-2 leading-relaxed mb-2.5">
                      {project.deck || project.summary}
                    </p>

                    {/* Tech Stack Pills (Uniform height row) */}
                    <div className="h-[24px] flex items-center gap-1.5 overflow-hidden">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#eee7d8] text-[#42362b] border border-[#d9ccb9] truncate"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#eee7d8] text-[#736352] shrink-0">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Pinned Footer Metric & Open Cue */}
                  <div className="pt-2 border-t border-[#e8ded0] flex items-center justify-between text-[11px] font-mono text-[#6e5d4e] mt-auto">
                    <div className="flex items-center gap-1 text-[#2563eb] font-semibold truncate max-w-[170px]">
                      <Sparkles className="w-3 h-3 text-[#d97706] shrink-0" />
                      <span className="truncate">
                        {project.stats?.[0]?.label || "Live Ready"}:{" "}
                        {project.stats?.[0]?.value || "Yes"}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#8a7866] underline underline-offset-2 flex items-center gap-0.5 shrink-0 group-hover:text-[#1c1917] font-semibold">
                      Open Sheet →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HangingWireTrack;
