export function Leaderboard() {
  // leaderboard page for users to see how they compare to others

  return (
    <div className="flex flex-col">
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Carbon Offset</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">John</td>
              <td className="border px-4 py-2">10</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2">Jane</td>
              <td className="border px-4 py-2">5</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Bob</td>
              <td className="border px-4 py-2">7</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
