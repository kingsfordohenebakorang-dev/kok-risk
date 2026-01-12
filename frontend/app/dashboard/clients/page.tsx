export default function ClientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Client Management</h1>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    + Add Client
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-800/50 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">ID</th>
                            <th className="p-4">Risk Profile</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        <tr>
                            <td className="p-4 text-white font-medium">James K.</td>
                            <td className="p-4 font-mono">USR-2024-001</td>
                            <td className="p-4"><span className="bg-emerald-900/30 text-emerald-400 text-xs px-2 py-1 rounded">Low Risk</span></td>
                            <td className="p-4">Active</td>
                            <td className="p-4 text-blue-400 cursor-pointer hover:underline">View</td>
                        </tr>
                        <tr>
                            <td className="p-4 text-white font-medium">Sarah M.</td>
                            <td className="p-4 font-mono">USR-2024-005</td>
                            <td className="p-4"><span className="bg-amber-900/30 text-amber-400 text-xs px-2 py-1 rounded">Medium</span></td>
                            <td className="p-4">Pending</td>
                            <td className="p-4 text-blue-400 cursor-pointer hover:underline">View</td>
                        </tr>
                    </tbody>
                </table>
                <div className="p-4 text-center text-xs text-slate-500 border-t border-slate-800">
                    Showing 2 of 154 clients
                </div>
            </div>
        </div>
    );
}
