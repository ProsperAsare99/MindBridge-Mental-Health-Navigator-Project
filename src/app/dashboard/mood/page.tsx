"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import { Smile, Meh, Frown, Angry, CloudRain } from "lucide-react";

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);

    // Placeholder data for the chart
    const data = [
        { name: "Mon", mood: 3 },
        { name: "Tue", mood: 4 },
        { name: "Wed", mood: 2 },
        { name: "Thu", mood: 4 },
        { name: "Fri", mood: 5 },
        { name: "Sat", mood: 4 },
        { name: "Sun", mood: 3 },
    ];

    const moods = [
        { value: 1, icon: CloudRain, label: "Awful", color: "text-slate-500 bg-slate-100" },
        { value: 2, icon: Angry, label: "Bad", color: "text-red-500 bg-red-50" },
        { value: 3, icon: Meh, label: "Okay", color: "text-yellow-500 bg-yellow-50" },
        { value: 4, icon: Smile, label: "Good", color: "text-teal-500 bg-teal-50" },
        { value: 5, icon: Smile, label: "Great", color: "text-indigo-500 bg-indigo-50" }, // Using Smile again for Great for now
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mood Tracker</h1>
                <p className="text-slate-500">Track your emotions to identify patterns and triggers.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Mood Logger */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">How are you feeling today?</h2>
                    <div className="flex justify-between gap-2">
                        {moods.map((m) => {
                            const Icon = m.icon;
                            const isSelected = selectedMood === m.value;
                            return (
                                <button
                                    key={m.value}
                                    onClick={() => setSelectedMood(m.value)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${isSelected ? "ring-2 ring-indigo-500 scale-110 " + m.color : "hover:bg-slate-50 grayscale hover:grayscale-0"
                                        }`}
                                >
                                    <Icon className={`h-8 w-8 ${isSelected ? "" : "text-slate-400"}`} />
                                    <span className={`text-xs font-medium ${isSelected ? "text-slate-900" : "text-slate-500"}`}>{m.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8">
                        <label htmlFor="note" className="block text-sm font-medium text-slate-700 mb-2">Add a note (optional)</label>
                        <textarea
                            id="note"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="What's making you feel this way?"
                        />
                    </div>

                    <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
                        Save Check-in
                    </Button>
                </div>

                {/* Mood Chart */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Weekly Trends</h2>
                    <div className="flex-1 min-h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis hide domain={[1, 5]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="mood"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorMood)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
