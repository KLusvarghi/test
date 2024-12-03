import React, { useEffect, useState } from "react";
import useForm from "@/hooks/useForm";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Error from "../Error/Error";
import useSystemGeneralProviderContext from "@/hooks/useSystemGeneralProviderContext";
import validateDate from "@/utils/validateDate";
import { H1 } from "../ui";

interface IFilterDataForm {
  onClose: () => void;
  handleReset: () => void;
  setStartDay: (value: number) => void;
  setEndDay: (value: number) => void;
}

// Form para alterar a data de preferencia na exibição do gráfico
const FilterDataForm = ({
  onClose,
  setStartDay,
  setEndDay,
  handleReset,
}: IFilterDataForm) => {
  const startDay = useForm("date");
  const endDay = useForm("date");
  const [error, setError] = useState<null | string>(null);
  const { setNotificationContent } = useSystemGeneralProviderContext();

  // Função que ao submit do form ele atualiza os dias a serem exibidos no gráfico e modifica o estada do componente de notificação
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const [, , start] = startDay.value.split("-").map(Number);
    const [, , end] = endDay.value.split("-").map(Number);
    setStartDay(Number(start));
    setEndDay(Number(end));
    setNotificationContent({
      status: true,
      message: "Preferencia de dias atualizado.",
    });
    onClose();
  }

  // Função para resetar os dias de preferencia para o default
  function handleResetPreferences() {
    setNotificationContent({
      status: true,
      message: "Preferencia de dias atualizado.",
    });
    handleReset();
    onClose();
  }

  // Efeito para verificar se dia inicial é menor que o dia final
  useEffect(() => {
    const errorMessage = validateDate({
      initial: startDay.value,
      end: endDay.value,
    });

    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
    }
  }, [startDay.value, endDay.value]);

  return (
    <form
      onSubmit={handleSubmit}
      // className="flex flex-col justify-center text-center"
      className="mx-4 flex flex-col justify-center gap-2 text-center items-center"
    >
      <H1 className="mb-2">Selecione os gráficos para os grupos</H1>
      <div className="flex flex-col w-2/3 gap-y-2 mb-2">
        <Input
          placeholder="Data de início"
          type="date"
          name="startDay"
          {...startDay}
        />
        <Input
          placeholder="Data de fim"
          type="date"
          name="endDay"
          {...endDay}
        />
      </div>
      {/* <div className="mt-2 flex gap-2"> */}
      <div className="flex gap-1">
        <Button disabled={error ? true : false} type="submit">
          Atualizar visualização dos dias
        </Button>
        <Button
          className="bg-btn2"
          onClick={handleResetPreferences}
          type="button"
        >
          Resetar filtro
        </Button>
      </div>
      {/* <Error className="mt-4" error={error} /> */}
      <Error className="mt-2" error={error} />
    </form>
  );
};

export default FilterDataForm;
