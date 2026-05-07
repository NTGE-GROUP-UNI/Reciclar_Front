import { useEffect, useState } from "react"
import { animate, useMotionValue, useMotionValueEvent, motion } from "framer-motion"

type Status = "presence" | "warning" | "foul" | "paid";

interface CardStatusProps {
    name: string;
    value: number;
    status: Status;
}

export const CardStatus = ({ name, value, status }: CardStatusProps) => {

    const count = useMotionValue(0);
    const [display, setDisplay] = useState<number>(0);

    useEffect(() => {
        const controls = animate(count, value, { duration: 1, ease: [0.22, 1, 0.36, 1] });
        return () => controls.stop();
    }, []);

    useMotionValueEvent(count, "change", (latest) => {
        setDisplay(latest);
    })

    const types = {
        "presence": "bg-green-500/10 border-green-500/20 text-green-600",
        "foul": "bg-red-500/10 border-red-500/20 text-red-600",
        "warning": "bg-orange-500/10 border-orange-500/20 text-orange-600",
        "paid": "bg-yellow-500/10 border-yellow-500/20 text-yellow-600"
    }

    return (
        <div
            className={`
                ${ types[status] }
                w-full border
                p-6 rounded-lg shadow-sm
            `}
        >
            <h1
                className="
                    text-xl leading-normal
                    mb-1 font-normal
                "
            >
                { name }
            </h1>
            <motion.span
                className="
                    text-3xl leading-normal
                    font-medium
                "
            >
                { display.toFixed(0) }
            </motion.span>
        </div>
    )
}