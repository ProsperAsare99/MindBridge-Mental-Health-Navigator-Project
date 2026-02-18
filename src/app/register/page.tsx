"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-64 bg-teal-500 skew-y-6 transform -translate-y-32 z-0" />

            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-xl z-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                </Link>

                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create an account</h2>
                    <p className="mt-2 text-sm text-slate-600">Start your journey with MindBridge</p>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="relative block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="institution" className="block text-sm font-medium text-slate-700 mb-1">Institution</label>
                            <div className="relative">
                                <select
                                    id="institution"
                                    name="institution"
                                    required
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    className="relative block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none bg-white"
                                >
                                    <option value="" disabled>Select your institution</option>
                                    <option value="UG LEGON">University of Ghana</option>
                                    <option value="KNUST">Kwame Nkrumah University of Science & Technology</option>
                                    <option value="UCC">University of Cape Coast</option>
                                    <option value="UEW">University of Education Winneba</option>
                                    <option value="UDS">University of Developmental Studies</option>
                                    <option value="UP">University of Professional Studies</option>
                                    <option value="UWU">Ashesie University</option>
                                    <option value="ACU">Accra Christian University</option>
                                    <option value="UMAT">University of Mines and Technology</option>

                                    <option value="Other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="studentId" className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
                                <input
                                    id="studentId"
                                    name="studentId"
                                    type="text"
                                    required
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="relative block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="10293847"
                                />
                            </div>
                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-slate-700 mb-1">Course of Study</label>
                                <input
                                    id="course"
                                    name="course"
                                    type="text"
                                    required
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    className="relative block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Is: Computer Science"
                                />
                            </div>
                        </div>

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
                            className="w-full bg-teal-600 hover:bg-teal-500 text-white"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Sign up"}
                        </Button>
                    </div>
                </form>
                <div className="text-center text-sm pt-4 border-t border-slate-100">
                    <span className="text-slate-500">Already have an account? </span>
                    <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
