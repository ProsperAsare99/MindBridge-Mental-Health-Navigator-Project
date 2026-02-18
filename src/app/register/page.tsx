"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ShaderBackground from "@/components/shader-background";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [institution, setInstitution] = useState("");
    const [studentId, setStudentId] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Update the user's display name
            await updateProfile(userCredential.user, {
                displayName: name
            });

            // Save additional user details to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                institution,
                studentId,
                course,
                createdAt: new Date(),
            });

            router.push("/dashboard"); // Redirect to dashboard after registration
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError("Email is already in use.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen font-sans text-white selection:bg-indigo-300 selection:text-indigo-900 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Shader */}
            <ShaderBackground />

            <div className="relative z-10 w-full max-w-md space-y-8 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-500">
                <Link href="/" className="inline-flex items-center text-sm text-indigo-200 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                </Link>

                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Create an account</h2>
                    <p className="mt-2 text-sm text-indigo-100/80">Start your journey with MindBridge</p>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/20 text-red-100 text-sm rounded-md text-center border border-red-500/30 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-indigo-100 mb-1">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="institution" className="block text-sm font-medium text-indigo-100 mb-1">Institution</label>
                            <div className="relative">
                                <select
                                    id="institution"
                                    name="institution"
                                    required
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm appearance-none focus:outline-none transition-all [&>option]:bg-slate-900"
                                >
                                    <option value="" disabled className="text-white/30">Select your institution</option>
                                    <option value="UG LEGON">University of Ghana</option>
                                    <option value="KNUST">Kwame Nkrumah University of Science & Technology</option>
                                    <option value="UCC">University of Cape Coast</option>
                                    <option value="UEW">University of Education Winneba</option>
                                    <option value="UDS">University of Developmental Studies</option>
                                    <option value="UP">University of Professional Studies</option>
                                    <option value="UWU">Ashesie University</option>
                                    <option value="ACU">Accra Christian University</option>
                                    <option value="UMAT">University of Mines and Technology</option>
                                    <option value="VVU">Valley View University</option>
                                    <option value="ATU">Accra Technical University</option>
                                    <option value="GTUC">Ghana Telecommunication University College</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-200">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="studentId" className="block text-sm font-medium text-indigo-100 mb-1">Student ID</label>
                                <input
                                    id="studentId"
                                    name="studentId"
                                    type="text"
                                    required
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                    placeholder="10293847"
                                />
                            </div>
                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-indigo-100 mb-1">Course of Study</label>
                                <input
                                    id="course"
                                    name="course"
                                    type="text"
                                    required
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                    placeholder="e.g. Computer Science"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-1">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-indigo-100 mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] text-base font-semibold"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Sign up"}
                        </Button>
                    </div>
                </form>
                <div className="text-center text-sm pt-4 border-t border-white/10">
                    <span className="text-indigo-200/70">Already have an account? </span>
                    <Link href="/login" className="font-medium text-white hover:text-indigo-200 transition-colors">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
