// RECEBE UM CHILDREN
export interface IChildrenProps {
  children: React.ReactNode;
}
// CONTEXTO DO THEME
export interface IThemeContextProps {
  theme: "mamba" | "metodo12p";
  setTheme: () => void;
}

// CORES QUE COMPOEM O GRÁFICO
export interface GraphicColor {
  label: string;
  grid: string;
  line: string;
  bar: string;
  bar2?: string;
  bar3?: string;
  bar4?: string;
  bar5?: string;
  bar6?: string;
  bar7?: string;
  bar8?: string;
  bar9?: string;
  bar10?: string;
}

// ------------------------------------
export interface ICollaboratorProps {
  name: string;
  count: number;
  totalValues?: number;
}

export interface IGenericGraphicData {
  date: string;
  "Meta Diária": number;
  collaborators: ICollaboratorProps[];
}

// INTERFACES PARA OS GRÁFICOS
// LEADS
export interface ILeadsProps {
  name: "Leads";
  data: Array<{
    date: string; // Data do dia
    "Total Leads": number; // Soma total de leads do dia
    "Meta Diária": number; // Meta calculada para o dia
    Leads: Array<{
      name: string; // Nome do tipo de lead (ex.: "Mamba Leads")
      count: number; // Quantidade de leads para o tipo
    }>;
  }>;
  colors: GraphicColor; // Paleta de cores para os gráficos
}

// REUNIÕES AGENDADAS

export interface IReunioesAgendadasProps {
  name: "Reuniões Agendadas";
  data: Array<{
    date: string;
    "Total Reunioes Agendadas": number;
    "Meta Diária": number;
    collaborators: Array<{ name: string; count: number }>;
  }>;
  colors: GraphicColor;
}

// WONS
export interface IWonsProps {
  name: "Wons";
  data: Array<
    IGenericGraphicData & {
      "Total Leads Won": number | string;
    }
  >;
  colors: GraphicColor;
}

// REUNIÕES REALIZADAS
export interface IReunioesRealizadasProps {
  name: "Reuniões Realizadas";
  data: Array<
    IGenericGraphicData & {
      "Total Reunioes Realizadas": number;
    }
  >;
  colors: GraphicColor;
}

// METAS MENSAIS DE CADA GRÁFICO (goalsOfTheMonth)
export interface IGoalsOfTheMonth {
  id: string;
  monthGoals: number;
  businessDays: number;
}

// JSON DE BUSSINESDAY
interface HolidayDetails {
  count: number;
  days: number[];
  holiday: string[];
}

interface WeekendsDetails {
  count: number;
  days: number[][];
}

interface CompanyRecessDetails {
  count: number;
  days: number[][];
}

interface MonthDetails {
  holiday: HolidayDetails;
  weekends: WeekendsDetails;
  companyRecess: CompanyRecessDetails;
}

interface YearDetails {
  [month: string]: MonthDetails;
}

export interface AnnualDetails {
  [year: string]: YearDetails;
}

// JSON DA API - 12P
interface ILeadsWon12p {
  Jennifer: number;
  Juliana: number;
  Lauro: number;
}

interface IReunioesAgendadas12p {
  Bianca: number;
  Kamila: number;
  Larissa: number;
  Leonardo: number;
  Maricota: number;
  Nayara: number;
  Pexa: number;
  Victor: number;
}

interface IReunioesRealizadas12p {
  Jennifer: number;
  Juliana: number;
  Lauro: number;
}

export interface IContent12p {
  LEADS: number;
  LIMBOLEADS: number;
  LEADS_WON: ILeadsWon12p;
  Reunioes_Agendadas: IReunioesAgendadas12p;
  Reunioes_Realizadas: IReunioesRealizadas12p;
}

export interface IData12p {
  [date: string]: IContent12p;
}

// JSON DA API - MAMBA
interface ILeadsWonMamba {
  "Carol Mendes": number;
  "Murilo Almeida": number;
}

interface IReunioesAgendadasMamba {
  Nathaly: number;
  Augusto: number;
  Bento: number;
  Leonardo: number;
  Ricardo: number;
}

interface IReunioesRealizadasMamba {
  "Carol Mendes": number;
  "Murilo Almeida": number;
}

export interface IContentMamba {
  LEADS: number;
  LIMBOLEADS: number;
  LEADS_WON: ILeadsWonMamba;
  Reunioes_Agendadas: IReunioesAgendadasMamba;
  Reunioes_Realizadas: IReunioesRealizadasMamba;
}

export interface IDataMamba {
  [date: string]: IContentMamba;
}

// JSON API WONS
export interface IResponseDataWons {
  date: string;
  id: number;
  last_update: string;
  ticket_medio: string;
  total_faturamento: string;
  user_name: string;
  vendas_totais: number;
}

// O QUE ESPERO DE RETORNO APÓS TRANSFORMAR O DATA
export type ISalesData = Array<{
  [collaborator: string]: {
    ticket_medio: string;
    total_faturamento: string;
    vendas_totais: number;
  };
}>;

export interface IDataWons {
  [date: string]: ISalesData;
}

// CONTEXTOS BASE
export interface ISystemMetodoBaseContext {
  error: boolean | null;
  loading: boolean;
  setError: (value: boolean) => void;
  goalsOfTheMonth: IGoalsOfTheMonth[];
  setGoalsOfTheMonth: React.Dispatch<React.SetStateAction<IGoalsOfTheMonth[]>>;
  graphicGroup: number[][];
  setGraphicGroup: (group: number[][]) => void;
  resetGroup: () => void;
  setStartDay: (value: number | null) => void;
  setEndDay: (value: number | null) => void;
  handleReset: () => void;
  dataWons: IDataWons;
  activeCompany: string;
  setActiveCompany: React.Dispatch<React.SetStateAction<"mamba" | "metodo12p">>;
}

// 12P
export interface ISystemGenericProvider extends ISystemMetodoBaseContext {
  data:
    | ({ activeCompany: "mamba" } & IDataMamba)
    | ({ activeCompany: "metodo12p" } & IData12p);
}

// 12P
export interface ISystemMetodo12PContext extends ISystemMetodoBaseContext {
  data: IData12p;
}

// MAMBA
export interface ISystemMambaContext extends ISystemMetodoBaseContext {
  data: IDataMamba;
}

// GENERAL CONTEXT
export interface ISystemGeneralContext {
  setNotificationContent: React.Dispatch<
    React.SetStateAction<{
      status: boolean | null;
      message: string | null;
    }>
  >;
  notificationContent: {
    status: boolean | null;
    message: string | null;
  };
  onClose: (type: "group" | "filter" | "nav") => void;
  isPrefGroupOpen: boolean;
  isDaysOpen: boolean;
  isHiddenNav: boolean;
  // novas
  selectedGraphicIndex: number | null;
  setSelectedGraphicIndex: React.Dispatch<React.SetStateAction<number | null>>;
  currentGroupIndex: number;
  setCurrentGroupIndex: React.Dispatch<React.SetStateAction<number>>;
  isGraphiOpen: boolean;
  setIsGraphiOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startInterval: () => void;
  // processdata
  // processData: <T extends IDataMamba | IData12p>(
  //   params: ProcessDataProps<T>,
  // ) => ProcessedData[];
}

// Tipo para os parâmetros da função `processData`
export interface ProcessDataProps<T extends IDataMamba | IData12p> {
  data: T;
  goalsOfTheMonth: IGoalsOfTheMonth[];
  type: "leads" | "ra" | "wons" | "rr";
}

// Tipo para os dados processados pela função `processData`
export type ProcessedData<T extends IDataMamba | IData12p> =
  T extends IDataMamba
    ? {
        date: string;
        "Total Leads": number;
        "Meta Diária": number;
        Leads: Array<{ name: string; count: number }>;
      }
    : {
        date: string;
        "Total Reunioes Agendadas": number;
        "Meta Diária": number;
        collaborators: Array<{ name: string; count: number }>;
      };

// CALCULAR META DIÁRIA
interface MonthData {
  month: number;
  days: number;
}

export interface DaysOfMonth {
  [year: string]: MonthData[];
}

// RESPONSE API
export interface IApiResponse {
  dados: string;
  data_referencia: string; // Data de referência
  id: number;
}

// Tipagem ajustada para a API de resposta
export type FetchedData = IApiResponse[];
