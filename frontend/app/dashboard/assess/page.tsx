'use client';

import { useState } from 'react';

export default function NewAssessmentPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const formData = new FormData(e.currentTarget);
        const payload = {
            borrower_id: formData.get('borrowerId'),
            loan_amount: parseFloat(formData.get('amount') as string),
            currency: formData.get('currency'),
            tenor: parseInt(formData.get('tenor') as string),
            monthly_income: parseFloat(formData.get('income') as string),
            employment_type: formData.get('employment')
        };

        try {
            const token = localStorage.getItem('token');
            // In production use env var
            const API_URL = 'https://kok-risk-git-main-kingsfords-projects-45482bf6.vercel.app';

            const res = await fetch(`${API_URL}/v1/evaluate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');
            setResult(data);

        } catch (err) {
            alert('Assessment Error: ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-white">New Risk Assessment</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Borrower ID</label>
                                <input name="borrowerId" className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white" placeholder="e.g. +23354..." required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Employment Type</label>
                                <select name="employment" className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white">
                                    <option value="SALARIED">Corporate / Salaried</option>
                                    <option value="SME">SME Owner</option>
                                    <option value="GIG">Gig Economy</option>
                                    <option value="INFORMAL">Informal Sector</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Monthly Income</label>
                                <input type="number" name="income" className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white" placeholder="2000" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Loan Tenure (Days)</label>
                                <input type="number" name="tenor" className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white" defaultValue="30" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Loan Amount & Currency</label>
                            <div className="flex gap-4">
                                <select name="currency" className="bg-slate-800 border border-slate-700 rounded p-3 text-white">
                                    <option value="GHS">GHS</option>
                                    <option value="NGN">NGN</option>
                                    <option value="KES">KES</option>
                                    <option value="USD">USD</option>
                                </select>
                                <input type="number" name="amount" className="flex-1 bg-slate-800 border border-slate-700 rounded p-3 text-white" placeholder="5000" required />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all">
                                {loading ? 'Analyzing Actuarial Models...' : 'Calculate Risk & Premium'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-1">
                    {result ? (
                        <div className={`p-6 rounded-xl border ${result.approved ? 'bg-emerald-900/10 border-emerald-500/50' : 'bg-rose-900/10 border-rose-500/50'}`}>
                            <h3 className={`text-xl font-bold mb-4 ${result.approved ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {result.approved ? '✅ Approved' : '❌ Rejected'}
                            </h3>

                            <div className="space-y-4 text-sm text-slate-300">
                                <div className="flex justify-between">
                                    <span>Risk Score:</span>
                                    <span className="font-mono font-bold">{(result.risk.pd * 100).toFixed(1)}% PD</span>
                                </div>

                                {result.approved && (
                                    <>
                                        <div className="bg-slate-800/50 p-4 rounded-lg mt-4 border border-slate-700">
                                            <p className="text-xs uppercase text-slate-500 font-bold mb-2">Insurance Premium</p>
                                            <div className="flex justify-between mb-1">
                                                <span>Base Premium:</span>
                                                <span>{result.pricing.breakdown?.technicalPremium.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between mb-1 text-amber-400">
                                                <span>Inflation Buffer:</span>
                                                <span>{result.pricing.breakdown?.inflationAdjustment.toFixed(2)}</span>
                                            </div>
                                            <div className="border-t border-slate-700 my-2 pt-2 flex justify-between font-bold text-white text-lg">
                                                <span>Total:</span>
                                                <span>{result.pricing.premium} {result.pricing.currency}</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {!result.approved && (
                                    <div className="p-3 bg-rose-900/20 text-rose-300 rounded text-xs">
                                        {result.reasonCodes?.join(', ')}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center p-8 text-center text-slate-500 text-sm">
                            Fill out the form to generate a risk profile and pricing.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
