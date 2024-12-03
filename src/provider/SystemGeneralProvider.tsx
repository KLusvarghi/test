import { SystemGeneralContext } from "@/context/SystemGeneralContext";
import { IChildrenProps } from "@/types/auxProps";
import { useCallback, useEffect, useRef, useState } from "react";

export const SystemgGeralProvider = ({ children }: IChildrenProps) => {
  // Estados dos modais
  const [isPrefGroupOpen, setIsPrefGroupOpen] = useState(false);
  const [isDaysOpen, setIsDaysOpen] = useState(false);
  const [isHiddenNav, setIsHiddenNav] = useState(true);
  const [isGraphiOpen, setIsGraphiOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Estado dos gráficos exibidos
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0);
  const [selectedGraphicIndex, setSelectedGraphicIndex] = useState<
    number | null
  >(null);
  // Estado da notificação
  const [notificationContent, setNotificationContent] = useState<{
    status: boolean | null;
    message: string | null;
  }>({
    status: null,
    message: null,
  });

  const graphicLength = 4;

  // Função para fechar os modais
  function onClose(type: "group" | "filter" | "nav") {
    if (type === "group") {
      // Fecha o modal de "group" se já estiver aberto, ou fecha os outros e abre este
      setIsPrefGroupOpen((prev) => !prev);
      if (!isPrefGroupOpen) {
        setIsDaysOpen(false);
      }
    } else if (type === "filter") {
      // Fecha o modal de "filter" se já estiver aberto, ou fecha os outros e abre este
      setIsDaysOpen((prev) => !prev);
      if (!isDaysOpen) {
        setIsPrefGroupOpen(false);
      }
    } else {
      setIsHiddenNav((prev) => !prev);
    }
  }

  // Alterna os gráficos com as setas
  const handleArrowNavigation = useCallback(
    (event: KeyboardEvent) => {
      const keyboard = event.key;
      if (selectedGraphicIndex === null) return;

      setSelectedGraphicIndex((prevIndex) => {
        if (prevIndex === null) return 0;
        if (keyboard === "ArrowRight" || keyboard === "ArrowUp") {
          return prevIndex === graphicLength - 1 ? 0 : prevIndex + 1;
        } else if (keyboard === "ArrowLeft" || keyboard === "ArrowDown") {
          return prevIndex === 0 ? graphicLength - 1 : prevIndex - 1;
        }
        return prevIndex;
      });
    },
    [selectedGraphicIndex],
  );

  // Efeito que ao modal abri ele add evento de keydown e chama a função 'handleArrowNavigation'
  useEffect(() => {
    if (isGraphiOpen) {
      document.addEventListener("keydown", handleArrowNavigation);
    } else {
      document.removeEventListener("keydown", handleArrowNavigation);
    }
    return () => document.removeEventListener("keydown", handleArrowNavigation);
  }, [isGraphiOpen, handleArrowNavigation]);

  // Função para iniciar o intervalo
  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentGroupIndex((prevGroup) => (prevGroup + 1) % 2);
    }, 40000);
  };

  // Efeito que inicia o intervalo ao montar o componente
  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Limpa o intervalo ao desmontar
    };
  }, []);

  const context = {
    setNotificationContent,
    notificationContent,
    onClose,
    isPrefGroupOpen,
    isDaysOpen,
    isHiddenNav,
    currentGroupIndex,
    setCurrentGroupIndex,
    isGraphiOpen,
    setIsGraphiOpen,
    selectedGraphicIndex,
    setSelectedGraphicIndex,
    startInterval,
  };

  return (
    <SystemGeneralContext.Provider value={context}>
      {children}
    </SystemGeneralContext.Provider>
  );
};
