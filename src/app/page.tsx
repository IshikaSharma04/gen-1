"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User as UserIcon, Bot, RefreshCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { personas, PersonaId, Persona } from "@/lib/personas";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

export default function Home() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>("anshuman");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePersona = personas[activePersonaId];

  // Reset conversation when persona changes
  useEffect(() => {
    setMessages([
      {
        id: "greeting",
        role: "model",
        content: activePersona.greeting,
      },
    ]);
    setError(null);
  }, [activePersonaId, activePersona.greeting]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          personaId: activePersonaId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: data.text,
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (err: any) {
      setError(err.message || "Failed to fetch response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="app-container">
      {/* Sidebar - Persona Switcher */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Scaler AI Mentors</h1>
          <p>Learn from the founders & experts</p>
        </div>

        <div className="persona-list">
          {(Object.values(personas) as Persona[]).map((persona) => (
            <button
              key={persona.id}
              className={`persona-btn ${activePersonaId === persona.id ? "active" : ""}`}
              onClick={() => setActivePersonaId(persona.id)}
            >
              <div className="avatar">{persona.avatar}</div>
              <div className="persona-info">
                <h3>{persona.name}</h3>
                <p>{persona.role}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-area">
        <header className="chat-header">
          <div className="avatar">{activePersona.avatar}</div>
          <div className="chat-header-info">
            <h2>{activePersona.name}</h2>
            <p>{activePersona.description}</p>
          </div>
          <button 
            className="suggestion-chip" 
            style={{ marginLeft: 'auto', padding: '6px 12px' }}
            onClick={() => {
              setMessages([{ id: "greeting", role: "model", content: activePersona.greeting }]);
              setError(null);
            }}
            title="Reset Conversation"
          >
            <RefreshCcw size={16} />
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}

        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-content">
                <ReactMarkdown>{message.content}</ReactMarkdown>
                
                {/* Show suggestion chips only on the very first greeting message */}
                {message.id === "greeting" && (
                  <div className="suggestions">
                    {activePersona.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        className="suggestion-chip"
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={isLoading}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <form
            className="input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Message ${activePersona.name}...`}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!inputValue.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
