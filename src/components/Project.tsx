import React, { useEffect, useRef, useState } from "react";
import { CompleteShelfLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { SketchbookNav } from "./SketchbookNav";
import { RoughSketch } from "./RoughSketch";
import { Sparkles, BookOpen } from "lucide-react";

import { ProjectCategory } from "../data/projectsData";

const Project: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("frontend");

  useEffect(() => {
    // Forward window scroll when user scrolls over the 3D canvas iframe
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "THREEUI_SCROLL") {
        const delta = e.data.deltaY || 0;
        const lenis = (window as any).lenis;
        if (lenis) {
          lenis.scrollTo(window.scrollY + delta, { immediate: false, duration: 0.6 });
        } else {
          window.scrollBy({
            top: delta,
            left: e.data.deltaX || 0,
            behavior: "auto",
          });
        }
      }
    };
    window.addEventListener("message", handleMessage);

    // Pause 3D rendering when section is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry?.isIntersecting ?? true;
        if (sectionRef.current) {
          const iframe = sectionRef.current.querySelector("iframe");
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              { type: "SET_VISIBILITY", visible: isVisible },
              "*"
            );
          }
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("message", handleMessage);
      observer.disconnect();
    };
  }, []);

  const handleSelectCategory = (cat: ProjectCategory) => {
    setActiveCategory(cat);
    
    // Broadcast instantly to 3D bookshelf iframes
    const broadcast = () => {
      const iframes = document.querySelectorAll<HTMLIFrameElement>("iframe");
      iframes.forEach((iframe) => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            { type: "SET_CATEGORY", category: cat },
            "*"
          );
        }
      });
    };

    broadcast();
    // Safety retry in case iframe was receiving an active frame render
    setTimeout(broadcast, 40);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full min-h-[1020px] h-screen tactile-menu-bg flex flex-col select-none border-y border-[#1c1917]/15"
    >
      {/* Background Subtle Sketch Grid & Light Paper Texture Grain */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, #2b251f 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative Sketchbook Side Spiral Bindings (Left & Right desktop accents) */}
      <div className="hidden lg:block absolute left-3 top-20 bottom-20 w-6 pointer-events-none z-20 opacity-40">
        <RoughSketch
          type="spiral"
          stroke="#a38f7b"
          strokeWidth={1.5}
          roughness={1}
          className="w-full h-full"
        />
      </div>
      <div className="hidden lg:block absolute right-3 top-20 bottom-20 w-6 pointer-events-none z-20 opacity-40">
        <RoughSketch
          type="spiral"
          stroke="#a38f7b"
          strokeWidth={1.5}
          roughness={1}
          className="w-full h-full"
        />
      </div>

      {/* Top Sketchbook Journal Category Navigation */}
      <div className="relative z-30 pt-16 sm:pt-20 md:pt-22 px-3 sm:px-6">
        <SketchbookNav
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* 3D Bookshelf Canvas Area */}
      <div className="relative flex-1 w-full h-0 min-h-0">
        <CompleteShelfLandingPage
          headingFont="geist"
          bodyFont="inter"
          headingWeight="500"
          bodyWeight="400"
          primaryColor="#b85d32"
          headingSize={60}
          bodySize={12}
          headingLetterSpacing={-0.055}
          className="w-full h-full"
        />

        {/* Floating Sketchbook Annotations at Bottom */}
        <div className="absolute bottom-4 left-8 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <RoughSketch
            type="box"
            stroke="#b89d82"
            strokeWidth={1.2}
            roughness={1.4}
            fill="rgba(255, 255, 255, 0.9)"
            className="px-3.5 py-2 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#4a3e33]">
              <BookOpen className="w-3.5 h-3.5 text-[#b85d32]" />
              <span>Click book to pull from shelf · Drag in 3D</span>
            </div>
          </RoughSketch>
        </div>

        <div className="absolute bottom-4 right-8 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <RoughSketch
            type="box"
            stroke="#b89d82"
            strokeWidth={1.2}
            roughness={1.4}
            fill="rgba(255, 255, 255, 0.9)"
            className="px-3.5 py-2 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#4a3e33]">
              <Sparkles className="w-3.5 h-3.5 text-[#b85d32]" />
              <span>Click "Open book" or cover to read pages</span>
            </div>
          </RoughSketch>
        </div>
      </div>
    </section>
  );
};

export default Project;