import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, Trash2, Sparkles, Bike, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';

interface BogoBotChatProps {
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: `¡Ey parce! 🚴‍♂️🔥 Bienvenido a **BOGOFIJA**, la casa oficial del piñón fijo en Bogotá.

Soy **BogoBot AI**, tu copiloto digital, mecánico de pista y asesor técnico. Estoy listo para ayudarte con:

1. **Relaciones & Skid Patches**: ¿Vas a subir Patios, Romeral o el Alto de Letras? Te digo el ratio exacto y cuántos derrapes le quedan a tu llanta.
2. **Tallaje de Marcos**: Calculamos tu talla exacta por medida de entrepierna para nuestros marcos de Aluminio 6061.
3. **Catálogo & Evento**: Detalles de nuestros marcos, jerseys aerodinámicos y la info del **#RetoBogofija 2027 Vol. 3**.

¿Qué relación estás rodando hoy o qué puerto quieres coronar? ¡Échale candela! ⚙️🇨🇴`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const QUICK_PROMPTS = [
  '¿Puedo subir Romeral con transmisión 48/16?',
  'Mido 79 cm de entrepierna, ¿qué talla Bogofija necesito?',
  '¿Por qué 47/17 es la relación dorada en Bogotá?',
  '¿Qué es el #RetoBogofija 2027 Vol. 3 y cómo me inscribo?',
  'Recomiéndame una transmisión cómoda para andar por la 26 y subir Patios.',
];

export const BogoBotChat: React.FC<BogoBotChatProps> = ({ externalPrompt, onClearExternalPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle external prompt passed from other tabs (like calculator or route simulator)
  useEffect(() => {
    if (externalPrompt) {
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = textToSend || input;
    if (!promptText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: promptText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error(data.error || 'Error en respuesta de BogoBot AI');
      }
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '¡Ey parce! Tuve un despinche técnico con la señal. Verifica la conexión e intenta preguntarme de nuevo. 🚴‍♂️🔧',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      
      {/* Header Banner */}
      <div className="bg-zinc-900 p-4 sm:p-6 rounded-3xl border border-zinc-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-yellow-500/20 border-2 border-zinc-900">
              <Bot className="w-7 h-7 stroke-[2.5]" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-zinc-900"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white uppercase tracking-tight italic">
                BogoBot AI <span className="text-yellow-400 font-normal text-sm">v3.6</span>
              </h2>
              <span className="bg-emerald-950/80 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                MECÁNICO EN VIVO
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Asesoría de piñón fijo, altimetría de Bogotá y catálogo BOGOFIJA
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="p-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-all cursor-pointer flex items-center gap-2 text-xs font-bold"
          title="Reiniciar chat"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline-block">Borrar Chat</span>
        </button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          Preguntas Rápidas a BogoBot:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="px-3.5 py-2 bg-zinc-900 hover:bg-yellow-400 hover:text-zinc-950 text-zinc-300 text-xs font-semibold rounded-xl border border-zinc-800 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800 p-4 sm:p-6 h-[480px] sm:h-[540px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-yellow-400 text-zinc-950 flex items-center justify-center shrink-0 font-bold shadow-md">
                  <Bot className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  isAssistant
                    ? 'bg-zinc-950 text-zinc-200 border border-zinc-800/80 shadow-md'
                    : 'bg-yellow-400 text-zinc-950 font-medium shadow-lg shadow-yellow-500/10'
                }`}
              >
                {/* Render content with basic linebreaks / bold highlights */}
                <div className="whitespace-pre-line font-sans">
                  {msg.content.split('\n').map((line, lIdx) => {
                    // Quick check for bold markdown **
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={lIdx} className="mb-1 last:mb-0">
                        {parts.map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={pIdx} className={isAssistant ? 'text-yellow-400 font-black' : 'text-zinc-950 font-black'}>
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>

                <span className={`text-[10px] block text-right font-mono opacity-60 mt-1 ${isAssistant ? 'text-zinc-500' : 'text-zinc-800'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {!isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 text-white flex items-center justify-center shrink-0 font-bold border border-zinc-700">
                  <Bike className="w-4 h-4 text-yellow-400" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-yellow-400 text-zinc-950 flex items-center justify-center shrink-0 font-bold animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-2xl text-xs text-zinc-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-yellow-400" />
              <span>BogoBot calculando skid patches y desarrollo...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 bg-zinc-900 p-2 sm:p-2.5 rounded-2xl border border-zinc-800 shadow-xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu duda a BogoBot AI (ej: '¿Relación para subir Letras?')..."
          disabled={isLoading}
          className="flex-1 bg-zinc-950 text-white placeholder-zinc-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800/80 focus:border-yellow-400 outline-none transition-all"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black p-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-yellow-500/20"
        >
          <Send className="w-5 h-5 stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
};
