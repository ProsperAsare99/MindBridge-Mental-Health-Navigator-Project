import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-20 w-full rounded-2xl bg-white/5 border-2 border-white/5 px-8 py-6 text-lg text-linen placeholder:text-linen/10 focus:ring-4 focus:ring-sage/5 focus:border-sage/40 transition-all font-medium disabled:cursor-not-allowed disabled:opacity-50 shadow-inner",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
