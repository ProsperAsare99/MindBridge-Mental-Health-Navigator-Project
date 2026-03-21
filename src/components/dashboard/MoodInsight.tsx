"use client";

import { motion } from "framer-motion";
import { 
    LineChart, 
    TrendingUp, 
    TrendingDown, 
    Minus, 
    Activity,
    Sparkles,
    Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Mood {
    value: number;
    createdAt: string;
}

interface MoodInsightProps {
    moods: Mood[];
    className?: string;
}

export function MoodInsight({ moods, className }: MoodInsightProps) {
    if (!moods || moods.length === 0) return null;

    const avgMood = moods.reduce((acc, m) => acc + m.value, 0) / moods.length;
    const mostRecent = moods[0].value;
    const oldest = moods[moods.length - 1].value;
    const trend = mostRecent > oldest ? 'improving' : mostRecent < oldest ? 'declining' : 'stable';

    const getTrendIcon = () => {
        if (trend === 'improving') return <TrendingUp className="h-4 w-4 text-emerald-500" />;
        if (trend === 'declining') return <TrendingDown className="h-4 w-4 text-red-500" />;
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    };

    const getMoodColor = (val: number) => {
        if (val >= 4) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        if (val >= 3) return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        if (val >= 2) return "text-orange-500 bg-orange-500/10 border-orange-500/20";
        return "text-red-500 bg-red-500/10 border-red-500/20";
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
                "p-6 bg-card border border-border/40 rounded-[2.5rem] shadow-premium space-y-6 relative overflow-hidden",
                className
            )}
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Activity className="h-24 w-24" />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Wellbeing Insights</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">AI Trend Analysis</p>
                    </div>
                </div>
                {getTrendIcon()}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-muted/30 border border-border/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Average</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-foreground">{avgMood.toFixed(1)}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">/ 5</span>
                    </div>
                </div>
                <div className="p-4 rounded-3xl bg-muted/30 border border-border/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Current</p>
                    <div className={getMoodColor(mostRecent)}>
                         <span className="text-2xl font-black">{mostRecent}</span>
                         <span className="text-[10px] font-bold opacity-60 ml-0.5">/ 5</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/50">
                <div className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        {trend === 'improving' 
                            ? "Your mood is trending upwards. Whatever techniques you're using seem to be working well!" 
                            : trend === 'declining'
                            ? "We've noticed a slightly downward trend. Remember to be gentle with yourself during this time."
                            : "Your mood has been stable. Consistency is a great foundation for mental wellness."}
                    </p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                    <Calendar className="h-3 w-3" />
                    Last Updated: {new Date(moods[0].createdAt).toLocaleDateString()}
                </div>
            </div>
        </motion.div>
    );
}
