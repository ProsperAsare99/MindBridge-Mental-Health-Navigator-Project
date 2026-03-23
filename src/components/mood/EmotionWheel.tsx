"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EMOTIONS = [
  { label: "Radiant", color: "fill-yellow-400", stroke: "stroke-yellow-500", bg: "bg-yellow-400", description: "Joy & Energy" },
  { label: "Serene", color: "fill-emerald-400", stroke: "stroke-emerald-500", bg: "bg-emerald-400", description: "Peace & Calm" },
  { label: "Melancholy", color: "fill-blue-400", stroke: "stroke-blue-500", bg: "bg-blue-400", description: "Reflection" },
  { label: "Anxious", color: "fill-amber-400", stroke: "stroke-amber-500", bg: "bg-amber-400", description: "Tension" },
  { label: "Frustrated", color: "fill-orange-400", stroke: "stroke-orange-500", bg: "bg-orange-400", description: "Impatience" },
  { label: "Grateful", color: "fill-pink-400", stroke: "stroke-pink-500", bg: "bg-pink-400", description: "Warmth" },
  { label: "Empty", color: "fill-slate-400", stroke: "stroke-slate-500", bg: "bg-slate-400", description: "Low Drive" },
  { label: "Empowered", color: "fill-indigo-400", stroke: "stroke-indigo-500", bg: "bg-indigo-400", description: "Strength" },
];

interface EmotionWheelProps {
  onSelect: (emotion: string) => void;
  selectedEmotion?: string | null;
}

export function EmotionWheel({ onSelect, selectedEmotion }: EmotionWheelProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  
  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 110;
  const outerRadius = 160;
  const segmentAngle = 360 / EMOTIONS.length;

  const currentSelection = hovered || selectedEmotion;
  const selectedData = EMOTIONS.find(e => e.label === currentSelection);

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full">
      <div className="relative" style={{ width, height }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full rotate-[-22.5deg]">
          {EMOTIONS.map((emotion, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            
            // Middle angle for label placement
            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = outerRadius + 20;
            const lx = centerX + labelRadius * Math.cos((midAngle * Math.PI) / 180);
            const ly = centerY + labelRadius * Math.sin((midAngle * Math.PI) / 180);

            // Cartesian for path
            const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

            const ox1 = centerX + outerRadius * Math.cos((startAngle * Math.PI) / 180);
            const oy1 = centerY + outerRadius * Math.sin((startAngle * Math.PI) / 180);
            const ox2 = centerX + outerRadius * Math.cos((endAngle * Math.PI) / 180);
            const oy2 = centerY + outerRadius * Math.sin((endAngle * Math.PI) / 180);

            const isSelected = selectedEmotion === emotion.label;
            const isHovered = hovered === emotion.label;

            return (
              <g key={emotion.label}>
                <motion.path
                  d={`M ${x1} ${y1} L ${ox1} ${oy1} A ${outerRadius} ${outerRadius} 0 0 1 ${ox2} ${oy2} L ${x2} ${y2} A ${radius} ${radius} 0 0 0 ${x1} ${y1} Z`}
                  className={cn(
                    "cursor-pointer transition-all duration-300 stroke-[3px]",
                    emotion.color,
                    emotion.stroke,
                    isSelected || isHovered ? "opacity-100 scale-[1.05]" : "opacity-30 hover:opacity-100"
                  )}
                  style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                  onMouseEnter={() => setHovered(emotion.label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect(emotion.label)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isSelected || isHovered ? 1 : 0.3 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 120 }}
                />
                
                {/* Segment Labels */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                    "font-black text-[9px] uppercase tracking-tighter transition-all duration-300 pointer-events-none",
                    isSelected || isHovered ? "fill-foreground scale-110" : "fill-muted-foreground/30"
                  )}
                  style={{ 
                    transform: `rotate(${22.5}deg)`,
                    transformOrigin: `${lx}px ${ly}px`
                  }}
                >
                  {emotion.label}
                </text>
              </g>
            );
          })}
          
          {/* Centered Integrated Circle */}
          <motion.circle 
            cx={centerX} 
            cy={centerY} 
            r={radius - 5} 
            className={cn(
              "transition-colors duration-500 stroke-[4px] stroke-background shadow-2xl",
              selectedData ? selectedData.color : "fill-muted/20"
            )}
            animate={{ 
              scale: currentSelection ? [1, 1.05, 1] : 1,
              opacity: currentSelection ? 1 : 0.5 
            }}
            transition={{ repeat: currentSelection ? Infinity : 0, duration: 2 }}
          />

          <text 
            x={centerX} 
            y={centerY} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="fill-white font-black text-[12px] uppercase tracking-[0.3em] transform rotate-[22.5deg] shadow-sm pointer-events-none"
          >
            {currentSelection ? "" : "Select"}
          </text>
        </svg>

        {/* Floating Detail Overlay */}
        <AnimatePresence mode="wait">
          {currentSelection && (
            <motion.div
              key={currentSelection} // unique key for AnimatePresence
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="text-center space-y-0.5 transform rotate-[22.5deg]">
                <p className="text-xs font-black text-white uppercase tracking-widest drop-shadow-md">
                   {currentSelection}
                </p>
                <p className="text-[7px] font-black text-white/80 uppercase tracking-tighter drop-shadow-sm">
                   {selectedData?.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
