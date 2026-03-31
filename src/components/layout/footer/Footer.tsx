export const Footer = () => {
    return (
        <footer
            className="
                bg-zinc-200 text-zinc-950
                dark:bg-blue-950 dark:text-zinc-300
                flex flex-col justify-center
                items-center 2xl:p-6 p-4 z-30
            "
        >
            <h1
                className="
                    leading-normal text-sm font-medium
            ">
                © 2026 Instituto Reciclar - Todos os direitos reservados
            </h1>
            <p
                className="
                    leading-normal text-sm font-medium
            ">
                    Sistema de Gestão de Alunos v1.0
            </p>
        </footer>
    )
}