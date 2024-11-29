import "./App.css";
import AlertProvider from "./contexts/AlertProvider";

import ThemeProvider from "./contexts/ThemeProvider";
import UserRouter from "./views/Users";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <UserRouter />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
