"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import HeroChatDemo, { Message } from "./HeroChatDemo";

interface StickyChatWrapperProps {
  locale: string;
  side: "left" | "right";
  isSticky: boolean;
  forceOpen?: boolean;
  // Shared Chat State
  messages: Message[];
  setMessages: (msgs: Message[] | ((prev: Message[]) => Message[])) => void;
  conversationId: number | null;
  setConversationId: (id: number | null) => void;
  input: string;
  setInput: (val: string) => void;
}

export default function StickyChatWrapper({
  locale,
  side,
  isSticky,
  forceOpen = false,
  messages,
  setMessages,
  conversationId,
  setConversationId,
  input,
  setInput
}: StickyChatWrapperProps) {
  const isAr = locale === "ar";
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Sync open state with screen size
  const { scrollY } = useScroll();
  const overlapY = useTransform(scrollY, () => {
    if (typeof window === "undefined") return 0;
    if (!isSticky) return 0;
    // Disable the push-up behavior on mobile screens (let the chat bubble stay fixed)
    if (window.innerWidth < 1024) return 0;
    
    const footer = document.querySelector("footer");
    if (!footer) return 0;
    const rect = footer.getBoundingClientRect();
    const overlap = window.innerHeight - rect.top;
    return overlap > 0 ? -overlap : 0;
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // If forced to open (e.g. Hero demo), stay open on mobile.
      // Otherwise, default to collapsed bubble on small screens.
      if (forceOpen) {
        setIsOpen(true);
      } else if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [forceOpen]);

  // Positioning Logic
  // We want the chat to always be on the 'Empty' side of the content.
  // In EN (LTR): Empty side is Right.
  // In AR (RTL): Empty side is Left.
  const displaySide = (() => {
    // 1. Minimized/Bubble: Always on the 'Empty' side of the screen.
    if (!isOpen) return isAr ? "left" : "right";
    
    // 2. Mobile Open: Stay on one consistent empty side.
    if (isMobile) return isAr ? "left" : "right";
    
    // 3. Desktop Open: Flip the requested 'side' if we are in RTL.
    // If the section says 'side="right"' (the standard empty side for LTR),
    // in RTL that should physically be the 'left' side.
    if (isAr) {
      return side === "right" ? "left" : "right";
    }
    return side;
  })();

  const horizontalClass = displaySide === "left" ? "left-[5%]" : "right-[5%]";

  return (
    <motion.div
      layout
      initial={false}
      style={{ y: overlapY }}
      className={`${isSticky
        ? `fixed bottom-6 lg:bottom-10 z-[100] ${horizontalClass}`
        : "relative w-full max-w-[420px]"
        } flex flex-col ${displaySide === "left" ? "items-start" : "items-end"}`}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ── Chat Bubble Icon (Mobile/Minimized) ── */
          <motion.button
            key="bubble"
            layoutId="chat-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-[#7C3AED] shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform border border-white/20"
          >
            <MessageSquare className="w-8 h-8" />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full border-2 border-[#06040F]"
            />
          </motion.button>
        ) : (
          /* ── Full Chat Window ── */
          <motion.div
            key="window"
            layoutId="chat-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-[320px] sm:w-[360px] md:w-[380px] rounded-[2.2rem] overflow-hidden border border-[#1E1340]/40 shadow-2xl`}
            style={{
              background: "rgba(13, 9, 32, 0.95)",
              backdropFilter: "blur(24px)",
            }}
          >

            {/* Scan line animation */}
            <motion.div
              animate={{ top: ["5%", "95%", "5%"] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-x-0 h-[2px] z-20 pointer-events-none opacity-20"
              style={{
                background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
              }}
            />

            {/* Chat demo content */}
            <HeroChatDemo 
              floating 
              onClose={isMobile ? () => setIsOpen(false) : undefined} 
              messages={messages}
              setMessages={setMessages}
              conversationId={conversationId}
              setConversationId={setConversationId}
              input={input}
              setInput={setInput}
              locale={locale}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

