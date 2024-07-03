import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];
const data03 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const data = [data01, data02, data03];

type PieChartInput = {
  labels: string[];
  unit: string;
  colors: string[];
};

export default function MultiLevelPieChart({
  labels,
  unit,
  colors,
}: PieChartInput) {
  console.log(labels, unit, colors);
  const piechartInit = 30;
  const piechartWidth = 20;
  const piechartGap = piechartWidth;
  return (
    <ResponsiveContainer height={"100%"} className={"aspect-video"}>
      <PieChart width={400} height={400}>
        {labels.map((_: string, idx: number) => {
          return (
            <Pie
              data={data[idx]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={piechartInit + idx * piechartGap - piechartWidth}
              outerRadius={piechartInit + idx * piechartGap}
              fill={colors[idx]}
            />
          );
        })}
        {/* <Pie
          data={data02}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          label
        /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}
