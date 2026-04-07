export const Footer = () => {
    return (
        <footer
            className="
                bg-[--primary-blue-color] text-zinc-950
                dark:text-zinc-300
                flex flex-col justify-center border-t border-zinc-700
                items-center 2xl:p-6 p-4 z-30 font-inter
            "
        >
            <h1
                className="
                    leading-normal text-sm text-zinc-50
            ">
                © 2026 Instituto Reciclar - Todos os direitos reservados
            </h1>
            <p
                className="
                    leading-normal text-sm text-zinc-50
            ">
                    Sistema de Gestão de Alunos v1.0
            </p>
        </footer>
    )
}