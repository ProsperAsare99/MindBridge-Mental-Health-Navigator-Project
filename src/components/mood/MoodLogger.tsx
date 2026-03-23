"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
    CloudRain, Frown, Meh, Smile, Sun, 
    ChevronRight, ChevronLeft, Camera, Mic, 
    MapPin, Cloud, ArrowRight, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmotionWheel } from "./EmotionWheel";
import { SymptomTracker } from "./SymptomTracker";
import { AdvancedMoodTracker } from "./AdvancedMoodTracker";
import { api } from "@/lib/api";

const MOODS = [
    { value: 1, icon: CloudRain, label: "Awful", color: "text-slate-500", bgColor: "bg-slate-500/10" },
    { value: 2, icon: Frown, label: "Bad", color: "text-red-500", bgColor: "bg-red-500/10" },
    { value: 3, icon: Meh, label: "Okay", color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { value: 4, icon: Smile, label: "Good", color: "text-primary", bgColor: "bg-primary/10" },
    { value: 5, icon: Sun, label: "Great", color: "text-secondary", bgColor: "bg-secondary/10" },
];

export function MoodLogger({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(1);
    const [mood, setMood] = useState<number | null>(null);
    const [emotion, setEmotion] = useState<string | null>(null);
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [metrics, setMetrics] = useState({ energy: 3, sleep: 3, social: 3 });
    const [note, setNote] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [audio, setAudio] = useState<File | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [location, setLocation] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Fetch Location & Sync Weather
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ lat: latitude, lng: longitude });
                
                // For demo, we'll mock weather or use a simple free API if available
                // Let's assume a healthy default for now or a simple mock
                setWeather({ temp: 21, condition: "Partly Cloudy", icon: "Cloud" });
            });
        }
    }, []);

    const handleLog = async () => {
        if (mood === null) return;
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('value', mood.toString());
            formData.append('note', note);
            formData.append('energy', metrics.energy.toString());
            formData.append('sleep', metrics.sleep.toString());
            formData.append('social', metrics.social.toString());
            if (emotion) formData.append('emotion', emotion);
            symptoms.forEach(s => formData.append('physicalSymptoms', s));
            if (weather) formData.append('weather', JSON.stringify(weather));
            if (location) formData.append('location', JSON.stringify(location));
            if (photo) formData.append('moodPhoto', photo);
            if (audio) formData.append('moodAudio', audio);

            const res = await api.post('/moods', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.crisisFlag) {
                alert("We noticed some concerning patterns. Please remember that crisis support is available 24/7 in the side menu.");
            }
            onComplete();
        } catch (error) {
            console.error("Mood Logging Error:", error);
            alert("Failed to sync your mood. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="glass rounded-[2.5rem] p-8 md:p-10 shadow-premium min-h-[500px] flex flex-col justify-between overflow-hidden relative">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <div className="space-y-2 text-center">
                            <h3 className="text-3xl font-black text-foreground italic tracking-tight italic">Core Energy</h3>
                            <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">How is your spirit pulsating right now?</p>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {MOODS.map((m) => {
                                const Icon = m.icon;
                                const isSelected = mood === m.value;
                                return (
                                    <button
                                        key={m.value}
                                        onClick={() => { setMood(m.value); nextStep(); }}
                                        className={cn(
                                            "group flex flex-col items-center gap-4 p-4 rounded-[2rem] transition-all border-2",
                                            isSelected ? "bg-primary/20 border-primary shadow-xl" : "bg-muted/50 border-transparent hover:border-primary/30"
                                        )}
                                    >
                                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-125", isSelected ? m.color : "text-muted-foreground")}>
                                            <Icon size={32} strokeWidth={isSelected ? 2.5 : 2} />
                                        </div>
                                        <span className={cn("text-[9px] font-black uppercase tracking-widest", isSelected ? m.color : "text-muted-foreground")}>{m.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6 flex flex-col items-center"
                    >
                        <div className="space-y-2 text-center">
                            <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">Nuance Wheel</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Select a specific emotional texture</p>
                        </div>
                        <EmotionWheel onSelect={(e) => { setEmotion(e); nextStep(); }} selectedEmotion={emotion} />
                        <Button variant="ghost" onClick={prevStep} className="text-xs uppercase font-black tracking-widest"><ChevronLeft size={14} className="mr-1" /> Back</Button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-foreground tracking-tight italic">Vital Dimensions</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Rest, Movement, and Connection</p>
                        </div>
                        
                        <AdvancedMoodTracker 
                            metrics={metrics} 
                            onMetricChange={(f, v) => setMetrics(m => ({ ...m, [f]: v }))} 
                        />
                        
                        <SymptomTracker selected={symptoms} onChange={setSymptoms} />

                        <div className="flex gap-4 pt-4">
                            <Button variant="outline" onClick={prevStep} className="flex-1 rounded-2xl font-black uppercase text-[10px]">Back</Button>
                            <Button onClick={nextStep} className="flex-1 rounded-2xl font-black uppercase text-[10px]">Next <ChevronRight size={14} /></Button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div 
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-foreground italic">Journaling</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Capture your voice and surroundings</p>
                        </div>

                        <textarea
                            placeholder="Pour your heart out here..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full bg-muted/30 border border-border/40 rounded-[2rem] p-6 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all min-h-[150px] resize-none"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border/40 hover:border-primary/40 transition-all cursor-pointer">
                                <Camera size={18} className={photo ? "text-primary" : "text-muted-foreground"} />
                                <span className={cn("text-[9px] font-black uppercase", photo ? "text-primary" : "text-muted-foreground")}>{photo ? "Photo Attached" : "Capture Photo"}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
                            </label>
                            <label className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border/40 hover:border-secondary/40 transition-all cursor-pointer">
                                <Mic size={18} className={audio ? "text-secondary" : "text-muted-foreground"} />
                                <span className={cn("text-[9px] font-black uppercase", audio ? "text-secondary" : "text-muted-foreground")}>{audio ? "Audio Recorded" : "Voice Memo"}</span>
                                <input type="file" accept="audio/*" className="hidden" onChange={(e) => setAudio(e.target.files?.[0] || null)} />
                            </label>
                        </div>

                        {location && (
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin size={14} />
                                    <span className="text-[9px] font-black uppercase italic">Location Syncing...</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Cloud size={14} />
                                    <span className="text-[9px] font-black">{weather?.temp}°C {weather?.condition}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            <Button variant="outline" onClick={prevStep} className="flex-1 rounded-2xl font-black uppercase text-[10px]">Back</Button>
                            <Button onClick={handleLog} disabled={isSubmitting} className="flex-1 rounded-2xl font-black uppercase text-[10px]">
                                {isSubmitting ? "Syncing..." : "Finalize Log"} <CheckCircle2 size={14} className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress Mini Bar */}
            <div className="absolute top-0 left-0 w-full h-1 flex gap-1 px-1">
                {[1, 2, 3, 4].map(s => (
                    <div key={s} className={cn("flex-1 h-full rounded-full transition-all duration-500", s <= step ? "bg-primary" : "bg-muted")} />
                ))}
            </div>
        </div>
    );
}
