import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import ChatProvider from "./stores/ChatContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </StrictMode>,
);
