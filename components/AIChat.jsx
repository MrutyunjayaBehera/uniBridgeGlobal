import React, { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../services/geminiService';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm UniBot. I can help you find universities, write essays, or understand visa requirements. What's on your mind?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateAIResponse(input);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-full">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm">UniBot Assistant</h3>
            <p className="text-xs text-blue-100">Powered by Gemini 2.5</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}
            >
             <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none text-slate-500 text-sm flex gap-1">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about universities..."
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
