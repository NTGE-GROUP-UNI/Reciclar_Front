import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface TitleStructureProps {
    children: ReactNode;
}

export const TitleStructure = ({ children }: TitleStructureProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="
                w-full flex flex-col md:flex-row md:justify-between
                py-4 md:items-center gap-4 md:gap-0
            "
        >
            { children }
        </motion.div>
    )
}