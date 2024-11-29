import { createContext, useCallback, useState } from "react";
import Alert from "../components/Alert";

export const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  function notify(level, title) {
    setAlerts([{ level, title, id: Date.now() }, ...alerts]);
  }

  const onClose = useCallback(function onClose(alert) {
    setAlerts((alerts) => alerts.filter((a) => a.id !== alert.id));
  }, []);

  return (
    <AlertContext.Provider value={{ notify }}>
      {children}
      {alerts.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: "30%",
            maxWidth: "30%",
            width: "30%",
          }}
        >
          {alerts.map((alert) => (
            <Alert key={alert.id} alert={alert} onClose={onClose} />
          ))}
        </div>
      )}
    </AlertContext.Provider>
  );
}
