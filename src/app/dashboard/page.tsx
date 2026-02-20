"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookHeart, AlertCircle, School, GraduationCap, Quote } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ShaderBackground from "@/components/shader-background";
import { useTheme } from "next-themes";

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
    const { theme } = useTheme();

    const router = useRouter();

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user?.uid) {
                // Check verification (skip for phone auth which has no email)
                /* Verification disabled by user request
                if (user.email && !user.emailVerified) {
                    router.push("/verify-email");
                    return;
                }
                */

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                }
            }
        };
        fetchUserProfile();
    }, [user, router]);

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
        <div className="min-h-screen relative font-sans text-foreground pb-20 bg-background transition-colors duration-300">
            {/* Background Shader - Only visible in Dark Mode or specific conditions if desired */}
            {theme === 'dark' && <div className="fixed inset-0 -z-10"><ShaderBackground /></div>}

            <div className="relative z-10 space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-in fade-in slide-in-from-top-5 duration-700">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground drop-shadow-sm">
                            {greeting}, {user?.displayName?.split(" ")[0] || "Student"}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-muted-foreground">
                            {userProfile?.course && (
                                <span className="flex items-center gap-1.5 text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full shadow-sm">
                                    <BookHeart className="h-3.5 w-3.5" />
                                    {userProfile.course}
                                </span>
                            )}
                            {userProfile?.institution && (
                                <span className="flex items-center gap-1.5 text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full shadow-sm">
                                    <School className="h-3.5 w-3.5" />
                                    {userProfile.institution}
                                </span>
                            )}
                            {!userProfile && <p className="text-sm opacity-80">Here's what's happening with your wellness today.</p>}
                        </div>
                    </div>
                    <div>
                        <Link href="/dashboard/mood">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Log Mood
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Quick Stats / Overview Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Mood Card */}
                    <div className="group rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Current Mood Streak</h3>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-foreground group-hover:scale-110 transition-transform duration-300">0</span>
                            <span className="text-sm text-muted-foreground">days</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">Start checking in today!</p>
                    </div>

                    {/* Assessment Card (New) */}
                    <Link href="/dashboard/assessment">
                        <div className="group h-full rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
                                <BookHeart size={48} />
                            </div>
                            <h3 className="text-sm font-medium text-primary">Wellness Check</h3>
                            <div className="mt-4">
                                <span className="text-lg font-semibold text-foreground group-hover:underline decoration-primary underline-offset-4">Take Assessment</span>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">Check your mental anxiety & depression levels.</p>
                        </div>
                    </Link>

                    {/* Resources Card */}
                    <div className="group rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Saved Resources</h3>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-foreground group-hover:scale-110 transition-transform duration-300">0</span>
                            <span className="text-sm text-muted-foreground">items</span>
                        </div>
                    </div>

                    {/* Motivation Quote Card */}
                    <div className="col-span-full md:col-span-2 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent p-8 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
                            <Quote size={100} fill="currentColor" />
                        </div>

                        <div className="relative z-10 flex flex-col justify-center h-full">
                            <div key={quoteIndex} className="animate-in fade-in zoom-in duration-1000">
                                <p className="text-xl md:text-2xl font-medium leading-relaxed font-serif italic text-foreground/90">
                                    "{currentQuote.text}"
                                </p>
                                <p className="mt-4 text-sm font-semibold text-primary uppercase tracking-widest">
                                    — {currentQuote.author}
                                </p>
                            </div>

                            {/* Progress bar for next quote */}
                            <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
                                <div key={quoteIndex} className="h-full bg-primary animate-[progress_8s_linear_forward]" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Sections */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Recommended for You
                        </h2>
                        <div className="space-y-4">
                            {/* Placeholders */}
                            <div className="p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group">
                                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Exam Stress Relief</h4>
                                <p className="text-xs text-muted-foreground mt-1">5 min read • Techniques for academic anxiety</p>
                            </div>
                            <div className="p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group">
                                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Mindful Breathing</h4>
                                <p className="text-xs text-muted-foreground mt-1">10 min video • Grounding exercise</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-primary hover:text-primary/80 hover:bg-secondary">
                            Explore Library
                        </Button>
                    </div>

                    <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-destructive/10 blur-3xl rounded-full pointer-events-none"></div>

                        <div className="flex items-center gap-3 text-destructive mb-4 relative z-10">
                            <AlertCircle className="h-6 w-6" />
                            <h2 className="text-lg font-semibold text-foreground">Need Help Now?</h2>
                        </div>
                        <p className="text-muted-foreground text-sm mb-6 relative z-10 leading-relaxed">
                            If you are in distress or need someone to talk to immediately, support is available 24/7.
                            You are not alone.
                        </p>
                        <Link href="/dashboard/crisis" className="relative z-10">
                            <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/20 border-0">
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
