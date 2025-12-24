import { Brain, MessageSquare, Book, Sparkles, Award, Users } from 'lucide-react';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
              <Book className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 animate-slide-up">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">Samvidhaan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up-delay">
            Learn about the Indian Constitution in the simplest way possible
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-orange-600">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">Interactive Learning Experience</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <button
            onClick={() => onNavigate('quiz')}
            className="group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-orange-300 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <Brain className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-300" />
              <h2 className="text-3xl font-bold mb-3">Test Your Knowledge</h2>
              <p className="text-orange-100 mb-6">Challenge yourself with interactive quizzes about the Constitution</p>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Earn badges and track progress</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className="group relative bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-green-300 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <MessageSquare className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-300" />
              <h2 className="text-3xl font-bold mb-3">Ask AI Assistant</h2>
              <p className="text-green-100 mb-6">Get instant answers to your questions about the Constitution</p>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Powered by RAG-based AI</span>
              </div>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Explore the Constitution
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">About Constitution</h3>
              <p className="text-gray-600 text-sm">Learn the basics and structure</p>
            </button>

            <button
              onClick={() => onNavigate('history')}
              className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">History</h3>
              <p className="text-gray-600 text-sm">Journey of India's Constitution</p>
            </button>

            <button
              onClick={() => onNavigate('rights')}
              className="group bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Rights & Duties</h3>
              <p className="text-gray-600 text-sm">Know your rights and duties</p>
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600 animate-fade-in">
          {/* <p className="text-sm">Made with ❤️ for every Indian citizen</p> */}
        </div>
      </div>
    </div>
  );
}
