import { useCallback, useEffect, useState } from "react";
import { IChildrenProps } from "../../types/auxProps";
import { Close, Overlay, ModalContainer } from "../ui";

interface IModalProps extends IChildrenProps {
  onClose: () => void;
}

const Modal = ({ children, onClose }: IModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Função que ao clicar fora do modal ela fecha
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeWithTransition();
    }
  };

  // Função que fecha o modal e memoiza a função `closeWithTransition` para evitar mudanças no `useEffect`
  const closeWithTransition = useCallback(() => {
    setIsOpen(false); // Inicia a transição de fechamento
    setTimeout(onClose, 300); // Espera 300ms para completar a transição antes de fechar
  }, [onClose]);

  // E feito para que capturar eventos do teclado e executar funções
  useEffect(() => {
    
    // Função para fechar modal ao press 'esc'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWithTransition();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, closeWithTransition]);

  return (
    <Overlay onMouseDown={handleOutsideClick} isOpen={isOpen}>
      <ModalContainer>
        <Close onClick={closeWithTransition} />
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
