"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { ImageTrail, DEFAULT_TECH_IMAGES } from "./ImageTrail";

export type SkillCategory = {
  id: string;
  category: string;
  subtitle: string;
  skills: string[];
  gradient: string;
  badgeClass: string;
  cardClass: string;
  accentColor: string;
  accentBg: string;
  config: {
    y: number;
    x: number;
    rotate: number;
    zIndex: number;
  };
};

type SpringConfig = {
  type: "spring";
  bounce?: number;
  visualDuration?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export interface SkillsProps {
  spring?: SpringConfig;
  activeScale?: number;
  cardSpacing?: number;
}

const defaultSpring: SpringConfig = {
  type: "spring",
  visualDuration: 0.35,
  bounce: 0.60,
};

export const controls = {
  spring: defaultSpring,
  activeScale: [1.15, 1, 1.6, 0.01],
  cardSpacing: [180, 40, 320, 5],
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    category: "01 — Frontend",
    subtitle: "Modern, reactive & high-performance interfaces",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Responsive UI",
      "State Management",
    ],
    gradient: "from-amber-100/90 via-orange-50/70 to-amber-50/40 border-amber-200/80",
    badgeClass: "bg-amber-50/80 text-amber-950 border-amber-200/90 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:shadow-md",
    cardClass: "bg-white/95 border-amber-400/30 shadow-[0_12px_40px_rgba(245,158,11,0.08)]",
    accentColor: "#ea580c",
    accentBg: "bg-orange-500",
    config: {
      y: -20,
      x: 0,
      rotate: -12,
      zIndex: 2,
    },
  },
  {
    id: "backend",
    category: "02 — Backend",
    subtitle: "Scalable server architectures, APIs & event streams",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "JWT Authentication",
      "API Integration",
      "RabbitMQ",
    ],
    gradient: "from-emerald-100/90 via-teal-50/70 to-emerald-50/40 border-emerald-200/80",
    badgeClass: "bg-emerald-50/80 text-emerald-950 border-emerald-200/90 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:shadow-md",
    cardClass: "bg-white/95 border-emerald-400/30 shadow-[0_12px_40px_rgba(16,185,129,0.08)]",
    accentColor: "#059669",
    accentBg: "bg-emerald-500",
    config: {
      y: 20,
      x: 180,
      rotate: 6,
      zIndex: 3,
    },
  },
  {
    id: "database",
    category: "03 — Database",
    subtitle: "Relational, document & high-speed vector storage",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "MongoDB Atlas",
      "SQL",
      "Qdrant",
      "Vector Databases",
    ],
    gradient: "from-blue-100/90 via-sky-50/70 to-blue-50/40 border-blue-200/80",
    badgeClass: "bg-blue-50/80 text-blue-950 border-blue-200/90 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:shadow-md",
    cardClass: "bg-white/95 border-blue-400/30 shadow-[0_12px_40px_rgba(59,130,246,0.08)]",
    accentColor: "#2563eb",
    accentBg: "bg-blue-500",
    config: {
      y: -60,
      x: 360,
      rotate: -4,
      zIndex: 4,
    },
  },
  {
    id: "tools",
    category: "04 — Developer Tools",
    subtitle: "Cloud infrastructure, version control & debugging",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
      "Postman",
      "VS Code",
      "Chrome DevTools",
    ],
    gradient: "from-purple-100/90 via-fuchsia-50/70 to-purple-50/40 border-purple-200/80",
    badgeClass: "bg-purple-50/80 text-purple-950 border-purple-200/90 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:shadow-md",
    cardClass: "bg-white/95 border-purple-400/30 shadow-[0_12px_40px_rgba(168,85,247,0.08)]",
    accentColor: "#9333ea",
    accentBg: "bg-purple-500",
    config: {
      y: 20,
      x: 540,
      rotate: 10,
      zIndex: 5,
    },
  },
  {
    id: "ai-ml",
    category: "05 — AI / ML",
    subtitle: "Intelligent pipelines, RAG systems & LLM evaluations",
    skills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "RAG",
      "Reranking",
      "LLM Evaluation",
      "LLM-as-a-Judge",
      "Prompt Engineering",
      "Embeddings",
      "PageIndex",
    ],
    gradient: "from-rose-100/90 via-pink-50/70 to-rose-50/40 border-rose-200/80",
    badgeClass: "bg-rose-50/80 text-rose-950 border-rose-200/90 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:shadow-md",
    cardClass: "bg-white/95 border-rose-400/30 shadow-[0_12px_40px_rgba(244,63,94,0.08)]",
    accentColor: "#e11d48",
    accentBg: "bg-rose-500",
    config: {
      y: -10,
      x: 720,
      rotate: -6,
      zIndex: 6,
    },
  },
];

export const Skills: React.FC<SkillsProps> = ({
  spring = defaultSpring,
  activeScale = 1.12,
  cardSpacing = 155,
}) => {
  const [active, setActive] = useState<SkillCategory | null>(null);
  const [spacing, setSpacing] = useState(cardSpacing);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const cardSpring = spring;

  // Dismiss active card on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Responsive spacing
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () =>
      setSpacing(mq.matches ? cardSpacing : Math.round(cardSpacing * 0.44));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [cardSpacing]);

  const middle = (SKILL_CATEGORIES.length - 1) / 2;

  const isAnyCardActive = Boolean(active?.id);
  const isCurrentActive = (card: SkillCategory) => active?.id === card.id;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 sm:py-32 lg:py-36 tactile-menu-bg text-neutral-900 flex flex-col items-center justify-center overflow-hidden z-10 select-none border-y border-[#1c1917]/15"
    >
      {/* React Bits GSAP Image Trail Animation */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
        <ImageTrail items={DEFAULT_TECH_IMAGES} variant={5} />
      </div>

      {/* Premium Subtle Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-br from-indigo-100/60 via-purple-100/40 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[350px] bg-gradient-to-tr from-amber-100/50 via-rose-100/40 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Subtle Luxury Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-white/80 shadow-xs backdrop-blur-md text-xs sm:text-sm text-neutral-800 mb-4 tracking-wider uppercase font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Technical Stack & Capabilities
        </div>
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Skills & Expertise
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
          Explore our interactive stack across frontend, backend, databases, developer tooling, and AI/ML engineering. Click any card to expand.
        </p>
      </div>

      {/* Interactive Cards Container */}
      <div className="relative flex h-[540px] sm:h-[580px] w-full items-center justify-center overflow-visible px-4">
        <motion.div
          ref={ref}
          className="relative mx-auto flex h-[440px] w-full max-w-4xl items-center justify-center [--height:380px] [--width:245px] sm:[--height:430px] sm:[--width:275px] md:[--height:460px] md:[--width:300px]"
        >
          {SKILL_CATEGORIES.map((card, index) => {
            const offsetX = (index - middle) * spacing;
            const isActive = isCurrentActive(card);

            return (
              <motion.div key={card.id}>
                <motion.div
                  initial={{
                    x: 0,
                    scale: 0,
                  }}
                  onClick={() => {
                    setActive(isActive ? null : card);
                  }}
                  animate={{
                    y: isActive
                      ? 0
                      : isAnyCardActive
                        ? 380
                        : card.config.y,
                    x: isActive
                      ? 0
                      : isAnyCardActive
                        ? offsetX * 0.35
                        : offsetX,
                    rotate: isActive
                      ? 0
                      : isAnyCardActive
                        ? 0.15 * card.config.rotate
                        : card.config.rotate,
                    scale: isActive
                      ? activeScale
                      : isAnyCardActive
                        ? 0.72
                        : 1,
                  }}
                  whileHover={{
                    scale: isActive
                      ? activeScale
                      : isAnyCardActive
                        ? 0.74
                        : 1.04,
                  }}
                  transition={cardSpring}
                  style={{
                    width: `var(--width)`,
                    height: `var(--height)`,
                    marginLeft: `calc(var(--width) / -2)`,
                    marginTop: `calc(var(--height) / -2)`,
                    zIndex: isActive ? 50 : card.config.zIndex,
                  }}
                  className={cn(
                    "absolute top-1/2 left-1/2 flex flex-col justify-between overflow-hidden rounded-3xl p-5 sm:p-6 border backdrop-blur-2xl cursor-pointer transition-shadow duration-300",
                    isActive
                      ? "shadow-[0_25px_60px_-10px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)]"
                      : "shadow-[0_12px_35px_-5px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]",
                    card.cardClass
                  )}
                >
                  {/* Top Gradient Skeleton Header */}
                  <div
                    className={cn(
                      "relative h-20 sm:h-24 w-full rounded-2xl bg-gradient-to-br border p-3 sm:p-4 flex flex-col justify-between overflow-hidden",
                      card.gradient
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-800 font-bold tracking-wide">
                        {card.id.toUpperCase()}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/90 text-neutral-800 border border-black/10 shadow-xs">
                        {card.skills.length} skills
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: card.accentColor }}
                      />
                      <span className="text-xs text-neutral-700 font-medium truncate">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Category Title & Skills Body */}
                  <div className="flex-1 flex flex-col justify-start mt-4 overflow-hidden">
                    <motion.h3
                      layoutId={card.id + "-title"}
                      className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {card.category}
                    </motion.h3>

                    <AnimatePresence mode="wait">
                      {!isActive ? (
                        <motion.div
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col justify-between flex-1 mt-1"
                        >
                          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-[160px] sm:max-h-[190px]">
                            {card.skills.slice(0, 5).map((skill) => (
                              <span
                                key={skill}
                                className={cn(
                                  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border shadow-xs transition-colors",
                                  card.badgeClass
                                )}
                              >
                                {skill}
                              </span>
                            ))}
                            {card.skills.length > 5 && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-neutral-600 bg-neutral-100 border border-neutral-200">
                                +{card.skills.length - 5} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-xs text-neutral-500 pt-2.5 border-t border-neutral-200/80 mt-2">
                            <span>Click to expand</span>
                            <span className="text-neutral-900 font-bold">↗</span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                          className="flex-1 flex flex-col justify-between mt-1 overflow-y-auto pr-1 custom-scrollbar"
                        >
                          {/* Interactive Animated Hover Skill Buttons */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {card.skills.map((skill, sIdx) => {
                              const isHovered = hoveredSkill === `${card.id}-${skill}`;
                              return (
                                <motion.button
                                  key={skill}
                                  type="button"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: sIdx * 0.02 }}
                                  whileHover={{
                                    scale: 1.1,
                                    y: -3,
                                    transition: { type: 'spring', stiffness: 450, damping: 14, mass: 0.6 },
                                  }}
                                  whileTap={{
                                    scale: 0.94,
                                    transition: { type: 'spring', stiffness: 500, damping: 15 },
                                  }}
                                  onMouseEnter={() => setHoveredSkill(`${card.id}-${skill}`)}
                                  onMouseLeave={() => setHoveredSkill(null)}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className={cn(
                                    "relative group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold border shadow-xs transition-all duration-200 cursor-pointer",
                                    card.badgeClass
                                  )}
                                >
                                  {/* Animated Indicator */}
                                  <span
                                    className={cn(
                                      "w-1.5 h-1.5 rounded-full transition-transform duration-200",
                                      isHovered ? "scale-125" : "scale-100"
                                    )}
                                    style={{
                                      backgroundColor: card.accentColor,
                                      boxShadow: isHovered
                                        ? `0 0 8px ${card.accentColor}`
                                        : "none",
                                    }}
                                  />
                                  <span>{skill}</span>
                                </motion.button>
                              );
                            })}

                            
                          </div>

                          {/* Active Footer Details */}
                          <div className="flex items-center justify-between text-xs text-neutral-500 pt-3 border-t border-neutral-200/80 mt-3">
                            <span className="font-mono text-neutral-700 font-medium">
                              {card.skills.length} Interactive Skills
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActive(null);
                              }}
                              className="text-neutral-700 hover:text-neutral-950 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors font-medium border border-neutral-200/60"
                            >
                              Close ✕
                            </button>
                            
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
