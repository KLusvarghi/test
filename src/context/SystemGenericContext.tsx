import { createContext } from "react";
import { ISystemGenericProvider, IDataMamba, IData12p } from "../types/auxProps";

const mockDataMamba: IDataMamba = {};
const mockData12p: IData12p = {};

// Definindo o contexto com valores iniciais padrão
export const SystemGenericContext = createContext<ISystemGenericProvider>({
  data: mockDataMamba,
  dataWons: {},
  error: false,
  loading: true,
  setError: () => {},
  goalsOfTheMonth: [
    { id: "leads", monthGoals: 0, businessDays: 0 },
    { id: "rr", monthGoals: 0, businessDays: 0 },
    { id: "won", monthGoals: 0, businessDays: 0 },
    { id: "ra", monthGoals: 0, businessDays: 0 },
  ],
  setGoalsOfTheMonth: () => {},
  graphicGroup: [
    [0, 1],
    [2, 3],
  ],
  resetGroup: () => {},
  setGraphicGroup: () => {},
  setStartDay: () => {},
  setEndDay: () => {},
  handleReset: () => {},
  activeCompany: "mamba", // Estado inicial
  setActiveCompany: () => {},
});
