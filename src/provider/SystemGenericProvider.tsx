import React, { useState, useEffect } from "react";
import {
  ISystemGenericProvider,
  IChildrenProps,
  IDataMamba,
  IData12p,
  IApiResponse,
  IResponseDataWons,
  IDataWons,
} from "../types/auxProps";
import { transformData } from "../utils/transformDate";
import { filterDaysData } from "../utils/filterDaysData";
import useFetchData from "../hooks/useFetchData";
import { url12p, url12pWons, urlMamba, urlMambaWons } from "../utils/urlApi";
import { SystemGenericContext } from "@/context/SystemGenericContext";

type Company = "mamba" | "metodo12p";

export const SystemGenericProvider: React.FC<
  IChildrenProps & { company: Company }
> = ({ children, company }) => {
  const [activeCompany, setActiveCompany] = useState<"mamba" | "metodo12p">("mamba");


  const [dataMamba, setDataMamba] = useState<IDataMamba>({});
  const [data12p, setData12p] = useState<IData12p>({});
  const [dataWons, setDataWons] = useState<IDataWons>({});
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

  const urlMapping = {
    mamba: { data: urlMamba, wons: urlMambaWons },
    metodo12p: { data: url12p, wons: url12pWons },
  };

  const {
    data: fetchedData,
    error: fetchError,
    loading: fetchLoading,
  } = useFetchData<IApiResponse[]>(urlMapping[company].data, company);

  const { data: fetchedDataWons } = useFetchData<IResponseDataWons[]>(
    urlMapping[company].wons,
    `${company}_wons`,
  );

  useEffect(() => {
    const newFilteredData = filterDaysData({
      startDay,
      endDay,
      data: company === "mamba" ? dataMamba : data12p, // Use o estado correto com base na empresa
    });
    setFilteredData(newFilteredData);
  }, [startDay, endDay, dataMamba, data12p]);

  useEffect(() => {
    const fetchData = () => {
      if (fetchedData) {
        if (company === "mamba") {
          setDataMamba(transformData(fetchedData, "mamba"));
        } else if (company === "metodo12p") {
          setData12p(transformData(fetchedData, "12p"));
        }
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
  }, [fetchedData, fetchError, fetchLoading, fetchedDataWons, company]);

  useEffect(() => {
    localStorage.setItem(
      `graphicGroup_${company}`,
      JSON.stringify(graphicGroup),
    );
  }, [graphicGroup, company]);

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

  const data =
    activeCompany === "mamba"
      ? { ...dataMamba, activeCompany: "mamba" as const } // Literal "mamba"
      : { ...data12p, activeCompany: "metodo12p" as const }; // Literal "metodo12p"

  const contextValue: ISystemGenericProvider = {
    data,
    dataWons,
    setError,
    error,
    loading,
    goalsOfTheMonth: [
      { id: "leads", monthGoals: 100, businessDays: 20 },
      { id: "rr", monthGoals: 50, businessDays: 20 },
    ],
    setGoalsOfTheMonth: () => {},
    graphicGroup,
    resetGroup,
    setGraphicGroup,
    setStartDay,
    setEndDay,
    handleReset,
    activeCompany: company,
    setActiveCompany,
  };

  return (
    <SystemGenericContext.Provider value={contextValue}>
      {children}
    </SystemGenericContext.Provider>
  );
};
