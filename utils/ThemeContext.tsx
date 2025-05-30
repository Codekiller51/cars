import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
  primary: '#0095F6',
  secondary: '#1D3557',
  accent: '#C5C5C5',
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#262626',
  textSecondary: '#8E8E8E',
  border: '#DBDBDB',
  notification: '#FF3B30',
  success: '#4BB543',
  error: '#FF3B30',
  warning: '#FF9500',
};

const darkTheme = {
  primary: '#0095F6',
  secondary: '#2A628F',
  accent: '#C5C5C5',
  background: '#000000',
  card: '#121212',
  text: '#FFFFFF',
  textSecondary: '#8E8E8E',
  border: '#262626',
  notification: '#FF3B30',
  success: '#4BB543',
  error: '#FF3B30',
  warning: '#FF9500',
};

type ThemeContextType = {
  isDark: boolean;
  colors: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(colorScheme === 'dark');
  
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = {
    isDark,
    colors: isDark ? darkTheme : lightTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};