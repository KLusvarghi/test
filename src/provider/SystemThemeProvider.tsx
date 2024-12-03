import { useEffect, useState } from "react";
import { IChildrenProps, IThemeContextProps } from "../types/auxProps";
import { SystemThemeContext } from "@/context/SystemThemeContext";

export const SystemThemeProviderTheme = ({ children }: IChildrenProps) => {
  const [theme, setTheme] = useState<"mamba" | "metodo12p">("mamba");

  // Efeito para ao iniciar tirar todas as classes e add 'mamba'
  useEffect(() => {
    document.body.classList.remove("mamba", "metodo12p");
    document.body.classList.add("mamba");
    setTheme("mamba");
  }, []);

  // Função para mudar de tema
  const handleSetTheme = () => {
    const newTheme = theme === "mamba" ? "metodo12p" : "mamba";
    setTheme(newTheme);

    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };

  const context: IThemeContextProps = {
    theme,
    setTheme: handleSetTheme,
  };

  return (
    <SystemThemeContext.Provider value={context}>
      {children}
    </SystemThemeContext.Provider>
  );
};
