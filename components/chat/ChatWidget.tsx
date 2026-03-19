"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { useCallback, useEffect, useRef, useState, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

// ─── Lichtgewicht markdown-renderer ─────────────────────────────────────────
// Ondersteunt: **bold**, [tekst](url), regelafbrekingen (\n) en alinea's (\n\n)

function parseInline(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));

    if (match[1] !== undefined) {
      // **bold**
      parts.push(<strong key={match.index}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      // [tekst](url)
      const isExternal = match[3].startsWith("http");
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          className="underline hover:opacity-80"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {match[2]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) parts.push(line.slice(lastIndex));
  return parts;
}

function MarkdownText({ text, dark }: { text: string; dark?: boolean }) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return (
    <div className="space-y-1.5">
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        return (
          <p key={pi}>
            {lines.map((line, li) => (
              <Fragment key={li}>
                {parseInline(line)}
                {li < lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "Ik zoek een website",
  "Ik wil beter gevonden worden",
  "Ik wil automatiseren",
] as const;

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hoi! Ik ben de Arka-assistent. Waar kan ik je mee helpen? 👋",
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-dark-300 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [offline, setOffline] = useState(false);
  const [emailCapture, setEmailCapture] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialise messages when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([INITIAL_MESSAGE]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || loading) return;

      const userMessage: Message = { role: "user", content: content.trim() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages, sessionId }),
        });

        const data = await res.json();

        if (res.status === 503 || data.error === "chat_offline") {
          setOffline(true);
          return;
        }

        if (!res.ok) throw new Error(data.error);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, er ging iets mis. Probeer het opnieuw of mail ons op arkaecom@proton.me.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, sessionId]
  );

  const handleEmailCapture = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!emailCapture.trim()) return;
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            naam: "Chat bezoeker",
            email: emailCapture,
            bedrijf: "Onbekend",
            bericht: "Interesse via chat (offline modus)",
          }),
        });
      } finally {
        setEmailSent(true);
      }
    },
    [emailCapture]
  );

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg shadow-brand-600/40 flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Chat sluiten" : "Chat openen"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-dark-100 flex flex-col overflow-hidden"
            style={{ maxHeight: "min(580px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="bg-brand-600 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Arka Assistent
                </p>
                <p className="text-brand-200 text-xs">
                  {offline ? "Offline" : "Online — antwoordt direct"}
                </p>
              </div>
            </div>

            {/* Offline mode */}
            {offline ? (
              <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4">
                <Mail className="w-10 h-10 text-dark-300" />
                <div className="text-center">
                  <p className="font-semibold text-dark-900 text-sm">
                    Chat tijdelijk offline
                  </p>
                  <p className="text-dark-500 text-xs mt-1">
                    Laat je e-mailadres achter en we nemen binnen 1 dag contact
                    op.
                  </p>
                </div>
                {emailSent ? (
                  <p className="text-brand-600 font-medium text-sm">
                    ✓ We nemen snel contact op!
                  </p>
                ) : (
                  <form
                    onSubmit={handleEmailCapture}
                    className="w-full space-y-2"
                  >
                    <input
                      type="email"
                      value={emailCapture}
                      onChange={(e) => setEmailCapture(e.target.value)}
                      placeholder="jouw@email.nl"
                      required
                      className="w-full border border-dark-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <Button type="submit" className="w-full" size="sm">
                      Laat e-mail achter
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-brand-600 text-white rounded-br-sm"
                            : "bg-dark-50 text-dark-800 rounded-bl-sm"
                        )}
                      >
                        {msg.role === "assistant" ? (
                          <MarkdownText text={msg.content} />
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-dark-50 rounded-xl rounded-bl-sm">
                        <TypingIndicator />
                      </div>
                    </div>
                  )}

                  {/* Quick replies — only show after first assistant message */}
                  {messages.length === 1 && !loading && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {QUICK_REPLIES.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => sendMessage(reply)}
                          className="text-xs px-3 py-1.5 rounded-full border border-brand-200 text-brand-600 hover:bg-brand-50 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-dark-100 p-3">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage(input);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Typ je vraag..."
                      className="flex-1 border border-dark-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="w-9 h-9 flex items-center justify-center bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
