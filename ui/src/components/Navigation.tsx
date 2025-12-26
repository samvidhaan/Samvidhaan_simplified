import { Home, Book, History, Scale, Shield, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: Book, label: 'About' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/need', icon: BookOpen, label: 'Need' },
    { path: '/rights', icon: Shield, label: 'Rights & Duties' },
  ];

  const linkClass = (isActive: boolean) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-orange-600 text-white shadow-lg transform scale-105'
        : 'text-gray-700 hover:bg-orange-100 hover:scale-105'
    }`;

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-white to-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 cursor-pointer">
            <Scale className="w-10 h-10 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Samvidhaan</h1>
              <p className="text-xs text-gray-600">Simplified</p>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => linkClass(isActive)}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Logo Button */}
          <div className="md:hidden">
            <NavLink to="/" className="text-gray-700 hover:text-orange-600">
              <Home className="w-6 h-6" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden bg-white border-t">
        <div className="flex justify-around py-2">
          {navItems.map(({ path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `p-2 rounded-lg ${
                  isActive ? 'text-orange-600' : 'text-gray-600'
                }`
              }
            >
              <Icon className="w-5 h-5" />
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
