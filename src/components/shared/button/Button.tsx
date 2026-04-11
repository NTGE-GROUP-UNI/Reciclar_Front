//INTERFACE
import type { ButtonProps } from "./interface"

//MOTION
import { motion } from "motion/react"

export const Button = ({ children, typeButton, ...props }: ButtonProps) => {

    const style = {
        "danger": "bg-red-100 text-red-600 border-red-200 border border-red-300 dark:bg-red-900 dark:border dark:text-red-400 dark:border-red-700",
        "default": "bg-zinc-950 text-zinc-200 dark:bg-zinc-100 dark:text-zinc-950",
        "sign-in": "w-full bg-[--primary-blue-color] dark:bg-[--primary-blue-color-dark] text-zinc-50 hover:bg-[--primary-blue-color-hover] dark:hover:bg-[--primary-blue-color-hover-dark] mt-4"
    }

    return (
        <motion.button
            { ...props }
            className={`
                px-5 rounded-md 
                2xl:text-md text-sm h-10 
                ${style[typeButton]}
            `}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    )
}