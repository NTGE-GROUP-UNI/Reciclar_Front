import { motion } from "framer-motion"

export const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, translateY: 300 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
            className="
                bg-[--primary-blue-color] dark:bg-[--primary-blue-color-dark] text-zinc-950
                dark:text-zinc-300
                flex flex-col justify-center border-t border-blue-800
                items-center 2xl:p-6 p-4 z-30 font-inter
            "
        >
            <h1
                className="
                    leading-normal text-sm text-zinc-50 text-center md:text-left mb-2
            ">
                © 2026 Instituto Reciclar - Todos os direitos reservados
            </h1>
            <p
                className="
                    leading-normal text-sm text-zinc-50 text-center md:text-left
            ">
                    Sistema de Gestão de Alunos v1.0
            </p>
        </motion.footer>
    )
}