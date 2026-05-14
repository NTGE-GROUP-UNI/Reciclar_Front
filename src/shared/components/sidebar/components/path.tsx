import { Link, useLocation } from "react-router-dom"
import type { ReactNode } from "react";
import type { LinkProps } from "react-router-dom";
import { useLayoutStore } from "@/shared/store/layout/layout.store";
import { cn } from "@/shared/utils/tailwind-merge/cn";

export interface PathProps extends LinkProps {
    children: ReactNode;
}

export const Path = ({ children, to, className, ...props }: PathProps) => {

    const location = useLocation();
    const currentBasePath = "/" + location.pathname.split("/")[1];
    const isActive = currentBasePath === to;
    const { setSideOpen } = useLayoutStore();

    return (
        <Link
            to={to}
            onClick={setSideOpen}
            className={cn(
                "text-left font-medium py-3 px-4 transition-all duration-300 relative",
                "cursor-pointer flex flex-row items-center gap-2 text-zinc-100 dark:text-zinc-200",
                "hover:bg-zinc-200/10 dark:hover:bg-zinc-400/20",
                isActive ? "bg-zinc-200/20 dark:bg-zinc-400/40" : "bg-transparent",
                className
            )}
            {...props}
        >
            {children}
            <span
                className={`
                    h-full w-1 absolute top-0 right-0
                    ${isActive ? "bg-zinc-200 dark:bg-zinc-100" : "bg-transparent"}
                `}
            >
            </span>
        </Link>
    )
}