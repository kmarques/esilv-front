import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

export default function useTheme(key) {
  const { theme } = useContext(ThemeContext);

  return theme[key];
}
