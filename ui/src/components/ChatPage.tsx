import { useState, useRef, useEffect } from 'react';
import { Send, User, Scale, Landmark, Gavel } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendQueryToRAG } from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RECOMMENDATIONS = [
  { label: "Explain Article 360", query: "Explain Article 360 of the Indian Constitution" },
  { label: "Preamble of Indian Constitution", query: "Explain the Preamble of the Indian Constitution" },
  { label: "Directive Principles of State Policy", query: "What are the Directive Principles of State Policy?" },
  { label: "Fundamental Rights", query: "Explain Fundamental Rights in the Indian Constitution" }
];

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

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const data = await sendQueryToRAG(text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "⚠️ Sorry, I couldn’t reach the Constitution server. Please try again.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const text = inputMessage;
    setInputMessage("");
    await sendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRecommendationClick = (query: string) => {
    sendMessage(query);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-950 px-8 py-4 flex items-center justify-between shadow-lg border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
            <Scale className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h2 className="text-white font-bold text-2xl">Samvidhaan AI</h2>
            <p className="text-amber-200/70 text-[10px] font-black uppercase tracking-widest">
              Supreme Law Assistant
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg text-xs border border-white/10">
          <Landmark className="w-4 h-4 text-amber-500" />
          Official RAG Dataset
        </div>
      </header>

      {/* CHAT AREA */}
      <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 space-y-8">

        {/* 🔹 RECOMMENDATIONS (Shown only at start) */}
        {messages.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {RECOMMENDATIONS.map((rec) => (
              <button
                key={rec.label}
                onClick={() => handleRecommendationClick(rec.query)}
                className="bg-white border border-indigo-100 hover:border-indigo-400 shadow-sm rounded-xl px-4 py-3 text-left transition hover:shadow-md"
              >
                <p className="font-semibold text-indigo-700 text-sm">
                  {rec.label}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Tap to explore
                </p>
              </button>
            ))}
          </div>
        )}

        {/* MESSAGES */}
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className="flex gap-4 max-w-4xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                message.isUser ? 'bg-indigo-600' : 'bg-white border'
              }`}>
                {message.isUser ? <User className="text-white w-5 h-5" /> : <Scale className="text-indigo-600 w-5 h-5" />}
              </div>

              <div className={`rounded-2xl px-6 py-3 shadow-sm border ${
                message.isUser ? 'bg-indigo-600 text-white' : 'bg-white text-slate-800'
              }`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.text}
                </ReactMarkdown>
                <p className="text-[9px] mt-2 opacity-60 uppercase tracking-widest">
                  {message.isUser ? 'Citizen' : 'Constitutional Counsel'}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 opacity-70">
            <Gavel className="animate-bounce text-slate-400" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* INPUT */}
      <footer className="bg-white border-t p-3">
        <div className="flex items-center gap-3 max-w-screen-xl mx-auto">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Articles, Rights, Duties..."
            className="flex-1 bg-slate-50 border rounded-xl px-4 py-2 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-indigo-700 text-white p-2 rounded-xl disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
