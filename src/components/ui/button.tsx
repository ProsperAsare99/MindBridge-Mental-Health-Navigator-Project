import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "xl";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-olive text-linen hover:bg-ink shadow-2xl shadow-olive/10",
            secondary: "bg-sage text-linen hover:bg-sage/90 shadow-xl shadow-sage/10",
            outline: "border border-olive/10 bg-white/40 backdrop-blur-md text-olive hover:bg-white",
            ghost: "hover:bg-sage/10 text-sage",
            link: "text-sage underline-offset-4 hover:underline decoration-sage/30",
        }

        const sizes = {
            sm: "h-10 px-4 text-[10px] uppercase tracking-widest",
            md: "h-12 px-6 text-[10px] uppercase tracking-widest",
            lg: "h-20 px-12 text-sm uppercase tracking-[0.3em]",
            xl: "h-24 px-16 text-sm uppercase tracking-[0.4em]",
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-black transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
