import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface WrapperProps {
    children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
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
                relative w-full sm:max-w-40
            "
        >
            { children }
        </motion.div>
    )
}