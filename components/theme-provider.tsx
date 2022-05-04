import React, { createContext, useEffect } from "react";

type ThemeManager = {
  theme: {
    primary: string;
    background: string;
  };
  toggleTheme: () => void;
};

const COLORS = {
  red: "#e16259",
  white: "#fff",
};

const DARK_MODE = {
  primary: "#fff",
  background: "#000",
  activeBackground: "#181818",
};

const LIGHT_MODE = {
  primary: "#000",
  background: "#fff",
  activeBackground: "#f4f4f1",
};

const THEMES = {
  dark: DARK_MODE,
  light: LIGHT_MODE,
};

const ThemeContext = createContext<ThemeManager>({
  theme: THEMES.dark,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState(THEMES.dark);

  useEffect(() => {
    const hasDarkModeEnabled = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;
    if (hasDarkModeEnabled) {
      setTheme(THEMES.dark);
    } else {
      setTheme(THEMES.light);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === THEMES.dark ? THEMES.light : THEMES.dark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <style jsx global>
        {`
          :root {
            --primary: ${theme.primary};
            --background: ${theme.background};
            --active-background: ${theme.activeBackground};
            --red: ${COLORS.red};
            --white: ${COLORS.white};
          }
        `}
      </style>
      {children}
    </ThemeContext.Provider>
  );
};
