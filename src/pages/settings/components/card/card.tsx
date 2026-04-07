//REACT
import React from "react";

//INTERFACE
import type { CardProps } from "./interface";

export const Card = React.memo(({ children, description, title, icon: Icon }: CardProps) => {
    return (
        <div
            className="
                w-full max-w-none border rounded-md
                bg-zinc-100 border-zinc-200 
                dark:bg-zinc-900 dark:border-zinc-800
                transition-all duration-300 shadow-sm
            "
        >
            <div
                className="
                    w-full border-b 
                    border-zinc-200 dark:border-zinc-800
                    2xl:px-6 2xl:pt-6 2xl:pb-4
                    px-4 pt-4 pb-4 
                    flex justify-between items-center
                    transition-all duration-300
                "
            >
                <div className="flex items-center gap-3 2xl:gap-6">
                    <div
                        className="
                            2xl:h-10 2xl:w-10 w-8 h-8
                            rounded-md border
                            grid place-items-center
                            bg-zinc-200 border-zinc-300 text-zinc-900
                            dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200
                            transition-all duration-300
                        "
                    >
                        <Icon className="2xl:h-6 2xl:w-6 h-5 w-5" />
                    </div>

                    <h1 className="
                        font-bold text-sm 2xl:text-lg
                        text-zinc-900 dark:text-zinc-200
                    ">
                        {title}
                    </h1>
                </div>

                {children}
            </div>

            <div className="px-4 pt-4 pb-4 2xl:px-6 2xl:pb-6">
                <p className="
                    font-medium text-sm 2xl:text-md
                    text-zinc-900 dark:text-zinc-200
                ">
                    {description}
                </p>
            </div>
        </div>
    );
});