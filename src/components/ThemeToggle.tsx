import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="
        relative p-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-gray-200 dark:border-dark-700
        text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all duration-300
        flex items-center justify-center hover:scale-105 animate-theme-switch
        group focus:outline-none focus:ring-4 focus:ring-blue-500/20
      "
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`
            w-5 h-5 absolute top-0 left-0 transition-all duration-300
            ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
            text-yellow-500 group-hover:text-yellow-600
          `}
        />
        <Moon
          className={`
            w-5 h-5 absolute top-0 left-0 transition-all duration-300
            ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
            text-blue-400 group-hover:text-blue-500
          `}
        />
      </div>
      
      <span className="sr-only">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}
