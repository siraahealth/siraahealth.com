"use client";

import { motion } from "framer-motion";
import { Star, Cloud } from "lucide-react";

/**
 * Small, subtle, slowly-hovering decorative shapes spread across the full page.
 * Purely visual — no interaction, no layout impact (absolute + pointer-events-none).
 * Not emojis: hand-built inline SVGs / lucide icons so styling (size, color,
 * opacity) stays fully controllable and consistent with the rest of the UI.
 */

function FloatItem({
  children,
  className,
  duration = 6,
  delay = 0,
  yRange = 10,
  rotateRange,
}: {
  children: React.ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  yRange?: number;
  rotateRange?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      animate={{
        y: [0, -yRange, 0],
        ...(rotateRange ? { rotate: [-rotateRange, rotateRange, -rotateRange] } : {}),
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function MilkBottleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="2" width="6" height="3" rx="1" fill="currentColor" opacity="0.9" />
      <path
        d="M9 5h6l1 2.5c.6.9 1 2 1 3.2V19a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-8.3c0-1.2.4-2.3 1-3.2L9 5Z"
        fill="currentColor"
        opacity="0.75"
      />
      <rect x="8.3" y="13" width="7.4" height="1.6" rx="0.8" fill="white" opacity="0.7" />
    </svg>
  );
}

function SnowmanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="16" r="5" fill="currentColor" opacity="0.75" />
      <circle cx="12" cy="8.5" r="3.5" fill="currentColor" opacity="0.85" />
      <circle cx="10.7" cy="7.7" r="0.5" fill="white" />
      <circle cx="13.3" cy="7.7" r="0.5" fill="white" />
      <path d="M12 8.7l1.6.5-1.6.5" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="15" r="0.5" fill="white" />
      <circle cx="12" cy="17.2" r="0.5" fill="white" />
    </svg>
  );
}

function FootballIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 8.2 14.6 10l-1 3-3.2 0-1-3L12 8.2Z M12 3.6v4.6 M12 20.4v-4.6 M4.5 8.4l4.9 1.6 M19.5 8.4l-4.9 1.6 M4.5 15.6l4.9-1.6 M19.5 15.6l-4.9-1.6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </svg>
  );
}

export function FloatingDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <FloatItem className="top-[2%] left-[3%] text-amber-400/40" duration={5.5} yRange={8}>
        <Star className="w-5 h-5" fill="currentColor" />
      </FloatItem>

      <FloatItem className="top-[8%] right-[4%] text-sky-400/35" duration={7} delay={0.6} yRange={12}>
        <Cloud className="w-8 h-8" fill="currentColor" strokeWidth={1} />
      </FloatItem>

      <FloatItem className="top-[28%] right-[2%] text-blue-400/35" duration={6.5} delay={1.2} yRange={10}>
        <Cloud className="w-6 h-6" fill="currentColor" strokeWidth={1} />
      </FloatItem>

      <FloatItem className="top-[48%] left-[3%] text-primary/30" duration={6} delay={0.3} yRange={9} rotateRange={6}>
        <MilkBottleIcon className="w-6 h-6" />
      </FloatItem>

      <FloatItem className="top-[68%] right-[4%] text-slate-400/35" duration={7.5} delay={0.9} yRange={11}>
        <SnowmanIcon className="w-6 h-6" />
      </FloatItem>

      <FloatItem className="top-[88%] left-[4%] text-emerald-500/30" duration={5} delay={1.5} yRange={14} rotateRange={15}>
        <FootballIcon className="w-6 h-6" />
      </FloatItem>
    </div>
  );
}
