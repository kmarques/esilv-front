import React from "react";
import ReactDOM from "react-dom/client";
import AppEsilv from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppEsilv />
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   React.createElement(React.StrictMode, null, React.createElement(App, null))
// );

// class ReactDOM {
//   constructor() {}
// 
//   createRoot(HtmlElement) {
//     this.rootElement = HtmlElement;
//   }
// 
//   render(structure) {
//     if (this.rootElement.childNodes.length) {
//       this.rootElement.replaceChild(
//         this.renderStructure(structure),
//         this.rootElement.childNodes[0]
//       );
//     } else {
//       this.rootElement.appendChild(this.renderStructure(structure));
//     }
//   }
// }
