// Utility functions for theme-related operations

export function getContrastRatio(foreground: string, background: string): number {
  // Simple contrast ratio calculation (for demonstration)
  // In production, use a proper color contrast library
  const lum1 = getLuminance(foreground);
  const lum2 = getLuminance(background);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function getLuminance(color: string): number {
  // Simplified luminance calculation
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function isAccessibleContrast(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

export function getThemeAwareImage(src: string, darkSrc?: string): string {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark && darkSrc ? darkSrc : src;
}

export function applyThemeToElement(element: HTMLElement, isDark: boolean) {
  if (isDark) {
    element.classList.add('dark');
  } else {
    element.classList.remove('dark');
  }
}
