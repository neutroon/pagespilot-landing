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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Violet Glow Node */}
      <motion.div
        style={{ y: y1, rotate: rotate1, scale: scale1 }}
        className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.08]"
        initial={{ background: "rgba(124, 58, 237, 1)" }}
      />
      
      {/* Secondary Amber Glow Node */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] -right-[5%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.05]"
        initial={{ background: "rgba(245, 158, 11, 1)" }}
      />
      
      {/* Tertiary Green Glow Node */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04]"
        initial={{ background: "rgba(37, 211, 102, 1)" }}
      />

      {/* Floating horizontal "data lines" that appear periodically */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "200%", opacity: [0, 0.2, 0] }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear"
          }}
          className="absolute h-px w-64 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent"
          style={{ top: `${20 + i * 15}%` }}
        />
      ))}
    </div>
  );
}
