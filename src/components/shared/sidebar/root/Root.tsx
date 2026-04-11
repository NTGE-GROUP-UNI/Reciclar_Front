//INTERFACE
import type { RootProps } from "./interface"

export const Root = ({ children }:RootProps) => {

    return (
        <aside
            className="
                flex bg-[--primary-blue-color] dark:bg-[--primary-blue-color-dark]
                border-r h-full w-full max-w-60 z-20 py-8 
                fixed top-0 left-0 
                flex-col gap-12 border-blue-800
            "
        >
            { children }
        </aside>
    )
}