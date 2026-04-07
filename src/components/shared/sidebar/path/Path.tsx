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
                text-left font-medium py-3 px-4
                transition-all duration-300 relative
                cursor-pointer flex flex-row gap-2
                text-zinc-100 hover:bg-[--primary-blue-color-hover] dark:text-zinc-200 dark:hover:bg-zinc-900/80
                ${ isActive ? themeValue ? "bg-zinc-200/20" : "bg-zinc-900/40" : "bg-transparent" }
            `}
            {...props}
        >
            { children }
            <span 
                className={`
                    h-full w-1 absolute top-0 right-0
                    ${ isActive ? themeValue ? "bg-zinc-200" : "bg-zinc-100" : "bg-transparent" }
                `}
            >
            </span>
        </Link>
    )
}