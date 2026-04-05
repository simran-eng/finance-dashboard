export default function Transactions({ data, role, setData }) {

  const handleDelete = (id) => {
    const updated = data.filter(item => item.id !== id);
    setData(updated);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="font-medium mb-2">Recent Transactions</h2>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item.id} className="border-b">
              <td>{item.date}</td>
              <td>₹ {item.amount}</td>
              <td>{item.category}</td>
              <td>{item.type}</td>

              {role === "admin" && (
                <td>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 text-sm"
                  >
                    remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}