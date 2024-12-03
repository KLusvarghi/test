import useSystemGeneralProviderContext from "@/hooks/useSystemGeneralProviderContext";
import React, { FC, useState } from "react";
import { Li } from "../ui";
import Hamburguer from "../Icons/Hamburguer";
import classNames from "classnames";
import { Link } from "react-router-dom";
import useSystemGenericProviderContext from "@/hooks/useSystemGenericProviderContext";

interface ConfigNavProps {
  themeClass?: string;
}

// Navegação lateral
const ConfigNav: FC<ConfigNavProps> = ({ themeClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onClose, isHiddenNav } = useSystemGeneralProviderContext();
  const { activeCompany } = useSystemGenericProviderContext();

  const logoSrc = activeCompany === "mamba" ? "mamba" : "12pLight";
  // console.log(activeCompany)

  return (
    <nav
      className={classNames(
        // "fixed left-0 top-0 z-30  w-[288px] transform transition-transform",
        "absolute left-0 z-30 min-h-screen w-[156px] transform transition-transform bg-[#1A1D1F]",
        themeClass,
        {
          "-translate-x-full": !isOpen,
          "translate-x-0": isOpen,
        },
      )}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        // className="absolute -right-12 top-2 z-50 flex h-screen w-12 cursor-pointer justify-center"
        className="absolute -right-12 top-2 z-50 flex h-screen w-16 justify-center"
        onMouseEnter={() => setIsOpen(true)}
      >
        <Hamburguer className="h-6 w-6" />
      </div>

      {/* <div className="flex flex-col gap-12"> */}
      <div className="flex flex-col gap-8">
        {/* <img className="mt-8 h-16" src={`/logos/${logoSrc}.svg`} alt="logo" /> */}
        <img className="mt-4 h-8" src={`/logos/${logoSrc}.svg`} alt="logo" />
        {/* <ul className="mx-auto flex flex-col items-start justify-center gap-6 p-6"> */}
        <ul className="mx-auto flex flex-col items-start justify-center p-1">
          <Li
            icon="graphic"
            onClick={() => {
              onClose("group");
            }}
          >
            Visualização dos gráficos
          </Li>
          <Li
            icon="calender"
            onClick={() => {
              onClose("filter");
            }}
          >
            Visualização dos dias
          </Li>
          <Li
            icon={isHiddenNav === true ? "hidden" : "show"}
            onClick={() => {
              onClose("nav");
            }}
          >
            {isHiddenNav === true
              ? "Ocultar navegação de gráficos"
              : "Exibir navegação de gráficos"}
          </Li>
          <Link to="/mamba/desempenho-comercial">
            <Li icon="closerGraphic">
              Métricas
            </Li>
          </Link>
          <Link to="mamba/analise-progressao-metas">
            <Li icon="closerGraphic">
              Análise de progressão de metas dos closers
            </Li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default ConfigNav;
