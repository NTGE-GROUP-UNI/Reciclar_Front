import { Link, useLocation } from "react-router-dom"
import type { PathProps } from "./interface"
import { useTheme } from "../../../hooks/theme/useTheme";
import { useLayoutStore } from "@/shared/store/layout/layout.store";

export const Path = ({ children, to, ...props }: PathProps) => {

    const location = useLocation();
    const currentBasePath = "/" + location.pathname.split("/")[1];
    const isActive = currentBasePath === to;
    const { setSideOpen } = useLayoutStore();

    const { themeValue } = useTheme((state) => state);

    return (
        <Link
            to={to}
            onClick={setSideOpen}
            className={`
                text-left font-medium py-3 px-4
                transition-all duration-300 relative
                cursor-pointer flex flex-row gap-2
                text-zinc-100 hover:bg-zinc-200/10  dark:text-zinc-200 dark:hover:bg-zinc-400/20
                ${isActive ? "bg-zinc-200/20 dark:bg-zinc-400/40" : "bg-transparent"}
            `}
            {...props}
        >
            {children}
            <span
                className={`
                    h-full w-1 absolute top-0 right-0
                    ${isActive ? themeValue ? "bg-zinc-200" : "bg-zinc-100" : "bg-transparent"}
                `}
            >
            </span>
        </Link>
    )
}