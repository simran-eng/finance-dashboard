import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

export default function Charts({ data }) {
  const categoryMap = {};

  data.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md mt-4">
      <h2 className="mb-3 font-semibold text-gray-700">
        Analytics
      </h2>

      {/* Pie Chart */}
      <PieChart width={350} height={250}>
        <Pie data={pieData} dataKey="value" outerRadius={90}>
          {pieData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Line Chart */}
      <LineChart width={400} height={200} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#4F46E5" />
      </LineChart>
    </div>
  );
}