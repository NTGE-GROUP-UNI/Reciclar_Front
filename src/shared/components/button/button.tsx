import type { ReactNode } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react"
import { cn } from "@/shared/utils/tailwind-merge/cn";

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    typeButton: "red" | "green" | "blue" | "gray" | "yellow";
}

export const Button = ({ children, typeButton, className, ...props }: ButtonProps) => {

    const style = {
        "red": "bg-red-400 dark:bg-red-700 border-red-700 dark:border-red-500 text-red-800 dark:text-red-300",
        "green": "bg-green-400 dark:bg-green-700 border-green-700 dark:border-green-500 text-green-800 dark:text-green-300",
        "blue": "bg-blue-400 dark:bg-blue-700 border-blue-700 dark:border-blue-500 text-blue-800 dark:text-blue-300",
        "gray": "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-500 text-gray-800 dark:text-gray-300",
        "yellow": "bg-yellow-200 dark:bg-yellow-700 border-yellow-300 dark:border-yellow-500 text-yellow-800 dark:text-yellow-300"
    }

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            {...props}
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