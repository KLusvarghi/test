import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../Button/Button";
import useSystemGeneralProviderContext from "@/hooks/useSystemGeneralProviderContext";

interface INavProps {
  setIsGraphiOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedGraphicIndex: (index: number) => void;
  setCurrentGroup: (index: number) => void;
  graphicGroup: number[][];
}

// Componente de Nav do gráfico
const GraphicNav = ({
  setIsGraphiOpen,
  setSelectedGraphicIndex,
  setCurrentGroup,
  graphicGroup,
}: INavProps) => {
  const [graphicGroupNames, setGraphicGroupNames] = useState<string[][]>([]);

  const { startInterval } = useSystemGeneralProviderContext();

  // Mapeia o nome dos gráficos existentes e add apenas os que estão em 'graphicGroup'
  useEffect(() => {
    const graphicsNames = [
      "Leads",
      "Reuniões Agendadas",
      "Wons",
      "Reuniões Realizadas",
    ];

    const groupNames = graphicGroup.map((indices) =>
      indices.map((index) => graphicsNames[index]),
    );

    setGraphicGroupNames(groupNames);
  }, [graphicGroup]); // Atualiza sempre que graphicGroup muda

  // Função para abrir modal do gráfico conforme o index informado
  const openModal = (index: number) => {
    setSelectedGraphicIndex(index); // Define o índice do gráfico
    setIsGraphiOpen(true);
  };

  return (
    // <nav className="mx-auto flex gap-3 rounded-lg px-12 py-4">
    <nav className="mx-auto flex gap-2">
      {graphicGroupNames.map((names, index) => (
        <Button
          key={`group-${index}`}
          onClick={() => {
            setCurrentGroup(index);
            startInterval();
          }}
        >
          {`${names[0]} e ${names[1]}`}
        </Button>
      ))}
      {["Leads", "Reuniões Agendadas", "Wons", "Reuniões Realizadas"].map(
        (name, index) => (
          <Button
            key={index}
            onClick={() => openModal(index)}
          >
            {name}
          </Button>
        ),
      )}
    </nav>
  );
};

export default GraphicNav;
