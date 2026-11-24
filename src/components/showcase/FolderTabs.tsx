import React from "react";
import { motion } from "motion/react";
import { ProjectCategory, CATEGORIES_INFO } from "../../data/projectsData";
import { Palette, Layers, Sparkles, Rocket } from "lucide-react";

interface FolderTabsProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  projectCounts: Record<ProjectCategory, number>;
}

const CATEGORIES: {
  id: ProjectCategory;
  number: string;
  shortLabel: string;
  icon: React.ReactNode;
  doodle: string;
  accent: string;
}[] = [
  {
    id: "frontend",
    number: "01",
    shortLabel: "Frontend",
    icon: <Palette className="w-3.5 h-3.5" />,
    doodle: "</>",
    accent: "#2563eb",
  },
  {
    id: "fullstack",
    number: "02",
    shortLabel: "Full Stack",
    icon: <Layers className="w-3.5 h-3.5" />,
    doodle: "≡",
    accent: "#059669",
  },
  {
    id: "ai",
    number: "03",
    shortLabel: "AI & ML",
    icon: <Sparkles className="w-3.5 h-3.5" />,
    doodle: "✦",
    accent: "#7c3aed",
  },
  {
    id: "upcoming",
    number: "04",
    shortLabel: "R&D Lab",
    icon: <Rocket className="w-3.5 h-3.5" />,
    doodle: "▲",
    accent: "#d97706",
  },
];

export const FolderTabs: React.FC<FolderTabsProps> = ({
  activeCategory,
  onSelectCategory,
  projectCounts,
}) => {
  return (
    <div className="w-full flex flex-col items-center select-none pt-2 sm:pt-4 pb-2 px-3 sm:px-6">
      {/* Folder Row */}
      <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 items-end">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const info = CATEGORIES_INFO[cat.id];
          const count = projectCounts[cat.id] || 0;

          return (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              whileHover={{ y: isActive ? 0 : -4 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative text-left cursor-pointer transition-all duration-300 rounded-t-xl sm:rounded-t-2xl overflow-visible ${
                isActive
                  ? "z-20 -translate-y-1 sm:-translate-y-2"
                  : "z-10 opacity-85 hover:opacity-100"
              }`}
            >
              {/* Folder Tab at Top */}
              <div
                className={`relative inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-t-lg sm:rounded-t-xl text-xs sm:text-xs font-mono font-bold tracking-tight transition-all duration-300 border-t border-x ${
                  isActive
                    ? "bg-[#e8decb] text-[#1c1917] border-[#9c8973] shadow-sm"
                    : "bg-[#dfd4c0] text-[#5c4f42] border-[#b8a792] group-hover:bg-[#e4d9c6]"
                }`}
              >
                {/* Number Badge */}
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-xs"
                  style={{ backgroundColor: cat.accent }}
                >
                  {cat.number}
                </span>

                <span className="font-semibold truncate">{cat.shortLabel}</span>

                {/* Hand-drawn doodle symbol */}
                <span className="text-[11px] opacity-60 font-mono hidden sm:inline ml-0.5">
                  {cat.doodle}
                </span>
              </div>

              {/* Folder Main Body */}
              <div
                className={`relative w-full p-2.5 sm:p-3.5 rounded-b-xl rounded-tr-xl sm:rounded-b-2xl sm:rounded-tr-2xl border transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-b from-[#e8decb] to-[#ded2bd] border-[#8f7c65] shadow-[0_12px_24px_rgba(43,37,31,0.12),0_2px_4px_rgba(43,37,31,0.08)] ring-2 ring-amber-800/15"
                    : "bg-gradient-to-b from-[#ded2bd] to-[#d4c6b0] border-[#b09e86] shadow-[0_4px_8px_rgba(43,37,31,0.06)] group-hover:border-[#9c8973]"
                }`}
              >
                {/* Peeking White Paper Sheet inside active folder */}
                {isActive && (
                  <motion.div
                    initial={{ y: 3, opacity: 0 }}
                    animate={{ y: -6, opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute -top-1.5 left-2 right-2 h-3 bg-white/95 rounded-t-sm shadow-xs border-t border-x border-[#d1c4b0] pointer-events-none"
                  />
                )}

                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] sm:text-xs font-bold text-[#1c1917] font-display truncate">
                    {info.name}
                  </span>
                  <span
                    className="text-[10px] sm:text-[11px] font-mono font-medium px-1.5 py-0.5 rounded-md shrink-0"
                    style={{
                      backgroundColor: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)",
                      color: cat.accent,
                    }}
                  >
                    {count} {count === 1 ? "work" : "works"}
                  </span>
                </div>

                <p className="text-[10px] sm:text-[11px] text-[#6b5d4e] font-sans line-clamp-1 leading-snug">
                  {info.subtitle}
                </p>

                {/* Bottom Active Indicator Line */}
                {isActive && (
                  <div
                    className="mt-2 h-1 rounded-full w-full"
                    style={{ backgroundColor: cat.accent }}
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active Category Tagline Banner */}
      <div className="mt-3 text-center px-4 max-w-xl mx-auto">
        <p className="text-xs sm:text-[13px] text-[#5e4e3e] font-sans leading-relaxed">
          <span className="text-[#1c1917] font-bold font-display">
            {CATEGORIES_INFO[activeCategory].name}:
          </span>{" "}
          <span className="text-[#786958]">{CATEGORIES_INFO[activeCategory].tagline}</span>
        </p>
      </div>
    </div>
  );
};

export default FolderTabs;
