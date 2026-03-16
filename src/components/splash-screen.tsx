"use client";

import React, { useState, useEffect } from "react";

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [phase, setPhase] = useState<"enter" | "exit">("enter");

    useEffect(() => {
        // Simple 3 phase timing
        const exitTimer = setTimeout(() => setPhase("exit"), 2500);
        const completeTimer = setTimeout(() => onComplete(), 3200);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-linen transition-opacity duration-700 ease-in-out ${phase === "exit" ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="flex flex-col items-center space-y-8">
                {/* Logo icon - Clean Sage Square */}
                <div
                    className={`relative h-24 w-24 rounded-[2rem] bg-sage flex items-center justify-center shadow-xl shadow-sage/10 transition-all duration-1000 ${phase === "enter" ? "scale-90 opacity-0 translate-y-4" : "scale-100 opacity-100 translate-y-0"
                        }`}
                >
                    <div className="h-6 w-6 rounded-full bg-linen" />
                </div>

                {/* Text branding */}
                <div className={`text-center space-y-4 transition-all duration-1000 delay-300 ${phase === "enter" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                    }`}>
                    <h1 className="text-4xl md:text-5xl font-black text-olive uppercase tracking-[0.2em]">MindBridge</h1>
                    <p className="text-xs font-black text-sage uppercase tracking-[0.5em] opacity-40 italic">
                        Mental Health Navigator
                    </p>
                </div>
            </div>

            {/* Bottom progress - very minimal */}
            <div className="absolute bottom-24 w-32 h-[1px] bg-olive/5 overflow-hidden rounded-full">
                <div
                    className={`h-full bg-sage transition-transform duration-[2500ms] ease-linear w-full will-change-transform`}
                    style={{ transform: phase === "enter" ? "translateX(-100%)" : "translateX(0%)" }}
                />
            </div>

            <p className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.8em] text-ink/10">Establishing Bridge</p>
        </div>
    );
}
