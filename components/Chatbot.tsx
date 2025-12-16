import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const INITIAL_MESSAGE: ChatMessage = { 
    role: 'model', 
    text: "Hi! I'm Raham Fayaz's AI assistant. How can I help you with your Metro Detroit real estate needs today?" 
  };

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    const nextState = !isOpen;
    if (nextState) {
      // Reset to initial message when opening to ensure the greeting is always first
      setMessages([INITIAL_MESSAGE]);
      setInput('');
      setIsLoading(false);
    }
    setIsOpen(nextState);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Prepare history for API
    // IMPORTANT: Filter out the initial simulated welcome message if it exists at index 0
    // This ensures the API history starts cleanly with the user's first real input or valid history.
    const apiHistory = messages
      .filter((msg, index) => !(index === 0 && msg.role === 'model'))
      .map(m => ({
        role: m.role,
        text: m.text
      }));

    const responseText = await sendMessageToGemini(userMessage, apiHistory);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-fade-in-up h-[450px]">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 pt-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && index === 0 && (
                   <div className="mr-2 self-end mb-1">
                      <div className="bg-brand-dark p-1.5 rounded-full">
                        <Bot size={14} className="text-brand-gold" />
                      </div>
                   </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brand-gold text-white rounded-br-none shadow-md'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="mr-2 self-end mb-1">
                      <div className="bg-brand-dark p-1.5 rounded-full">
                        <Bot size={14} className="text-brand-gold" />
                      </div>
                   </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-3 rounded-bl-none shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about buying or selling..."
                className="flex-1 bg-white text-gray-900 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-inner placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-brand-gold text-white p-2 rounded-full hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Button & Label Container */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <div className="bg-white text-brand-dark px-4 py-2 rounded-full shadow-lg font-bold text-sm border border-gray-100 animate-fade-in-up">
            Let's Talk
          </div>
        )}
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center"
          aria-label="Chat with AI"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;