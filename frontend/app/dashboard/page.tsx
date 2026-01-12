'use client';

export default function DashboardPage() {
    return (
        <div className="space-y-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Portfolio" value="$ 1,240,500" trend="+12.5%" trendUp={true} />
                <StatCard title="Active Loans" value="342" trend="+4" trendUp={true} />
                <StatCard title="Avg. Risk Score" value="724" trend="-2 pts" trendUp={false} warning={false} />
                <StatCard title="Default Rate" value="2.4%" trend="-0.1%" trendUp={true} warning={false} />
            </div>

            {/* Main Action Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Decisions</h3>
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="border-b border-slate-800 uppercase text-xs font-semibold text-slate-500">
                            <tr>
                                <th className="pb-3">Borrower</th>
                                <th className="pb-3">Amount</th>
                                <th className="pb-3">Score</th>
                                <th className="pb-3">Decision</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <Row name="James K." amount="GHS 5,000" score="780" status="Approved" />
                            <Row name="Sarah M." amount="KES 120,000" score="645" status="Review" />
                            <Row name="Emmanuel O." amount="NGN 500,000" score="810" status="Approved" />
                            <Row name="Kwame A." amount="GHS 25,000" score="420" status="Rejected" />
                            <Row name="Zainab B." amount="USD 1,000" score="715" status="Approved" />
                        </tbody>
                    </table>
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors">
                            + New Assessment
                        </button>
                        <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2 rounded-lg transition-colors border border-slate-700">
                            Add Client
                        </button>
                        <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2 rounded-lg transition-colors border border-slate-700">
                            Download Report
                        </button>
                    </div>

                    <div className="mt-8 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                        <h4 className="text-indigo-400 font-semibold mb-1">System Health</h4>
                        <div className="flex items-center space-x-2 text-sm text-slate-400">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span>Risk Engine Online</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-400 mt-1">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span>Audit Vault Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, trendUp, warning }: any) {
    return (
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
            <div className="flex justify-between items-end mt-2">
                <h3 className="text-2xl font-bold text-white">{value}</h3>
                <span className={`text-xs px-2 py-1 rounded font-medium ${trendUp ? 'bg-emerald-900/30 text-emerald-400' : 'bg-rose-900/30 text-rose-400'
                    }`}>
                    {trend}
                </span>
            </div>
        </div>
    )
}

function Row({ name, amount, score, status }: any) {
    let color = 'text-slate-400';
    let bg = 'bg-slate-800';
    if (status === 'Approved') { color = 'text-emerald-400'; bg = 'bg-emerald-900/20'; }
    if (status === 'Rejected') { color = 'text-rose-400'; bg = 'bg-rose-900/20'; }
    if (status === 'Review') { color = 'text-amber-400'; bg = 'bg-amber-900/20'; }

    return (
        <tr>
            <td className="py-3 font-medium text-white">{name}</td>
            <td className="py-3 font-mono text-slate-400">{amount}</td>
            <td className="py-3 font-bold text-slate-300">{score}</td>
            <td className="py-3">
                <span className={`text-xs px-2 py-1 rounded font-semibold ${color} ${bg}`}>
                    {status}
                </span>
            </td>
        </tr>
    )
}
