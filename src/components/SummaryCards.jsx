export default function SummaryCards({ data }) {

  let income = 0;
  let expense = 0;

  data.forEach(item => {
    if (item.type === "income") {
      income += item.amount;
    } else {
      expense += item.amount;
    }
  });

  const balance = income - expense;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <Card title="Total Balance" value={balance} />
      <Card title="Total Income" value={income} />
      <Card title="Total Expense" value={expense} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-semibold">₹ {value}</h2>
    </div>
  );
}