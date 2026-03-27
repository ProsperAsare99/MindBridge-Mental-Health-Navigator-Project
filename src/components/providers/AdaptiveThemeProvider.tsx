"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";

type ThemeMode = 'CALM' | 'ENERGY' | 'STABILITY' | 'DEFAULT';

interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function AdaptiveThemeProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [mode, setMode] = useState<ThemeMode>('DEFAULT');

    useEffect(() => {
        if (!user) return;

        const updateTheme = async () => {
            try {
                const moods = await api.get('/moods');
                if (moods.length > 0) {
                    const latest = moods[0];
                    const now = new Date();
                    const hour = now.getHours();

                    // Logic for Adaptive UI
                    if (latest.mood <= 2) {
                        setMode('CALM'); // Softer colors for low mood
                    } else if (latest.mood >= 4 && (hour > 6 && hour < 18)) {
                        setMode('ENERGY'); // Vibrant colors for good mood/daytime
                    } else if (hour >= 22 || hour < 5) {
                        setMode('STABILITY'); // Deep, non-intrusive colors for late night
                    } else {
                        setMode('DEFAULT');
                    }
                }
            } catch (error) {
                console.error("Theme sync error:", error);
            }
        };

        updateTheme();
        const interval = setInterval(updateTheme, 1000 * 60 * 15); // Every 15 mins
        return () => clearInterval(interval);
    }, [user]);

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Map modes to CSS variables
        const themes = {
            CALM: {
                '--primary': '210 40% 60%', // Soft Blue
                '--primary-foreground': '210 20% 98%',
                '--secondary': '180 30% 70%', // Muted Teal
                '--accent': '200 20% 90%'
            },
            ENERGY: {
                '--primary': '20 90% 60%', // Vibrant Orange
                '--primary-foreground': '0 0% 100%',
                '--secondary': '45 90% 60%', // Bright Yellow
                '--accent': '15 80% 90%'
            },
            STABILITY: {
                '--primary': '260 30% 40%', // Deep Purple
                '--primary-foreground': '210 20% 98%',
                '--secondary': '240 20% 30%', // Night Blue
                '--accent': '260 20% 20%'
            },
            DEFAULT: {
              // Standard values from globals.css usually stay 
              // but we can reset them if needed or just let globals.css take over
            }
        };

        const currentTheme = themes[mode] as any;
        if (mode !== 'DEFAULT') {
            Object.entries(currentTheme).forEach(([key, value]) => {
                root.style.setProperty(key, value as string);
            });
        } else {
            // Reset to defaults (assumed)
            root.style.removeProperty('--primary');
            root.style.removeProperty('--primary-foreground');
            root.style.removeProperty('--secondary');
            root.style.removeProperty('--accent');
        }
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useAdaptiveTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useAdaptiveTheme must be used within AdaptiveThemeProvider");
    return context;
};
