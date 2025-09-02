import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface ThemeAwareImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
  [key: string]: any;
}

export function ThemeAwareImage({ lightSrc, darkSrc, alt, className, ...props }: ThemeAwareImageProps) {
  const { isDarkMode } = useTheme();

  return (
    <img
      src={isDarkMode ? darkSrc : lightSrc}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
