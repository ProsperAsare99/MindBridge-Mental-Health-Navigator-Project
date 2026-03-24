"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    BarChart3, 
    ClipboardList, 
    History, 
    UserCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function MobileBottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard", label: "Home", icon: LayoutDashboard },
        { href: "/dashboard/mood", label: "Mood", icon: BarChart3 },
        { href: "/dashboard/activity", label: "Journal", icon: History },
        { href: "/dashboard/assessment", label: "Assess", icon: ClipboardList },
        { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 transition-all duration-300">
            <nav className="bg-background/80 backdrop-blur-2xl border border-primary/10 rounded-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] flex items-center justify-around h-20 px-4 overflow-hidden">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 w-14 transition-all duration-300 relative group",
                                isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div className={cn(
                                "h-1 w-1 rounded-full bg-primary absolute -top-2 transition-all duration-500",
                                isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                            )} />
                            
                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-500",
                                isActive ? "bg-primary/10 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]" : "bg-transparent"
                            )}>
                                <Icon className={cn("h-5 w-5 transition-transform duration-500", isActive && "rotate-[-5deg]")} />
                            </div>
                            
                            <span className={cn(
                                "text-[9px] font-black uppercase tracking-widest transition-all duration-500",
                                isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-0.5"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
