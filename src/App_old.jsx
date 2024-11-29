import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/Button";
import Table from "./components/Table";
import Carousel from "./components/Carousel";
import UserList from "./views/Users/List";
import ThemeProvider from "./contexts/ThemeProvider";
const images = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/200?random=1",
    name: "Image 1",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/200?random=2",
    name: "Image 2",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/200?random=3",
    name: "Image 3",
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [displayLogo, setDisplayLogo] = useState(true);

  const list = Array.from({ length: count }, (_, index) => index);

  return (
    <ThemeProvider>
      {displayLogo && count > 2 && (
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      )}
      {displayLogo && count <= 2 && "Push button"}
      {!displayLogo && "Logo hidden"}
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          variant="round"
          component="a"
          href="https://google.fr"
          target="_blank"
        />
        <Button
          variant="text"
          component="a"
          href="https://google.fr"
          target="_blank"
        />
        <Button
          variant="round"
          component="img"
          src="https://picsum.photos/200"
          onClick={() => window.open("https://google.fr")}
        />
        <Button
          variant="squared"
          color="red"
          title="Button 1"
          onClick={() => console.log("click me Button 1")}
        />
        <Button
          customStyle={{ backgroundColor: "magenta" }}
          title="Button 2"
          onClick={() => alert("Click me Button 2")}
        />
        <Button
          customStyle={{ backgroundColor: "yellow", color: "black" }}
          onClick={() => confirm("Click me Button 3")}
        >
          Button 3
        </Button>
        <Button
          customStyle={{ backgroundColor: "green" }}
          title="Button 4"
          disabled
          onClick={() => prompt("Click me Button 4")}
        />
        <Button
          customStyle={{ backgroundColor: "green" }}
          disabled
          onClick={() => prompt("Click me Button 4")}
        >
          <img src="https://picsum.photos/50" />
        </Button>
        <Button onClick={() => setDisplayLogo((current) => !current)}>
          {displayLogo ? "Masquer" : "Afficher"} logo
        </Button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h2>Itération avec tableau auto-généré</h2>
        <ul>
          {Array.from(
            { length: count },
            (_, index) => index % 2 === 0 && <li key={index}>Item #{index}</li>
          )}
          {Array.from(
            { length: count },
            (_, index) => index % 2 === 0 && <li key={index}>Item #{index}</li>
          ).length === 0 && <li>No items</li>}
        </ul>
        <h2>Itération classique</h2>
        <ul>
          {list
            .filter((value) => value % 2 === 0)
            .map((value) => (
              <li key={value}>Item #{value}</li>
            ))}
          {list.length === 0 && <li>No items</li>}
        </ul>
        <Table
          getData={() => [
            { id: 1, name: "Dupond", role: "Admin", source: "User" },
            { id: 1, name: "Dupond", role: "Admin", source: "Client" },
          ]}
        />
        <Table getData={() => []} />
        <Carousel data={images} swipeable={true} />
        <Carousel data={images} withArrows withKeyboardShortcuts={true} />
        <Carousel
          data={images}
          withPagination
          withKeyboardShortcuts={{ left: "a", right: "z" }}
        />
        <Carousel data={images} withPagination withArrows />
        {displayLogo && (
          <Carousel
            data={images}
            withPagination
            withArrows
            prefetch={1}
            autoPlay={true}
            withKeyboardShortcuts={true}
          />
        )}
        <UserList />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ThemeProvider>
  );
}

export default App;
