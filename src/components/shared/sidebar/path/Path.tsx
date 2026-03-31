//REACT ROUTER DOM
import { Link, useLocation } from "react-router-dom"

//INTERFACES
import type { PathProps } from "./interface"

//HOOKS
import { useTheme } from "../../../../hooks/theme/useTheme";

export const Path = ({ children, to, ...props}: PathProps) => {

    const location = useLocation();
    const isActive = location.pathname === to;

    const { themeValue } = useTheme((state) => state);

    return (
        <Link
            to={to}
            className={`
                text-left font-medium  py-2 px-4
                rounded-md transition-all duration-300
                cursor-pointer flex flex-row gap-2
                ${ isActive ? themeValue ? "bg-zinc-200" : "bg-zinc-900" : "bg-transparent" }
                text-zinc-900 hover:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-900
            `}
            {...props}
        >
            { children }
        </Link>
    )
}