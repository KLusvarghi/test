import { useState } from "react";
import Button from "../Button/Button";
import { H1, H2, SelectWrapper } from "../ui";
import useSystemGeneralProviderContext from "@/hooks/useSystemGeneralProviderContext";
import Input from "../Input/Input";

interface FormProps {
  onClose: () => void;
  setGraphicGroup: (groups: [number[], number[]]) => void;
  resetGroup: () => void;
}

export interface Option {
  value: number;
  label: string;
}

// Form que estipula os grupos a serem exibidos no gráfico
const FilterGroupForm = ({
  onClose,
  setGraphicGroup,
  resetGroup,
}: FormProps) => {
  const [firstGroup, setFirstGroup] = useState<number[]>([0, 1]);
  const [secondGroup, setSecondGroup] = useState<number[]>([2, 3]);
  const { setNotificationContent } = useSystemGeneralProviderContext();
  const options: Option[] = [
    { value: 0, label: "Leads" },
    { value: 1, label: "Reuniões Agendadas" },
    { value: 2, label: "Wons" },
    { value: 3, label: "Reuniões Realizadas" },
  ];

  // Função que ao submit ele atualiza o grupo de gráficos
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotificationContent({
      status: true,
      message: "Preferencia de gráficos atualizado.",
    });
    setGraphicGroup([firstGroup, secondGroup]);
    onClose();
  }

  // Função para resetar as preferencia de gráficos a serem exibidos para o default
  function handleResetPreferences() {
    setNotificationContent({
      status: true,
      message: "Preferencia de gráficos atualizado.",
    });
    resetGroup();
    onClose();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center text-center"
    >
      {/* <div className="mb-10"> */}
      <H1 className="mb-4">Selecione os gráficos para os grupos</H1>
      <div className="flex justify-center gap-4">
        <div className="">
          {/* <H2 className="mb-6">Selecione os gráficos para o primeiro grupo</H2> */}
          <H2>Primeiro grupo</H2>
          <SelectWrapper className="flex flex-col gap-2">
            <Input
              variant="select"
              options={options}
              value={firstGroup[0]}
              onChange={(e) =>
                setFirstGroup([Number(e.target.value), firstGroup[1]])
              }
            />
            <Input
              variant="select"
              options={options}
              value={firstGroup[1]}
              onChange={(e) =>
                setFirstGroup([firstGroup[0], Number(e.target.value)])
              }
            />
          </SelectWrapper>
        </div>
        {/* <div className="mb-4"> */}
        <div>
          <H2>Segundo grupo</H2>
          <SelectWrapper>
            <Input
              variant="select"
              options={options}
              value={secondGroup[0]}
              onChange={(e) =>
                setSecondGroup([Number(e.target.value), secondGroup[1]])
              }
            />
            <Input
              variant="select"
              options={options}
              value={secondGroup[1]}
              onChange={(e) =>
                setSecondGroup([secondGroup[0], Number(e.target.value)])
              }
            />
          </SelectWrapper>
        </div>
      </div>

      {/* <div className="mt-6 flex gap-4"> */}
      <div className="mt-6 flex gap-1">
        <Button type="submit">Salvar Preferências</Button>
        <Button
          className="bg-btn2"
          onClick={handleResetPreferences}
          type="button"
        >
          Resetar Preferencias
        </Button>
      </div>
    </form>
  );
};

export default FilterGroupForm;
