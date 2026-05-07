import type { WrapperProps } from "./interface"

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <div
            className="
                relative w-full sm:max-w-40
            "
        >
            { children }
        </div>
    )
}