import ReactDOM from "react-dom/client";
import { FastClick } from "fastclick";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      FastClick.attach(document.body);
    },
    false
  );
}

// 注册 Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/resources/" })
    .then(() => console.log("Service Worker registered"))
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
