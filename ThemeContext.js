import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(previous => !previous);
  };

  const colors = {
    card: isDark ? '#0c0c0c' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    secondaryText: isDark ? '#CCCCCC' : '#777',
    box: isDark ? '#E5E5E5' : '#1d1c1c',
    boxText: isDark ? '#FFFFFF' : '#FFFFFF',
    placeholder: isDark ? '#CCCCCC' : '#777777',
      // BOTTOM TAB BAR
  tabBar: isDark ? '#393939' : '#dbdbdb',
  tabActive: isDark ? '#5d5a5a' : '#c3c2c2',
  tabIcon: isDark ? '#888888' : '#999999',
  tabIconActive: isDark ? '#FFFFFF' : '#000000',
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}