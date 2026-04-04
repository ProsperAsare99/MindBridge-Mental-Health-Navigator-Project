"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Onboarding",
    description: "Tell us about your academic environment and personal wellness goals.",
    icon: Circle,
  },
  {
    title: "Insight Generation",
    description: "Our engine analyzes your unique stressors and patterns.",
    icon: Circle,
  },
  {
    title: "Guided Support",
    description: "Access personalized resources and direct institutional bridges.",
    icon: CheckCircle2,
  },
];

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        <div className="space-y-8">
          <div className="text-xs font-black uppercase tracking-[0.4em] text-primary">How it works</div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
            A Journey tailored <br /> 
            <span className="text-gradient">to your success.</span>
          </h2>
          <p className="text-lg font-medium text-muted-foreground leading-relaxed max-w-lg">
            MindBridge follows a structured path to ensure you receive the right support at the right time.
          </p>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-white/5 hidden md:block">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary to-blue-500" 
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative flex gap-8 items-start group"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0b] group-hover:border-primary transition-colors">
                <step.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                {i < steps.length - 1 && (
                   <div className="absolute top-12 bottom-[-48px] left-1/2 -translate-x-1/2 w-px bg-white/5 md:hidden" />
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-muted-foreground font-medium">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
