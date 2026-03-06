"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import {
    Smile,
    Meh,
    Frown,
    CloudRain,
    TrendingUp,
    Calendar,
    Sparkles,
    Clock,
    ChevronRight,
    Sun
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [note, setNote] = useState("");
    const [activeTimeRange, setActiveTimeRange] = useState<"week" | "month">("week");

    // Placeholder data for the chart
    const weekData = [
        { name: "Mon", mood: 3 },
        { name: "Tue", mood: 4 },
        { name: "Wed", mood: 2 },
        { name: "Thu", mood: 4 },
        { name: "Fri", mood: 5 },
        { name: "Sat", mood: 4 },
        { name: "Sun", mood: 3 },
    ];

    const monthData = [
        { name: "W1", mood: 3.2 },
        { name: "W2", mood: 3.8 },
        { name: "W3", mood: 4.1 },
        { name: "W4", mood: 3.5 },
    ];

    const data = activeTimeRange === "week" ? weekData : monthData;

    const moods = [
        { value: 1, icon: CloudRain, label: "Awful", color: "from-slate-400 to-slate-500", bgColor: "bg-slate-100 dark:bg-slate-800", textColor: "text-slate-600 dark:text-slate-300", ringColor: "ring-slate-400" },
        { value: 2, icon: Frown, label: "Bad", color: "from-red-400 to-rose-500", bgColor: "bg-red-50 dark:bg-red-900/30", textColor: "text-red-600 dark:text-red-300", ringColor: "ring-red-400" },
        { value: 3, icon: Meh, label: "Okay", color: "from-amber-400 to-yellow-500", bgColor: "bg-amber-50 dark:bg-amber-900/30", textColor: "text-amber-600 dark:text-amber-300", ringColor: "ring-amber-400" },
        { value: 4, icon: Smile, label: "Good", color: "from-teal-400 to-emerald-500", bgColor: "bg-teal-50 dark:bg-teal-900/30", textColor: "text-teal-600 dark:text-teal-300", ringColor: "ring-teal-400" },
        { value: 5, icon: Sun, label: "Great", color: "from-indigo-400 to-violet-500", bgColor: "bg-indigo-50 dark:bg-indigo-900/30", textColor: "text-indigo-600 dark:text-indigo-300", ringColor: "ring-indigo-400" },
    ];

    // Placeholder recent entries
    const recentEntries = [
        { day: "Today", mood: 4, label: "Good", note: "Had a productive study session", time: "2:30 PM" },
        { day: "Yesterday", mood: 3, label: "Okay", note: "Feeling a bit stressed about exams", time: "9:15 PM" },
        { day: "Feb 23", mood: 5, label: "Great", note: "Spent time with friends", time: "6:00 PM" },
    ];

    // Stats
    const stats = [
        { label: "Average Mood", value: "3.6", icon: TrendingUp, description: "This week", color: "text-indigo-500" },
        { label: "Check-ins", value: "7", icon: Calendar, description: "This week", color: "text-teal-500" },
        { label: "Current Streak", value: "5 days", icon: Sparkles, description: "Keep going!", color: "text-amber-500" },
    ];

    const selectedMoodData = moods.find(m => m.value === selectedMood);

    return (
        <div className="p-6 md:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Mood Tracker
                </h1>
                <p className="mt-2 text-lg md:text-xl text-indigo-100 font-medium">
                    Track your emotions to identify patterns and triggers.
                </p>
            </motion.div>

            {/* Quick Stats Row */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
                        >
                            <div className={`absolute -right-4 -top-4 w-12 h-12 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all ${stat.color.replace('text-', 'bg-')}`} />
                            <div className="flex items-center gap-3 mb-2 relative z-10">
                                <div className={`p-2 rounded-xl bg-white/10 border border-white/10 ${stat.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-black text-indigo-300 uppercase tracking-widest">
                                    {stat.label}
                                </span>
                            </div>
                            <p className="text-3xl font-black text-white relative z-10 drop-shadow-md">{stat.value}</p>
                            <p className="text-sm font-medium text-indigo-200/60 mt-1 relative z-10">{stat.description}</p>
                        </div>
                    );
                })}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid gap-8 lg:grid-cols-5">
                {/* Mood Logger — Left Column (3/5) */}
                <motion.div
                    className="lg:col-span-3 space-y-8"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    {/* Mood Check-in Card */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl p-6 md:p-10 shadow-2xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] ring-2 ring-white/20">
                                    <Sparkles className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
                                        How are you feeling?
                                    </h2>
                                    <p className="text-lg text-indigo-200/80 font-medium mt-1">
                                        Select your current mood below
                                    </p>
                                </div>
                            </div>

                            {/* Mood Buttons */}
                            <div className="grid grid-cols-5 gap-3 md:gap-4">
                                {moods.map((m) => {
                                    const Icon = m.icon;
                                    const isSelected = selectedMood === m.value;
                                    return (
                                        <motion.button
                                            key={m.value}
                                            onClick={() => setSelectedMood(m.value)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative flex flex-col items-center gap-3 p-4 md:p-5 rounded-2xl transition-all duration-300 cursor-pointer border-2 ${isSelected
                                                ? `${m.bgColor} border-white/40 ${m.textColor} shadow-[0_0_20px_rgba(255,255,255,0.1)]`
                                                : "border-transparent bg-white/5 hover:bg-white/10"
                                                }`}
                                        >
                                            {isSelected && (
                                                <motion.div
                                                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${m.color} opacity-20`}
                                                    layoutId="moodHighlight"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 0.2 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                            <Icon className={`h-8 w-8 md:h-10 md:w-10 relative z-10 transition-all ${isSelected ? m.textColor : "text-indigo-200/50"
                                                }`} />
                                            <span className={`text-sm md:text-base font-bold relative z-10 transition-all ${isSelected ? "text-white" : "text-indigo-200/70"
                                                }`}>
                                                {m.label}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Selected Mood Feedback */}
                            <AnimatePresence>
                                {selectedMoodData && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 overflow-hidden md:mt-10"
                                    >
                                        <div className={`p-5 rounded-2xl ${selectedMoodData.bgColor} border border-white/10 shadow-lg backdrop-blur-md bg-opacity-20`}>
                                            <p className={`text-xl font-bold ${selectedMoodData.textColor} flex items-center gap-2`}>
                                                <selectedMoodData.icon className="h-6 w-6" />
                                                You&apos;re feeling <span className="underline decoration-wavy decoration-2 underline-offset-4">{selectedMoodData.label}</span>
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Note Section */}
                            <div className="mt-8 md:mt-10">
                                <label htmlFor="note" className="block text-lg font-bold text-white mb-4">
                                    Add a note <span className="text-indigo-300/40 font-normal text-sm ml-2">(optional)</span>
                                </label>
                                <textarea
                                    id="note"
                                    rows={4}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="block w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-lg text-white placeholder:text-indigo-300/30 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none shadow-inner"
                                    placeholder="What's making you feel this way? Writing it down can help..."
                                />
                            </div>

                            <Button
                                className="w-full mt-8 md:mt-10 h-16 text-xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                disabled={!selectedMood}
                            >
                                Save Check-in
                            </Button>
                        </div>
                    </div>

                    {/* Trends Chart Card */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/5 blur-[100px] rounded-full" />
                        <div className="relative z-10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                        Mood Trends
                                    </h2>
                                    <p className="text-base text-indigo-200/70 font-medium">
                                        Your emotional journey over time
                                    </p>
                                </div>
                            </div>
                            {/* Time range toggle */}
                            <div className="flex rounded-xl bg-white/5 p-1 self-start border border-white/10">
                                <button
                                    onClick={() => setActiveTimeRange("week")}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTimeRange === "week"
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "text-indigo-300 hover:text-white"
                                        }`}
                                >
                                    Week
                                </button>
                                <button
                                    onClick={() => setActiveTimeRange("month")}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTimeRange === "month"
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "text-indigo-300 hover:text-white"
                                        }`}
                                >
                                    Month
                                </button>
                            </div>
                        </div>

                        <div className="h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        domain={[1, 5]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600 }}
                                        ticks={[1, 2, 3, 4, 5]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "rgba(30, 41, 59, 0.8)",
                                            backdropFilter: "blur(12px)",
                                            borderRadius: "16px",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                                            color: "#fff",
                                        }}
                                        itemStyle={{ color: "#fff", fontWeight: 700 }}
                                        cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                                        formatter={(value) => {
                                            const numVal = typeof value === 'number' ? value : Number(value);
                                            const moodLabel = moods.find(m => m.value === Math.round(numVal))?.label || String(value);
                                            return [moodLabel, "Mood"];
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="mood"
                                        stroke="#818cf8"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#moodGradient)"
                                        animationDuration={2000}
                                        dot={{ fill: '#818cf8', strokeWidth: 2, r: 4, stroke: '#6366f1' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Mood Scale Legend */}
                        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
                            {moods.map((m) => {
                                const Icon = m.icon;
                                return (
                                    <div key={m.value} className="flex items-center gap-1.5">
                                        <Icon className={`h-4 w-4 ${m.textColor}`} />
                                        <span className="text-sm font-semibold text-indigo-200/70">{m.value} – {m.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column — Recent Entries (2/5) */}
                <motion.div
                    className="lg:col-span-2 space-y-6"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-2xl h-full relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full" />

                        <div className="relative z-10 flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                    Recent entries
                                </h2>
                                <p className="text-base text-indigo-200/70 font-medium">
                                    Your latest snapshots
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {recentEntries.map((entry, i) => {
                                const moodData = moods.find(m => m.value === entry.mood);
                                const Icon = moodData?.icon || Meh;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-default"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2.5 rounded-xl ${moodData?.bgColor} bg-opacity-20 border border-white/10`}>
                                                <Icon className={`h-6 w-6 ${moodData?.textColor}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-base font-bold text-white">
                                                        {entry.day}
                                                    </span>
                                                    <span className="text-xs font-semibold text-indigo-300 opacity-60">
                                                        {entry.time}
                                                    </span>
                                                </div>
                                                <span className={`inline-block text-sm font-bold ${moodData?.textColor} mb-1 bg-white/5 px-2 rounded-md`}>
                                                    {entry.label}
                                                </span>
                                                <p className="text-sm text-indigo-100/70 leading-relaxed italic">
                                                    &ldquo;{entry.note}&rdquo;
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* View All Link */}
                        <button className="relative z-10 mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-indigo-300 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                            View All Entries
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        {/* Insight Card */}
                        <div className="relative z-10 mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 shadow-inner">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="h-5 w-5 text-indigo-400" />
                                <h3 className="text-lg font-black text-white uppercase tracking-wider text-sm">Vital Insight</h3>
                            </div>
                            <p className="text-sm text-indigo-100/80 leading-relaxed">
                                Your mood has been <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">trending upward</span> this week!
                                You seem to feel best on <span className="font-bold text-white">Fridays</span>. Consider what makes
                                those days special.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
