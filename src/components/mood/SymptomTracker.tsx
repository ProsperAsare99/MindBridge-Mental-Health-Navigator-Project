"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SYMPTOMS = [
  "Headache", "Fatigue", "Brain Fog", "Nausea", "Appetite Change", 
  "Muscle Tension", "Back Pain", "Dizziness", "Insomnia", "Chest Tightness"
];

interface SymptomTrackerProps {
  selected: string[];
  onChange: (symptoms: string[]) => void;
}

export function SymptomTracker({ selected, onChange }: SymptomTrackerProps) {
  const toggleSymptom = (symptom: string) => {
    if (selected.includes(symptom)) {
      onChange(selected.filter((s) => s !== symptom));
    } else {
      onChange([...selected, symptom]);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">
        Physical Resonances
      </h4>
      <div className="flex flex-wrap gap-2">
        {SYMPTOMS.map((symptom) => {
          const isSelected = selected.includes(symptom);
          return (
            <motion.button
              key={symptom}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSymptom(symptom)}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-bold transition-all border",
                isSelected
                  ? "bg-secondary text-secondary-foreground border-secondary shadow-lg shadow-secondary/20"
                  : "bg-muted/50 border-transparent hover:border-secondary/30 text-muted-foreground"
              )}
            >
              {symptom}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
