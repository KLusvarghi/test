import { createContext } from "react";
import { ISystemGeneralContext } from "../types/auxProps";

// Retorno do contexto GENERAL
export const SystemGeneralContext = createContext<ISystemGeneralContext>({
  setNotificationContent: () => {},
  notificationContent: {
    status: null,
    message: null,
  },
  onClose: () => {},
  isPrefGroupOpen: false,
  isDaysOpen: false,
  isHiddenNav: true,
  // novos
  selectedGraphicIndex: null,
  setSelectedGraphicIndex: () => {},
  currentGroupIndex: 0,
  setCurrentGroupIndex: () => {},
  isGraphiOpen: false,
  setIsGraphiOpen: () => {},
  startInterval: () => {},
});
