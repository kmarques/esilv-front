import React, { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MultiButton, { ButtonBase } from "./components/Button";
import ThemeConfigurator from "./components/ThemeConfigurator";
import TaskList from "./components/TaskList/TaskList";
import { ThemeContext } from "./contexts/ThemeContext";
import TaskListProvider from "./contexts/TaskListContext";
import TaskIcon from "./components/TaskList/TaskIcon";

//let cursor = 0;
//const data = [];
//function useState(defaultValue) {
//  datacursor] ??= defaultValue;
//  const setter = (newValue) => {
//    data[cursor] = newValue;
//    document.dispatchEvent(new Event("rerender"));
//  };
//  return [data[cursor++], setter];
//}

function App() {
  const [count, setCount] = useState(0);
  const [displayLogo, setDisplayLogo] = useState(false);
  const { theme, toggleH1Theme } = useContext(ThemeContext);
  //React.createElement(
  //  "div",
  //  null,
  //  displayLogo && [React.createElement("a"), React.createElement("a")]
  //);

  return (
    <>
      <div>
        {displayLogo && (
          <>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </>
        )}
        {!displayLogo && <p>Logos masqués</p>}
      </div>
      <h1 style={theme.h1}>Vite + React</h1>
      <ThemeConfigurator />
      {displayLogo && (
        <TaskListProvider>
          <TaskIcon />
          <TaskList />
        </TaskListProvider>
      )}
      <div className="card">
        <button
          style={theme.button}
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <MultiButton
          genX={5}
          title="Button 1"
          variant="rounded"
          onClick={() => console.log("Coucou from Button 1")}
        />
        <ButtonBase
          variant="square"
          onClick={() => setDisplayLogo(!displayLogo)}
        >
          <img src={viteLogo} />
          Toggle Logo
        </ButtonBase>
        <ButtonBase
          component="div"
          title="Toggle H1 Theme"
          onClick={() => {
            toggleH1Theme();
            console.log("Button 3 is clicked!");
          }}
        />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
