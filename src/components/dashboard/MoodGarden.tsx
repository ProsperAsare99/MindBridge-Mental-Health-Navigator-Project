"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sprout, TreePine, Leaf, Flower2, Droplets } from 'lucide-react';

interface MoodGardenProps {
    level: number; // 1-5
    health: number; // 0-100
    className?: string;
}

export const MoodGarden = ({ level, health, className }: MoodGardenProps) => {
    // Stage configurations
    const stages = [
        { icon: Sprout, label: 'Sapling', color: 'text-emerald-400' },
        { icon: Leaf, label: 'Sprouts', color: 'text-emerald-500' },
        { icon: Flower2, label: 'Flowering', color: 'text-sky-400' },
        { icon: TreePine, label: 'Young Oak', color: 'text-sky-500' },
        { icon: TreePine, label: 'Ancient Oak', color: 'text-primary' }
    ];

    const currentStage = stages[Math.min(level - 1, 4)];
    const Icon = currentStage.icon;

    return (
        <div className={cn("relative group cursor-pointer", className)}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,119,182,0.1),transparent)] rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col items-center justify-center p-8 glass rounded-[3rem] border-white/10 shadow-premium overflow-hidden">
                {/* Soil/Base */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none" />

                {/* The Plant */}
                <motion.div
                    key={level}
                    initial={{ scale: 0, y: 20, rotate: -10 }}
                    animate={{ scale: 1, y: 0, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                    className="relative"
                >
                    <Icon className={cn("h-24 w-24 md:h-32 md:w-32 transition-all duration-700 filter drop-shadow-[0_0_15px_rgba(0,119,182,0.2)]", currentStage.color)} />
                    
                    {/* Floating Orbs for Health */}
                    {health > 70 && (
                        <motion.div
                            animate={{ y: [-10, -30, -10], opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-2 h-4 w-4 bg-sky-300/30 rounded-full blur-md"
                        />
                    )}
                </motion.div>

                {/* Stage Info */}
                <div className="mt-6 text-center space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Mood Garden Stage {level}</span>
                    <h3 className="text-xl font-black text-foreground">{currentStage.label}</h3>
                    
                    {/* Health Bar */}
                    <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden mt-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${health}%` }}
                            className="h-full bg-gradient-to-r from-sky-400 to-primary"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                        <Droplets className="h-3 w-3 text-sky-400" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase">{health}% Vitality</span>
                    </div>
                </div>

                {/* Growth Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[1, 2, 3].map((p) => (
                        <motion.div
                            key={p}
                            animate={{
                                y: [0, -40, -80],
                                x: [0, (p-2)*20, (p-2)*40],
                                opacity: [0, 1, 0],
                                scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 3 + p,
                                repeat: Infinity,
                                delay: p * 1.5,
                                ease: "easeOut"
                            }}
                            className="absolute bottom-20 left-1/2 h-1 w-1 bg-sky-400/50 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
