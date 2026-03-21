"use client";

import { motion } from "framer-motion";
import { Smile, Frown, Meh, SmilePlus, HeartPulse, Search } from "lucide-react";

const moods = [
  { label: "😢 Struggling", value: 1, icon: HeartPulse, color: "text-rose-500" },
  { label: "😟 Not good", value: 2, icon: Frown, color: "text-amber-500" },
  { label: "😐 Okay", value: 3, icon: Meh, color: "text-zinc-400" },
  { label: "🙂 Good", value: 4, icon: Smile, color: "text-emerald-400" },
  { label: "😊 Great", value: 5, icon: SmilePlus, color: "text-orange-500" }
];

const reasons = [
  { label: "Academic stress", value: "academic_stress" },
  { label: "Anxiety", value: "anxiety" },
  { label: "Feeling down or depressed", value: "depression" },
  { label: "Loneliness", value: "loneliness" },
  { label: "Relationship issues", value: "relationship_issues" },
  { label: "Financial stress", value: "financial_stress" },
  { label: "Family pressure", value: "family_pressure" },
  { label: "Other", value: "other" }
];

export default function Step4Wellbeing({ data, update, onNext }: any) {
  const toggleReason = (reasonValue: string) => {
    const current = data.concerns || [];
    if (current.includes(reasonValue)) {
      update({ concerns: current.filter((r: string) => r !== reasonValue) });
    } else {
      update({ concerns: [...current, reasonValue] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Wellbeing Baseline</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Establishing your initial cognitive and emotional state.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-base font-bold text-foreground/90">
            How are you feeling right now?
          </label>
          <div className="flex justify-between gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon;
              const isActive = data.baseline?.mood === mood.value;
              return (
                <button
                  key={mood.value}
                  onClick={() => update({ baseline: { ...data.baseline, mood: mood.value, joinDate: new Date() } })}
                  className={`flex flex-1 flex-col items-center gap-3 rounded-[1.25rem] border-2 p-5 transition-all ${
                    isActive 
                      ? "border-orange-500 bg-orange-500/10 shadow-md shadow-orange-500/10 scale-105" 
                      : "border-border/20 bg-muted/10 hover:bg-muted/20"
                  }`}
                >
                  <Icon className={`h-7 w-7 ${isActive ? mood.color : "text-muted-foreground/40"}`} />
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${isActive ? "text-foreground" : "text-muted-foreground/60 text-center"}`}>
                    {mood.label.split(' ')[1]}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-orange-500 inline-block" />
            Calibration complete. We'll monitor your progress from here.
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Search className="h-5 w-5 text-orange-500" />
            What is your primary concern?
          </label>
          <div className="flex flex-wrap gap-3">
            {reasons.map((reason) => (
              <button
                key={reason.value}
                onClick={() => toggleReason(reason.value)}
                className={`rounded-2xl border-2 px-6 py-3 text-sm font-black transition-all ${
                  data.concerns?.includes(reason.value) 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {reason.label}
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-orange-500 inline-block" />
            We'll prioritize computational nodes relevant to your mission
          </p>
        </div>
      </div>
    </div>
  );
}
