import { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Scale, Landmark, Gavel } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendQueryToRAG } from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I am your Constitution Assistant. Ask me anything about the Indian Constitution, fundamental rights, duties, or any related topic!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const data = await sendQueryToRAG(inputMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "⚠️ Sorry, I couldn’t reach the Constitution server. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* --- CONSTITUTION THEMED HEADER --- */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-950 px-8 py-4 flex items-center justify-between shadow-lg z-10 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
            <Scale className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h2 className="text-white font-bold text-2xl tracking-tight">Samvidhaan AI</h2>
            <p className="text-amber-200/70 text-[10px] font-black uppercase tracking-[0.2em]">Supreme Law Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg text-sm border border-white/10">
          <Landmark className="w-4 h-4 text-amber-500" />
          <span className="font-semibold text-xs">Official RAG Dataset</span>
        </div>
      </header>

      {/* --- MESSAGE AREA --- */}
      <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 space-y-8">
        {messages.map((message) => (
          <div key={message.id} className={`flex w-full ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`flex items-start w-full gap-4 ${message.isUser ? 'flex-row-reverse pl-12' : 'pr-12'}`}>
              {/* Profile Icons */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 transition-all ${
                message.isUser ? 'bg-indigo-600' : 'bg-white border border-indigo-100 shadow-indigo-100/50'
              }`}>
                {message.isUser ? (
                  <User className="text-white w-5 h-5" />
                ) : (
                  <Scale className="text-indigo-600 w-5 h-5" />
                )}
              </div>

              <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'} flex-1`}>
                <div className={`rounded-2xl px-6 py-3 shadow-sm border w-full lg:w-auto lg:max-w-none ${
                  message.isUser 
                    ? 'bg-indigo-600 text-white border-indigo-700' 
                    : 'bg-white text-slate-800 border-slate-200'
                }`}>
                  <div className={`prose prose-sm max-w-none ${message.isUser ? 'text-white prose-invert' : 'text-slate-800'}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                  </div>
                </div>
                <p className="text-[9px] mt-1 font-black text-slate-400 uppercase tracking-widest">
                  {message.isUser ? 'Citizen' : 'Constitutional Counsel'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-3 opacity-70">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Gavel className="w-5 h-5 text-slate-400 animate-bounce" />
             </div>
             <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 flex space-x-1">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse [animation-delay:0.4s]" />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* --- COMPACT INPUT AREA --- */}
      <footer className="bg-white border-t border-slate-200 p-3 md:p-4 shadow-inner">
        <div className="flex items-center gap-3 max-w-screen-2xl mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Inquire about Articles, Rights, or Duties..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl pl-5 pr-12 py-2.5 transition-all outline-none text-slate-800 text-sm font-medium"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                inputMessage.trim() 
                  ? 'bg-indigo-700 text-white shadow-md hover:bg-indigo-800 active:scale-90' 
                  : 'bg-slate-100 text-slate-300'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        
      </footer>
    </div>
  );
}