import type { ReactNode } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react"
import { cn } from "@/shared/lib/utils"

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    typeButton: "red" | "green" | "blue" | "gray";
}

export const Button = ({ children, typeButton, className, ...props }: ButtonProps) => {

    const style = {
        "red": "bg-red-400 dark:bg-red-700 border-red-700 dark:border-red-500 text-red-800 dark:text-red-300",
        "green": "bg-green-400 dark:bg-green-700 border-green-700 dark:border-green-500 text-green-800 dark:text-green-300",
        "blue": "bg-blue-400 dark:bg-blue-700 border-blue-700 dark:border-blue-500 text-blue-800 dark:text-blue-300",
        "gray": "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-500 text-gray-800 dark:text-gray-300"
    }

    return (
        <motion.button
            { ...props }
            className={cn(
                "flex-shrink-0 border w-full px-2 py-3 rounded-xl flex items-center justify-center gap-2",
                style[typeButton],
                className
            )}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    )
}