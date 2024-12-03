import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { H1, Wrapper } from "../ui";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { IReunioesAgendadasProps } from "@/types/auxProps";

const ReunioesAgendadas = ({ name, data, colors }: IReunioesAgendadasProps) => {
  const labelStyle = { fontSize: 8 };

  const processedData = data.map((item) => {
    const collaboratorsData = item.collaborators.reduce(
      (acc: Record<string, number>, collaborator) => {
        acc[collaborator.name] = collaborator.count;
        return acc;
      },
      {},
    );

    return {
      ...item,
      ...collaboratorsData,
      "Total Reunioes Agendadas": item["Total Reunioes Agendadas"],
      "Meta Diária": item["Meta Diária"],
    };
  });

  const collaboratorNames = Array.from(
    new Set(
      data.flatMap((item) =>
        item.collaborators
          .map((c) => c.name)
          .filter((name) => name !== "Murillo Almeida"),
      ),
    ),
  );

  const barColors = [
    colors.bar,
    colors.bar2 || colors.bar,
    colors.bar3 || colors.bar,
    colors.bar4 || colors.bar,
    colors.bar5 || colors.bar,
    colors.bar6 || colors.bar,
    colors.bar7 || colors.bar,
    colors.bar8 || colors.bar,
    colors.bar9 || colors.bar,
    colors.bar10 || colors.bar,
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
              graphic="ra"
            />
          )}
        />
        <Legend />

        {collaboratorNames.map((collaboratorName, index) => {
          if (!collaboratorName[index].match("Murillo Almeida")) {
            return (
              <Bar
                key={collaboratorName}
                dataKey={collaboratorName}
                stackId="a"
                fill={barColors[index % barColors.length]}
              >
                {index === collaboratorNames.length - 1 && (
                  <LabelList
                    dataKey="Total Reunioes Agendadas"
                    position="top"
                    fill={colors.label}
                    style={{ fontSize: "8px" }}
                  />
                )}
              </Bar>
            );
          }
        })}

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

export default ReunioesAgendadas;
