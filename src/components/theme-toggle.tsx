"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Effect to handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="flex bg-muted/50 rounded-full p-1 border border-border/40 w-[120px] h-10 animate-pulse" />
    );

    const OPTIONS = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
        { id: 'system', icon: Monitor, label: 'System' }
    ];

    return (
        <div className="bg-muted/80 backdrop-blur-md rounded-full p-1 border border-border/50 flex items-center gap-1 shadow-inner relative overflow-hidden h-10 w-[120px]">
            {OPTIONS.map((opt) => {
                const isActive = theme === opt.id;
                const Icon = opt.icon;
                return (
                    <button
                        key={opt.id}
                        onClick={() => setTheme(opt.id)}
                        title={opt.label}
                        className={cn(
                            "flex-1 flex items-center justify-center h-full rounded-full transition-all duration-300 relative z-10",
                            isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon size={16} className={cn("transition-transform", isActive ? "scale-110" : "scale-100")} />
                        
                        {isActive && (
                            <motion.div
                                layoutId="theme-active-pill"
                                className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
