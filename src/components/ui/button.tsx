import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Note: We need to install class-variance-authority and @radix-ui/react-slot
// I will add them to the install list or just use simple props for now to avoid extra deps if not requested.
// Actually, the user's plan didn't explicitly ask for shadcn/ui, but it's implied by "modern web app".
// For now, I'll build a simple button without extra deps to keep it lightweight, or I can install them.
// Let's stick to simple props for now to minimize "surprise" dependencies, or just use standard Tailwind classes.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
            secondary: "bg-teal-500 text-white hover:bg-teal-600 shadow-sm",
            outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-700",
            ghost: "hover:bg-slate-100 text-slate-700",
        }

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-8 text-lg",
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
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
