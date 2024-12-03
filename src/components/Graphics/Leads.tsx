import { ILeadsProps } from "@/types/auxProps";
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
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { H1, Wrapper } from "../ui";
import CustomTooltip from "../CustomTooltip/CustomTooltip";

const Leads = ({ name, data, colors }: ILeadsProps) => {
  const labelStyle = { fontSize: 8 };

  return (
    <Wrapper>
      <H1>{name}</H1>
      <ComposedChart
        className="mx-auto w-full"
        width={666}
        height={200}
        data={data}
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
              groupKey="Leads"
              graphic="leads"
            />
          )}
        />
        <Legend />

        {/* percorre o obejto 'Leads' dentro de data e exibe o componente de barra */}
        {data[0]?.Leads.map((lead, index) => (
          <Bar
            key={lead.name}
            dataKey={`Leads[${index}].count`}
            name={lead.name}
            stackId="a"
            fill={index === 0 ? colors.bar : colors.bar2}
          >
            {/* Caso o index seja igual ao ultimo valor do array, ele exibe p labelList" */}
            {index === data[0]?.Leads.length - 1 && (
              <LabelList
                dataKey={`Total Leads`}
                position="top"
                fill="#fff"
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

export default Leads;
