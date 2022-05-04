import React, { createContext, useEffect } from "react";

type ThemeManager = {
  theme: {
    primary: string;
    background: string;
  };
  toggleTheme: () => void;
};

const DARK_MODE = {
  primary: "#fff",
  background: "#000",
  background50: "rgba(0, 0, 0, 0.5)",
  activeBackground: "#181818",
};

const LIGHT_MODE = {
  primary: "#000",
  background: "#fff",
  background50: "rgba(244, 244, 241, 0.5)",
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
            --background50: ${theme.background50};
            --active-background: ${theme.activeBackground};
          }
        `}
      </style>
      {children}
    </ThemeContext.Provider>
  );
};
