"use client";

import { motion } from "framer-motion";
import { MessageSquare, Bell, Clock, Languages } from "lucide-react";

const languages = ["English", "Twi", "Ga", "Ewe", "Other"];
const notifications = [
  "Daily gentle reminders",
  "Only when I need support",
  "Weekly check-ins",
  "No notifications"
];
const times = [
  "Morning (6am - 10am)",
  "Afternoon (12pm - 4pm)",
  "Evening (5pm - 9pm)",
  "Night (9pm - 11pm)"
];

export default function Step3Communication({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Communication</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Tailor the system's voice to your comfort.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Languages className="h-5 w-5 text-orange-500" />
            Preferred Language
          </label>
          <div className="flex flex-wrap gap-3">
            {["English", "Twi", "Ga", "Ewe"].map((lang) => (
              <button
                key={lang}
                onClick={() => update({ language: lang.toLowerCase() })}
                className={`rounded-2xl border-2 px-6 py-3 text-sm font-black transition-all ${
                  data.language === lang.toLowerCase() 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-orange-500 inline-block" />
            Optimizing linguistic resonance for clarity
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Bell className="h-5 w-5 text-orange-500" />
            Notification Protocol
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "Daily gentle reminders", value: "daily" },
              { label: "Weekly check-ins", value: "weekly" },
              { label: "Only when needed", value: "only_when_needed" },
              { label: "No notifications", value: "none" }
            ].map((notif) => (
              <button
                key={notif.value}
                onClick={() => update({ notificationPreference: notif.value })}
                className={`rounded-[1.25rem] border-2 p-5 text-left text-sm font-black transition-all ${
                  data.notificationPreference === notif.value 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {notif.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Clock className="h-5 w-5 text-orange-500" />
            Optimal Maintenance Window
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Morning", value: "morning" },
              { label: "Afternoon", value: "afternoon" },
              { label: "Evening", value: "evening" },
              { label: "Night", value: "night" }
            ].map((time) => (
              <button
                key={time.value}
                onClick={() => update({ preferredCheckInTime: time.value })}
                className={`rounded-[1.25rem] border-2 p-5 text-center text-sm font-black transition-all ${
                  data.preferredCheckInTime === time.value 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {time.label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
