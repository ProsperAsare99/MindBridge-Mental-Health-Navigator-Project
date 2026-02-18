"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookHeart, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { user } = useAuth();

    // Placeholder data - would eventually come from context/backend
    const timeOfDay = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{timeOfDay}, {user?.displayName || "Student"}</h1>
                    <p className="text-slate-500">Here's what's happening with your wellness today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/mood">
                        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Log Mood
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Quick Stats / Overview Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Mood Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-slate-500">Current Mood Streak</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">0</span>
                        <span className="text-sm text-slate-500">days</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Start checking in today!</p>
                </div>

                {/* Resources Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-slate-500">Saved Resources</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">0</span>
                        <span className="text-sm text-slate-500">items</span>
                    </div>
                </div>

                {/* Next Quote Card */}
                <div className="col-span-full md:col-span-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-md">
                    <div className="flex items-start gap-4">
                        <BookHeart className="h-6 w-6 opacity-80" />
                        <div>
                            <p className="text-lg font-medium leading-snug">"You don't have to control your thoughts. You just have to stop letting them control you."</p>
                            <p className="mt-2 text-sm opacity-80">— Dan Millman</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Sections */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Recommended for You</h2>
                    <div className="space-y-4">
                        {/* Placeholder placeholders */}
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                            <h4 className="font-medium text-slate-900">Exam Stress Relief</h4>
                            <p className="text-sm text-slate-500 mt-1">5 min read • Techniques for academic anxiety</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                            <h4 className="font-medium text-slate-900">Mindful Breathing</h4>
                            <p className="text-sm text-slate-500 mt-1">10 min video • Grounding exercise</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                        Explore Library
                    </Button>
                </div>

                <div className="rounded-xl border border-red-100 bg-red-50/50 p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-red-700 mb-4">
                        <AlertCircle className="h-5 w-5" />
                        <h2 className="text-lg font-semibold">Need Help Now?</h2>
                    </div>
                    <p className="text-slate-600 text-sm mb-6">
                        If you are in distress or need someone to talk to immediately, support is available 24/7.
                    </p>
                    <Link href="/dashboard/crisis">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-none">
                            Get Support
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
