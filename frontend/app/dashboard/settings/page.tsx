export default function SettingsPage() {
    return (
        <div className="max-w-2xl text-slate-300">
            <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

            <div className="bg-slate-900 border border-slate-800 rounded-xl divide-y divide-slate-800">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-1">Profile Information</h3>
                    <p className="text-sm text-slate-500 mb-4">Update your account details and email.</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Company Name</label>
                            <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" defaultValue="HQ Bank" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" defaultValue="admin@risk.co" />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-1">Security</h3>
                    <p className="text-sm text-slate-500 mb-4">Manage password and 2FA.</p>
                    <button className="text-blue-400 text-sm hover:underline">Change Password</button>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-1">API Keys</h3>
                    <p className="text-sm text-slate-500 mb-4">Manage access tokens for your integrations.</p>
                    <div className="flex items-center justify-between bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs">
                        <span>sk_live_582...9320</span>
                        <button className="text-slate-500 hover:text-white">Copy</button>
                    </div>
                    <button className="mt-4 text-sm bg-slate-800 text-white px-3 py-2 rounded">Regenerate Key</button>
                </div>
            </div>
        </div>
    );
}
