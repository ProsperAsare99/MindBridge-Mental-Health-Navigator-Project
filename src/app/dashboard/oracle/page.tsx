"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2, User, Bot, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: string;
}

export default function OraclePage() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingHistory, setIsFetchingHistory] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchHistory = async () => {
        try {
            const h = await api.get('/ai/history');
            setMessages(h);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        } finally {
            setIsFetchingHistory(false);
        }
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setIsLoading(true);

        // Optimistic update
        const tempId = Date.now().toString();
        setMessages(prev => [...prev, {
            id: tempId,
            content: userMsg,
            role: 'user',
            createdAt: new Date().toISOString()
        }]);

        try {
            const res = await api.post('/ai/chat', { message: userMsg });
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                content: res.response,
                role: 'assistant',
                createdAt: new Date().toISOString()
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                content: "I'm sorry, I seem to have lost my connection to the stars. Please try again soon.",
                role: 'assistant',
                createdAt: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white/5 backdrop-blur-md rounded-t-2xl border-b border-white/10">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Sparkles className="text-white w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">The Oracle</h1>
                        <p className="text-sm text-gray-400">Empathic AI Guide</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                    <History className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest">Archive</span>
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20"
            >
                {isFetchingHistory ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                            <Sparkles className="text-purple-400 w-10 h-10 opacity-20" />
                        </div>
                        <div className="max-w-xs">
                            <p className="text-gray-400 text-sm leading-relaxed">
                                "The road to self-discovery begins with a single question. How are you feeling today?"
                            </p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[80%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                                    }`}>
                                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-blue-600/90 text-white rounded-tr-none'
                                        : 'bg-white/10 text-gray-200 backdrop-blur-sm rounded-tl-none border border-white/5'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex space-x-3 items-center">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="flex space-x-1">
                                <span className="w-1.5 h-1.5 bg-purple-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-purple-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-purple-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSend}
                className="p-6 bg-white/5 backdrop-blur-md rounded-b-2xl border-t border-white/10"
            >
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Speak with the Oracle..."
                        disabled={isLoading}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 p-2 text-purple-400 hover:text-purple-300 disabled:text-gray-600 transition-colors"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
                <div className="mt-3 text-[10px] text-center text-gray-500 uppercase tracking-widest font-medium opacity-50">
                    Your thoughts are safe in this sanctuary
                </div>
            </form>
        </div>
    );
}
