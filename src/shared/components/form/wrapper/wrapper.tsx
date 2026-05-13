import type { ReactNode } from "react"
import { motion } from "framer-motion"

export const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="
                w-full flex flex-col gap-1 relative
            "
        >
            { children }
        </motion.div>
    )
}