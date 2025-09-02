import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type ThemePreference = 'light' | 'dark' | 'system';

export function useTheme() {
  const [themePreference, setThemePreference] = useLocalStorage<ThemePreference>('theme-preference', 'system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
      if (themePreference === 'system') {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  // Apply theme based on preference
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (themePreference === 'system') {
      setIsDarkMode(isSystemDark);
    } else {
      setIsDarkMode(themePreference === 'dark');
    }

    // Apply to HTML element
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    // Set meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDarkMode ? '#171717' : '#ffffff'
      );
    }
  }, [themePreference, isDarkMode, isSystemDark]);

  const setTheme = (theme: ThemePreference) => {
    setThemePreference(theme);
  };

  const toggleTheme = () => {
    setThemePreference(prev => {
      if (prev === 'system') return 'dark';
      if (prev === 'dark') return 'light';
      return 'system';
    });
  };

  return {
    theme: themePreference,
    isDarkMode,
    isSystemDark,
    setTheme,
    toggleTheme,
    themePreference
  };
}
