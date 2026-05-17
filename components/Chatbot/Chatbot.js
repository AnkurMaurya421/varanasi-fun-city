"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";

// ── Limits ────────────────────────────────────────────────────────
const SESSION_MESSAGE_LIMIT = 20; // max user messages per browser session
const SESSION_KEY = "vfc_chat_count";

function getSessionCount() {
  try {
    return parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

function incrementSessionCount() {
  try {
    const next = getSessionCount() + 1;
    sessionStorage.setItem(SESSION_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

// ── Icons ─────────────────────────────────────────────────────────
const SUGGESTED_QUESTIONS = [
  "What are the timings?",
  "What is the ticket price?",
  "Is night shift open?",
  "Where are you located?",
  "What rides are available?",
];

function BotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M12 11V7" />
      <circle cx="12" cy="5" r="2" />
      <path d="M8 15h.01M16 15h.01" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22 11 13 2 9l20-7z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className={styles.typingDots}>
      <span /><span /><span />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm the Varanasi Fun City assistant. Ask me anything about timings, prices, rides, or location!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check session limit on mount
  useEffect(() => {
    if (getSessionCount() >= SESSION_MESSAGE_LIMIT) {
      setLimitReached(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function sendMessage(text) {
    const userMessage = text || input.trim();
    if (!userMessage || loading || limitReached) return;

    // Check session limit
    const count = incrementSessionCount();
    if (count > SESSION_MESSAGE_LIMIT) {
      setLimitReached(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `You've reached the limit of ${SESSION_MESSAGE_LIMIT} messages for this session. For more help, please call us at 099183 75703. 📞`,
        },
      ]);
      return;
    }

    setInput("");
    setShowSuggestions(false);

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      // Handle rate limit from server
      if (response.status === 429) {
        setLoading(false);
        setLimitReached(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Too many requests. Please try again after an hour or call us at 099183 75703. 📞",
          },
        ]);
        return;
      }

      if (!response.ok) throw new Error("API error");

      // Stream response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMessage += decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };
          return updated;
        });
      }
    } catch (error) {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please call us at 099183 75703. 📞",
        },
      ]);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const remainingMessages = Math.max(
    0,
    SESSION_MESSAGE_LIMIT - getSessionCount()
  );

  return (
    <>
      {/* Chat window */}
      <div
        className={`${styles.window} ${open ? styles.windowOpen : ""}`}
        role="dialog"
        aria-label="Chat with Varanasi Fun City assistant"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarSmall}><BotIcon /></div>
            <div>
              <div className={styles.headerName}>VFC Assistant</div>
              <div className={styles.headerStatus}>
                <span className={styles.statusDot} />
                Online
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.message} ${msg.role === "user" ? styles.userMsg : styles.botMsg}`}>
              {msg.role === "assistant" && (
                <div className={styles.botAvatar}><BotIcon /></div>
              )}
              <div className={styles.bubble}>
                {msg.content || (loading && i === messages.length - 1 ? <TypingDots /> : "")}
              </div>
            </div>
          ))}

          {loading && (
            <div className={`${styles.message} ${styles.botMsg}`}>
              <div className={styles.botAvatar}><BotIcon /></div>
              <div className={styles.bubble}><TypingDots /></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested questions */}
        {showSuggestions && !limitReached && (
          <div className={styles.suggestions}>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button key={q} className={styles.suggestion} onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        <div className={styles.inputRow}>
          {limitReached ? (
            <div className={styles.limitMsg}>
              Session limit reached. Call us: <a href="tel:+919918375703">099183 75703</a>
            </div>
          ) : (
            <>
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Ask anything about the park..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                maxLength={300}
                aria-label="Type your message"
              />
              <button
                className={styles.sendBtn}
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </>
          )}
        </div>

        {/* Message counter */}
        {!limitReached && remainingMessages <= 10 && (
          <div className={styles.counter}>
            {remainingMessages} messages remaining this session
          </div>
        )}
      </div>

      {/* Floating bubble */}
      <button
        className={`${styles.bubble} ${open ? styles.bubbleActive : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <CloseIcon /> : <BotIcon />}
        {!open && <span className={styles.bubblePulse} aria-hidden="true" />}
      </button>
    </>
  );
}
