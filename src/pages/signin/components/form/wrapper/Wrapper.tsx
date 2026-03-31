//REACT TYPE
import type { ReactNode } from "react"

export const Wrapper = ({ children }: { children: ReactNode }) => {
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