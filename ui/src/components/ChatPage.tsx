import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
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

  // const handleSendMessage = async () => {
  //   if (!inputMessage.trim()) return;

  //   const userMessage: ChatMessage = {
  //     id: Date.now().toString(),
  //     text: inputMessage,
  //     isUser: true,
  //     timestamp: new Date(),
  //   };

  //   setMessages((prev) => [...prev, userMessage]);
  //   setInputMessage('');
  //   setIsTyping(true);

  //   // TODO: Replace with actual API call to your RAG-based chatbot
  //   // Endpoint: POST /api/chat/message
  //   // Body: { message: inputMessage, sessionId: string }
  //   // Response: { reply: string }

  //   // Simulating API call with setTimeout
  //   // setTimeout(() => {
  //   //   const botMessage: ChatMessage = {
  //   //     id: (Date.now() + 1).toString(),
  //   //     text: 'This is a placeholder response. Your RAG-based AI chatbot will be integrated here. It will provide intelligent answers based on the Constitution documents.',
  //   //     isUser: false,
  //   //     timestamp: new Date(),
  //   //   };
  //   //   setMessages((prev) => [...prev, botMessage]);
  //   //   setIsTyping(false);
  //   // }, 1500);
  // };
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

  const suggestedQuestions = [
    'What are Fundamental Rights?',
    'Explain the Preamble',
    'What is Article 370?',
    'Tell me about Directive Principles',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-pulse">
                <Bot className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Constitution AI Assistant</h2>
                <p className="text-blue-100 text-sm flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Powered by RAG Technology</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[80%] ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser
                        ? 'bg-gradient-to-br from-orange-500 to-pink-500'
                        : 'bg-gradient-to-br from-blue-500 to-purple-500'
                    }`}
                  >
                    {message.isUser ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-5 py-3 ${
                      message.isUser
                        ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none text-gray-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.text}
                </ReactMarkdown>
              </div>

                    <p
                      className={`text-xs mt-1 ${
                        message.isUser ? 'text-orange-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-slide-up">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-5 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 mb-3 font-medium">Suggested questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-left text-sm bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl px-4 py-3 transition-all duration-300 transform hover:scale-105 border border-blue-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t bg-gray-50 px-6 py-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about the Constitution..."
                className="flex-1 px-5 py-3 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all duration-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  inputMessage.trim()
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
