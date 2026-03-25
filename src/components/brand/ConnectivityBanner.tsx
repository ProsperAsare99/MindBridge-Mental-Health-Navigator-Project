"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, X, RefreshCw } from "lucide-react";

export function ConnectivityBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleConnectivityError = (event: any) => {
            setMessage(event.detail?.message || "Cloud services are temporarily unreachable.");
            setIsVisible(true);
        };

        window.addEventListener('mindbridge:connectivity-error' as any, handleConnectivityError);
        
        // Also listen for standard offline event
        const handleOffline = () => {
            setMessage("You are currently offline. Some features may be limited.");
            setIsVisible(true);
        };

        const handleOnline = () => {
            setIsVisible(false);
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('mindbridge:connectivity-error' as any, handleConnectivityError);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-xl"
            >
                <div className="glass-morphism bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <WifiOff size={20} />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                Connectivity Warning
                            </p>
                            <p className="text-[10px] md:text-xs font-bold text-muted-foreground leading-tight">
                                {message}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => window.location.reload()}
                            className="p-2 ml-2 hover:bg-amber-500/10 rounded-lg transition-colors text-amber-600 dark:text-amber-400"
                            title="Retry connection"
                        >
                            <RefreshCw size={16} />
                        </button>
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors text-muted-foreground"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
