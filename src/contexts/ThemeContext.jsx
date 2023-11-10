import { createContext, useState } from "react";

export const ThemeContext = createContext({
  h1: {
    backgroundColor: "#0000FF",
    color: "#FF0000",
    border: "10px dotted #FFC0CB",
  },
  button: {
    backgroundColor: "#00FF00",
    color: "#FFFF00",
  },
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    h1: {
      backgroundColor: "#0000FF",
      color: "#FF00FF",
      border: "10px dotted #FFC0CB",
    },
    button: {
      backgroundColor: "#FFDDDD",
      color: "#FFFF00",
    },
  });

  const toggleH1Theme = () => {
    const bg = theme.h1.backgroundColor;
    const color = theme.h1.color;

    setTheme({
      ...theme,
      h1: {
        ...theme.h1,
        backgroundColor: color,
        color: bg,
      },
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleH1Theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
