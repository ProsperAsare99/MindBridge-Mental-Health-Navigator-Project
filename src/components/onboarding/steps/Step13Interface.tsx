"use client";

import { motion } from "framer-motion";
import { Palette, Layout, Sparkles, Check } from "lucide-react";

const themes = [
  { name: "🧡 MindBridge Orange (default)", color: "bg-orange-500" },
  { name: "🌑 Midnight Calm", color: "bg-zinc-900" },
  { name: "🌊 Ocean Peace", color: "bg-blue-500" },
  { name: "🌅 Sunset Glow", color: "bg-amber-500" },
  { name: "💜 Lavender Bliss", color: "bg-purple-500" }
];

const layouts = [
  { name: "Today's mood check-in", desc: "Focus on your daily wellbeing first" },
  { name: "Support resources", desc: "Quick access to help and tools" },
  { name: "Journal & Reflections", desc: "Prioritize your personal growth writing" },
  { name: "Smart AI Insights", desc: "Deep dive into your patterns and AI guidance" }
];

export default function Step13Interface({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Interface Calibration</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Finalizing your aesthetic and structural preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-4 text-base font-bold text-foreground/90">
            <Palette className="h-5 w-5 text-orange-500" />
            Chromatic Theme
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => update({ preferredTheme: theme.name })}
                className={`flex items-center justify-between rounded-[1.25rem] border-2 p-5 text-left transition-all ${
                  data.preferredTheme === theme.name 
                    ? "border-orange-500 bg-orange-500/10 shadow-md shadow-orange-500/10 scale-[1.02]" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-5 w-5 rounded-full ${theme.color} border-2 border-white/40 shadow-sm`} />
                  <span className={`text-sm font-black ${data.preferredTheme === theme.name ? "text-orange-700" : "text-foreground"}`}>{theme.name}</span>
                </div>
                {data.preferredTheme === theme.name && <Check className="h-4 w-4 text-orange-600" />}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-4 text-base font-bold text-foreground/90">
            <Layout className="h-5 w-5 text-orange-500" />
            Primary Structural Layout
          </label>
          <div className="grid grid-cols-1 gap-3">
            {layouts.map((l) => (
              <button
                key={l.name}
                onClick={() => update({ dashboardLayout: l.name })}
                className={`flex items-start gap-5 rounded-[1.5rem] border-2 p-6 text-left transition-all ${
                  data.dashboardLayout === l.name 
                    ? "border-orange-500 bg-orange-500/10 shadow-md shadow-orange-500/10 scale-[1.01]" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40"
                }`}
              >
                <div className="space-y-2">
                  <p className={`text-base font-black ${data.dashboardLayout === l.name ? "text-orange-700" : "text-foreground"}`}>{l.name}</p>
                  <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed">{l.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-orange-500/20 bg-orange-500/5 p-10 text-center backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5" />
          <Sparkles className="mx-auto h-16 w-16 text-orange-500 animate-pulse relative z-10" />
          <h3 className="mt-6 text-3xl font-black uppercase tracking-tighter text-foreground relative z-10">System Ready</h3>
          <p className="mt-3 text-base font-bold text-muted-foreground/80 max-w-sm mx-auto leading-relaxed relative z-10">
            Your cognitive framework has been successfully calibrated. Welcome to MindBridge.
          </p>
        </div>
      </div>
    </div>
  );
}
