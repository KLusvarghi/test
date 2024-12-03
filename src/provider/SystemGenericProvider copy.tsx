import React, { createContext, useContext, useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { transformData } from "../utils/transformDate";
import { filterDaysData } from "../utils/filterDaysData";
import {
  DaysOfMonth,
  IChildrenProps,
  IApiResponse,
  IResponseDataWons,
  IDataMamba,
  IData12p,
} from "../types/auxProps";
import { SystemGenericContext } from "@/context/SystemGenericContext";

type Company = "mamba" | "metodo12p";

interface GenericContextValue {
  data: any;
  dataWons: any;
  error: boolean;
  loading: boolean;
  graphicGroup: number[][];
  goalsOfTheMonth: any[];
  setGraphicGroup: (group: number[][]) => void;
  setStartDay: (day: number | null) => void;
  setEndDay: (day: number | null) => void;
  resetGroup: () => void;
  handleReset: () => void;
}

export const SystemGenericProvider: React.FC<
  IChildrenProps & { company: Company }
> = ({ children, company }) => {
  const [data, setData] = useState({});
  const [dataWons, setDataWons] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [graphicGroup, setGraphicGroup] = useState<number[][]>(() => {
    const savedGroup = localStorage.getItem(`graphicGroup_${company}`);
    return savedGroup
      ? JSON.parse(savedGroup)
      : [
          [0, 1],
          [2, 3],
        ];
  });

  const [startDay, setStartDay] = useState<number | null>(null);
  const [endDay, setEndDay] = useState<number | null>(null);

  const currentYear = new Date().getFullYear().toString();
  const currentMonth = new Date().toISOString().slice(5, 7);

  const urlMapping = {
    mamba: { data: "urlMamba", wons: "urlMambaWons" },
    metodo12p: { data: "url12p", wons: "url12pWons" },
  };

  const { data: fetchedDataWons } = useFetchData<IResponseDataWons[]>(
    urlMapping[company].wons,
    `wons_${company}`,
  );

  const {
    data: fetchedData,
    error: fetchError,
    loading: fetchLoading,
  } = useFetchData<IApiResponse[]>(urlMapping[company].data, company);

  // Atualiza dados filtrados
  useEffect(() => {
    const newFilteredData = filterDaysData({ startDay, endDay, data });
    setFilteredData(newFilteredData);
  }, [startDay, endDay, data]);

  // Fetch inicial e atualização periódica
  useEffect(() => {
    const fetchData = () => {
      if (fetchedData) {
        setData(transformData(fetchedData, "mamba"));
      }
      if (fetchedDataWons) {
        setDataWons(transformData(fetchedDataWons, "wons"));
      }
      setError(!!fetchError);
      setLoading(fetchLoading);
    };
    fetchData();
    const interval = setInterval(fetchData, 1800000); // Atualiza a cada 30 minutos
    return () => clearInterval(interval);
  }, [fetchedData, fetchError, fetchLoading, fetchedDataWons]);

  // Grava no localStorage ao alterar o grupo
  useEffect(() => {
    localStorage.setItem(
      `graphicGroup_${company}`,
      JSON.stringify(graphicGroup),
    );
  }, [graphicGroup]);

  // Reseta grupo de gráficos
  const resetGroup = () => {
    setGraphicGroup([
      [0, 1],
      [2, 3],
    ]);
  };

  const handleReset = () => {
    setStartDay(null);
    setEndDay(null);
  };

  const contextValue: GenericContextValue = {
    data: company === "mamba" ? (filteredData as IDataMamba) : (filteredData as IData12p),
    dataWons,
    error,
    loading,
    graphicGroup,
    goalsOfTheMonth: [], // Pode ser parametrizado
    setGraphicGroup,
    setStartDay,
    setEndDay,
    resetGroup,
    handleReset,
  };
  

  return (
    <SystemGenericContext.Provider value={contextValue}>
      {children}
    </SystemGenericContext.Provider>
  );
};
