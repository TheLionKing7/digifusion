'use client';

/**
 * DigiFusion — Assistant Chat Widget
 * =====================================
 * Floating chat bubble that connects to the PathGuru backend's
 * DigiFusion Assistant agent for lead qualification and booking.
 *
 * Reads NEXT_PUBLIC_PATHGURU_API from environment.
 * Add to app/layout.tsx: <AssistantChat />
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';

// ── Types ──────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant';
  content: string;
  bookingUrl?: string | null;
}

interface LeadState {
  [key: string]: string | boolean | number | undefined;
  leadId?: string;
  bookingOffered?: boolean;
}

interface ChatResponse {
  response: string;
  leadState: LeadState;
  score: number;
  action: 'continue' | 'offer_booking';
  bookingUrl?: string | null;
}

// ── Config ─────────────────────────────────────────────────────────────────

const API_BASE  = (process.env.NEXT_PUBLIC_PATHGURU_API || '').replace(/\/$/, '');
const CHAT_URL  = `${API_BASE}/api/agents/assistant/chat`;
const LEAD_URL  = `${API_BASE}/api/agents/assistant/lead`;

const WELCOME = "Hi there 👋 I'm the DigiFusion assistant. What brings you here today?";

// ── Icons ──────────────────────────────────────────────────────────────────

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
  </svg>
);

// ── Typing Indicator ───────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-surface-light rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-muted-dim animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </div>
  );
}

// ── Message Bubble ─────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <div className={cn('flex flex-col gap-2', isUser ? 'items-end' : 'items-start')}>
      <div
        className={cn(
          'max-w-[84%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words',
          isUser
            ? 'bg-accent text-background rounded-2xl rounded-br-sm font-medium'
            : 'bg-surface-light text-foreground rounded-2xl rounded-bl-sm border border-border'
        )}
      >
        {msg.content}
      </div>
      {msg.bookingUrl && (
        <a
          href={msg.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold',
            'bg-warning text-background hover:opacity-90 transition-all',
            'hover:-translate-y-0.5 active:translate-y-0 shadow-lg'
          )}
        >
          <CalendarIcon />
          Book a Strategy Session
        </a>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function AssistantChat() {
  const [isOpen,      setIsOpen]      = useState(false);
  const [messages,    setMessages]    = useState<Message[]>([
    { role: 'assistant', content: WELCOME },
  ]);
  const [input,       setInput]       = useState('');
  const [isLoading,   setIsLoading]   = useState(false);
  const [leadState,   setLeadState]   = useState<LeadState>({});
  const [sessionId] = useState(
    () => `df-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  );
  // Push opt-in: null = not yet checked, true = subscribed/dismissed, false = not subscribed
  const [pushOptedIn,      setPushOptedIn]      = useState<boolean | null>(null);
  const [pushPromptShown,  setPushPromptShown]  = useState(false);
  const pushPromptShownRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLTextAreaElement>(null);
  const leadSavedRef   = useRef(false);

  // ── OneSignal push subscription check ────────────────────────────────────

  useEffect(() => {
    function checkPushState() {
      const os = (window as any).OneSignal;
      if (!os?.User?.PushSubscription) return;
      const optedIn = os.User.PushSubscription.optedIn as boolean;
      setPushOptedIn(!!optedIn);
    }
    if ((window as any)._osReady) {
      checkPushState();
    } else {
      window.addEventListener('onesignal:ready', checkPushState, { once: true });
    }
    return () => window.removeEventListener('onesignal:ready', checkPushState);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // ── Lead save ────────────────────────────────────────────────────────────

  const saveLead = useCallback((state: LeadState, history: Message[]) => {
    if (leadSavedRef.current || !LEAD_URL) return;
    fetch(LEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadState: state,
        conversation: history,
        sessionId,
        sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      }),
    })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.id) {
          setLeadState(prev => ({ ...prev, leadId: data.id }));
        }
        leadSavedRef.current = true;

        // After lead is saved, offer push opt-in if not already subscribed
        if (!pushPromptShownRef.current && pushOptedIn === false) {
          pushPromptShownRef.current = true;
          setPushPromptShown(true);
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                role: 'assistant',
                content: '🔔 One more thing — would you like browser notifications so we can keep you updated on your enquiry and new DigiFusion insights? You can unsubscribe any time.',
                bookingUrl: null,
              },
            ]);
          }, 1200);
        }
      })
      .catch(() => { /* silent */ });
  }, [sessionId, pushOptedIn]);

  // ── Send message ─────────────────────────────────────────────────────────

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput('');

    const userMsg: Message = { role: 'user', content: text };
    const updatedMessages  = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const history = updatedMessages.slice(-20).map(m => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, leadState, sessionId }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ChatResponse = await res.json();

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.response,
        bookingUrl: data.action === 'offer_booking' ? data.bookingUrl : null,
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);

      if (data.leadState) {
        setLeadState(data.leadState);
        // Auto-save when warm lead or email captured
        if ((data.score ?? 0) >= 2 || data.leadState.email) {
          saveLead(data.leadState, finalMessages);
        }
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having a brief connection issue. Could you try sending that again?",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [input, isLoading, messages, leadState, sessionId, saveLead]);

  // ── Keyboard handler ──────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Auto-resize textarea ──────────────────────────────────────────────────

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-label="DigiFusion Assistant"
        aria-modal="true"
        className={cn(
          'fixed bottom-24 right-6 z-50',
          'w-[380px] max-w-[calc(100vw-2rem)]',
          'h-[520px] max-h-[calc(100dvh-6rem)]',
          'flex flex-col',
          'bg-surface border border-border-light rounded-2xl',
          'shadow-2xl overflow-hidden',
          'transition-all duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]',
          isOpen
            ? 'scale-100 opacity-100 pointer-events-auto translate-y-0'
            : 'scale-90 opacity-0 pointer-events-none translate-y-4',
          // Mobile: full screen
          'sm:bottom-24 sm:right-6 sm:w-[380px] sm:rounded-2xl',
          'max-sm:bottom-0 max-sm:right-0 max-sm:w-screen max-sm:h-dvh max-sm:max-h-dvh max-sm:rounded-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-surface-light border-b border-border flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-none">DigiFusion Assistant</p>
            <p className="text-xs text-accent mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
              Online now
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-lighter transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {isLoading && <TypingDots />}
          <div ref={messagesEndRef} />
        </div>

        {/* Push opt-in prompt — shown after lead is saved and prompt message appears */}
        {pushPromptShown && pushOptedIn === false && (
          <div className="flex gap-2 px-3 pb-2 flex-shrink-0">
            <button
              onClick={async () => {
                const os = (window as any).OneSignal;
                if (!os?.User?.PushSubscription) return;
                try {
                  await os.User.PushSubscription.optIn();
                  setPushOptedIn(true);
                  setPushPromptShown(false);
                  setMessages(prev => [
                    ...prev,
                    { role: 'assistant', content: "You're subscribed! We'll keep you in the loop. 🎉", bookingUrl: null },
                  ]);
                } catch {
                  /* user dismissed the browser prompt — leave buttons visible */
                }
              }}
              className="flex-1 py-2 text-sm font-semibold rounded-xl bg-accent text-background hover:bg-accent/90 transition-colors"
            >
              Enable notifications
            </button>
            <button
              onClick={() => {
                setPushPromptShown(false);
                setMessages(prev => [
                  ...prev,
                  { role: 'assistant', content: "No problem — you can always reach us at enquiries@digitafusion.com.", bookingUrl: null },
                ]);
              }}
              className="px-4 py-2 text-sm text-muted rounded-xl border border-border hover:text-foreground transition-colors"
            >
              No thanks
            </button>
          </div>
        )}

        {/* Input */}
        <div className="flex items-end gap-2 p-3 border-t border-border flex-shrink-0 bg-surface">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            rows={1}
            disabled={isLoading}
            className={cn(
              'flex-1 resize-none bg-surface-light border border-border-light rounded-xl',
              'px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-dim',
              'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20',
              'transition-colors min-h-[42px] max-h-[120px]',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className={cn(
              'w-[42px] h-[42px] rounded-xl flex-shrink-0',
              'flex items-center justify-center',
              'bg-accent text-background',
              'hover:opacity-90 active:scale-95',
              'transition-all duration-150',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100'
            )}
          >
            <SendIcon />
          </button>
        </div>

        {/* Branding */}
        <p className="text-center text-[10px] text-muted-dim py-1.5 flex-shrink-0">
          Powered by{' '}
          <a
            href="https://digitafusion.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted transition-colors"
          >
            DigiFusion
          </a>
        </p>
      </div>

      {/* ── Floating Trigger Button ─────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
        aria-expanded={isOpen}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'w-14 h-14 rounded-full',
          'bg-accent text-background',
          'flex items-center justify-center',
          'shadow-lg shadow-accent/25',
          'hover:scale-110 active:scale-95',
          'transition-all duration-200',
          // Subtle pulse ring when closed to draw attention
          !isOpen && 'after:absolute after:inset-0 after:rounded-full after:border after:border-accent/40 after:animate-ping after:pointer-events-none'
        )}
      >
        <span
          className={cn(
            'transition-transform duration-200',
            isOpen ? 'rotate-0 scale-100' : 'rotate-0 scale-100'
          )}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </span>
      </button>
    </>
  );
}
