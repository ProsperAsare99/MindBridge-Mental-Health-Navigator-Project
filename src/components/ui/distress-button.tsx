"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function DistressButton() {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
            className="fixed bottom-6 right-6 z-[100]"
        >
            <Link href="/dashboard/crisis" aria-label="Immediate Crisis Support">
                <div className="relative group">
                    {/* Pulsing ring behind the button */}
                    <div className="absolute -inset-2 rounded-full bg-red-500/30 blur-md animate-pulse group-hover:bg-red-500/50 transition-colors duration-500"></div>
                    
                    {/* The button itself */}
                    <button className="relative flex items-center justify-center h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl shadow-red-900/50 hover:scale-110 active:scale-95 transition-[transform,background-color,box-shadow,border-color] duration-300 border-2 border-red-400/20">
                        <AlertCircle className="h-6 w-6" strokeWidth={2.5} />
                    </button>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-red-950/90 text-red-100 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-red-500/20 whitespace-nowrap shadow-xl">
                            Immediate Support
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
