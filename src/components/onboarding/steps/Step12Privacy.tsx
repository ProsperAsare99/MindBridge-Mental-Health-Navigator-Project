"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Lock, Info, ExternalLink } from "lucide-react";

const visibilityOptions = [
  { label: "Only me", desc: "Your data is private and encrypted for your eyes only." },
  { label: "Anonymous research", desc: "Contribute to de-identified mental health research in Ghana." },
  { label: "Counselor access", desc: "Allow university counselors to see your trends if you request support." }
];

export default function Step12Privacy({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Data Encryption</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">You maintain absolute sovereignty over your cognitive data.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border-2 border-orange-500/20 bg-orange-500/5 p-8 backdrop-blur-sm">
          <div className="flex gap-5">
            <div className="rounded-2xl bg-orange-500/10 p-4 shrink-0">
              <ShieldCheck className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black uppercase tracking-tight text-orange-800 dark:text-orange-200">System Privacy Integrity</h3>
              <p className="text-sm font-bold text-orange-700/70 dark:text-orange-300/70 leading-relaxed">
                Your wellbeing data is decentralized and encrypted end-to-end. We maintain zero-knowledge infrastructure regarding your personal identifiers.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-base font-bold text-foreground/90 uppercase tracking-widest">
            Data Access Permissions
          </label>
          <div className="grid grid-cols-1 gap-4">
            {visibilityOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => update({ dataVisibility: opt.label })}
                className={`flex items-start gap-5 rounded-[1.5rem] border-2 p-6 text-left transition-all ${
                  data.dataVisibility === opt.label 
                    ? "border-orange-500 bg-orange-500/10 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40"
                }`}
              >
                <div className={`mt-0.5 rounded-xl p-3 shrink-0 ${data.dataVisibility === opt.label ? "bg-orange-500/20" : "bg-muted/30"}`}>
                  {opt.label === "Only me" ? <Lock className="h-4 w-4" /> : opt.label === "Anonymous research" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </div>
                <div className="space-y-2">
                  <p className={`text-base font-black ${data.dataVisibility === opt.label ? "text-orange-700" : "text-foreground"}`}>{opt.label}</p>
                  <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border-2 border-border/20 bg-muted/5 p-6 transition-all hover:bg-muted/10">
          <input
            type="checkbox"
            id="consent"
            checked={data.dataSharingConsent}
            onChange={(e) => update({ dataSharingConsent: e.target.checked })}
            className="h-6 w-6 rounded-lg border-2 border-orange-500/30 text-orange-500 focus:ring-orange-500/20 transition-all"
          />
          <label htmlFor="consent" className="text-xs font-black text-muted-foreground/80 leading-snug cursor-pointer select-none">
            I acknowledge and accept the <span className="text-orange-600 font-black decoration-2 underline-offset-4 underline cursor-pointer hover:text-orange-700">Privacy Protocol</span> and <span className="text-orange-600 font-black decoration-2 underline-offset-4 underline cursor-pointer hover:text-orange-700">Service Architecture Terms</span>.
          </label>
        </div>
      </div>
    </div>
  );
}
