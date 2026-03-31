//INTERFACE
import type { RootProps } from "./interface"

export const Root = ({ children }:RootProps) => {

    return (
        <aside
            className="
                border-zinc-200 dark:border-zinc-800
                flex bg-transparent border-r
                h-full w-full max-w-60 z-20 py-8 px-4 transition-colors
                duration-300 fixed top-0 left-0 flex-col gap-12 
            "
        >
            { children }
        </aside>
    )
}