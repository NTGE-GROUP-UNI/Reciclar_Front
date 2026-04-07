//INTERFACE
import type { PathWrapperProps } from "./interface"

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