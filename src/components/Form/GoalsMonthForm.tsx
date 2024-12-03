// import useSystemMambaProviderContext from "@/hooks/useSystemMambaProviderContext";
import React from "react";
import { ModalContainer, Overlay } from "../ui";

// Função para atualizar as metas mensais
const GoalsMonthForm = () => {
  // const { setGoalsOfTheMonth } = useSystemMambaProviderContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setGoalsOfTheMonth()
  };

  return (
    <Overlay>
      <ModalContainer>
        <form onSubmit={handleSubmit}>
            
        </form>
      </ModalContainer>
    </Overlay>
  );
};

export default GoalsMonthForm;
