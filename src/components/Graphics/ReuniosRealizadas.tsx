import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
  Legend,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { H1, Wrapper } from "../ui";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { IReunioesRealizadasProps } from "@/types/auxProps";

const ReuniosRealizadas = ({
  name,
  data,
  colors,
}: IReunioesRealizadasProps) => {
  const labelStyle = { fontSize: 8 };

  // função que retorna além dos data recebido ele insere os calaboradores
  const processedData = data.map((item) => {
    // Extrai dados dos colaboradores para adicionar ao objeto
    const collaboratorsData = item.collaborators.reduce(
      (acc: Record<string, number>, collaborator) => {
        const name =
          collaborator.name === "Murillo Almeida"
            ? "Murilo Almeida"
            : collaborator.name;
        acc[name] = collaborator.count;
        return acc;
      },
      {},
    );

    return {
      ...item,
      ...collaboratorsData,
      "Total Reunioes Realizadas": item["Total Reunioes Realizadas"],
      "Meta Diária": item["Meta Diária"],
    };
  });

  // Obter os nomes únicos dos colaboradores para renderizar as barras
  const collaboratorNames = Array.from(
    new Set(
      data.flatMap((item) =>
        item.collaborators.map((c) =>
          c.name === "Murillo Almeida" ? "Murilo Almeida" : c.name,
        ),
      ),
    ),
  );

  const barColors = [
    colors.bar,
    colors.bar2 || colors.bar,
    colors.bar3 || colors.bar,
    colors.bar4 || colors.bar,
    colors.bar5 || colors.bar,
  ];

  return (
    <Wrapper>
      <H1>{name}</H1>
      <ComposedChart
        className="mx-auto w-full"
        width={666}
        height={200}
        data={processedData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke={colors.grid} />
        <XAxis dataKey="date" tick={{ ...labelStyle }} />
        <YAxis tick={{ ...labelStyle }} />
        <Tooltip
          content={(props: {
            active?: boolean;
            payload?: Payload<number, string>[];
            label?: string;
          }) => (
            <CustomTooltip
              {...props}
              data={data}
              groupKey="collaborators"
              graphic="rr"
            />
          )}
        />
        <Legend />
        {/* percorre os colaboradoresName e exibe o componente de barra */}
        {collaboratorNames.map((collaboratorName, index) => (
          <Bar
            key={collaboratorName}
            dataKey={collaboratorName}
            stackId="a"
            fill={barColors[index % barColors.length]}
          >
            {/* Caso o index seja igual ao ultimo valor do array, ele exibe p labelList" */}
            {index === collaboratorNames.length - 1 && (
              <LabelList
                dataKey="Total Reunioes Realizadas"
                position="top"
                fill={colors.label}
                style={{ fontSize: "8px" }}
              />
            )}
          </Bar>
        ))}
        <Line
          type="monotone"
          dataKey="Meta Diária"
          stroke={colors.line}
          strokeWidth={0}
          activeDot={{ r: 4 }}
          dot={false}
        />
      </ComposedChart>
    </Wrapper>
  );
};

export default ReuniosRealizadas;
