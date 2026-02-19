"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookHeart, AlertCircle, School, GraduationCap, Quote } from "lucide-react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ShaderBackground from "@/components/shader-background";

const MOTIVATION_QUOTES = [
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "You are capable of more than you know.", author: "Glinda, The Wizard of Oz" }
];

export default function DashboardPage() {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [greeting, setGreeting] = useState("");

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user?.uid) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                }
            }
        };
        fetchUserProfile();
    }, [user]);

    // Set time-based greeting
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    // Rotate quotes
    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % MOTIVATION_QUOTES.length);
        }, 8000); // Change every 8 seconds
        return () => clearInterval(interval);
    }, []);

    const currentQuote = MOTIVATION_QUOTES[quoteIndex];

    return (
        <div className="min-h-screen relative font-sans text-white selection:bg-indigo-300 selection:text-indigo-900 pb-20">
            {/* Background Shader - Fixed to cover the whole dashboard area but behind content */}
            <div className="fixed inset-0 z-0">
                <ShaderBackground />
            </div>

            <div className="relative z-10 space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-in fade-in slide-in-from-top-5 duration-700">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">
                            {greeting}, {user?.displayName?.split(" ")[0] || "Student"}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 text-indigo-100 mt-2">
                            {userProfile?.course && (
                                <span className="flex items-center gap-1.5 text-xs font-medium bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
                                    <BookHeart className="h-3.5 w-3.5" />
                                    {userProfile.course}
                                </span>
                            )}
                            {userProfile?.institution && (
                                <span className="flex items-center gap-1.5 text-xs font-medium bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
                                    <School className="h-3.5 w-3.5" />
                                    {userProfile.institution}
                                </span>
                            )}
                            {!userProfile && <p className="text-sm opacity-80">Here's what's happening with your wellness today.</p>}
                        </div>
                    </div>
                    <div>
                        <Link href="/dashboard/mood">
                            <Button className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/50 transition-all hover:scale-105">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Log Mood
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Quick Stats / Overview Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Mood Card */}
                    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl hover:bg-white/10 transition-all duration-300">
                        <h3 className="text-sm font-medium text-indigo-200">Current Mood Streak</h3>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">0</span>
                            <span className="text-sm text-indigo-200">days</span>
                        </div>
                        <p className="mt-2 text-xs text-indigo-300/60">Start checking in today!</p>
                    </div>

                    {/* Resources Card */}
                    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl hover:bg-white/10 transition-all duration-300">
                        <h3 className="text-sm font-medium text-indigo-200">Saved Resources</h3>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">0</span>
                            <span className="text-sm text-indigo-200">items</span>
                        </div>
                    </div>

                    {/* Motivation Quote Card */}
                    <div className="col-span-full md:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/40 to-purple-600/40 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Quote size={100} fill="currentColor" />
                        </div>

                        <div className="relative z-10 flex flex-col justify-center h-full">
                            <div key={quoteIndex} className="animate-in fade-in zoom-in duration-1000">
                                <p className="text-xl md:text-2xl font-medium leading-relaxed font-serif italic text-white/90">
                                    "{currentQuote.text}"
                                </p>
                                <p className="mt-4 text-sm font-semibold text-indigo-200 uppercase tracking-widest">
                                    — {currentQuote.author}
                                </p>
                            </div>

                            {/* Progress bar for next quote */}
                            <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
                                <div key={quoteIndex} className="h-full bg-indigo-400 animate-[progress_8s_linear_forward]" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Sections */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-indigo-300" />
                            Recommended for You
                        </h2>
                        <div className="space-y-4">
                            {/* Placeholders */}
                            <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                <h4 className="font-medium text-indigo-100 group-hover:text-white transition-colors">Exam Stress Relief</h4>
                                <p className="text-xs text-indigo-300/70 mt-1">5 min read • Techniques for academic anxiety</p>
                            </div>
                            <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                <h4 className="font-medium text-indigo-100 group-hover:text-white transition-colors">Mindful Breathing</h4>
                                <p className="text-xs text-indigo-300/70 mt-1">10 min video • Grounding exercise</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-indigo-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10">
                            Explore Library
                        </Button>
                    </div>

                    <div className="rounded-2xl border border-red-500/30 bg-red-900/20 backdrop-blur-md p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-red-500/20 blur-3xl rounded-full pointer-events-none"></div>

                        <div className="flex items-center gap-3 text-red-300 mb-4 relative z-10">
                            <AlertCircle className="h-6 w-6" />
                            <h2 className="text-lg font-semibold text-white">Need Help Now?</h2>
                        </div>
                        <p className="text-indigo-100/80 text-sm mb-6 relative z-10 leading-relaxed">
                            If you are in distress or need someone to talk to immediately, support is available 24/7.
                            You are not alone.
                        </p>
                        <Link href="/dashboard/crisis" className="relative z-10">
                            <Button className="w-full bg-red-600 hover:bg-red-500 text-white border-0 shadow-lg shadow-red-600/20">
                                Get Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    );
}
