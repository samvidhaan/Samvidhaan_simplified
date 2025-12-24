import { Home, Book, History, Scale, Shield, BookOpen } from 'lucide-react';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { page: 'home' as Page, icon: Home, label: 'Home' },
    { page: 'about' as Page, icon: Book, label: 'About' },
    { page: 'history' as Page, icon: History, label: 'History' },
    { page: 'need' as Page, icon: BookOpen, label: 'Need' },
    { page: 'rights' as Page, icon: Shield, label: 'Rights & Duties' },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-white to-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <Scale className="w-10 h-10 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Samvidhaan</h1>
              <p className="text-xs text-gray-600">Simplified</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map(({ page, icon: Icon, label }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-orange-100 hover:scale-105'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-700 hover:text-orange-600"
            >
              <Home className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-white border-t">
        <div className="flex justify-around py-2">
          {navItems.map(({ page, icon: Icon }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`p-2 rounded-lg ${
                currentPage === page ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
