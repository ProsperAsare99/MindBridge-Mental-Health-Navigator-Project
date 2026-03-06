"use client";

import React, { useState, useEffect } from "react";

const words = ["MindBridge", "Navigate", "Thrive", "Listen"];

export default function LogoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
                setIsTransitioning(false);
            }, 600);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-4 group cursor-pointer">
            {/* Clean logo icon */}
            <div className="relative h-11 w-11 rounded-2xl bg-sage flex items-center justify-center shadow-lg shadow-sage/5 group-hover:bg-olive transition-colors duration-500">
                <div className="h-2.5 w-2.5 rounded-full bg-linen shadow-sm" />
            </div>

            {/* Word carousel */}
            <div className="h-10 overflow-hidden relative pr-4">
                <div
                    className={`transition-all duration-700 ease-in-out ${isTransitioning
                        ? "opacity-0 -translate-y-4 blur-sm"
                        : "opacity-100 translate-y-0 blur-0"
                        }`}
                >
                    <span className="block text-2xl font-black text-olive uppercase tracking-[0.05em] h-10 leading-10">
                        {words[currentIndex]}
                    </span>
                </div>
            </div>

            {/* Separator deco */}
            <div className="h-4 w-[1px] bg-olive/10 hidden md:block" />
        </div>
    );
}
