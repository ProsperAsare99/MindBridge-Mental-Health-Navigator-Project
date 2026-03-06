"use client";

import React, { useRef, useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Helper function to merge class names
const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
};

// Custom Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "default" | "outline";
    className?: string;
}

const Button = ({
    children,
    variant = "default",
    className = "",
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";

    const variantStyles = {
        default: "bg-indigo-600 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-100",
        outline: "border border-input bg-background hover:bg-gray-50 text-gray-700"
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Custom Input Component
const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            className={cn(
                "flex h-11 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
};

// Decorative Dot Map Component
const DotMap = () => (
    <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)',
            backgroundSize: '30px 30px'
        }}
    />
);

const SignInCard = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        console.log("Sign in attempt", { email, password });
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="flex w-full h-full items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl overflow-hidden rounded-2xl flex bg-white shadow-2xl m-2"
            >
                {/* Left side - Map (MindBridge Branding) */}
                <div className="hidden md:block w-1/2 min-h-[600px] relative overflow-hidden border-r border-gray-100 bg-[#fafafa]">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50">
                        <DotMap />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                className="mb-6"
                            >
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-200">
                                    <div className="h-6 w-6 rounded-full bg-white" />
                                </div>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
                            >
                                MindBridge
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-sm text-center text-gray-400 max-w-xs leading-relaxed"
                            >
                                A Navigator for Tertiary Students in Ghana. Accessible, Context-Aware, and Private.
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Right side - Sign In Form */}
                <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-xs md:text-sm font-medium flex items-center gap-1 group">
                                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                                Back to home
                            </Link>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">Welcome back</h1>
                        <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">Sign in to your MindBridge account</p>

                        <div className="mb-6">
                            <button
                                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 text-gray-700 shadow-sm cursor-pointer active:scale-[0.99]"
                                onClick={() => console.log("Google sign-in")}
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="font-medium text-sm md:text-base">Sign in with Google</span>
                            </button>
                        </div>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-white text-gray-400">or</span>
                            </div>
                        </div>

                        <form className="space-y-4 md:space-y-5" onSubmit={handleSignIn}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@university.edu"
                                    required
                                    className="bg-gray-50/50 border-gray-200 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm md:text-base"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1.5">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                                        Forgot?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={isPasswordVisible ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="bg-gray-50/50 border-gray-200 pr-10 focus:border-indigo-500 focus:ring-indigo-500 transition-all text-sm md:text-base"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full bg-gradient-to-r relative overflow-hidden from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2.5 md:py-3 rounded-lg transition-all duration-300",
                                        isLoading ? "opacity-70" : ""
                                    )}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <span className={`flex items-center justify-center font-semibold transition-all ${isLoading ? "opacity-0" : "opacity-100"}`}>
                                        Sign in
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                    {isLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        </div>
                                    )}
                                    {!isLoading && isHovered && (
                                        <motion.span
                                            initial={{ left: "-100%" }}
                                            animate={{ left: "100%" }}
                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                            className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            style={{ filter: "blur(4px)" }}
                                        />
                                    )}
                                </Button>
                            </div>

                            <div className="text-center mt-4 md:mt-6">
                                <p className="text-sm text-gray-500">
                                    Don't have an account?{" "}
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                        Join MindBridge
                                    </a>
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default function SignInPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
            <SignInCard />
        </div>
    );
}
