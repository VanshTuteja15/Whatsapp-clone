import React, { createContext, useContext, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { Colors, ColorSchemeName, ThemeColors } from '@/constants/theme';

interface ThemeContextValue {
  colorScheme: ColorSchemeName;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useSystemColorScheme() ?? 'light';
  const [scheme, setScheme] = useState<ColorSchemeName>(system as ColorSchemeName);

  const toggleTheme = () =>
    setScheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider
      value={{
        colorScheme: scheme,
        colors: Colors[scheme],
        toggleTheme,
        isDark: scheme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
