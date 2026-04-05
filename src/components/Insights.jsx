export default function Insights({ data }) {

  let max = 0;
  let category = "";

  data.forEach(item => {
    if (item.type === "expense" && item.amount > max) {
      max = item.amount;
      category = item.category;
    }
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="font-medium">Quick Insight</h2>
      <p className="text-sm mt-1">
        You spent the most on <b>{category}</b>.
      </p>
    </div>
  );
}