import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "A", label1: 40, label2: 24, value: 24 },
  { name: "B", label1: 30, label2: 13, value: 22 },
  { name: "C", label1: 20, label2: 98, value: 22 },
  { name: "D", label1: 27, label2: 39, value: 20 },
  { name: "E", label1: 18, label2: 48, value: 21 },
  { name: "F", label1: 23, label2: 38, value: 25 },
  { name: "G", label1: 34, label2: 43, value: 21 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          label={{ value: "Label 1", angle: -90, position: "insideLeft" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: "Label 2", angle: -90, position: "insideRight" }}
        />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="label1"
          stroke="#8884d8"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="label2"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
