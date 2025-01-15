import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/index.tsx";
import NewVideo from "./app/newVideo.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/criar-video" element={<NewVideo />}></Route>
    </Routes>
  </BrowserRouter>
);
