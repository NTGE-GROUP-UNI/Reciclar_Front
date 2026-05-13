import type { ReactNode } from "react";
import { useLayoutStore } from "@/shared/store/layout/layout.store"
import { motion } from "framer-motion";

export interface RootProps {
    children: ReactNode
}

export const Root = ({ children }:RootProps) => {

    const { sideOpen } = useLayoutStore();

    return (
        <motion.aside
            initial={{ opacity: 0, translateX: -200 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.1,
                ease: "easeInOut",
            }}
            className={`
                bg-[--primary-blue-color] dark:bg-[--primary-blue-color-dark]
                border-r h-full w-full md:max-w-60 z-20 py-8 
                fixed top-0 left-0 flex
                flex-col gap-12 border-blue-800 pt-[56px]
                ${ !sideOpen ? "translate-x-full" : "translate-x-0" }
                md:translate-x-0
            `}
        >
            { children }
        </motion.aside>
    )
}