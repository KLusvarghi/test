import useSystemGenericProviderContext from "@/hooks/useSystemGenericProviderContext";
import useSystemThemeProviderContext from "@/hooks/useSystemThemeProviderContext";
import React from "react";

const CompanyToggle: React.FC = () => {
  const { theme, setTheme } = useSystemThemeProviderContext();

  return (
    <nav className="flex flex-col items-center gap-8 pr-10">
      <button
        onClick={() => theme === "mamba" && setTheme()}
        className={theme === "metodo12p" ? "active" : ""}
      >
        <img className="h-7" src={`/logos/12p.png`} alt="Logo Método 12P" />
      </button>
      <button
        onClick={() => theme === "metodo12p" && setTheme()}
        className={theme === "mamba" ? "active" : ""}
      >
        <img className="h-7" src={`/logos/mamba.png`} alt="Logo Mamba" />
      </button>
    </nav>
  );
};

export default CompanyToggle;
