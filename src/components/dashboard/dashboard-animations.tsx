"use client";

import { motion } from "framer-motion";
import { useMoodTheme } from "@/hooks/useMoodTheme";

export const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
    useMoodTheme();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
        >
            {children}
        </motion.div>
    );
};

export const DashboardItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
};
