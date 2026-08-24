import React from "react";
import { CATEGORIES_INFO, CategoryInfo, ProjectCategory } from "../data/projectsData";
import { Sparkles, Layers, Palette, Rocket, BookOpen } from "lucide-react";

interface SketchbookNavProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
}

const CATEGORY_KEYS: ProjectCategory[] = ["frontend", "fullstack", "ai", "upcoming"];

export const SketchbookNav: React.FC<SketchbookNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const currentInfo: CategoryInfo = CATEGORIES_INFO[activeCategory];

  const getIcon = (catId: ProjectCategory, isActive: boolean) => {
    const iconClass = `w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 ${
      isActive ? "scale-110" : "scale-100 opacity-70 group-hover:opacity-100"
    }`;
    switch (catId) {
      case "frontend":
        return <Palette className={iconClass} style={{ color: isActive ? "#2563eb" : "#64748b" }} />;
      case "fullstack":
        return <Layers className={iconClass} style={{ color: isActive ? "#059669" : "#64748b" }} />;
      case "ai":
        return <Sparkles className={iconClass} style={{ color: isActive ? "#7c3aed" : "#64748b" }} />;
      case "upcoming":
        return <Rocket className={iconClass} style={{ color: isActive ? "#d97706" : "#64748b" }} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none pt-1 sm:pt-2 pb-1 sm:pb-2">
      {/* Category Tabs Bar with tactile Zigzag Sketch Border */}
      <div className="w-full max-w-3xl px-3 sm:px-6">
        <div className="zigzag-sketch-box relative p-1.5 sm:p-2 rounded-2xl bg-[#ede6d9]/95 backdrop-blur-md border-[2.5px] border-[#2b251f] shadow-[3px_4px_0px_#2b251f] grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
          {CATEGORY_KEYS.map((catId) => {
            const cat = CATEGORIES_INFO[catId];
            const isActive = activeCategory === catId;

            return (
              <button
                key={catId}
                type="button"
                onClick={() => onSelectCategory(catId)}
                className={`group relative w-full py-2.5 px-3 sm:px-4 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] active:scale-[0.96] flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-tight cursor-pointer ${
                  isActive
                    ? "text-[#1c1917] bg-white shadow-[2px_2.5px_0px_#2b251f] border border-[#2b251f] scale-[1.02]"
                    : "text-[#6b5f53] hover:text-[#1c1917] hover:bg-white/70"
                }`}
                aria-pressed={isActive}
              >
                {/* Tab Icon & Clean Label */}
                <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 truncate">
                  {getIcon(catId, isActive)}
                  <span className="truncate">
                    {cat.name}
                  </span>
                </div>

                {/* Active indicator underline */}
                {isActive && (
                  <span className="absolute bottom-1 w-6 sm:w-8 h-0.5 rounded-full bg-[#2b251f]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtitle / Category Tagline under tabs */}
      <div className="mt-3 sm:mt-3.5 text-center px-4 max-w-xl mx-auto">
        <p className="text-xs sm:text-[13px] text-[#6e5d4e] font-sans leading-relaxed tracking-wide">
          <span className="text-[#1c1917] font-bold">{currentInfo.name}:</span>{" "}
          <span className="text-[#786b5e] font-normal">{currentInfo.tagline}</span>
        </p>
      </div>
    </div>
  );
};

export default SketchbookNav;
