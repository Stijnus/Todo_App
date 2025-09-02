import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function AdvancedThemeToggle() {
  const { theme, isDarkMode, setTheme, toggleTheme } = useTheme();

  return (
    <div className="relative group">
      <button
        onClick={toggleTheme}
        className="
          relative p-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-gray-200 dark:border-dark-700
          text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all duration-300
          flex items-center justify-center hover:scale-105
          group-focus-within:ring-4 group-focus-within:ring-blue-500/20
          focus:outline-none
        "
        aria-label={`Current theme: ${theme}. Click to cycle through themes`}
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <div className="relative w-5 h-5">
          <Sun
            className={`
              w-5 h-5 absolute top-0 left-0 transition-all duration-300
              ${!isDarkMode ? 'opacity-100 rotate-0 scale-100 text-yellow-500' : 'opacity-0 rotate-90 scale-0'}
            `}
          />
          <Moon
            className={`
              w-5 h-5 absolute top-0 left-0 transition-all duration-300
              ${isDarkMode ? 'opacity-100 rotate-0 scale-100 text-blue-400' : 'opacity-0 -rotate-90 scale-0'}
            `}
          />
          <Monitor
            className={`
              w-5 h-5 absolute top-0 left-0 transition-all duration-300
              ${theme === 'system' ? 'opacity-100 scale-100 text-gray-500' : 'opacity-0 scale-0'}
            `}
          />
        </div>
      </button>

      {/* Theme selection dropdown */}
      <div className="
        absolute top-full right-0 mt-2 w-48 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700
        rounded-lg shadow-lg opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible
        transition-all duration-200 transform group-focus-within:translate-y-0 translate-y-2
        z-50
      ">
        <div className="p-2 space-y-1">
          <button
            onClick={() => setTheme('light')}
            className={`
              w-full text-left px-3 py-2 rounded-md text-sm transition-colors
              ${theme === 'light' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4" />
              <span>Light</span>
            </div>
          </button>
          
          <button
            onClick={() => setTheme('dark')}
            className={`
              w-full text-left px-3 py-2 rounded-md text-sm transition-colors
              ${theme === 'dark' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </div>
          </button>
          
          <button
            onClick={() => setTheme('system')}
            className={`
              w-full text-left px-3 py-2 rounded-md text-sm transition-colors
              ${theme === 'system' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>System</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
