import { SystemThemeProviderTheme } from "./provider/SystemThemeProvider";
import { SystemgGeralProvider } from "./provider/SystemGeneralProvider";
import { SystemGenericProvider } from "./provider/SystemGenericProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";


createRoot(document.getElementById("root")!).render(
  <SystemThemeProviderTheme>
    <SystemgGeralProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </SystemgGeralProvider>
  </SystemThemeProviderTheme>,
);
