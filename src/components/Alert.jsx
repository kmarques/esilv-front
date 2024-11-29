import { useEffect } from "react";
import useTheme from "../hooks/useTheme";

export default function Alert({ alert, onClose }) {
  const { level, title } = alert;
  const alertTheme = useTheme("alert");

  useEffect(() => {
    setTimeout(() => onClose(alert), 2000);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        padding: 10,
        ...alertTheme[level],
      }}
    >
      {title}
    </div>
  );
}
