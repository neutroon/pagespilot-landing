"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function SharedBackground() {
  const { scrollYProgress } = useScroll();

  // Create parallax effects for different background nodes
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Primary Violet Glow Node - Static Parallax Only */}
      <motion.div
        style={{ y: y1, rotate: rotate1, scale: scale1, background: "rgba(124, 58, 237, 1)" }}
        className="absolute top-[10%] -left-[10%] w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.35] dark:opacity-[0.25] will-change-transform"
      />
      
      {/* Secondary Amber Glow Node - Static Parallax Only */}
      <motion.div
        style={{ y: y2, background: "rgba(245, 158, 11, 1)" }}
        className="absolute top-[30%] -right-[5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.3] dark:opacity-[0.2] will-change-transform"
      />
      
      {/* Tertiary Green Glow Node - Static Parallax Only */}
      <motion.div
        style={{ y: y3, background: "rgba(37, 211, 102, 1)" }}
        className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.25] dark:opacity-[0.18] will-change-transform"
      />

      {/* Floating horizontal "data streams" - simplified opacity animation only */}
      {[
        { top: 15, duration: 12, width: 320, opacity: 0.15 },
        { top: 35, duration: 18, width: 480, opacity: 0.12 },
        { top: 55, duration: 14, width: 240, opacity: 0.18 },
        { top: 75, duration: 22, width: 560, opacity: 0.1 },
        { top: 90, duration: 16, width: 400, opacity: 0.15 },
      ].map((line, i) => (
        <motion.div
          key={i}
          initial={{ x: "-150%", opacity: 0 }}
          animate={{ x: "250%", opacity: [0, line.opacity, 0] }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: i * 4,
            ease: "linear"
          }}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transform-gpu"
          style={{ 
            top: `${line.top}%`, 
            width: line.width,
          }}
        />
      ))}
    </div>
  );
}
