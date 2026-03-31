//INTERFACE
import type { PathWrapperProps } from "./interface"

export const PathWrapper = ({ children }: PathWrapperProps) => {
    return (
        <div
            className="
                w-full flex flex-col gap-1
            "
        >
            { children }
        </div>
    )
}