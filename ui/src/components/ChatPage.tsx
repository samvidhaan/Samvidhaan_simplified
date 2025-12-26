import { useState, useRef, useEffect } from 'react';
import { Send, User, Scale, Gavel } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendQueryToRAG } from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RECOMMENDATIONS = [
  { label: "Explain Article 360", query: "Explain Article 360 of the Indian Constitution" },
  { label: "Preamble of the Indian Constitution", query: "Explain the Preamble of the Indian Constitution" },
  { label: "Sources of Indian Constitution", query: "Sources of Indian Constitution" },
  { label: "Fundamental Rights in the Indian Constitution", query: "Fundamental Rights in the Indian Constitution" },
  { label: "Constituent Assembly", query: "Constituent Assembly " }

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

  /* ✅ FORCE SCROLL TO TOP ON PAGE REFRESH */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text, isUser: true, timestamp: new Date() }
    ]);
    setIsTyping(true);

    try {
      const data = await sendQueryToRAG(text);
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), text: data.answer, isUser: false, timestamp: new Date() }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), text: "⚠️ Server error. Try again.", isUser: false, timestamp: new Date() }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">

      {/* CHAT CONTENT */}
      <main className="bg-[#f8fafc] px-6 py-4 space-y-6 flex-1 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-4xl ${msg.isUser ? 'flex-row-reverse' : ''}`}>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  msg.isUser ? 'bg-indigo-600' : 'bg-white border'
                }`}
              >
                {msg.isUser ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Scale className="w-4 h-4 text-indigo-600" />
                )}
              </div>

              <div
                className={`rounded-xl px-5 py-3 border shadow-sm ${
                  msg.isUser ? 'bg-indigo-600 text-white' : 'bg-white'
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Gavel className="w-4 h-4 animate-bounce" />
            Counsel is deliberating…
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* STICKY FOOTER */}
      <footer className="sticky bottom-0 z-20 bg-white border-t px-6 py-3 space-y-3">

        {/* RECOMMENDATIONS */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {RECOMMENDATIONS.map(rec => (
              <button
                key={rec.label}
                onClick={() => sendMessage(rec.query)}
                className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 border hover:bg-indigo-100"
              >
                {rec.label}
              </button>
            ))}
          </div>
        )}

        {/* INPUT */}
        <div className="mx-auto flex items-center gap-3 max-w-6xl">
          <input
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && inputMessage.trim()) {
                sendMessage(inputMessage);
                setInputMessage('');
              }
            }}
            placeholder="Ask about Articles, Rights, Duties…"
            className="flex-1 border rounded-2xl px-5 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                       shadow-inner"
          />

          <button
            onClick={() => {
              if (!inputMessage.trim()) return;
              sendMessage(inputMessage);
              setInputMessage('');
            }}
            className="bg-indigo-700 text-white px-5 py-3 rounded-2xl
                       hover:bg-indigo-800 active:scale-95 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
