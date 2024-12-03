import { AnnualDetails } from "@/types/auxProps";

interface IcalculateBusinessDays {
  currentYear: string;
  currentMonth: string;
  holidaysData: AnnualDetails;
}

// Função para calcular os dias trabalhados
export const calculateBusinessDays = ({
  currentYear,
  currentMonth,
  holidaysData,
}: IcalculateBusinessDays): number => {
  const daysInMonth = new Date(parseInt(currentYear), parseInt(currentMonth), 0).getDate();

  // Verifica se o ano e o mês existem no JSON
  const monthData = holidaysData[currentYear]?.[currentMonth];
  if (!monthData) return daysInMonth; // Se não houver dados, retorna o total de dias do mês

  // Extrai os dias dos arrays de `holiday`, `weekends` e `companyRecess`
  const holidayDays = monthData.holiday.days || [];
  const weekendDays = monthData.weekends.days.flat() || [];
  const companyRecessDays = monthData.companyRecess.days.flat() || [];

  // Combina todos os dias em um único Set para eliminar duplicidades
  const nonBusinessDays = new Set([...holidayDays, ...weekendDays, ...companyRecessDays]);

  // Calcula os dias úteis subtraindo os dias únicos não úteis do total de dias no mês
  const businessDays = daysInMonth - nonBusinessDays.size;

  return businessDays;
};
