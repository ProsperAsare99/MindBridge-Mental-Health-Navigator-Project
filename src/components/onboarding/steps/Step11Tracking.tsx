"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Clock, 
  Calendar, 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Heart, 
  Brain, 
  Moon, 
  Zap,
  GraduationCap,
  Users,
  Battery,
  HeartPulse
} from "lucide-react";

const frequencyOptions = [
  "Multiple times a day",
  "Once a day",
  "A few times a week",
  "Once a week",
  "Only when I feel like it"
];

const metricOptions = [
  { label: "Mood/Emotions", icon: Heart },
  { label: "Stress Level", icon: Zap },
  { label: "Sleep Quality", icon: Moon },
  { label: "Academic Pressure", icon: GraduationCap },
  { label: "Social Interactions", icon: Users },
  { label: "Self-care Habits", icon: Activity },
  { label: "Energy Levels", icon: Battery },
  { label: "Physical Wellbeing", icon: HeartPulse }
];

export default function Step11Tracking({ data, update, onNext }: any) {
  const toggleMetric = (metric: string) => {
    const current = data.trackingMetrics || [];
    if (current.includes(metric)) {
      update({ trackingMetrics: current.filter((m: string) => m !== metric) });
    } else {
      update({ trackingMetrics: [...current, metric] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Tracking Protocols</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Configuring your cognitive monitoring frequency and metrics.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-4 text-base font-bold text-foreground/90">
            <Calendar className="h-5 w-5 text-orange-500" />
            Maintenance Frequency
          </label>
          <div className="grid grid-cols-1 gap-3">
            {frequencyOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ trackingFrequency: opt })}
                className={`rounded-[1.25rem] border-2 p-5 text-left text-sm font-black transition-all ${
                  data.trackingFrequency === opt 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-4 text-base font-bold text-foreground/90">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            Primary Telemetry Metrics
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {metricOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = data.trackingMetrics?.includes(opt.label);
              return (
                <button
                  key={opt.label}
                  onClick={() => toggleMetric(opt.label)}
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
            Dashboards will be calibrated to prioritize these telemetry streams
          </p>
        </div>
      </div>
    </div>
  );
}
