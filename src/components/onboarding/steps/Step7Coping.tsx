"use client";

import { motion } from "framer-motion";
import { Coffee, Music, Bike, PenTool, Book, Users, Heart, Brain, Moon, Tv, Smile } from "lucide-react";

const copingOptions = [
  { label: "Talk to someone", value: "talk", icon: Users },
  { label: "Write/journal", value: "journal", icon: PenTool },
  { label: "Exercise or move", value: "exercise", icon: Bike },
  { label: "Listen to music", value: "music", icon: Music },
  { label: "Pray or meditate", value: "pray", icon: Heart },
  { label: "Other / Not sure", value: "other", icon: Brain }
];

export default function Step7Coping({ data, update, onNext }: any) {
  const toggleCoping = (optionValue: string) => {
    const current = data.copingStyles || [];
    if (current.includes(optionValue)) {
      update({ copingStyles: current.filter((o: string) => o !== optionValue) });
    } else {
      update({ copingStyles: [...current, optionValue] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Coping Styles</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Identifying your natural resilience mechanisms.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-base font-bold text-foreground/90">
            When stressed, I find it helpful to: (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {copingOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = data.copingStyles?.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleCoping(opt.value)}
                  className={`flex flex-col items-center gap-3 rounded-[1.25rem] border-2 p-5 transition-all ${
                    isActive 
                      ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10 scale-[1.02]" 
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
            We'll synchronize our recommendations with your natural recovery protocols
          </p>
        </div>
      </div>
    </div>
  );
}
