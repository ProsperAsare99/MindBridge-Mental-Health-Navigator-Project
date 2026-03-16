"use client";

import { useSearch } from "@/components/providers/SearchProvider";
import { Search } from "lucide-react";

export function SearchTrigger() {
  const { toggle } = useSearch();
  
  return (
    <button 
      onClick={toggle}
      className="w-full h-20 px-8 rounded-[2.5rem] glass border border-white/10 flex items-center gap-6 group hover:border-primary/40 transition-all text-left backdrop-blur-3xl shadow-premium"
    >
      <Search className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors group-hover:scale-110" />
      <span className="text-xl font-medium text-muted-foreground/50">How can we help today?</span>
      <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/5 border border-primary/10 text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">
        ⌘K
      </div>
    </button>
  );
}
