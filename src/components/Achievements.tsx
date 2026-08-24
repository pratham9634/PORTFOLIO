import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CODING_PROFILES,
  ACHIEVEMENTS,
  CERTIFICATIONS,
  NoteCategory,
  CodingProfile,
  AchievementItem,
  CertificationItem,
} from '../data/achievementsData';
import { PushPin } from './sketchbook/PushPin';
import { MaskingTape } from './sketchbook/SketchDoodles';
import {
  Trophy,
  ExternalLink,
  Sparkles,
  Flame,
  ShieldCheck,
} from 'lucide-react';

/** Top Orange Clamping Fixture & Leveler (matching reference image) */
const EaselTopClamp: React.FC = () => {
  return (
    <div className="relative mx-auto flex flex-col items-center select-none pointer-events-none -mb-3 z-30">
      {/* Top Small Steel Knob / Screw */}
      <div className="w-5 h-3 bg-slate-600 rounded-t-sm shadow-md border border-slate-700 mx-auto" />

      {/* Orange Fixture Box with Bubble Leveler Window */}
      <div className="relative w-28 sm:w-36 h-8 sm:h-9 rounded-md bg-gradient-to-b from-[#f97316] to-[#c2410c] border-2 border-[#9a3412] shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-between px-3">
        {/* Left Screw Rivet */}
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-slate-400 rotate-45" />
        </div>

        {/* Center Circular Glass Bubble Level Window */}
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 border-2 border-amber-800/80 shadow-inner flex items-center justify-center overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-amber-400/90 shadow-sm animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/40 to-transparent pointer-events-none" />
        </div>

        {/* Right Screw Rivet */}
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-slate-400 -rotate-45" />
        </div>
      </div>
    </div>
  );
};

/** Bottom Wooden Easel Legs (matching reference image) */
const EaselLegs: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-start justify-between px-12 sm:px-24 -mt-2 sm:-mt-3 select-none pointer-events-none z-10">
      {/* Left Wooden Leg */}
      <div className="relative w-6 sm:w-8 h-14 sm:h-20 bg-gradient-to-b from-[#663311] via-[#52290d] to-[#3a1d09] rounded-b-md shadow-2xl border-x-2 border-b-2 border-[#2b1506] transform -skew-x-6 origin-top">
        {/* Wood grain line */}
        <div className="absolute inset-y-0 left-1.5 w-[1px] bg-amber-200/20" />
        <div className="absolute inset-y-0 right-2 w-[1px] bg-black/40" />
      </div>

      {/* Center Easel Vertical Mast Support */}
      <div className="w-8 sm:w-10 h-10 sm:h-14 bg-gradient-to-b from-[#592c0f] to-[#3a1d09] rounded-b-md shadow-xl border-x-2 border-b-2 border-[#261306]">
        <div className="w-2 h-2 rounded-full bg-amber-950/80 mx-auto mt-2 shadow-inner border border-amber-700/40" />
      </div>

      {/* Right Wooden Leg */}
      <div className="relative w-6 sm:w-8 h-14 sm:h-20 bg-gradient-to-b from-[#663311] via-[#52290d] to-[#3a1d09] rounded-b-md shadow-2xl border-x-2 border-b-2 border-[#2b1506] transform skew-x-6 origin-top">
        {/* Wood grain line */}
        <div className="absolute inset-y-0 left-2 w-[1px] bg-amber-200/20" />
        <div className="absolute inset-y-0 right-1.5 w-[1px] bg-black/40" />
      </div>
    </div>
  );
};

/** Ultra-Premium color themes for tactile sticky notes */
const NOTE_COLOR_STYLES: Record<
  string,
  { bg: string; border: string; text: string; headerBg: string; shadow: string; pillBg: string; pillBorder: string }
> = {
  yellow: {
    bg: 'bg-gradient-to-br from-[#fffdf5] via-[#fefcf0] to-[#fef6dc]',
    border: 'border-[#ebd498]',
    text: 'text-[#2e2008]',
    headerBg: 'bg-[#faebd0]/60',
    shadow: 'shadow-[0_12px_32px_-6px_rgba(180,130,40,0.14),0_4px_12px_rgba(0,0,0,0.04)]',
    pillBg: 'bg-[#faebd0]/70',
    pillBorder: 'border-[#ecd18b]',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-[#f8fafc] via-[#f0f6fb] to-[#e4f0fa]',
    border: 'border-[#b4d8f2]',
    text: 'text-[#0c2336]',
    headerBg: 'bg-[#d8ebfa]/60',
    shadow: 'shadow-[0_12px_32px_-6px_rgba(2,132,199,0.14),0_4px_12px_rgba(0,0,0,0.04)]',
    pillBg: 'bg-[#d8ebfa]/70',
    pillBorder: 'border-[#a8d3f2]',
  },
  green: {
    bg: 'bg-gradient-to-br from-[#f6fcf8] via-[#eef8f1] to-[#e1f3e7]',
    border: 'border-[#a4dab4]',
    text: 'text-[#0d2e18]',
    headerBg: 'bg-[#d4edd9]/60',
    shadow: 'shadow-[0_12px_32px_-6px_rgba(22,101,52,0.14),0_4px_12px_rgba(0,0,0,0.04)]',
    pillBg: 'bg-[#d4edd9]/70',
    pillBorder: 'border-[#9bd6ad]',
  },
  amber: {
    bg: 'bg-gradient-to-br from-[#fffaf5] via-[#fef4ea] to-[#fdeada]',
    border: 'border-[#f6caa0]',
    text: 'text-[#381c08]',
    headerBg: 'bg-[#fce1cc]/60',
    shadow: 'shadow-[0_12px_32px_-6px_rgba(217,119,6,0.14),0_4px_12px_rgba(0,0,0,0.04)]',
    pillBg: 'bg-[#fce1cc]/70',
    pillBorder: 'border-[#f5be8d]',
  },
  lavender: {
    bg: 'bg-gradient-to-br from-[#faf7fd] via-[#f5effb] to-[#ece0f8]',
    border: 'border-[#ceb7ec]',
    text: 'text-[#271239]',
    headerBg: 'bg-[#e4d3f5]/60',
    shadow: 'shadow-[0_12px_32px_-6px_rgba(126,58,242,0.14),0_4px_12px_rgba(0,0,0,0.04)]',
    pillBg: 'bg-[#e4d3f5]/70',
    pillBorder: 'border-[#c2a6e6]',
  },
  rose: {
    bg: 'bg-gradient-to-br from-[#fff8f9] via-[#fdf0f2] to-[#fae1e6]',
    border: 'border-[#f5b8c4]',
    text: 'text-[#360e17]',
    headerBg: 'bg-[#f9d2da]/60',
    shadow: 'shadow-[0_12px_32px_-6px_rgba(225,29,72,0.14),0_4px_12px_rgba(0,0,0,0.04)]',
    pillBg: 'bg-[#f9d2da]/70',
    pillBorder: 'border-[#f2a5b4]',
  },
};

/** Coding Profile Sticky Note Card */
const CodingProfileCard: React.FC<{ profile: CodingProfile }> = ({ profile }) => {
  const style = NOTE_COLOR_STYLES[profile.noteColor] || NOTE_COLOR_STYLES.yellow;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      whileHover={{
        scale: 1.045,
        y: -7,
        rotate: 0,
        zIndex: 40,
        transition: {
          type: 'spring',
          stiffness: 420,
          damping: 13,
          mass: 0.75,
        },
      }}
      whileTap={{
        scale: 0.97,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 15,
        },
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 22,
        mass: 0.85,
      }}
      style={{
        rotate: `${profile.rotation}deg`,
        borderRadius: '20px 6px 24px 7px / 7px 22px 5px 22px',
      }}
      className={`relative p-5 sm:p-6 ${style.bg} border-2 border-[#1c1917] shadow-[4px_5px_0px_#1c1917,0_12px_24px_rgba(0,0,0,0.06)] hover:shadow-[7px_10px_0px_#1c1917,0_20px_40px_rgba(0,0,0,0.14)] flex flex-col justify-between cursor-pointer group`}
    >
      {/* 3D Push Pin at Top Center */}
      <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 z-20">
        <PushPin color={profile.pinColor} size="md" />
      </div>

      {/* Header with Platform, Badge & Username Column Stack */}
      <div className="pt-2">
        <div className="border-b-2 border-dashed border-[#1c1917]/20 pb-3 flex flex-col gap-2 items-start">
          {/* Platform Title */}
          <div
            className="text-xl sm:text-2xl font-black tracking-tight text-[#1c1917]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {profile.platform}
          </div>

          {/* Badge Tag in column (Never overflows) */}
          <div
            className="inline-block text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md border border-[#1c1917]/35 bg-black/5 text-neutral-900 shadow-2xs self-start"
            style={{ fontFamily: 'var(--font-sketch)' }}
          >
            {profile.badgeText}
          </div>

          {/* Platform Profile Link in column */}
          <div className="pt-0.5">
            <motion.a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${profile.platform} profile`}
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 border border-[#1c1917] shadow-[1.5px_1.5px_0px_#1c1917] text-xs font-mono font-bold text-neutral-900 hover:bg-[#1c1917] hover:text-white transition-colors"
            >
              <span>@{profile.username}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </motion.a>
          </div>
        </div>

        {/* Primary Main Stat Hero Box */}
        <div className="my-3.5 p-3.5 rounded-xl bg-white/85 backdrop-blur-xs border-2 border-[#1c1917] shadow-[2px_2.5px_0px_#1c1917]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-700">
              {profile.primaryStat.label}
            </span>
            {profile.contestRating && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 border border-[#1c1917] shadow-[1px_1px_0px_#1c1917] text-amber-950">
                ⚡ {profile.contestRating}
              </span>
            )}
          </div>
          <div
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1c1917] mt-1 flex items-baseline gap-1"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {profile.primaryStat.value}
            {profile.platform === 'LeetCode' && (
              <Flame className="w-5 h-5 text-amber-500 fill-amber-400 inline ml-1 self-center" />
            )}
            {profile.platform === 'GeeksforGeeks' && (
              <span className="text-sm font-sketch text-emerald-800 ml-1 font-bold">★ Active</span>
            )}
          </div>
        </div>

        {/* Breakdown Badges Grid */}
        <div className="grid grid-cols-3 gap-2">
          {profile.breakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-white/70 text-center border border-[#1c1917]/35 shadow-[1px_1px_0px_rgba(28,25,23,0.3)]"
            >
              <div className="text-[10px] font-mono font-semibold text-neutral-700 uppercase">
                {item.label}
              </div>
              <div
                className="text-sm font-extrabold mt-0.5"
                style={{
                  color: item.color || '#18181b',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Highlight Quote / Note */}
      <div className="mt-3.5 pt-2.5 border-t-2 border-dashed border-[#1c1917]/20 flex items-center justify-between text-xs">
        <span
          className="font-semibold text-neutral-900 leading-snug line-clamp-2"
          style={{ fontFamily: 'var(--font-hand)', fontSize: '15px' }}
        >
          ✏️ {profile.highlight}
        </span>
      </div>
    </motion.div>
  );
};

/** Achievement / Award Sticky Note Card */
const AchievementCard: React.FC<{ achievement: AchievementItem }> = ({ achievement }) => {
  const style = NOTE_COLOR_STYLES[achievement.noteColor] || NOTE_COLOR_STYLES.amber;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      whileHover={{
        scale: 1.045,
        y: -7,
        rotate: 0,
        zIndex: 40,
        transition: {
          type: 'spring',
          stiffness: 420,
          damping: 13,
          mass: 0.75,
        },
      }}
      whileTap={{
        scale: 0.97,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 15,
        },
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 22,
        mass: 0.85,
      }}
      style={{
        rotate: `${achievement.rotation}deg`,
        borderRadius: '22px 5px 20px 6px / 6px 24px 6px 20px',
      }}
      className={`relative p-5 sm:p-6 ${style.bg} border-2 border-[#1c1917] shadow-[4px_5px_0px_#1c1917,0_12px_24px_rgba(0,0,0,0.06)] hover:shadow-[7px_10px_0px_#1c1917,0_20px_40px_rgba(0,0,0,0.14)] flex flex-col justify-between cursor-pointer group`}
    >
      {/* Push Pin */}
      <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 z-20">
        <PushPin color={achievement.pinColor} size="md" />
      </div>

      {/* Top Header */}
      <div className="pt-2">
        <div className="border-b-2 border-dashed border-[#1c1917]/20 pb-3 flex flex-col gap-2 items-start">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-5 h-5 text-amber-600 fill-amber-300" />
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1c1917]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {achievement.date}
              </span>
            </div>
          </div>

          <span
            className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-white/90 border border-[#1c1917] shadow-[1px_1px_0px_#1c1917] text-neutral-900 self-start"
            style={{ fontFamily: 'var(--font-sketch)' }}
          >
            {achievement.rankBadge}
          </span>
        </div>

        {/* Title & Event */}
        <h4
          className={`text-lg sm:text-xl font-bold tracking-tight ${style.text} mt-2.5 leading-snug`}
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {achievement.title}
        </h4>
        <div
          className="text-xs font-semibold text-neutral-700 mt-0.5"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {achievement.event}
        </div>

        {/* Description in Sketch / Hand Font */}
        <p
          className={`text-sm sm:text-base ${style.text} mt-3 leading-relaxed opacity-95`}
          style={{ fontFamily: 'var(--font-hand)', fontSize: '16px' }}
        >
          {achievement.description}
        </p>
      </div>

      {/* Tags & Action Link */}
      <div className="mt-4 pt-2.5 border-t-2 border-dashed border-[#1c1917]/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {achievement.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/80 border border-[#1c1917]/40 shadow-2xs text-neutral-900"
            >
              #{tag}
            </span>
          ))}
        </div>

        {achievement.link && (
          <motion.a
            href={achievement.link}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:underline px-2.5 py-1 rounded-md bg-white/80 border border-[#1c1917] shadow-[1px_1px_0px_#1c1917]"
            style={{ fontFamily: 'var(--font-sketch)' }}
          >
            View Work <ExternalLink className="w-3 h-3" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

/** Certification Sticky Note Card */
const CertificationCard: React.FC<{ cert: CertificationItem }> = ({ cert }) => {
  const style = NOTE_COLOR_STYLES[cert.noteColor] || NOTE_COLOR_STYLES.lavender;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      whileHover={{
        scale: 1.045,
        y: -7,
        rotate: 0,
        zIndex: 40,
        transition: {
          type: 'spring',
          stiffness: 420,
          damping: 13,
          mass: 0.75,
        },
      }}
      whileTap={{
        scale: 0.97,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 15,
        },
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 22,
        mass: 0.85,
      }}
      style={{
        rotate: `${cert.rotation}deg`,
        borderRadius: '20px 6px 22px 6px / 6px 22px 6px 20px',
      }}
      className={`relative p-5 sm:p-6 ${style.bg} border-2 border-[#1c1917] shadow-[4px_5px_0px_#1c1917,0_12px_24px_rgba(0,0,0,0.06)] hover:shadow-[7px_10px_0px_#1c1917,0_20px_40px_rgba(0,0,0,0.14)] flex flex-col justify-between cursor-pointer group`}
    >
      {/* Push Pin or Binder Clip */}
      <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 z-20">
        <PushPin color={cert.pinColor} size="md" />
      </div>

      <div className="pt-2">
        {/* Header Bar */}
        <div className="border-b-2 border-dashed border-[#1c1917]/20 pb-2.5 flex flex-col gap-1.5 items-start">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span
                className="text-[11px] font-mono uppercase font-bold text-[#1c1917] tracking-wider"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {cert.issueDate}
              </span>
            </div>
          </div>

          {cert.credentialId ? (
            <div
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/80 border border-[#1c1917] shadow-[1px_1px_0px_#1c1917] text-neutral-800 self-start"
            >
              ID: {cert.credentialId}
            </div>
          ) : (
            <div
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 border border-[#1c1917] shadow-[1px_1px_0px_#1c1917] text-emerald-950 self-start"
            >
              ✓ Verified Credential
            </div>
          )}
        </div>

        {/* Title */}
        <h4
          className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 mt-2.5 leading-snug"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {cert.title}
        </h4>

        {/* Issuer */}
        <div
          className="text-xs font-semibold text-neutral-800 mt-1 flex items-center gap-1"
          style={{ fontFamily: 'var(--font-sketch)' }}
        >
          🏛️ {cert.issuer}
        </div>

        {/* Skills Tag Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cert.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-[11px] font-sans px-2 py-0.5 rounded-md bg-white/85 border border-[#1c1917]/40 text-neutral-900 shadow-2xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Verify Button */}
      <div className="mt-4 pt-2.5 border-t-2 border-dashed border-[#1c1917]/20 flex items-center justify-between">
        <span
          className="text-xs text-neutral-700 font-medium"
          style={{ fontFamily: 'var(--font-hand)', fontSize: '15px' }}
        >
          ✓ Official Document
        </span>

        <motion.a
          href={cert.verifyUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.08, y: -1 }}
          whileTap={{ scale: 0.94 }}
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#1c1917] text-white hover:bg-neutral-800 border-2 border-[#1c1917] shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.4)] transition-colors"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          View Certificate <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export const Achievements: React.FC = () => {
  const [category, setCategory] = useState<NoteCategory>('all');

  const CATEGORY_TABS: { id: NoteCategory; label: string; count: number }[] = [
    {
      id: 'all',
      label: '📌 All Pinned Notes',
      count: CODING_PROFILES.length + ACHIEVEMENTS.length + CERTIFICATIONS.length,
    },
    {
      id: 'stats',
      label: '⚡ Coding Stats & Profiles',
      count: CODING_PROFILES.length,
    },
    {
      id: 'achievements',
      label: '🏆 Achievements & Rankings',
      count: ACHIEVEMENTS.length,
    },
    {
      id: 'certifications',
      label: '📜 Certifications & Badges',
      count: CERTIFICATIONS.length,
    },
  ];

  return (
    <section
      id="achievements"
      className="relative w-full py-24 sm:py-32 lg:py-36 tactile-menu-bg overflow-hidden select-none border-t border-[#1c1917]/15"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-neutral-300 bg-white/80 backdrop-blur-xs text-xs sm:text-[13px] font-mono uppercase tracking-widest text-neutral-700 shadow-2xs mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            [ 05 — PROWESS & RECOGNITION ]
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Achievements & Stats
          </h2>

          <p
            className="mt-3 text-base sm:text-xl text-neutral-600 font-medium"
            style={{ fontFamily: 'var(--font-hand)', fontSize: '22px' }}
          >
            Pinned coding milestones, problem solving metrics, rankings & verified licenses.
          </p>

          {/* Category Filter Pills (Sketch Stamp Style with Spring Bounce) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORY_TABS.map((tab) => {
              const isActive = category === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setCategory(tab.id)}
                  whileHover={{ scale: 1.06, y: -2, transition: { type: 'spring', stiffness: 450, damping: 14 } }}
                  whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'bg-[#1c1917] text-white shadow-[2px_3px_0px_rgba(0,0,0,0.3)] border-2 border-[#1c1917]'
                      : 'bg-white/85 border-2 border-[#1c1917]/30 text-neutral-800 hover:bg-neutral-100 hover:border-[#1c1917]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-neutral-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ================= WOODEN EASEL PINBOARD (MATCHING REFERENCE IMAGE) ================= */}
        <div className="relative max-w-5xl mx-auto">
          {/* 1. Top Orange Clamp & Bubble Level Fixture */}
          <EaselTopClamp />

          {/* 2. Wooden Frame Outer Wrapper */}
          <div className="relative rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 bg-gradient-to-br from-[#6b3511] via-[#4d2309] to-[#301505] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border-4 border-[#2c1406]">
            {/* Inner Wooden Bevel Depth Line */}
            <div className="rounded-xl sm:rounded-2xl p-1.5 sm:p-2 bg-gradient-to-tl from-[#804015] via-[#5c2a0b] to-[#361706] shadow-inner">
              {/* 3. Off-White Canvas / Board Surface */}
              <div className="relative rounded-lg sm:rounded-xl bg-[#fdfbf7] p-5 sm:p-7 md:p-9 shadow-[inset_0_4px_16px_rgba(0,0,0,0.12)] border border-stone-200 min-h-[460px] overflow-hidden">
                {/* Subtle Canvas Parchment Texture */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d6cebe_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                {/* Corner Decorative Washi Tape on the Board */}
                <div className="absolute -top-3 -left-3 pointer-events-none select-none z-10">
                  <MaskingTape width="w-20" height="h-6" rotate={-35} />
                </div>
                <div className="absolute -top-3 -right-3 pointer-events-none select-none z-10">
                  <MaskingTape width="w-20" height="h-6" rotate={35} />
                </div>

                {/* Hand-Drawn Annotation Doodles inside Board */}
                <div className="hidden lg:flex items-center justify-between text-neutral-400 font-mono text-[11px] mb-6 border-b border-dashed border-stone-300 pb-2 select-none pointer-events-none">
                  <span style={{ fontFamily: 'var(--font-hand)', fontSize: '18px' }} className="text-neutral-700">
                    💡 "Continuous progress through consistency & curiosity"
                  </span>
                  <span style={{ fontFamily: 'var(--font-sketch)' }} className="text-neutral-500">
                    Board Last Updated • 2026
                  </span>
                </div>

                {/* Grid of Pinned Sticky Notes */}
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10"
                >
                  <AnimatePresence mode="popLayout">
                    {/* Coding Stats Cards */}
                    {(category === 'all' || category === 'stats') &&
                      CODING_PROFILES.map((profile) => (
                        <CodingProfileCard key={profile.platform} profile={profile} />
                      ))}

                    {/* Achievements Cards */}
                    {(category === 'all' || category === 'achievements') &&
                      ACHIEVEMENTS.map((achievement) => (
                        <AchievementCard key={achievement.id} achievement={achievement} />
                      ))}

                    {/* Certifications Cards */}
                    {(category === 'all' || category === 'certifications') &&
                      CERTIFICATIONS.map((cert) => (
                        <CertificationCard key={cert.id} cert={cert} />
                      ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>

          {/* 3. Bottom Wooden Easel Legs Support */}
          <EaselLegs />
        </div>
      </div>
    </section>
  );
};

export default Achievements;
