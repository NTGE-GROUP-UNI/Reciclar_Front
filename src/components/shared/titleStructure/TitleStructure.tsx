//INTERFACE
import type { TitleStructureProps } from "./interface"

export const TitleStructure = ({ children }: TitleStructureProps) => {
    return (
        <div
            className="
                w-full flex flex-row justify-between
                py-4 items-center
            "
        >
            { children }
        </div>
    )
}