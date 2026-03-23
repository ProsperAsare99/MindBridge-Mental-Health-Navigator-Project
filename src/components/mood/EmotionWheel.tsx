"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EMOTIONS = [
  { label: "Radiant", color: "fill-yellow-400", bg: "bg-yellow-400/20", description: "Joy, excitement, energy" },
  { label: "Serene", color: "fill-emerald-400", bg: "bg-emerald-400/20", description: "Peace, calm, contentment" },
  { label: "Melancholy", color: "fill-blue-400", bg: "bg-blue-400/20", description: "Sadness, reflection, low energy" },
  { label: "Anxious", color: "fill-amber-400", bg: "bg-amber-400/20", description: "Worry, tension, unease" },
  { label: "Frustrated", color: "fill-orange-400", bg: "bg-orange-400/20", description: "Irritation, impatience" },
  { label: "Grateful", color: "fill-pink-400", bg: "bg-pink-400/20", description: "Appreciation, warmth" },
  { label: "Empty", color: "fill-slate-400", bg: "bg-slate-400/20", description: "Numbness, lack of drive" },
  { label: "Empowered", color: "fill-indigo-400", bg: "bg-indigo-400/20", description: "Strength, confidence" },
];

interface EmotionWheelProps {
  onSelect: (emotion: string) => void;
  selectedEmotion?: string | null;
}

export function EmotionWheel({ onSelect, selectedEmotion }: EmotionWheelProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const radius = 100;
  const centerX = 150;
  const centerY = 150;
  const segmentAngle = 360 / EMOTIONS.length;

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="relative h-[300px] w-[300px]">
        <svg viewBox="0 0 300 300" className="h-full w-full rotate-[-22.5deg]">
          {EMOTIONS.map((emotion, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            
            // Convert polar to cartesian
            const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

            // Large radius arc
            const outerR = radius + 40;
            const ox1 = centerX + outerR * Math.cos((startAngle * Math.PI) / 180);
            const oy1 = centerY + outerR * Math.sin((startAngle * Math.PI) / 180);
            const ox2 = centerX + outerR * Math.cos((endAngle * Math.PI) / 180);
            const oy2 = centerY + outerR * Math.sin((endAngle * Math.PI) / 180);

            const isSelected = selectedEmotion === emotion.label;
            const isHovered = hovered === emotion.label;

            return (
              <motion.path
                key={emotion.label}
                d={`M ${x1} ${y1} L ${ox1} ${oy1} A ${outerR} ${outerR} 0 0 1 ${ox2} ${oy2} L ${x2} ${y2} A ${radius} ${radius} 0 0 0 ${x1} ${y1} Z`}
                className={cn(
                  "cursor-pointer transition-all duration-300 stroke-[2px] stroke-background/50",
                  emotion.color,
                  isSelected ? "opacity-100 scale-[1.05]" : "opacity-40 hover:opacity-80"
                )}
                onMouseEnter={() => setHovered(emotion.label)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelect(emotion.label)}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
              />
            );
          })}
          
          {/* Inner Circle (Decorative) */}
          <circle cx={centerX} cy={centerY} r={radius - 10} className="fill-background/20 backdrop-blur-sm" />
          <text 
            x={centerX} 
            y={centerY} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="fill-foreground font-black text-[12px] uppercase tracking-[0.2em] transform rotate-[22.5deg]"
          >
            {selectedEmotion || "Wheel"}
          </text>
        </svg>

        {/* Selected Label Display */}
        <AnimatePresence mode="wait">
          {(hovered || selectedEmotion) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
            >
              <p className="text-sm font-black text-foreground uppercase tracking-widest">
                {hovered || selectedEmotion}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground italic">
                {EMOTIONS.find(e => e.label === (hovered || selectedEmotion))?.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
