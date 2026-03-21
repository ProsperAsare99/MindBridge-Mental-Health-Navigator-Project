"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
    Send,
    User as UserIcon,
    BrainCircuit,
    Mic,
    MicOff,
    AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
    isCrisis?: boolean;
    metadata?: any;
    suggestedActions?: any[];
}

interface AIChatbotProps {
    initialMessages?: Message[];
    onCrisisDetected?: () => void;
}

export function AIChatbot({ initialMessages = [], onCrisisDetected }: AIChatbotProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [emotionalState, setEmotionalState] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length === 0) {
            fetchChatHistory();
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchChatHistory = async () => {
        try {
            const res = await api.get('/ai/conversations');
            // Logic to get messages from most recent conversation if needed
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await api.post('/ai/chat', { 
                message: userMessage
            });
            
            setMessages(prev => [...prev, { 
                role: "assistant", 
                content: res.response,
                isCrisis: res.isCrisis,
                suggestedActions: res.suggestedActions
            }]);

            if (res.isCrisis && onCrisisDetected) {
                onCrisisDetected();
            }

            // Update emotional state for the header indicator
            if (res.safetyAlert || res.isCrisis) {
                setEmotionalState({ intensity: 9, alert: true });
            }
        } catch (error) {
            console.error("Oracle Error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "The Oracle is currently in deep meditation. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = (action: string) => {
        if (action.startsWith('/')) {
            window.location.href = action;
        } else if (action === 'SHOW_CONTACTS') {
            onCrisisDetected?.();
        }
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.start();
    };

    return (
        <div className="flex flex-col h-full bg-background/40 backdrop-blur-xl rounded-3xl border border-border/40 overflow-hidden shadow-2xl relative">
            {/* Emotional State Header */}
            {emotionalState && (
                <div className="px-6 py-2 bg-primary/5 border-b border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full animate-pulse", emotionalState.alert ? "bg-red-500" : "bg-primary")} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">User Vibe: {emotionalState.intensity}/10</span>
                    </div>
                </div>
            )}

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar"
            >
                {messages.length === 0 && !isLoading && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-sm mx-auto">
                        <div className="h-20 w-20 rounded-[2.5rem] bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-xl shadow-primary/5">
                            <BrainCircuit className="h-10 w-10 text-primary animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground/90 tracking-tighter">Your Mind, Reimagined.</h2>
                        <p className="text-sm text-muted-foreground font-medium">I am your context-aware navigator. Share your thoughts, feelings, or recent stressors.</p>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            {["Feeling overwhelmed", "Academic stress", "Need a breathing exercise", "Just to talk"].map(s => (
                                <button 
                                    key={s}
                                    onClick={() => setInput(s)}
                                    className="px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-[10px] font-bold text-muted-foreground hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                <AnimatePresence>
                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex gap-4 max-w-[85%] animate-in fade-in slide-in-from-bottom-2",
                                m.role === "user" ? "ml-auto flex-row-reverse text-right" : ""
                            )}
                        >
                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm",
                                m.role === "assistant" ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted border-border text-muted-foreground"
                            )}>
                                {m.role === "assistant" ? <BrainCircuit size={20} /> : <UserIcon size={20} />}
                            </div>
                            <div className="space-y-3 flex-1">
                                <div className={cn(
                                    "space-y-2 p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed tracking-tight group relative",
                                    m.role === "assistant" ? "bg-card border border-border shadow-premium text-foreground/90" : "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                                )}>
                                    {m.content}
                                    {m.isCrisis && (
                                        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                            <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Priority Support Recommended</p>
                                        </div>
                                    )}
                                </div>

                                {/* Suggested Actions */}
                                {m.role === "assistant" && m.suggestedActions && m.suggestedActions.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {m.suggestedActions.map((action, ai) => (
                                            <button
                                                key={ai}
                                                onClick={() => handleAction(action.action)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight transition-all border",
                                                    action.priority === 'CRITICAL' 
                                                        ? "bg-red-500 text-white border-red-600 shadow-lg shadow-red-500/20" 
                                                        : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                                )}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 animate-pulse">
                            <BrainCircuit size={20} />
                        </div>
                        <div className="p-5 rounded-[1.5rem] bg-card border border-border shadow-premium flex gap-1.5 items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce delay-75" />
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce delay-150" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-background/40 backdrop-blur-xl border-t border-border/40">
                <div className="max-w-4xl mx-auto flex items-end gap-3 p-2 rounded-[2rem] bg-muted/30 border border-border/50 shadow-inner group transition-all focus-within:border-primary/20 focus-within:ring-4 focus-within:ring-primary/5">
                    <button 
                        onClick={startListening}
                        className={cn(
                            "h-12 w-12 rounded-full flex items-center justify-center transition-all shrink-0",
                            isListening ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20" : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                        )}
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <textarea
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={isListening ? "Listening..." : "Whisper to the Oracle..."}
                        className="flex-1 bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground/50 text-sm font-medium py-3.5 max-h-32 resize-none overflow-y-auto"
                    />
                    <Button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        size="icon" 
                        className="h-12 w-12 rounded-full shadow-lg shadow-primary/20 shrink-0 transition-transform active:scale-95 translate-y-[2px]"
                    >
                        <Send size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
