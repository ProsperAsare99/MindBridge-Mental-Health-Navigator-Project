"use client";

import { useState, useEffect, useCallback } from "react";

interface ActivityStats {
    isInactive: boolean;
    usageFrequency: 'low' | 'medium' | 'high';
    suggestion: string | null;
}

const IDLE_THRESHOLD = 1000 * 60 * 30; // 30 minutes of app inactivity
const MOVEMENT_THRESHOLD = 2.0; // Acceleration threshold for "movement"

export function useActivityDetection(): ActivityStats {
    const [isInactive, setIsInactive] = useState(false);
    const [usageFrequency, setUsageFrequency] = useState<'low' | 'medium' | 'high'>('medium');
    const [suggestion, setSuggestion] = useState<string | null>(null);

    const updateLastInteraction = useCallback(() => {
        const now = Date.now();
        localStorage.setItem("mb_last_interaction", now.toString());
        
        // Track session frequency
        const today = new Date().toDateString();
        const stats = JSON.parse(localStorage.getItem("mb_usage_stats") || "{}");
        const todayStats = stats[today] || { count: 0, lastUpdate: now };
        
        if (now - todayStats.lastUpdate > 1000 * 60 * 5) { // Only increment if 5 mins passed
            todayStats.count += 1;
            todayStats.lastUpdate = now;
            stats[today] = todayStats;
            localStorage.setItem("mb_usage_stats", JSON.stringify(stats));
        }

        if (todayStats.count < 3) setUsageFrequency('low');
        else if (todayStats.count < 8) setUsageFrequency('medium');
        else setUsageFrequency('high');

        setIsInactive(false);
    }, []);

    useEffect(() => {
        // Initial check
        const last = parseInt(localStorage.getItem("mb_last_interaction") || "0");
        if (Date.now() - last > IDLE_THRESHOLD) {
            setIsInactive(true);
        }

        // Interaction Listeners
        const events = ["mousedown", "keydown", "scroll", "touchstart"];
        events.forEach(e => window.addEventListener(e, updateLastInteraction));

        // Accelerometer / Movement Detection
        let lastMovement = Date.now();
        const handleMotion = (event: DeviceMotionEvent) => {
            const acc = event.accelerationIncludingGravity;
            if (!acc) return;

            const totalAcc = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);
            if (totalAcc > MOVEMENT_THRESHOLD) {
                lastMovement = Date.now();
                setIsInactive(false);
            }
        };

        if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
            window.addEventListener("devicemotion", handleMotion);
        }

        // Periodic Check
        const interval = setInterval(() => {
            const last = parseInt(localStorage.getItem("mb_last_interaction") || "0");
            const timeSinceLastInteraction = Date.now() - last;
            const timeSinceLastMovement = Date.now() - lastMovement;

            if (timeSinceLastInteraction > IDLE_THRESHOLD || timeSinceLastMovement > IDLE_THRESHOLD) {
                setIsInactive(true);
                setSuggestion("You’ve been inactive for a while. A short walk might help improve your mood.");
            } else if (usageFrequency === 'low') {
                setSuggestion("It's been a quiet day. Engaging with a wellness activity could boost your energy.");
            } else {
                setSuggestion(null);
            }
        }, 1000 * 60); // Check every minute

        return () => {
            events.forEach(e => window.removeEventListener(e, updateLastInteraction));
            window.removeEventListener("devicemotion", handleMotion);
            clearInterval(interval);
        };
    }, [updateLastInteraction, usageFrequency]);

    return { isInactive, usageFrequency, suggestion };
}
