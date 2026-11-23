import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, RotateCcw, Phone, Facebook, Mail, Loader2, Bot } from 'lucide-react';
import { sendChatMessage, ChatMessage, OWNER_INFO } from '../services/aiService';

const SUGGESTED_PROMPTS = [
  '🎂 Recommend a Bridal Cake',
  '🎉 Birthday Cakes under ৳1500',
  '🚚 Delivery Fees in Sylhet',
  '👤 Contact Owner Bikash Talukder',
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! Welcome to **Sugar & Sylhet**. I'm your AI Concierge.\n\nAsk me about our artisanal cakes, custom flavors, pricing, or delivery in Sylhet! You can also reach our owner **Bikash Talukder** directly at **${OWNER_INFO.phone}**.`,
      timestamp: Date.now(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const { reply } = await sendChatMessage(newMessages);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: 'assistant',
          content: `You can reach our owner Bikash Talukder directly at **${OWNER_INFO.phone}**, via [Facebook](${OWNER_INFO.facebook}), or email [${OWNER_INFO.email}](mailto:${OWNER_INFO.email}).`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Chat cleared! How can I help you choose your cake today? For custom orders, feel free to call or WhatsApp Bikash Talukder at **${OWNER_INFO.phone}**.`,
        timestamp: Date.now(),
      },
    ]);
  };

  /** Formats simple markdown bold, bullet points, and links into clickable JSX */
  const renderFormattedText = (content: string) => {
    return content.split('\n').map((line, lineIdx) => {
      // Parse markdown links [text](url) and **bold**
      const parts = line.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

      return (
        <span key={lineIdx} className="block min-h-[1.25rem]">
          {parts.map((part, pIdx) => {
            // Bold
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-ink">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            // Link
            const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
              const [, text, url] = linkMatch;
              return (
                <a
                  key={pIdx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-burgundy underline underline-offset-2 hover:text-gold"
                >
                  {text}
                </a>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Cake Assistant"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group fixed bottom-20 right-5 z-30 flex items-center gap-2 rounded-full border border-gold/40 bg-nightfall px-4 py-3 text-sm font-medium text-cream shadow-[0_16px_36px_-12px_rgba(33,29,25,0.45)] backdrop-blur transition-all duration-300 hover:border-gold hover:shadow-[0_20px_40px_-10px_rgba(184,147,76,0.4)] sm:bottom-20 sm:right-6"
          >
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
              <Sparkles size={14} className="animate-pulse text-gold" />
            </span>
            <span className="font-serif text-[13px] tracking-wide text-cream">
              Ask AI Concierge
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed bottom-5 right-4 z-50 flex h-[580px] max-h-[85vh] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-divider/90 bg-cream/95 text-ink shadow-[0_25px_60px_-15px_rgba(33,29,25,0.4)] backdrop-blur-xl sm:bottom-6 sm:right-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-concierge-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-divider/70 bg-surface/80 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-burgundy text-cream shadow-xs">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 id="ai-concierge-title" className="font-serif text-base font-semibold leading-tight text-ink">
                    Sugar & Sylhet AI
                  </h3>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                    Bikash Talukder's Bakery Concierge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-ink"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-ink"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Quick Contact Bar for Owner */}
            <div className="flex items-center justify-between border-b border-divider/50 bg-cream/70 px-4 py-1.5 text-[11px] text-muted">
              <span>Owner: <strong className="text-ink">Bikash Talukder</strong></span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${OWNER_INFO.phoneE164}`}
                  className="flex items-center gap-1 font-medium text-burgundy hover:underline"
                  title="Call Bikash Talukder"
                >
                  <Phone size={10} /> {OWNER_INFO.phone}
                </a>
                <span>•</span>
                <a
                  href={OWNER_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-medium text-blue-700 hover:underline"
                  title="Facebook Profile"
                >
                  <Facebook size={10} /> Facebook
                </a>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-2xs ${
                      m.role === 'user'
                        ? 'bg-burgundy text-cream rounded-br-xs'
                        : 'bg-white/90 text-ink/90 border border-divider/70 rounded-bl-xs'
                    }`}
                  >
                    {renderFormattedText(m.content)}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-xs border border-divider/70 bg-white/90 px-3.5 py-2.5 text-xs text-muted shadow-2xs">
                    <Loader2 size={13} className="animate-spin text-burgundy" />
                    <span>Thinking & checking menu...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips (when only 1 or 2 messages exist) */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-1.5 border-t border-divider/40 bg-surface/30 px-3 py-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-full border border-divider/70 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink/80 transition-colors hover:border-burgundy hover:text-burgundy"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-divider/70 bg-surface/80 p-3"
            >
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about cakes, flavors, prices..."
                  className="w-full rounded-xl border border-divider bg-white px-3.5 py-2.5 pr-10 text-xs text-ink placeholder:text-muted/70 focus:border-burgundy focus:outline-none focus:ring-1 focus:ring-burgundy"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-burgundy text-cream transition-opacity disabled:opacity-30 hover:bg-burgundy/90"
                >
                  <Send size={13} />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted">
                Powered by OpenRouter Free AI • Call or WhatsApp: <a href={`tel:${OWNER_INFO.phoneE164}`} className="underline">{OWNER_INFO.phone}</a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
