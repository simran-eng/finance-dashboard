export default function RoleToggle({ role, setRole }) {
  return (
    <div className="mb-4">
      <label className="mr-2">Role:</label>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}