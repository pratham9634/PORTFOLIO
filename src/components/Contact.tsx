"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Clock,
  MapPin,
} from "lucide-react";
import ElasticMesh from "./ElasticMesh";

// Premium Unsplash high-resolution abstract texture for the WebGL Elastic Mesh
const MESH_BG_IMAGE =
  "https://images.unsplash.com/photo-1782825550656-831d0dd96923?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    handle: "pratham9634",
    href: "https://github.com/pratham9634",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "prathampetwal",
    href: "https://www.linkedin.com/in/prathampetwal",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "pratham9634",
    href: "https://discord.com/users/@pratham",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  }
];

export const Contact: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Live Local Time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full tactile-menu-bg text-[#0f172a] py-24 sm:py-32 lg:py-36 px-6 sm:px-10 md:px-14 lg:px-18 overflow-hidden border-t border-[#1c1917]/15 selection:bg-black selection:text-white"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-12 sm:mb-16 border-b border-black/[0.08]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-black/10 shadow-sm text-xs font-semibold tracking-wider text-neutral-800 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>[ 06 — Contact & Collaboration ]</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Let’s create something{" "}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-950 underline decoration-wavy decoration-orange-400/60 underline-offset-8"
              >
                extraordinary.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-600 font-medium bg-neutral-50 px-4 py-2.5 rounded-2xl border border-black/[0.06] shadow-sm self-start sm:self-auto">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="font-mono font-bold text-neutral-900">{currentTime || "12:00:00 PM"}</span>
            </div>
            <span className="text-neutral-300">|</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Remote / Worldwide</span>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Left Video of Character & Right Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ================= LEFT COLUMN: FULL HEIGHT WALKING CHARACTER ================= */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center h-full min-h-[460px] lg:min-h-[600px] w-full relative order-2 lg:order-1 overflow-hidden"
          >
            {/* Seamless Character Walking Video blending into pure white */}
            <div className="w-full h-full flex items-center justify-center relative">
              <video
                src="/video/Illustrated_character_walking.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full min-h-[460px] lg:min-h-[600px] object-contain mix-blend-multiply select-none pointer-events-none scale-110 sm:scale-130 lg:scale-150 transition-transform duration-500"
              />
            </div>
          </motion.div> 

          {/* ================= RIGHT COLUMN: THE MASTER CONTACT CARD WITH REAL UNSPLASH ELASTIC MESH ================= */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 h-full flex flex-col justify-between order-1 lg:order-2"
          >
            <div className="relative rounded-[2.25rem] border border-black/[0.12] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)] overflow-hidden h-full flex flex-col justify-between group bg-black/5">
              
              {/* Interactive Elastic Mesh WebGL Canvas with Real Unsplash Texture (100% Full Bleed Background) */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto rounded-[2.25rem] scale-150">
                <ElasticMesh
                  image={MESH_BG_IMAGE}
                  color1="#18181b"
                  color2="#3b82f6"
                  highlight="#ffffff"
                  gridColor="#ffffff"
                  gridOpacity={0.18}
                  showGrid={true}
                  gridDensity={22}
                  fullBleed={true}
                  fit={1.05}
                  tilt={0}
                  borderRadius={0}
                  stiffness={0.05}
                  damping={0.18}
                  grabRadius={0.65}
                  pull={0.45}
                  wobble={6.5}
                  shading={0.35}
                  interaction="hover"
                  className="w-full h-full"
                />
              </div>

              {/* Foreground Card Content with Crisp Typography & Premium Contrast */}
              <div className="relative z-10 p-7 sm:p-9 md:p-10 flex flex-col justify-between h-full pointer-events-none">
                <div>
                  {/* Top Tag & Status */}
                  <div className="flex items-center justify-between gap-3 mb-6 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-white/90 text-xs font-bold text-neutral-900 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Available for Opportunities</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-900 font-mono font-semibold bg-white/95 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/90 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>[ Direct Channels ]</span>
                    </div>
                  </div>

                  {/* Title with crisp drop shadow */}
                  <h3
                    className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mb-3 tracking-tight pointer-events-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Have an ambitious vision? Let's talk.
                  </h3>
                  <p className="text-neutral-950 font-semibold text-sm sm:text-base leading-relaxed mb-8 pointer-events-auto drop-shadow-[0_1px_2px_rgba(255,255,255,1)]">
                    Looking for collaboration, full-time engineering roles, or want to discuss a project?
                    Reach out directly via email, phone, or any social handle below.
                  </p>

                  {/* Core Contact Items (Email & Phone) with Pure White Frosted Background */}
                  <div className="space-y-3.5 mb-8 pointer-events-auto">
                    {/* 1. Email Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/95 hover:bg-white backdrop-blur-2xl border border-white/90 flex items-center justify-between gap-3 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 group/email">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-md group-hover/email:scale-105 transition-transform duration-200">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 group-hover/email:text-neutral-700 transition-colors">
                            Email Inbox
                          </div>
                          <a
                            href="mailto:prathampetwal100@gmail.com"
                            className="text-neutral-950 group-hover/email:text-black font-extrabold text-sm sm:text-base hover:underline truncate block transition-colors"
                          >
                            prathampetwal100@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopy("prathampetwal100@gmail.com", "email")}
                          title="Copy Email"
                          className="p-2.5 rounded-xl bg-neutral-100/90 hover:bg-black hover:text-white border border-black/5 hover:border-black text-neutral-700 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm hover:scale-110 active:scale-90 cursor-pointer"
                        >
                          {copiedItem === "email" ? (
                            <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                          ) : (
                            <Copy className="w-4 h-4 text-current" />
                          )}
                        </button>
                        <a
                          href="mailto:prathampetwal100@gmail.com"
                          title="Send Email"
                          className="p-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-md hover:scale-110 active:scale-90"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* 2. Phone / WhatsApp Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/95 hover:bg-white backdrop-blur-2xl border border-white/90 flex items-center justify-between gap-3 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 group/phone">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover/phone:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 group-hover/phone:text-neutral-700 transition-colors">
                            Phone / WhatsApp
                          </div>
                          <a
                            href="tel:+919634496058"
                            className="text-neutral-950 group-hover/phone:text-black font-extrabold text-sm sm:text-base hover:underline truncate block font-mono transition-colors"
                          >
                            +91 9634496058
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopy("+91 9634496058", "phone")}
                          title="Copy Phone"
                          className="p-2.5 rounded-xl bg-neutral-100/90 hover:bg-black hover:text-white border border-black/5 hover:border-black text-neutral-700 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm hover:scale-110 active:scale-90 cursor-pointer"
                        >
                          {copiedItem === "phone" ? (
                            <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                          ) : (
                            <Copy className="w-4 h-4 text-current" />
                          )}
                        </button>
                        <a
                          href="tel:+919634496058"
                          title="Call Number"
                          className="p-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-md hover:scale-110 active:scale-90"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels Grid Inside The Same Card */}
                <div className="pointer-events-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xl border border-white/90 text-[11px] font-bold uppercase tracking-wider text-neutral-900 shadow-md mb-3">
                    <span>Social & Developer Profiles</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-2xl bg-white/95 hover:bg-neutral-950 backdrop-blur-2xl border border-white/90 hover:border-black shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:shadow-2xl flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group/social hover:-translate-y-1.5 hover:scale-[1.04] active:scale-[0.96] cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-neutral-900 group-hover/social:text-white transition-colors duration-200">
                            {social.icon}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/social:text-white group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 transition-all duration-200" />
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-neutral-950 group-hover/social:text-white transition-colors duration-200 block">
                            {social.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 group-hover/social:text-neutral-300 font-mono block truncate transition-colors duration-200 mt-0.5">
                            {social.handle.replace("github.com/", "@").replace("linkedin.com/in/", "in/")}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;