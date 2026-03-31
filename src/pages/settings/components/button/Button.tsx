//MOTION
import { motion } from "motion/react"

//REACT 
import type { ReactNode } from "react"

type ButtonType = "danger" | "default"

export const Button = ({ children, type }: { children: ReactNode, type: ButtonType }) => {

    const style = {
        "danger": "bg-red-100 text-red-600 border-red-200 border border-red-300 dark:bg-red-900 dark:border dark:text-red-400 dark:border-red-700",
        "default": "bg-zinc-950 text-zinc-200 dark:bg-zinc-100 dark:text-zinc-950"
    }

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            className={`
                px-5 rounded-md transition-all duration-300
                2xl:text-md text-sm py-2
                ${ style[type] }
            `}
        >
            { children }
        </motion.button>
    )
}