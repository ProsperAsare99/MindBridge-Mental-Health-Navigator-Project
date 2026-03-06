import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground shadow-premium hover:bg-primary/90 hover:shadow-lg",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                outline: "border-2 border-primary/20 bg-transparent hover:bg-primary/5 text-primary",
                ghost: "hover:bg-primary/10 text-primary",
                glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
            },
            size: {
                sm: "h-9 px-4 rounded-xl text-xs",
                md: "h-11 px-6",
                lg: "h-14 px-10 text-base",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : motion.button

        return (
            // @ts-ignore
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
