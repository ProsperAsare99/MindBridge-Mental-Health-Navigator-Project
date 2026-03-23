"use client";

import { motion } from "framer-motion";
import { 
    Sparkles, 
    Zap, 
    Target, 
    ChevronRight,
    BrainCircuit,
    HeartPulse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DailyPerspectiveProps {
    moodStats: { average: number; count: number; streak: number };
    className?: string;
}

export function DailyPerspective({ moodStats, className }: DailyPerspectiveProps) {
    // Determine a "status" message based on stats
    const getStatusInfo = () => {
        if (moodStats.streak > 5) return { label: "Exceptional Momentum", color: "text-amber-500", bg: "bg-amber-500/10" };
        if (moodStats.count > 0) return { label: "Steady Progress", color: "text-primary", bg: "bg-primary/10" };
        return { label: "Fresh Start", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    };

    const status = getStatusInfo();

    const tips = [
        "Take 3 deep breaths before your next task.",
        "Hydrate: A glass of water can reset your focus.",
        "Ghanaian wisdom: 'The one who asks the way does not get lost.' Talk to a peer today.",
        "Your MindBridge streak is a testament to your resilience."
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "glass rounded-[2rem] p-6 md:p-8 relative overflow-hidden group shadow-premium",
                className
            )}
        >
           <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Growth Outlook</h3>
                    <p className="text-[10px] font-bold text-grey-500 dark:text-grey-400 uppercase tracking-widest">Perspective on your progress</p>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-grey-50 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 flex items-center justify-center">
                    <BrainCircuit className={cn("h-5 w-5", status.color)} />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center p-6 rounded-[2rem] bg-grey-50 dark:bg-grey-800/40 border border-grey-100 dark:border-grey-800 relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter", status.bg, status.color)}>
                            {status.label}
                        </div>
                        <span className="text-[10px] font-black text-grey-400 dark:text-grey-500 uppercase tracking-widest italic flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-grey-400 dark:text-grey-500 uppercase tracking-widest">Live Performance</span>
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-foreground leading-tight">
                            Today&apos;s Perspective
                        </h2>
                        <p className="text-sm md:text-base font-bold text-muted-foreground leading-relaxed">
                            {randomTip}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 bg-muted/40 px-3 py-2 rounded-xl border border-border/50 text-muted-foreground">
                            <Zap className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight">{moodStats.streak} Day Streak</span>
                        </div>
                        <div className="flex items-center gap-2 bg-secondary/5 px-3 py-2 rounded-xl border border-secondary/10 text-secondary">
                            <Target className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight">Next Goal: Log Mood</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 shrink-0">
                    <Button className="h-12 px-8 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        Deep Dive <ChevronRight size={18} />
                    </Button>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-border/50">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <HeartPulse size={18} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none">Overall Wellness</p>
                            <p className="text-xs font-black text-foreground mt-1">Stably Improving</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
