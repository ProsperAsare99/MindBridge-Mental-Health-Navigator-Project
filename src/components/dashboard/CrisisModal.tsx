"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
    AlertCircle, 
    Phone, 
    X, 
    Heart, 
    ShieldAlert,
    ExternalLink,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CrisisModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CrisisModal({ isOpen, onClose }: CrisisModalProps) {
    const crisisResources = [
        {
            name: "Ghana Emergency",
            number: "112",
            description: "Immediate emergency response",
            icon: ShieldAlert,
            color: "text-red-500",
            bg: "bg-red-500/10"
        },
        {
            name: "Mental Health Helpline",
            number: "0800 900 900",
            description: "National support line",
            icon: Phone,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            name: "Campus Counseling",
            number: "Internal Extension",
            description: "Located at the Student Admin Block",
            icon: Clock,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-card border border-red-500/20 shadow-2xl rounded-[2.5rem] overflow-hidden"
                    >
                        {/* Status Bar */}
                        <div className="bg-red-500 h-1.5 w-full" />

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                    <AlertCircle className="h-8 w-8 text-red-500" />
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={onClose}
                                    className="rounded-full hover:bg-muted/50"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="space-y-2 mb-8">
                                <h2 className="text-3xl font-black tracking-tight text-foreground">You are not alone.</h2>
                                <p className="text-muted-foreground font-medium leading-relaxed">
                                    What you're feeling is heavy, but there is immediate support available to help you through this moment safely.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {crisisResources.map((resource, i) => (
                                    <motion.div
                                        key={resource.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors group"
                                    >
                                        <div className={`h-12 w-12 rounded-2xl ${resource.bg} flex items-center justify-center border border-border/20`}>
                                            <resource.icon className={`h-6 w-6 ${resource.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-foreground">{resource.name}</h3>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{resource.description}</p>
                                        </div>
                                        <div className="text-lg font-black text-primary group-hover:scale-105 transition-transform">
                                            {resource.number}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-border/50 flex flex-col gap-4">
                                <Button 
                                    className="w-full h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-lg shadow-xl shadow-red-500/20 gap-2"
                                    onClick={() => window.location.href = "tel:112"}
                                >
                                    <Phone className="h-5 w-5" />
                                    Call Emergency Now
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="w-full h-14 rounded-2xl font-bold gap-2"
                                    onClick={onClose}
                                >
                                    <Heart className="h-5 w-5 text-red-500" />
                                    I'm safe for now, thank you
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
