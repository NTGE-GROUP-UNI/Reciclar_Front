import type { ReactNode } from "react";

export interface PathWrapperProps {
    children: ReactNode
}

export const PathWrapper = ({ children }: PathWrapperProps) => {
    return (
        <div
            className="
                w-full flex flex-col
            "
        >
            { children }
        </div>
    )
}