import React, { type ElementType, type ReactNode } from "react";
import { cn } from "@/shared/utils/tailwind-merge/cn";

export interface CardProps {
    children?: ReactNode;
    description: string;
    title: string;
    icon: ElementType;
    column?: boolean;
    className?: string;
}

export const Card = React.memo(({ children, description, title, icon: Icon, column, className }: CardProps) => {
    return (
        <div
            className={cn(
                "w-full max-w-none border rounded-md bg-zinc-100 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm ${className}",
                className
            )}
        >
            <div
                className={`
                    w-full border-b 
                    border-zinc-200 dark:border-zinc-800
                    2xl:px-6 2xl:pt-6 2xl:pb-4
                    px-4 pt-4 pb-4
                    flex justify-between
                    ${column && "flex-col gap-4 md:flex-row md:items-center"}
                `}
            >
                <div className="flex items-center gap-3 2xl:gap-6">
                    <div
                        className="
                            2xl:h-10 2xl:w-10 w-8 h-8
                            shrink-0
                            rounded-md border
                            grid place-items-center
                            bg-zinc-200 border-zinc-300 text-zinc-900
                            dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200
                            
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