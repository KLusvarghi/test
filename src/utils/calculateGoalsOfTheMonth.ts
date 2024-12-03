export interface IGoal {
  id: string;
  monthGoals: number;
  businessDays: number;
}

export interface ICalculateGoalsProps {
  cumulativeValues: number;
  id: 'leads' | 'wons' | 'rr' | 'ra';
  goalsOfTheMonth: IGoal[];
  cumulativeDays: number;
}

// Função para calcular a média diária incrementalmente para cada dia
export const calculateGoalsOfTheMonth = ({
  cumulativeValues,
  id,
  goalsOfTheMonth,
  cumulativeDays,
}: ICalculateGoalsProps) => {

  // Encontra o item correspondente ao id
  const goal = goalsOfTheMonth.find((item) => item.id === id);

  // Verifica se o item foi encontrado
  if (!goal) {
    console.error(`Goal with id ${id} not found`);
    return 0;
  }

  // Dias restantes
  const daysRemaining = goal.businessDays - cumulativeDays;

  // Meta diária
  const dailyAverage = Math.round(
    (goal.monthGoals - cumulativeValues) / daysRemaining,
  );

  // Se a meta for atingida e der negativo ele retorna 0
  return dailyAverage >= 0 ? dailyAverage : 0;
};
