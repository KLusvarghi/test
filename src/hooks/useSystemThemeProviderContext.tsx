import { useContext } from "react";
import { IThemeContextProps } from "@/types/auxProps";
import { SystemThemeContext } from "@/context/SystemThemeContext";

// Hook para exportar o contexto e ter acesso a ele com praticidade
function useSystemThemeProviderContext(): IThemeContextProps {
  return useContext(SystemThemeContext);
}

export default useSystemThemeProviderContext;
