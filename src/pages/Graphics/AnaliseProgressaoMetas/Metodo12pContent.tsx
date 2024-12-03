import useSystemGeneralProviderContext from "@/hooks/useSystemGeneralProviderContext";
import useSystemGenericProviderContext from "@/hooks/useSystemGenericProviderContext";
import { calculateGoalsOfTheMonth } from "@/utils/calculateGoalsOfTheMonth";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import { Container } from "@/components/ui";
import Modal from "@/components/Modal/Modal";
import FilterGroupForm from "@/components/Form/FilterGroupForm";
import FilterDataForm from "@/components/Form/FilterDataForm";
import GraphicNav from "@/components/Nav/GraphicNav";
import Leads from "@/components/Graphics/Leads";
import ReunioesAgendadas from "@/components/Graphics/ReunioesAgendadas";
import ReuniosRealizadas from "@/components/Graphics/ReuniosRealizadas";
import Wons from "@/components/Graphics/Wons";

export default function Metodo12PContent() {
  const {
    data,
    dataWons,
    error,
    loading,
    goalsOfTheMonth,
    graphicGroup,
    setGraphicGroup,
    resetGroup,
    setEndDay,
    setStartDay,
    handleReset,
  } = useSystemGenericProviderContext();

  const {
    isPrefGroupOpen,
    onClose,
    isDaysOpen,
    isHiddenNav,
    currentGroupIndex,
    setCurrentGroupIndex,
    isGraphiOpen,
    setIsGraphiOpen,
    selectedGraphicIndex,
    setSelectedGraphicIndex,
  } = useSystemGeneralProviderContext();

  const colorGraphic = {
    label: "#fff",
    grid: "#252525",
    line: "#ff0000",
    bar: "#FFA500",
    bar2: "#FEC685",
    bar3: "#BF4854",
    bar4: "#FF4E35",
    bar5: "#f1774e",
    bar6: "#d64a1f",
    bar7: "#df381b",
    bar8: "#fd7403",
  };

  let cumulativeValuesLeads = 0;
  let cumulativeDaysLeads = 0;
  let cumulativeValuesWons = 0;
  let cumulativeDaysWons = 0;
  let cumulativeValuesRR = 0;
  let cumulativeDaysRR = 0;
  let cumulativeValuesRA = 0;
  let cumulativeDaysRA = 0;
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Obtém o mês atual (1-12)

  // Variáveis que contem o objeto específico para cada gráfico
  const leadsData = Object.entries(data).map(([date, values]) => {
    const entryMonth = parseInt(date.split("/")[1], 10); // Extrai o mês da data no formato DD/MM

    if (entryMonth === currentMonth) {
      cumulativeValuesLeads += values.LEADS;
      cumulativeDaysLeads++;
    }

    return {
      date,
      Leads: [
        { name: "DisneyLeads", count: values.LEADS },
        { name: "Limbo Leads", count: values.LIMBOLEADS },
      ],
      "Total Leads": values.LEADS + values.LIMBOLEADS,
      "Meta Diária": calculateGoalsOfTheMonth({
        cumulativeValues: cumulativeValuesLeads,
        id: "leads",
        goalsOfTheMonth,
        cumulativeDays: cumulativeDaysLeads,
      }),
    };
  });

  const reunioesAgendadasData = Object.entries(data).map(([date, values]) => {
    // Soma o total de reuniões agendadas do dia ao acumulador de reuniões agendadas
    const totalReunioesDia = Object.values(values.Reunioes_Agendadas).reduce(
      (a, b) => a + b,
      0,
    );
    const entryMonth = parseInt(date.split("/")[1], 10); // Extrai o mês da data no formato DD/MM
    if (entryMonth === currentMonth) {
      cumulativeValuesRA += totalReunioesDia;
      cumulativeDaysRA++;
    }
    return {
      date,
      "Total Reunioes Agendadas": totalReunioesDia,
      "Meta Diária": calculateGoalsOfTheMonth({
        cumulativeValues: cumulativeValuesRA,
        id: "ra",
        goalsOfTheMonth,
        cumulativeDays: cumulativeDaysRA,
      }),
      collaborators: Object.entries(values.Reunioes_Agendadas).map(
        ([name, count]) => ({ name, count }),
      ),
    };
  });

  const wonsData = Object.entries(dataWons).map(([date, values]) => {
    // Calcula o total de vendas no dia somando as vendas de todas as pessoas
    const totalLeadsWonDia = values.reduce((total, entry) => {
      const collaboratorData = Object.values(entry)[0]; // Obtém o objeto interno
      return total + parseFloat(collaboratorData.total_faturamento); // Soma as vendas totais
    }, 0);

    const entryMonth = parseInt(date.split("/")[1], 10); // Extrai o mês da data no formato DD/MM
    if (entryMonth === currentMonth) {
      cumulativeValuesWons += totalLeadsWonDia;
      cumulativeDaysWons++;
    }

    // Adiciona as informações processadas ao resultado
    return {
      date,
      "Total Leads Won": new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 0, // Sem casas decimais
        maximumFractionDigits: 0, // Garante que não há casas decimais
      }).format(totalLeadsWonDia),
      "Total faturamento": values.reduce(
        (total, entry) =>
          total + parseFloat(Object.values(entry)[0].total_faturamento),
        0,
      ),
      "Meta Diária": calculateGoalsOfTheMonth({
        cumulativeValues: cumulativeValuesWons, // Total acumulado de vendas
        id: "wons",
        goalsOfTheMonth,
        cumulativeDays: cumulativeDaysWons,
      }),
      collaborators: values.map((entry) => {
        const [name, collaboratorData] = Object.entries(entry)[0]; // Obtém o par chave-valor do objeto
        return {
          name,
          count: parseFloat(collaboratorData.total_faturamento), // Garante que count é um número
          totalValues: collaboratorData.vendas_totais,
        };
      }),
    };
  });

  const reunioesRealizadasData = Object.entries(data).map(([date, values]) => {
    const totalReunioesDia = Object.values(values.Reunioes_Realizadas).reduce(
      (a, b) => a + b,
      0,
    );

    const entryMonth = parseInt(date.split("/")[1], 10); // Extrai o mês da data no formato DD/MM
    if (entryMonth === currentMonth) {
      cumulativeValuesRR += totalReunioesDia;
      cumulativeDaysRR++;
    }

    return {
      date,
      "Total Reunioes Realizadas": totalReunioesDia,
      "Meta Diária": calculateGoalsOfTheMonth({
        cumulativeValues: cumulativeValuesRR,
        id: "rr",
        goalsOfTheMonth,
        cumulativeDays: cumulativeDaysRR,
      }),
      collaborators: Object.entries(values.Reunioes_Realizadas).map(
        ([name, count]) => ({ name, count }),
      ),
    };
  });

  // Array que contem a chamada dois gráficos com suas props
  const graphics = [
    <Leads name="Leads" data={leadsData} colors={colorGraphic} />,
    <ReunioesAgendadas
      name="Reuniões Agendadas"
      data={reunioesAgendadasData}
      colors={colorGraphic}
    />,
    <Wons name="Wons" data={wonsData} colors={colorGraphic} />,
    <ReuniosRealizadas
      name="Reuniões Realizadas"
      data={reunioesRealizadasData}
      colors={colorGraphic}
    />,
  ];

  // Exibição condicional de carregamento e erro após o useEffect
  if (loading) return <Loader />;
  if (error)
    return (
      <Error
        error={"Erro ao requisitar os dados. Consulte a API"}
        className="text-sm"
      />
    );
  return (
    <div className="max-w-screen relative ml-[88px] flex h-screen flex-col justify-center gap-2">
      {graphicGroup[currentGroupIndex]?.map((index, idx) => (
        <Container
          key={`graphic-${currentGroupIndex}-${index}-${idx}`}
          className="bg-bgOpacity/30"
        >
          {graphics[index]}
        </Container>
      ))}
      {isHiddenNav && (
        <GraphicNav
          graphicGroup={graphicGroup}
          setIsGraphiOpen={() => setIsGraphiOpen(true)}
          setSelectedGraphicIndex={(index) => setSelectedGraphicIndex(index)}
          setCurrentGroup={setCurrentGroupIndex}
        />
      )}
      {/* Modal para exibir o gráfico selecionado */}
      {isGraphiOpen && selectedGraphicIndex !== null && (
        <Modal onClose={() => setIsGraphiOpen(false)}>
          {graphics[selectedGraphicIndex]}
        </Modal>
      )}

      {/* Modal para a preferência de gráfico exibido */}
      {isPrefGroupOpen && (
        <Modal onClose={() => onClose("group")}>
          <FilterGroupForm
            setGraphicGroup={setGraphicGroup}
            resetGroup={resetGroup}
            onClose={() => onClose("group")}
          />
        </Modal>
      )}

      {/* Modal para filtrar data */}
      {isDaysOpen && (
        <Modal onClose={() => onClose("filter")}>
          <FilterDataForm
            handleReset={handleReset}
            setStartDay={setStartDay}
            setEndDay={setEndDay}
            onClose={() => onClose("filter")}
          />
        </Modal>
      )}
    </div>
  );
}
