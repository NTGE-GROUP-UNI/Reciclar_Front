import type { ReactNode } from "react";
import { useLayoutStore } from "@/shared/store/layout/layout.store"

export interface RootProps {
    children: ReactNode
}

export const Root = ({ children }:RootProps) => {

    const { sideOpen } = useLayoutStore();

    return (
        <aside
            className={`
                bg-[--primary-blue-color] dark:bg-[--primary-blue-color-dark]
                border-r h-full w-full md:max-w-60 z-20 py-8 
                fixed top-0 left-0 flex transition-all duration-150
                flex-col gap-12 border-blue-800 pt-[56px]
                ${ !sideOpen ? "translate-x-full" : "translate-x-0" }
                md:translate-x-0
            `}
        >
            { children }
        </aside>
    )
}