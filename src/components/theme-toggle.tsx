"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // Assuming cn utility is available here

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    const cycleTheme = () => {
        if (theme === "system") setTheme("light")
        else if (theme === "light") setTheme("dark")
        else setTheme("system")
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="text-foreground hover:bg-accent hover:text-accent-foreground rounded-full w-9 h-9 relative group"
        >
            <Sun className={cn(
                "h-[1.2rem] w-[1.2rem] transition-all",
                theme === "light" ? "scale-100 rotate-0 text-orange-500" : "scale-0 rotate-90"
            )} />
            <Moon className={cn(
                "absolute h-[1.2rem] w-[1.2rem] transition-all",
                theme === "dark" ? "scale-100 rotate-0 text-indigo-400" : "scale-0 rotate-90"
            )} />
            <Monitor className={cn(
                "absolute h-[1.2rem] w-[1.2rem] transition-all",
                theme === "system" ? "scale-100 rotate-0 text-muted-foreground" : "scale-0 rotate-90"
            )} />
            <span className="sr-only">Toggle theme</span>
            
            {/* Tooltip hint */}
            <span className="absolute -top-8 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none capitalize border border-border">
                {theme}
            </span>
        </Button>
    )
}
