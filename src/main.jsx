import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MyListProvider } from "./context/MyListContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyListProvider>
      <App />
    </MyListProvider>
  </React.StrictMode>
);
