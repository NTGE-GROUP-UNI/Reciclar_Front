import { useState, type ReactNode } from "react"

export interface DescriptionProps {
    children: ReactNode;
    description: string;
    dirX: "right" | "left";
    dirY: "top" | "bottom";
    styles?: string;
}


export const Description = ({ children, description, dirX, dirY, styles }: DescriptionProps) => {

    const [isActive, setIsActive] = useState(false);

    const directions = {
        x: {
            "right": "left-4",
            "left": "right-4"
        },
        y: {
            "top": "-top-10",
            "bottom": "-bottom-10"
        },
    }

    return (
        <div
            className="
                relative
            "
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            { children }

            <span
                className={`
                    ${ isActive ? "z-10 opacity-100 visible" : "invisible opacity-0" }
                    ${ directions.x[dirX] }
                    ${ directions.y[dirY] }
                    ${ styles }
                    absolute
                    whitespace-nowrap text-sm
                    bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800
                    rounded-md py-1 px-2 text-zinc-700 dark:text-zinc-400
                    transition-all duration-300 hidden lg:block
                `}
            >
                { description }
            </span>
        </div>
    )
}