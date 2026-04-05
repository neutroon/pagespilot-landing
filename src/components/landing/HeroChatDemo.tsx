import { useState, useEffect, useRef, useCallback } from "react";
import { Send, CheckCheck, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";

export type Role = "ai" | "user";
export type Message = { id: string; role: Role; text: string; time: string; };

function nowTime() {
  return new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
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
}

export default function HeroChatDemo({ 
  floating, 
  onClose,
  messages,
  setMessages,
  conversationId,
  setConversationId,
  input,
  setInput
}: HeroChatDemoProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const push = useCallback((role: Role, text: string) => {
    setMessages(p => [...p, { id: `${Date.now()}-${Math.random()}`, role, text, time: nowTime() }]);
  }, []);

  // Initial welcome message (clean and professional)
  useEffect(() => {
    if (messages.length === 0) {
      push("ai", "أهلاً بك! أنا مساعد PagesPilot الذكي، كيف يمكنني مساعدتك اليوم؟");
    }
  }, [messages.length, push]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
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

      const aiText = response?.reply || "عذراً، حدث خطأ في معالجة طلبك.";
      push("ai", aiText);
    } catch (err) {
      console.error("Chat API error:", err);
      setIsTyping(false);
      setError("حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.");
      push("ai", "عذراً، واجهت مشكلة في الاتصال بالخادم. حاول لاحقاً!");
    }
  };

  return (
    <div className="flex flex-col w-full h-full" dir="rtl">
      {/* ── Chat header ── */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-t-2xl" style={{ background: "rgba(22,15,46,0.9)" }}>
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg" style={{ background: "linear-gradient(135deg,#7C3AED,#9B59F5)" }}>
            PP
          </div>
          <span className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#06040F] shadow-[0_0_8px_#25D366]" />
        </div>
        <div className="flex-1 min-w-0 text-right">
          <p className="text-[#F0EBF8] font-bold text-sm leading-tight truncate">PagesPilot AI</p>
          <div className="flex items-center gap-1.5 justify-end mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <p className="text-[#25D366] text-[10px] font-bold uppercase tracking-wider">متصل الآن</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {onClose && (
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full text-[#6B5F88] hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 min-h-0 scrollbar-hide bg-[#06040F]/30" style={{ minHeight: 320, maxHeight: 420 }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex flex-col max-w-[90%] ${msg.role === "user" ? "self-start items-start" : "self-end items-end"}`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed relative ${msg.role === "user"
                    ? "bubble-user text-white rounded-tr-none shadow-lg"
                    : "bubble-ai text-[#F0EBF8] rounded-tl-none shadow-md border border-white/5"
                  }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-[#6B5F88] mt-1 px-1 flex items-center gap-1 font-medium">
                {msg.time}
                {msg.role === "user" && <CheckCheck className="w-3 h-3 text-[#25D366]" />}
              </span>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="self-end">
              <div className="bubble-ai rounded-2xl rounded-tl-none px-4 py-3 inline-flex gap-1.5 items-center border border-white/5">
                {[0, 1, 2].map(i => (
                  <motion.span key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
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
      <div className="flex items-center gap-3 px-4 py-4 rounded-b-2xl border-t border-[#1E1340]/50" style={{ background: "rgba(22,15,46,0.9)" }}>
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !isTyping) send(input); }}
            placeholder="اكتب استفسارك هنا..."
            className="w-full bg-[#160F2E] border border-[#2E1D60]/60 text-[#F0EBF8] rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#7C3AED]/60 placeholder-[#6B5F88] transition-all text-right"
            dir="rtl"
            disabled={isTyping}
          />
        </div>
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || isTyping}
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-xl"
          style={{ background: "#25D366", boxShadow: "0 0 15px rgba(37,211,102,0.3)" }}
        >
          <Send className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
}
