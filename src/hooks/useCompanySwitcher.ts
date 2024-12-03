import { useState, useEffect } from "react";
import useSystemThemeProviderContext from "./useSystemThemeProviderContext";

type Company = "mamba" | "metodo12p";

// Hook que retorna selectedCompany (empresa selecionada), isTransitioning (estado para add efeito de transição), handleCompanyChange (função para mudar de tela/empresa)
export const useCompanySwitcher = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company>("mamba");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setTheme, theme } = useSystemThemeProviderContext();

  // Função para mudar de empresa '12p' ou 'mamba'
  const handleCompanyChange = (company: Company) => {
    if (theme === company) {
      setSelectedCompany(company);
    } else {
      setIsTransitioning(true);
      setTheme();
      setTimeout(() => setSelectedCompany(company), 150);
    }
  };

  // Efeio que verifica se 'isTransitioning' é verdadeiro e aplica um timeout para fazer uma transição
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return { selectedCompany, isTransitioning, handleCompanyChange };
};
