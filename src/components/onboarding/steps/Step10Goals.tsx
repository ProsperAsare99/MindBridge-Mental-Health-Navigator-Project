"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, Shield, BookOpen, Moon, Activity, Users, FileText, Sparkles, Brain } from "lucide-react";

const goalOptions = [
  { label: "Better understand my emotions", icon: Brain },
  { label: "Reduce stress and anxiety", icon: Shield },
  { label: "Improve my mood", icon: TrendingUp },
  { label: "Build resilience", icon: Activity },
  { label: "Improve academic performance", icon: BookOpen },
  { label: "Better sleep", icon: Moon },
  { label: "Develop healthy habits", icon: Sparkles },
  { label: "Connect with support", icon: Users },
  { label: "Track my mental health journey", icon: FileText },
  { label: "Prepare for counseling", icon: Target },
  { label: "Just be more mindful", icon: TrendingUp }
];

export default function Step10Goals({ data, update, onNext }: any) {
  const toggleGoal = (goal: string) => {
    const current = data.goals || [];
    if (current.includes(goal)) {
      update({ goals: current.filter((g: string) => g !== goal) });
    } else if (current.length < 3) {
      update({ goals: [...current, goal] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Mission Objectives</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Defining the primary targets for your cognitive optimization.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-base font-bold text-foreground/90 uppercase tracking-widest">
            Select Top 3 Objectives:
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {goalOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = data.goals?.includes(opt.label);
              const isMax = data.goals?.length >= 3 && !isActive;

              return (
                <button
                  key={opt.label}
                  disabled={isMax}
                  onClick={() => toggleGoal(opt.label)}
                  className={`flex flex-col items-center gap-3 rounded-[1.25rem] border-2 p-5 transition-all ${
                    isActive 
                      ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10 scale-[1.02]" 
                      : isMax 
                        ? "opacity-30 cursor-not-allowed border-border/10 scale-95" 
                        : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-orange-500" : "text-muted-foreground/40"}`} />
                  <span className="text-xs font-black leading-tight text-center">{opt.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            Prioritizing neural pathways based on your selection
          </p>
        </div>
      </div>
    </div>
  );
}
