"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    BarChart3,
    BookOpen,
    Phone,
    LogOut,
    Menu,
    X,
    UserCircle
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";
import ShaderBackground from "@/components/shader-background";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login"); // Protect route
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push("/");
    };

    const navItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/mood", label: "Mood Tracker", icon: BarChart3 },
        { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
        { href: "/dashboard/crisis", label: "Crisis Support", icon: Phone },
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
                    <p className="text-sm font-medium text-indigo-200">Loading your space...</p>
                </div>
            </div>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <div className="min-h-screen relative font-sans text-white bg-slate-900 selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Background Shader - Global for Dashboard */}
            <div className="fixed inset-0 z-0">
                <ShaderBackground />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-slate-900/50 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 transition-all">
                            <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">MindBridge</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-indigo-200 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                        isActive
                                            ? "text-white bg-indigo-600/20 border border-indigo-500/30 shadow-md shadow-indigo-500/10"
                                            : "text-indigo-200/70 hover:text-white hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full" />
                                    )}
                                    <Icon className={cn("h-5 w-5 relative z-10 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-current")} />
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-white/10 pt-4 space-y-4">
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <div className="h-9 w-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                                {user.displayName ? (
                                    <span className="font-semibold">{user.displayName[0].toUpperCase()}</span>
                                ) : (
                                    <UserCircle className="h-5 w-5" />
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium text-white">{user.displayName || "User"}</p>
                                <p className="truncate text-xs text-indigo-300/60">{user.email}</p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all rounded-xl h-10"
                            onClick={handleSignOut}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64 relative z-10 min-h-screen transition-all duration-300">
                {/* Topbar (Mobile) */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-slate-900/80 px-6 backdrop-blur-xl border-b border-white/10 lg:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-indigo-200 hover:text-white transition-colors">
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-semibold text-white">Dashboard</span>
                </header>

                <main className="p-0 animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}
