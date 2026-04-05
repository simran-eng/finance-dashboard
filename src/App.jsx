import { useState } from "react";
import { transactions as initialData } from "./data";
import Charts from "./Charts";

export default function App() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("viewer");

  const filteredData = data.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const income = data
    .filter((d) => d.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = data
    .filter((d) => d.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const highestCategory = Object.entries(
    data
      .filter((d) => d.type === "expense")
      .reduce((acc, curr) => {
        acc[curr.category] =
          (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {})
  ).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Finance Dashboard
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <p className="text-gray-500 mb-4">
        Track your financial activity and insights
      </p>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card title="Balance" value={balance} />
        <Card title="Income" value={income} />
        <Card title="Expense" value={expense} />
      </div>

      {/* Charts */}
      <Charts data={data} />

      {/* Insights */}
      <div className="bg-white rounded-2xl shadow-md mt-6 p-4">
        <h2 className="text-lg font-semibold mb-2">Insights</h2>
        <p>
          Highest Spending Category:{" "}
          {highestCategory ? highestCategory[0] : "N/A"}
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search category..."
        className="mt-6 mb-3 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Transactions</h2>

        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredData.map((t) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2">{t.date}</td>
                  <td>₹ {t.amount.toLocaleString()}</td>
                  <td>{t.category}</td>
                  <td>
                    <span
                      className={
                        t.type === "income"
                          ? "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                          : "bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs"
                      }
                    >
                      {t.type}
                    </span>
                  </td>

                  {role === "admin" && (
                    <td>
                      <button
                        onClick={() =>
                          setData(data.filter((d) => d.id !== t.id))
                        }
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800">
        ₹ {value.toLocaleString()}
      </h2>
    </div>
  );
}