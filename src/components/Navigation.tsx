import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Compass, BookOpen, Home } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/quran', icon: Book, label: 'Quran' },
    { to: '/prayer-guide', icon: BookOpen, label: 'Prayer Guide' },
    { to: '/tools', icon: Compass, label: 'Tools' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gold-200/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-200 flex items-center justify-center text-white shadow-glow">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gold-600 to-gold-400">
              Islamic Guide
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? 'bg-gold-50 text-gold-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gold-200/50 md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? 'text-gold-600'
                      : 'text-gray-600'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;