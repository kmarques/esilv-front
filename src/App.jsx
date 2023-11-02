import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MultiButton, { ButtonBase } from "./components/Button";
import ThemeConfigurator from "./components/ThemeConfigurator";
import TaskList from "./components/TaskList/TaskList";

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
  const [theme, setTheme] = useState({
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
  //React.createElement(
  //  "div",
  //  null,
  //  displayLogo && [React.createElement("a"), React.createElement("a")]
  //);
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
      <ThemeConfigurator
        initialValues={theme}
        onSubmit={(themeValues) => {
          setTheme({
            ...theme,
            h1: {
              ...theme.h1,
              ...themeValues.h1,
            },
            button: {
              ...theme.button,
              ...themeValues.button,
            },
          });
        }}
      />
      {displayLogo && <TaskList />}
      <div className="card">
        <button
          style={theme.button}
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <MultiButton
          style={theme.button}
          genX={5}
          title="Button 1"
          variant="rounded"
          onClick={() => console.log("Coucou from Button 1")}
        />
        <ButtonBase
          style={theme.button}
          variant="square"
          onClick={() => setDisplayLogo(!displayLogo)}
        >
          <img src={viteLogo} />
          Toggle Logo
        </ButtonBase>
        <ButtonBase
          style={theme.button}
          component="div"
          title="Button 3"
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
