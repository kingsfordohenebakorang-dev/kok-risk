export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Analytics & Reports</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 text-white">Portfolio Performance</h3>
                    <div className="h-48 bg-slate-800/50 rounded flex items-center justify-center text-slate-500 text-sm">
                        [Chart: Default Rate vs Time]
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 text-white">Risk Distribution</h3>
                    <div className="h-48 bg-slate-800/50 rounded flex items-center justify-center text-slate-500 text-sm">
                        [Pie Chart: Low vs High Risk]
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-white">Export Data</h3>
                <p className="text-slate-400 text-sm mb-4">Download comprehensive reports for regulatory compliance.</p>
                <div className="flex gap-4">
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded border border-slate-600">Download CSV</button>
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded border border-slate-600">Export PDF</button>
                </div>
            </div>
        </div>
    );
}
