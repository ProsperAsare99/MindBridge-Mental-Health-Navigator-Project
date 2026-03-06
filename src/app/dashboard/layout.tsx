"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
    LayoutDashboard,
    BarChart3,
    BookOpen,
    Phone,
    LogOut,
    Menu,
    X,
    UserCircle,
    Settings,
    ChevronsRight,
    ClipboardCheck,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin");
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push("/");
    };

    const mainNav = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/mood", label: "Mood Tracker", icon: BarChart3 },
        { href: "/dashboard/assessment", label: "Assessment", icon: ClipboardCheck },
        { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
        { href: "/dashboard/crisis", label: "Crisis Support", icon: Phone },
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#192231] text-linen">
                <div className="flex flex-col items-center gap-6">
                    <div className="h-12 w-12 animate-spin rounded-full border-2 border-sage border-t-transparent" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-linen/30 italic">Establishing Neural Link...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                    "flex items-center gap-4 rounded-2xl px-4 h-12 transition-all duration-300 group",
                    isActive
                        ? "bg-sage text-linen shadow-lg shadow-sage/20"
                        : "text-linen/40 hover:bg-white/5 hover:text-linen hover:translate-x-1"
                )}
            >
                <Icon className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    isActive ? "text-linen" : "text-linen/20 group-hover:text-sage"
                )} />
                {isExpanded && (
                    <span className="text-sm font-extrabold tracking-tight">{label}</span>
                )}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-transparent font-sans selection:bg-sage/30 selection:text-linen">
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <nav
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-[40px] transition-all duration-500 ease-in-out",
                    isExpanded ? "lg:w-72" : "lg:w-[88px]",
                    isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="flex h-24 items-center gap-4 px-6 shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-4 group">
                        <div className="size-10 shrink-0 rounded-2xl bg-sage flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                            <div className="size-2 rounded-full bg-linen" />
                        </div>
                        {isExpanded && (
                            <span className="text-xl font-black text-linen uppercase tracking-[0.1em]">MindBridge</span>
                        )}
                    </Link>
                    {isMobileOpen && (
                        <button onClick={() => setIsMobileOpen(false)} className="ml-auto lg:hidden text-linen/30">
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
                    {isExpanded && (
                        <p className="px-4 pb-4 text-[10px] font-black text-linen/20 uppercase tracking-[0.4em]">Navigator</p>
                    )}
                    {mainNav.map((item) => (
                        <NavItem key={item.href} {...item} />
                    ))}
                </div>

                <div className="mt-auto p-4 space-y-6">
                    <div className="px-4">
                        {isExpanded && (
                            <p className="pb-4 text-[10px] font-black text-linen/20 uppercase tracking-[0.4em]">Personal</p>
                        )}
                        <NavItem href="/dashboard/settings" label="Settings" icon={Settings} />
                    </div>

                    <div className={cn(
                        "rounded-3xl border border-white/5 transition-all p-3",
                        isExpanded ? "bg-white/5" : "bg-transparent flex justify-center"
                    )}>
                        <div className={cn("flex items-center gap-4", !isExpanded && "flex-col")}>
                            <div className="size-10 shrink-0 rounded-2xl bg-sage/20 flex items-center justify-center border border-white/10 text-linen text-sm font-black">
                                {user.displayName ? user.displayName[0].toUpperCase() : <UserCircle size={18} />}
                            </div>
                            {isExpanded && (
                                <div className="flex-1 min-w-0 pr-2">
                                    <p className="truncate text-sm font-extrabold text-linen">{user.displayName || "Explorer"}</p>
                                    <button onClick={handleSignOut} className="text-[10px] font-black text-linen/30 hover:text-red-400 transition-colors uppercase tracking-widest">Sign Out</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hidden lg:flex w-full items-center gap-4 px-4 h-12 text-linen/20 hover:text-sage transition-all border-t border-white/5 pt-6"
                    >
                        <ChevronsRight className={cn("h-4 w-4 transition-transform duration-500", isExpanded && "rotate-180")} />
                        {isExpanded && <span className="text-[10px] font-black uppercase tracking-[0.4em]">Toggle Node</span>}
                    </button>
                </div>
            </nav>

            {/* Main Area */}
            <div className={cn(
                "relative z-10 min-h-screen transition-all duration-500 pt-16 lg:pt-0",
                isExpanded ? "lg:pl-72" : "lg:pl-[88px]"
            )}>
                <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-black/40 px-6 backdrop-blur-xl lg:hidden">
                    <button onClick={() => setIsMobileOpen(true)} className="text-linen/30">
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="text-xs font-black text-linen uppercase tracking-[0.3em]">MindBridge Node</span>
                </header>

                <main className="p-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {children}
                </main>
            </div>
        </div>
    );
}
