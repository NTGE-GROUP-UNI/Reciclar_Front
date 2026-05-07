//INTERFACE
import type { ButtonProps } from "./interface"

//MOTION
import { motion } from "motion/react"

export const Button = ({ children, typeButton, ...props }: ButtonProps) => {

    const style = {
        "danger": "bg-red-100 text-red-600 border-red-200 border border-red-300 dark:bg-red-900 dark:border dark:text-red-400 dark:border-red-700",
        "default": "bg-zinc-950 text-zinc-200 dark:bg-zinc-100 dark:text-zinc-950",
        "sign-in": "w-full bg-blue-600 dark:bg-blue-800 text-zinc-50 hover:bg-blue-800 dark:hover:bg-blue-900 mt-4 border border-blue-800 dark:border-blue-400"
    }

    return (
        <motion.button
            { ...props }
            className={`
                px-5 rounded-md 
                2xl:text-md text-sm h-10
                w-full sm:w-auto
                flex justify-center items-center
                ${style[typeButton]}
            `}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    )
}