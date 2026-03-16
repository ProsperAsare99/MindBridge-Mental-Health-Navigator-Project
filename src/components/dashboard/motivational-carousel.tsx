"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote as QuoteIcon } from "lucide-react";

const MOTIVATION_QUOTES = [
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "You are capable of more than you know.", author: "Glinda, The Wizard of Oz" }
];

export function MotivationalCarousel() {
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % MOTIVATION_QUOTES.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const currentQuote = MOTIVATION_QUOTES[quoteIndex];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                <p className="text-2xl md:text-3xl font-extrabold font-serif italic text-foreground tracking-tight leading-tight">
                    "{currentQuote.text}"
                </p>
                <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                        — {currentQuote.author}
                    </span>
                    <QuoteIcon className="h-8 w-8 text-primary opacity-20" strokeWidth={3} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
