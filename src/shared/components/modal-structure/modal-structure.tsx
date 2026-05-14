import type { ReactNode } from "react";
import { motion } from "framer-motion"; 

interface ModalProps {
    children: ReactNode
}

export const ModalStructure = ({ children }: ModalProps) => {

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="w-full h-full bg-zinc-950/50 fixed top-0 right-0 flex items-center justify-center z-50 flex-col p-8"
        >
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
                className="w-full bg-zinc-50 dark:bg-zinc-900 max-w-md rounded-lg shadow-sm flex flex-col items-center border border-zinc-200 dark:border-zinc-800"
            >
                { children }
            </motion.div >
        </motion.section>
    );
}