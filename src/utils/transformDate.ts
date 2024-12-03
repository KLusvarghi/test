import {
  FetchedData,
  IData12p,
  IDataMamba,
  IDataWons,
  IResponseDataWons,
} from "@/types/auxProps";

type TransformType = "12p" | "mamba" | "wons";

export function transformData<T extends TransformType>(
  fetchedData: T extends "wons" ? IResponseDataWons[] : FetchedData,
  type: T
): T extends "12p" ? IData12p : T extends "mamba" ? IDataMamba : IDataWons {
  const today = new Date();
  const currentDay = today.getDate(); // Dia atual do mês
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Mês atual (0 = janeiro)

  // Obter o último dia do mês passado
  const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0);

  // Últimos 7 dias do mês passado
  const last7DaysPreviousMonth = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(lastDayOfPreviousMonth);
    date.setDate(lastDayOfPreviousMonth.getDate() - i);
    return date.toISOString().split("T")[0];
  });

  // Dias do mês atual até o dia atual
  const daysOfCurrentMonth = Array.from({ length: currentDay }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);
    return date.toISOString().split("T")[0];
  });

  // Filtrar datas com base no dia atual
  const filterDates =
    currentDay <= 7
      ? [...last7DaysPreviousMonth, ...daysOfCurrentMonth]
      : fetchedData.map((item) => {
          const dateObj = new Date(
            "data_referencia" in item
              ? item.data_referencia
              : (item as IResponseDataWons).date
          );
          return dateObj.toISOString().split("T")[0];
        });

  if (type === "wons") {
    const result: IDataWons = {};

    (fetchedData as IResponseDataWons[]).forEach((item) => {
      const itemDate = new Date(item.date).toISOString().split("T")[0];

      if (filterDates.includes(itemDate)) {
        const dateObj = new Date(item.date);
        const utcDate = new Date(
          dateObj.getUTCFullYear(),
          dateObj.getUTCMonth(),
          dateObj.getUTCDate()
        );
        const date = utcDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });

        if (!result[date]) {
          result[date] = [];
        }

        result[date].push({
          [item.user_name]: {
            ticket_medio: item.ticket_medio,
            total_faturamento: item.total_faturamento,
            vendas_totais: item.vendas_totais,
          },
        });
      }
    });

    return result as T extends "12p"
      ? IData12p
      : T extends "mamba"
      ? IDataMamba
      : IDataWons;
  }

  const result = type === "12p" ? ({} as IData12p) : ({} as IDataMamba);

  (fetchedData as FetchedData).forEach((item) => {
    const itemDate = new Date(item.data_referencia).toISOString().split("T")[0];

    if (filterDates.includes(itemDate)) {
      const parsedDados = JSON.parse(item.dados);
      const dateObj = new Date(item.data_referencia);
      const utcDate = new Date(
        dateObj.getUTCFullYear(),
        dateObj.getUTCMonth(),
        dateObj.getUTCDate()
      );
      const date = utcDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });

      if (type === "12p") {
        (result as IData12p)[date] = {
          LEADS: parsedDados.LEADS,
          LIMBOLEADS: parsedDados.LIMBOLEADS,
          LEADS_WON: parsedDados.LEADS_WON || {},
          Reunioes_Agendadas: parsedDados.Reunioes_Agendadas || {},
          Reunioes_Realizadas: parsedDados.Reunioes_Realizadas || {},
        };
      } else if (type === "mamba") {
        const reunioesRealizadas =
          typeof parsedDados.Reunioes_Realizadas === "string"
            ? JSON.parse(parsedDados.Reunioes_Realizadas)
            : parsedDados.Reunioes_Realizadas;

        (result as IDataMamba)[date] = {
          LEADS: parsedDados.LEADS,
          LIMBOLEADS: parsedDados.LIMBOLEADS,
          LEADS_WON: parsedDados.LEADS_WON || {},
          Reunioes_Agendadas: parsedDados.Reunioes_Agendadas || {},
          Reunioes_Realizadas: reunioesRealizadas || {},
        };
      }
    }
  });

  return result as T extends "12p"
    ? IData12p
    : T extends "mamba"
    ? IDataMamba
    : IDataWons;
}
