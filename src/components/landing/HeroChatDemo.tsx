import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCheck, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";

export type Role = "ai" | "user";
export type Message = { id: string; role: Role; text: string; time: string; };

function nowTime(locale: string) {
  const timeLocale = locale === "ar" ? "ar-SA" : "en-US";
  return new Date().toLocaleTimeString(timeLocale, { hour: "2-digit", minute: "2-digit" });
}

const getVisitorId = () => {
  if (typeof window === "undefined") return "anon";
  let id = localStorage.getItem("pp_visitor_id");
  if (!id) {
    id = "vis_" + Math.random().toString(36).substring(2, 11);
    localStorage.setItem("pp_visitor_id", id);
  }
  return id;
};

interface HeroChatDemoProps {
  floating?: boolean;
  onClose?: () => void;
  // Shared State Props
  messages: Message[];
  setMessages: (msgs: Message[] | ((prev: Message[]) => Message[])) => void;
  conversationId: number | null;
  setConversationId: (id: number | null) => void;
  input: string;
  setInput: (val: string) => void;
  locale: string;
}

export default function HeroChatDemo({
  floating,
  onClose,
  messages,
  setMessages,
  conversationId,
  setConversationId,
  input,
  setInput,
  locale
}: HeroChatDemoProps) {
  const t = useTranslations("HomePage.heroChat");
  const isAr = locale === "ar";
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const push = useCallback((role: Role, text: string) => {
    setMessages(p => [...p, { id: `${Date.now()}-${Math.random()}`, role, text, time: nowTime(locale) }]);
  }, [setMessages, locale]);

  // Initial welcome message (clean and professional)
  useEffect(() => {
    if (messages.length === 0) {
      push("ai", t("aiGreeting"));
    }
  }, [messages.length, push, t]);

  useEffect(() => {
    const container = bottomRef.current?.parentElement;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const send = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setError(null);
    const userMsg = text.trim();
    push("user", userMsg);
    setInput("");
    setIsTyping(true);

    try {
      const visitorId = getVisitorId();
      // Pass the existing conversationId if available to maintain context
      const response = await api.postChat(visitorId, userMsg, conversationId ?? undefined);

      setIsTyping(false);

      if (response?.conversationId) {
        setConversationId(response.conversationId);
      }

      const aiText = response?.reply || t("errorProcessing");
      push("ai", aiText);
    } catch (err) {
      console.error("Chat API error:", err);
      setIsTyping(false);
      setError(t("errorConnection"));
      push("ai", t("aiConnectionProblem"));
    }
  };

  return (
    <div className="flex flex-col w-full h-full" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Chat header ── */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-t-2xl bg-elevated/90">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg bg-gradient-to-br from-primary to-primary-lt">
            pP
          </div>
          <span className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-accent border-2 border-bg shadow-[0_0_8px_var(--accent)]" />
        </div>
        <div className="flex-1 min-w-0 text-start">
          <p className="text-text font-bold text-sm leading-tight truncate">pagesPilot</p>
          <div className="flex items-center gap-1.5 mt-1 justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <p className="text-accent text-[10px] font-bold uppercase tracking-wider">{t("statusOnline")}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {onClose && (
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full text-muted hover:text-text transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 min-h-0 scrollbar-hide bg-bg/30" style={{ minHeight: 400, maxHeight: 400 }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`flex flex-col max-w-[90%] transform-gpu ${msg.role === "user" ? "items-end self-end" : "items-start self-start"
                }`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed relative ${msg.role === "user"
                  ? "bubble-user text-white rounded-tr-none shadow-lg"
                  : "bubble-ai text-text rounded-tl-none shadow-md border border-border/20"
                  }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-muted mt-1 px-1 flex items-center gap-1 font-medium">
                {msg.time}
                {msg.role === "user" && <CheckCheck className="w-3 h-3 text-accent" />}
              </span>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="items-start self-start"
            >
              <div className="bubble-ai rounded-2xl rounded-tl-none px-4 py-3 inline-flex gap-1.5 items-center border border-border/20">
                {[0, 1, 2].map(i => (
                  <motion.span key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* ── Error message ── */}
      {error && (
        <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 flex gap-2 items-center text-[10px] text-red-400">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}

      {/* ── Input bar ── */}
      <div className="flex items-center gap-3 px-4 py-4 rounded-b-2xl border-t border-border/50 bg-elevated/90">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !isTyping) send(input); }}
            placeholder={t("inputPlaceholder")}
            className="w-full bg-surface border border-border/60 text-text rounded-2xl px-5 py-3 text-sm outline-none focus:border-primary/60 placeholder-muted transition-all text-start"
            dir={isAr ? "rtl" : "ltr"}
            disabled={isTyping}
          />
        </div>
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || isTyping}
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-xl bg-accent shadow-accent/30"
        >
          <Send className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}
