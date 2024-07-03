import {
  RadialBar,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
} from "recharts";

const data = [
  {
    name: "a",
    uv: 10.47,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "b",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "c",
    uv: 45.69,
    pv: 1398,
    fill: "#8dd1e1",
  },
  {
    name: "d",
    uv: 45.22,
    pv: 9800,
    fill: "#82ca9d",
  },
];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

export default function SimpleRadialBarChart({}) {
  return (
    <ResponsiveContainer width="100%" className={"aspect-video"}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
        barSize={20}
        data={data}
      >
        <RadialBar
          // label={{ position: "insideStart", fill: "#fff" }}
          background
          dataKey="uv"
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
