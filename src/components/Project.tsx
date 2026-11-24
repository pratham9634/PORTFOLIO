import React, { useState } from "react";
import {
  ProjectCategory,
  ProjectVolume,
  CATEGORY_PROJECTS,
  CATEGORIES_INFO,
} from "../data/projectsData";
import { FolderTabs } from "./showcase/FolderTabs";
import { HangingWireTrack } from "./showcase/HangingWireTrack";
import { MagnifiedSheetModal } from "./showcase/MagnifiedSheetModal";
import { RoughSketch } from "./RoughSketch";
import { BookOpen, Sparkles, FolderKanban } from "lucide-react";

export const Project: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("frontend");
  const [selectedProject, setSelectedProject] = useState<ProjectVolume | null>(null);

  // Compute work counts per category
  const projectCounts: Record<ProjectCategory, number> = {
    frontend: CATEGORY_PROJECTS.frontend.length,
    fullstack: CATEGORY_PROJECTS.fullstack.length,
    ai: CATEGORY_PROJECTS.ai.length,
    upcoming: CATEGORY_PROJECTS.upcoming.length,
  };

  const activeProjects = CATEGORY_PROJECTS[activeCategory] || [];
  const currentCategoryInfo = CATEGORIES_INFO[activeCategory];

  return (
    <section
      id="projects"
      className="relative w-full min-h-[920px] tactile-menu-bg flex flex-col select-none border-y border-[#1c1917]/15 overflow-hidden"
    >
      {/* Background Subtle Sketch Grid & Light Paper Texture Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, #2b251f 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* Decorative Sketchbook Side Spiral Bindings (Left & Right desktop accents) */}
      <div className="hidden lg:block absolute left-3 top-24 bottom-24 w-6 pointer-events-none z-20 opacity-35">
        <RoughSketch
          type="spiral"
          stroke="#9c8772"
          strokeWidth={1.5}
          roughness={1}
          className="w-full h-full"
        />
      </div>
      <div className="hidden lg:block absolute right-3 top-24 bottom-24 w-6 pointer-events-none z-20 opacity-35">
        <RoughSketch
          type="spiral"
          stroke="#9c8772"
          strokeWidth={1.5}
          roughness={1}
          className="w-full h-full"
        />
      </div>

      {/* Header Title Section */}
      <div className="relative z-20 pt-16 sm:pt-20 px-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ede5d4] border border-[#cfc0ab] text-xs font-mono text-[#5c4c3b] mb-3 shadow-xs">
          <FolderKanban className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Interactive Project Archive</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1c1917]">
          Featured Works
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#695847] font-sans max-w-xl mx-auto">
          Choose a folder to open its studio wire rack. Click any hanging sheet to magnify the full case study.
        </p>
      </div>

      {/* Step 1: Tactile Category Folders Selection Hub */}
      <div className="relative z-20 mt-4">
        <FolderTabs
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          projectCounts={projectCounts}
        />
      </div>

      {/* Step 2: The Studio Hanging Wire Gallery */}
      <div className="relative z-10 flex-1 flex flex-col justify-center min-h-[460px]">
        <HangingWireTrack
          projects={activeProjects}
          onSelectProject={(project) => setSelectedProject(project)}
          categoryLabel={currentCategoryInfo.name}
        />
      </div>

      {/* Bottom Tangible Annotations & Tips */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-12 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#6e5d4c]">
        <div className="flex items-center gap-2">
          <RoughSketch
            type="box"
            stroke="#b89d82"
            strokeWidth={1.2}
            roughness={1.3}
            fill="rgba(255, 255, 255, 0.85)"
            className="px-3 py-1.5 shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Swaying sheets on wire · Click to unclip & zoom</span>
            </div>
          </RoughSketch>
        </div>

        <div className="flex items-center gap-2">
          <RoughSketch
            type="box"
            stroke="#b89d82"
            strokeWidth={1.2}
            roughness={1.3}
            fill="rgba(255, 255, 255, 0.85)"
            className="px-3 py-1.5 shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Multi-sheet stacking dossier with live previews</span>
            </div>
          </RoughSketch>
        </div>
      </div>

      {/* Step 3 & 4: Magnified Sheet Inspection Modal with Stacking Pages */}
      <MagnifiedSheetModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Project;
