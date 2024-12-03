interface IValidateDateProps {
  initial: string;
  end: string;
}

export default function validateDate({ initial, end }: IValidateDateProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // `getMonth()` retorna 0 para janeiro
  const currentDay = today.getDate();

  const isCurrentMonth = (dateValue: string) => {
    const [year, month] = dateValue.split("-").map(Number);
    return year === currentYear && month === currentMonth;
  };

  const isDateValid = (dateValue: string) => {
    const [year, month, day] = dateValue.split("-").map(Number);
    return year === currentYear && month === currentMonth && day <= currentDay;
  };

  if (initial !== "" && end !== "") {
    if (initial > end) {
      return "Dia de inicio tem que ser menor que o Dia final";
    } else if (!isCurrentMonth(initial) || !isCurrentMonth(end)) {
      return "As datas devem corresponder ao mês atual";
    } else if (!isDateValid(initial) || !isDateValid(end)) {
      return "As datas não podem ser maiores que o dia atual";
    } else {
      return null
    }
  }
}
