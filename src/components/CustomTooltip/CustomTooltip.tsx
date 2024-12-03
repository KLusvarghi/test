import { Payload } from "recharts/types/component/DefaultTooltipContent";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload<number, string>[]; // Define ValueType como number e NameType como string
  label?: string;
  data: Array<{
    date: string;
    collaborators?: Array<{
      name: string;
      count: number;
      totalValues?: number;
    }>;
    Leads?: Array<{
      name: string;
      count: number;
      totalValues?: number;
    }>;
  }>;
  groupKey: "collaborators" | "Leads"; // Nova propriedade para definir o grupo
  graphic: "wons" | "leads" | "rr" | "ra";
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  data,
  groupKey,
  graphic,
}) => {
  if (active && payload && payload.length) {
    // Índice do dia atual
    const currentIndex = data.findIndex((d) => d.date === label);

    // Obter dados do dia anterior para comparação
    const previousDayData =
      currentIndex > 0 ? data[currentIndex - 1]?.[groupKey] || [] : [];

    // Criar um mapa do dia anterior, incluindo totalValues
    const previousDayMap: Record<
      string,
      { count: number; totalValues?: number }
    > = previousDayData.reduce(
      (
        acc: Record<string, { count: number; totalValues?: number }>,
        item: { name: string; count: number; totalValues?: number },
      ) => {
        acc[item.name] = { count: item.count, totalValues: item.totalValues };
        return acc;
      },
      {},
    );

    // Dados do dia atual para exibir no tooltip
    const currentDayData = data[currentIndex]?.[groupKey] || [];

    return (
      <div
        style={{
          borderRadius: "6px",
          backgroundColor: "rgba(0, 0, 0, .9)",
          backdropFilter: "blur(1px)",
          border: "1px solid black",
          zIndex: 1000,
          position: "relative",
          left: "20px",
          padding: "10px",
        }}
      >
        <p className="mb-1 text-[10px] font-medium text-white">{label}</p>
        {payload.map((entry, index) => {
          const name = entry.name || "Desconhecido";
          const value = entry.value ?? 0;

          // Obter os valores do dia anterior, incluindo totalValues
          const previousData = previousDayMap[name] || {
            count: 0,
            totalValues: 0,
          };
          const previousValue = previousData.count || 0;

          // Valor atual de totalValues do colaborador
          const currentCollaborator = currentDayData.find(
            (collab) => collab.name === name,
          );

          let currentTotalValues;
          if (graphic === "wons") {
            currentTotalValues = currentCollaborator?.totalValues || 0;
          } else {
            currentTotalValues = currentCollaborator?.count || 0;
          }

          const increase =
            value > previousValue
              ? "up"
              : value < previousValue
                ? "down"
                : "neutral";

          return (
            <p
              key={index}
              style={{
                color: entry.color,
                fontWeight: "bolder",
                display: "flex",
                justifyContent: "center",
                gap: "5px",
              }}
              className="text-[8px]"
            >
              {`${name}: `}
              {name !== "Meta Diária" ? (
                <>
                  {graphic === "wons" ? ` (${currentTotalValues}) ` : ""}
                  {value}
                  <img src={`/icons/${increase}.svg`} alt={increase} />
                </>
              ) : (
                `${value} `
              )}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
