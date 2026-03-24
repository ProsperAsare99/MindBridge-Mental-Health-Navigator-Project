"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
    Calendar, 
    Clock, 
    MessageSquare, 
    Mic, 
    Image as ImageIcon,
    Smile,
    CloudRain,
    Frown,
    Meh,
    Sun
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodEntry {
    id: string;
    mood: number;
    notes?: string;
    audioUrl?: string;
    photoUrl?: string;
    emotion?: string;
    sentimentLabel?: string;
    createdAt: string;
}

interface MoodTimelineProps {
    entries: MoodEntry[];
}

const MOOD_META = [
    { value: 1, icon: CloudRain, label: "Awful", color: "text-slate-500", bgColor: "bg-slate-500/10" },
    { value: 2, icon: Frown, label: "Bad", color: "text-red-500", bgColor: "bg-red-500/10" },
    { value: 3, icon: Meh, label: "Okay", color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { value: 4, icon: Smile, label: "Good", color: "text-primary", bgColor: "bg-primary/10" },
    { value: 5, icon: Sun, label: "Great", color: "text-secondary", bgColor: "bg-secondary/10" },
];

export function MoodTimeline({ entries }: MoodTimelineProps) {
    if (!entries || entries.length === 0) {
        return (
            <div className="text-center py-20 glass rounded-[2.5rem] border border-dashed border-border/50">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No journal entries found</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black text-foreground tracking-tight flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" /> Journal Timeline
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Showing {entries.length} Reflections
                </span>
            </div>

            <div className="relative space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/20 via-border to-transparent hidden md:block" />

                {entries.map((entry, idx) => {
                    const moodMeta = MOOD_META.find(m => m.value === entry.mood) || MOOD_META[3];
                    const MoodIcon = moodMeta.icon;
                    const date = new Date(entry.createdAt);
                    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

                    // Construct full URLs for media
                    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.split('/api')[0] || 'http://localhost:5000';
                    const audioSrc = entry.audioUrl ? (entry.audioUrl.startsWith('http') ? entry.audioUrl : `${baseUrl}${entry.audioUrl}`) : null;
                    const photoSrc = entry.photoUrl ? (entry.photoUrl.startsWith('http') ? entry.photoUrl : `${baseUrl}${entry.photoUrl}`) : null;

                    return (
                        <motion.div 
                            key={entry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="relative md:pl-16 group"
                        >
                            {/* Timeline Point */}
                            <div className="absolute left-[22px] top-6 h-3 w-3 rounded-full bg-background border-2 border-primary ring-4 ring-primary/10 z-10 hidden md:block group-hover:scale-125 transition-transform" />

                            <div className="glass rounded-[2rem] p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-all shadow-premium group/card">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Left: Metadata */}
                                    <div className="md:w-32 shrink-0 space-y-4">
                                        <div className={cn("inline-flex flex-col items-center gap-2 p-3 rounded-2xl w-full", moodMeta.bgColor)}>
                                            <MoodIcon size={24} className={moodMeta.color} />
                                            <span className={cn("text-[9px] font-black uppercase tracking-widest text-center", moodMeta.color)}>
                                                {moodMeta.label}
                                            </span>
                                        </div>
                                        <div className="space-y-1 px-1">
                                            <p className="text-[10px] font-black text-foreground">{formattedDate}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                                                <Clock size={10} /> {formattedTime}
                                            </p>
                                        </div>
                                        {entry.emotion && (
                                            <div className="px-1">
                                                <span className="text-[8px] font-black uppercase tracking-widest text-primary/70">
                                                    {entry.emotion}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Content */}
                                    <div className="flex-1 space-y-6">
                                        {/* Notes */}
                                        {entry.notes && (
                                            <div className="relative">
                                                <MessageSquare className="absolute -left-1 -top-1 h-3 w-3 text-primary/20" />
                                                <p className="text-sm md:text-base font-medium leading-relaxed text-foreground/90 italic pl-4 border-l-2 border-primary/10">
                                                    "{entry.notes}"
                                                </p>
                                            </div>
                                        )}

                                        {/* Media Row */}
                                        <div className="flex flex-wrap gap-4">
                                            {/* Audio Player */}
                                            {audioSrc && (
                                                <div className="flex-1 min-w-[200px] p-4 rounded-2xl bg-muted/40 border border-border/40 flex items-center gap-4 group/audio">
                                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/audio:scale-105 transition-transform">
                                                        <Mic size={18} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Voice Reflection</p>
                                                        <audio 
                                                            controls 
                                                            className="h-8 w-full accent-primary focus:outline-none"
                                                            style={{ height: '32px' }}
                                                        >
                                                            <source src={audioSrc} type="audio/webm" />
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Photo */}
                                            {photoSrc && (
                                                <div className="relative rounded-2xl overflow-hidden border border-border/40 group/photo max-w-[240px]">
                                                    <img 
                                                        src={photoSrc} 
                                                        alt="Mood moment" 
                                                        className="h-40 w-full object-cover hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white">
                                                        <ImageIcon size={12} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
