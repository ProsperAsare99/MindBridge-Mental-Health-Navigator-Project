"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-6", className)}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  title: string;
  description: string;
  icon: any;
  className?: string;
  color?: string;
}

export function BentoCard({ title, description, icon: Icon, className, color }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/5 bg-secondary/30 p-8 flex flex-col justify-between transition-colors hover:border-primary/20",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-6 border border-white/5", color)}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-muted-foreground font-medium leading-relaxed">{description}</p>
      </div>
      
      <div className="relative z-10 mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
        Learn More
        <span className="h-px w-8 bg-primary" />
      </div>
    </motion.div>
  );
}
