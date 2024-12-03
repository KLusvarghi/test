import { createContext } from "react";
import { IThemeContextProps } from "@/types/auxProps";

// Retorno do contexto THEME
export const SystemThemeContext = createContext<IThemeContextProps>({
  theme: "mamba",
  setTheme: () => null,
});
