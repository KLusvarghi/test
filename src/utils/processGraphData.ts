import { IData12p, IDataMamba, ILeadsProps, IReunioesAgendadasProps, IWonsProps, IReunioesRealizadasProps, ProcessDataProps, ProcessedData } from "@/types/auxProps";
import { calculateGoalsOfTheMonth } from "./calculateGoalsOfTheMonth";

// // Processamento para Leads
// export const processLeadsData = <T extends IData12p | IDataMamba>({
//   data,
//   goalsOfTheMonth,
// }: {
//   data: T;
//   goalsOfTheMonth: ILeadsProps["data"][0]["Meta Diária"][];
// }): ILeadsProps["data"] => {
//   let cumulativeValues = 0;
//   let cumulativeDays = 0;

//   return Object.entries(data).map(([date, values]) => {
//     cumulativeDays++;
//     const totalLeads = values.LEADS + values.LIMBOLEADS;

//     return {
//       date,
//       "Total Leads": totalLeads,
//       "Meta Diária": calculateGoalsOfTheMonth({
//         cumulativeValues: (cumulativeValues += totalLeads),
//         id: "leads",
//         goalsOfTheMonth,
//         cumulativeDays,
//       }),
//       Leads: [
//         { name: "Mamba Leads", count: values.LEADS },
//         { name: "Limbo Leads", count: values.LIMBOLEADS },
//       ],
//     };
//   });
// };

// // Processamento para Reuniões Agendadas
// export const processReunioesAgendadasData = <T extends IData12p | IDataMamba>({
//   data,
//   goalsOfTheMonth,
// }: {
//   data: T;
//   goalsOfTheMonth: IReunioesAgendadasProps["data"][0]["Meta Diária"][];
// }): IReunioesAgendadasProps["data"] => {
//   let cumulativeValues = 0;
//   let cumulativeDays = 0;

//   return Object.entries(data).map(([date, values]) => {
//     cumulativeDays++;
//     const totalReunioes = Object.values<number>(values.Reunioes_Agendadas).reduce((a, b) => a + b, 0);

//     return {
//       date,
//       "Total Reunioes Agendadas": totalReunioes,
//       "Meta Diária": calculateGoalsOfTheMonth({
//         cumulativeValues: (cumulativeValues += totalReunioes),
//         id: "ra",
//         goalsOfTheMonth,
//         cumulativeDays,
//       }),
//       collaborators: Object.entries(values.Reunioes_Agendadas).map(([name, count]) => ({
//         name,
//         count,
//       })),
//     };
//   });
// };

// // Processamento para Wons
// export const processWonsData = <T extends IData12p | IDataMamba>({
//   data,
//   goalsOfTheMonth,
// }: {
//   data: T;
//   goalsOfTheMonth: IWonsProps["data"][0]["Meta Diária"][];
// }): IWonsProps["data"] => {
//   let cumulativeValues = 0;
//   let cumulativeDays = 0;

//   return Object.entries(data).map(([date, values]) => {
//     cumulativeDays++;
//     const totalWons = Object.values<number>(values.LEADS_WON).reduce((a, b) => a + b, 0);

//     return {
//       date,
//       "Leads Won": totalWons,
//       "Meta Diária": calculateGoalsOfTheMonth({
//         cumulativeValues: (cumulativeValues += totalWons),
//         id: "wons",
//         goalsOfTheMonth,
//         cumulativeDays,
//       }),
//       collaborators: Object.entries(values.LEADS_WON).map(([name, count]) => ({
//         name,
//         count,
//       })),
//     };
//   });
// };

// // Processamento para Reuniões Realizadas
// export const processReunioesRealizadasData = <T extends IData12p | IDataMamba>({
//   data,
//   goalsOfTheMonth,
// }: {
//   data: T;
//   goalsOfTheMonth: IReunioesRealizadasProps["data"][0]["Meta Diária"][];
// }): IReunioesRealizadasProps["data"] => {
//   let cumulativeValues = 0;
//   let cumulativeDays = 0;

//   return Object.entries(data).map(([date, values]) => {
//     cumulativeDays++;
//     const totalRealizadas = Object.values<number>(values.Reunioes_Realizadas).reduce((a, b) => a + b, 0);

//     return {
//       date,
//       "Total Reunioes Realizadas": totalRealizadas,
//       "Meta Diária": calculateGoalsOfTheMonth({
//         cumulativeValues: (cumulativeValues += totalRealizadas),
//         id: "rr",
//         goalsOfTheMonth,
//         cumulativeDays,
//       }),
//       collaborators: Object.entries(values.Reunioes_Realizadas).map(([name, count]) => ({
//         name,
//         count,
//       })),
//     };
//   });
// };


export const processData = <T extends IData12p | IDataMamba>({
  data,
  goalsOfTheMonth,
  type,
}: ProcessDataProps<T>): ProcessedData[] => {
  let cumulativeValues = 0;
  let cumulativeDays = 0;

  return Object.entries(data).map(([date, values]) => {
    cumulativeDays++;
    let totalDay = 0;
    let keyName = "";
    let collaborators: Array<{ name: string; count: number }> = [];
    let leads: Array<{ name: string; count: number }> = [];

    switch (type) {
      case "leads":
        totalDay = values.LEADS + values.LIMBOLEADS;
        keyName = "Total Leads";
        leads = [
          { name: "Mamba Leads", count: values.LEADS },
          { name: "Limbo Leads", count: values.LIMBOLEADS },
        ];
        break;

      case "ra":
        totalDay = Object.values<number>(values.Reunioes_Agendadas).reduce(
          (a, b) => a + b,
          0
        );
        keyName = "Total Reunioes Agendadas";
        collaborators = Object.entries(values.Reunioes_Agendadas).map(
          ([name, count]) => ({ name, count })
        );
        break;

      case "wons":
        totalDay = Object.values<number>(values.LEADS_WON).reduce(
          (a, b) => a + b,
          0
        );
        keyName = "Leads Won";
        collaborators = Object.entries(values.LEADS_WON).map(([name, count]) => ({
          name,
          count,
        }));
        break;

      case "rr":
        totalDay = Object.values<number>(values.Reunioes_Realizadas).reduce(
          (a, b) => a + b,
          0
        );
        keyName = "Total Reunioes Realizadas";
        collaborators = Object.entries(values.Reunioes_Realizadas).map(
          ([name, count]) => ({ name, count })
        );
        break;

      default:
        throw new Error(`Tipo desconhecido: ${type}`);
    }

    return {
      date,
      [keyName]: totalDay,
      "Meta Diária": calculateGoalsOfTheMonth({
        cumulativeValues: (cumulativeValues += totalDay),
        id: type,
        goalsOfTheMonth,
        cumulativeDays,
      }),
      ...(type === "leads" && { Leads: leads }),
      ...(type !== "leads" && { collaborators }),
    };
  });
};