export default function ApiDocsPage() {
    return (
        <div className="h-[calc(100vh-8rem)]">
            <h1 className="text-2xl font-bold text-white mb-4">API Documentation</h1>
            <div className="w-full h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <iframe
                    src="http://localhost:10000/docs.html"
                    className="w-full h-full border-none"
                    title="API Docs"
                />
            </div>
        </div>
    );
}
