import { IDataMamba, IData12p } from "@/types/auxProps";

interface IFilterDaysDataProps<T> {
  startDay: number | null;
  endDay: number | null;
  data: T;
}

// Função responsavel por receber o json da api e filtar ele devolvendo apenas os dias entre startday e endday
// O tipo genérico T é restrito a ser IDataMamba ou IData12p, garantindo que a função só aceite esses tipos
export const filterDaysData = <T extends IDataMamba | IData12p>({
  startDay,
  endDay,
  data,
}: IFilterDaysDataProps<T>): T => {
  
  // Converte o objeto data em um array de pares [chave, valor]
  return Object.entries(data)
    .filter(([date]) => {
      const day = parseInt(date.split("/")[0], 10); //Divide a string da data no formato DD/MM em um array: ["DD", "MM"]
      
      return (!startDay || day >= startDay) && (!endDay || day <= endDay);
    })
    
    // Converte o array filtrado de volta para um objeto.
    .reduce((acc, [date, entry]) => {
      acc[date] = entry;
      return acc;
    }, {} as T); // Retorna o mesmo tipo de `data`
};


// const result = filterDaysData({
//   startDay: 2,
//   endDay: 5,
//   data: {
//     "01/12": { LEADS: 5 },
//     "02/12": { LEADS: 10 },
//     "03/12": { LEADS: 7 },
//     "15/12": { LEADS: 3 },
//   },
// });
// console.log(result);
// // Saída: { "02/12": { LEADS: 10 }, "03/12": { LEADS: 7 } }