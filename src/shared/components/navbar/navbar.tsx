import { Menu } from "lucide-react"
import { useLayoutStore } from "@/shared/store/layout/layout.store"
import { motion } from "framer-motion";

export const Navbar = () => {

    const { setSideOpen } = useLayoutStore();

    return (
        <header
            className="
                w-full flex justify-end md:hidden
                px-6 py-4 bg-[--primary-blue-color]
                fixed z-30
            "
        >
            <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1, ease: "easeIn" }}
                onClick={setSideOpen}
            >
                <Menu
                    className="
                    text-white
                "
                />
            </motion.button>
        </header>
    )
}