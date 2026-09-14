import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

(window as typeof window & { Telegram?: { WebApp?: { ready?: () => void } } }).Telegram?.WebApp?.ready?.();
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
