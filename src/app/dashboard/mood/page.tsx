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
            >
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    Mood Tracker
                </h1>
                <p className="mt-2 text-lg md:text-xl text-muted-foreground font-medium">
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
                            className="rounded-2xl border border-border bg-background/80 dark:bg-slate-800/50 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-xl bg-primary/10 ${stat.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                    {stat.label}
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
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
                    <div className="rounded-2xl border border-border bg-background/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                    How are you feeling today?
                                </h2>
                                <p className="text-base text-muted-foreground">
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
                                            ? `${m.bgColor} border-current ${m.textColor} shadow-lg`
                                            : "border-transparent hover:border-border bg-muted/50 dark:bg-slate-700/30 hover:bg-muted"
                                            }`}
                                    >
                                        {isSelected && (
                                            <motion.div
                                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${m.color} opacity-10`}
                                                layoutId="moodHighlight"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                        <Icon className={`h-8 w-8 md:h-10 md:w-10 relative z-10 transition-all ${isSelected ? m.textColor : "text-muted-foreground"
                                            }`} />
                                        <span className={`text-sm md:text-base font-bold relative z-10 transition-all ${isSelected ? "text-foreground" : "text-muted-foreground"
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
                                    className="mt-6 overflow-hidden"
                                >
                                    <div className={`p-4 rounded-xl ${selectedMoodData.bgColor} border border-border`}>
                                        <p className={`text-lg font-semibold ${selectedMoodData.textColor}`}>
                                            You&apos;re feeling <span className="capitalize">{selectedMoodData.label}</span>
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Note Section */}
                        <div className="mt-8">
                            <label htmlFor="note" className="block text-base font-bold text-foreground mb-3">
                                Add a note <span className="text-muted-foreground font-normal">(optional)</span>
                            </label>
                            <textarea
                                id="note"
                                rows={4}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="block w-full rounded-xl border-2 border-border bg-muted/30 dark:bg-slate-700/30 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                                placeholder="What's making you feel this way? Writing it down can help..."
                            />
                        </div>

                        <Button
                            className="w-full mt-6 h-14 text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            disabled={!selectedMood}
                        >
                            Save Check-in
                        </Button>
                    </div>

                    {/* Weekly Trends Chart */}
                    <div className="rounded-2xl border border-border bg-background/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg">
                                    <TrendingUp className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Mood Trends
                                    </h2>
                                    <p className="text-base text-muted-foreground">
                                        See how your mood changes over time
                                    </p>
                                </div>
                            </div>
                            {/* Time range toggle */}
                            <div className="flex rounded-xl bg-muted dark:bg-slate-700/50 p-1 self-start">
                                <button
                                    onClick={() => setActiveTimeRange("week")}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTimeRange === "week"
                                        ? "bg-background dark:bg-slate-600 text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    Week
                                </button>
                                <button
                                    onClick={() => setActiveTimeRange("month")}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTimeRange === "month"
                                        ? "bg-background dark:bg-slate-600 text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
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
                                        <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-muted)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--color-muted-foreground)', fontSize: 14, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        hide
                                        domain={[1, 5]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: '1px solid var(--color-muted)',
                                            boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                                            backgroundColor: 'var(--background)',
                                            color: 'var(--foreground)',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            padding: '10px 14px',
                                        }}
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
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorMood)"
                                        dot={{ r: 5, fill: "#6366f1", strokeWidth: 2, stroke: "var(--background)" }}
                                        activeDot={{ r: 7, fill: "#6366f1", strokeWidth: 3, stroke: "var(--background)" }}
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
                                        <span className="text-sm font-semibold text-muted-foreground">{m.value} – {m.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column — Recent Entries (2/5) */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <div className="rounded-2xl border border-border bg-background/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 shadow-sm h-full">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                    Recent Check-ins
                                </h2>
                                <p className="text-base text-muted-foreground">
                                    Your latest mood entries
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {recentEntries.map((entry, i) => {
                                const moodData = moods.find(m => m.value === entry.mood);
                                const Icon = moodData?.icon || Meh;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="group p-4 rounded-xl border border-border bg-muted/30 dark:bg-slate-700/20 hover:bg-muted/60 dark:hover:bg-slate-700/40 transition-all cursor-default"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2.5 rounded-xl ${moodData?.bgColor}`}>
                                                <Icon className={`h-6 w-6 ${moodData?.textColor}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-base font-bold text-foreground">
                                                        {entry.day}
                                                    </span>
                                                    <span className="text-sm font-semibold text-muted-foreground">
                                                        {entry.time}
                                                    </span>
                                                </div>
                                                <span className={`inline-block text-sm font-bold ${moodData?.textColor} mb-1`}>
                                                    {entry.label}
                                                </span>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {entry.note}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* View All Link */}
                        <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                            View All Entries
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        {/* Insight Card */}
                        <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-200/50 dark:border-indigo-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-5 w-5 text-indigo-500" />
                                <h3 className="text-base font-bold text-foreground">Weekly Insight</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your mood has been <span className="font-bold text-teal-600 dark:text-teal-400">trending upward</span> this week!
                                You seem to feel best on <span className="font-bold text-foreground">Fridays</span>. Consider what makes
                                those days special.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
