import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    button: {
      backgroundColor: "green",
      color: "red",
    },
  });

  useEffect(() => {
    setInterval(() => {
      setTheme((oldTheme) => ({
        ...theme,
        button: {
          ...theme.button,
          color: oldTheme.button.backgroundColor,
          backgroundColor: oldTheme.button.color,
        },
      }));
    }, 500);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
