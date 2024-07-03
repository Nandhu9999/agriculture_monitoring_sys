import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LineChartRecord = {
  name: string;
  label: string;
  value: number;
};

type CommonLineChart = {
  label: string;
  unit: string;
  color: string;
  rawData: number[];
};

export default function CommonLineChart({
  label,
  unit,
  color,
  rawData,
}: CommonLineChart) {
  const data: LineChartRecord[] = rawData.map(
    (d: number, idx: number): LineChartRecord => ({
      name: "n" + idx,
      label: label,
      value: d,
    })
  );

  return (
    <ResponsiveContainer width="100%" className={"aspect-video"}>
      <LineChart
        width={60}
        height={30}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          label={{ value: unit, angle: 0, position: "insideLeft" }}
        />
        <Tooltip />
        {/* <Legend /> */}
        <Line yAxisId="left" type="monotone" dataKey="value" stroke={color} />
      </LineChart>
    </ResponsiveContainer>
  );
}
