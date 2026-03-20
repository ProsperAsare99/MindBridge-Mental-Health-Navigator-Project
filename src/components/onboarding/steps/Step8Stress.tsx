"use client";

import { motion } from "framer-motion";
import { AlertCircle, FileText, Users, Presentation, BookOpen, Wallet, Users2 } from "lucide-react";

const stressors = [
  { id: "exams", label: "Exams", icon: FileText },
  { id: "deadlines", label: "Assignments/Deadlines", icon: AlertCircle },
  { id: "groups", label: "Group work", icon: Users },
  { id: "presentation", label: "Presentations", icon: Presentation },
  { id: "comprehension", label: "Understanding coursework", icon: BookOpen },
  { id: "financial", label: "Financial pressure", icon: Wallet },
  { id: "family", label: "Family expectations", icon: Users2 }
];

export default function Step8Stress({ data, update, onNext }: any) {
  const setRating = (id: string, rating: number) => {
    update({
      academicStressors: {
        ...data.academicStressors,
        [id]: rating
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Academic Load</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Quantifying your current educational pressures.</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-black text-foreground/90 uppercase tracking-[0.15em]">Rating Scale: (1=Low Load, 5=Critical Load)</p>
        
        <div className="space-y-5">
          {stressors.map((s) => {
            const Icon = s.icon;
            const currentRating = data.academicStressors?.[s.id] || 1;
            
            return (
              <div key={s.id} className="space-y-4 rounded-[1.5rem] border border-border/30 bg-muted/10 p-6 transition-all hover:border-orange-500/40">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-orange-500/10 p-3">
                    <Icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-base font-bold text-foreground">{s.label}</span>
                </div>
                
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRating(s.id, num)}
                      className={`h-12 w-12 rounded-xl text-sm font-black transition-all ${
                        currentRating === num 
                          ? "bg-orange-500 text-white shadow-xl shadow-orange-500/30 scale-110" 
                          :  num < currentRating 
                            ? "bg-orange-500/20 text-orange-700" 
                            : "bg-muted/30 text-muted-foreground/40"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-orange-500" />
          Used to prioritize support modules during critical academic windows
        </p>
      </div>
    </div>
  );
}
