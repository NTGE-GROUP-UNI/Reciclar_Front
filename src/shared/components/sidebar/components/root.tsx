import type { ReactNode } from "react";
import { useLayoutStore } from "@/shared/store/layout/layout.store";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

export interface RootProps {
    children: ReactNode;
}

export const Root = ({ children }: RootProps) => {
    const { sideOpen } = useLayoutStore();

    const shouldShowSidebar = isMobile ? sideOpen : true;

    return (
        <motion.aside
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                x: shouldShowSidebar ? 0 : "-100%",
            }}
            transition={{
                duration: 0.8,
            }}
            className="
                bg-[--primary-blue-color]
                dark:bg-[--primary-blue-color-dark]
                border-r h-full w-full md:max-w-60 z-20 py-8
                fixed top-0 left-0 flex flex-col gap-12
                border-blue-800 pt-[56px]
            "
            >
            {children}
        </motion.aside>
    );
};