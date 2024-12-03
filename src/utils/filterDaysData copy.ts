import { IDataMamba, IData12p } from "@/types/auxProps";

interface IFilterDaysDataProps<T> {
  startDay?: number | null;
  endDay?: number | null;
  month?: number | null; // Adicionado para indicar o mês
  data: T;
}

// Função para filtrar os dias de acordo com startDay, endDay e month
export const filterDaysData = <T extends IDataMamba | IData12p>({
  startDay,
  endDay,
  month,
  data,
}: IFilterDaysDataProps<T>): T => {
  return Object.entries(data)
    .filter(([date]) => {
      const [dayStr, monthStr] = date.split("/"); // Divide DD/MM em ["DD", "MM"]
      const day = parseInt(dayStr, 10);
      const entryMonth = parseInt(monthStr, 10);

      // Filtra os dados com base nos parâmetros fornecidos
      const isWithinDays =
        (!startDay || day >= startDay) && (!endDay || day <= endDay);
      const isWithinMonth = !month || entryMonth === month;

      // Inclui o registro se estiver dentro dos critérios
      return isWithinMonth && isWithinDays;
    })
    .reduce((acc, [date, entry]) => {
      acc[date] = entry;
      return acc;
    }, {} as T);
};
