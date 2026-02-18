"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard"); // Redirect to dashboard after login
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.");
            } else {
                setError("Failed to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-64 bg-indigo-600 skew-y-6 transform -translate-y-32 z-0" />

            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-xl z-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                </Link>

                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-slate-600">Sign in to access your dashboard</p>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
                <div className="text-center text-sm pt-4 border-t border-slate-100">
                    <span className="text-slate-500">Don't have an account? </span>
                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
