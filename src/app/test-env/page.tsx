"use client";

export default function TestEnvPage() {
    return (
        <div className="p-10">
            <h1>Environment Variable Test</h1>
            <p>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Loaded" : "Not Loaded"}</p>
            <p>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "Loaded" : "Not Loaded"}</p>
            <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "Loaded" : "Not Loaded"}</p>

            <pre className="mt-4 p-4 bg-slate-100 rounded">
                {JSON.stringify({
                    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                }, null, 2)}
            </pre>
        </div>
    );
}
