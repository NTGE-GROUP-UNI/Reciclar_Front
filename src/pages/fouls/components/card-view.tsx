/*=========== COMPONENTS ===========*/
import type { IFoulsMetrics } from "@/entities/classroom/model/types"
import { CardStatus } from "./card-status"

import { motion } from "framer-motion"

interface CardProps {
    metrics: IFoulsMetrics
}

export const CardView = ({ metrics }: CardProps) => {

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }


    return (
        <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="
                w-full flex lg:justify-between
                gap-6 my-6 flex-col lg:flex-row
            "
        >
            <motion.div
                variants={item}
                className="w-full"
            >
                <CardStatus
                    name="Presenças"
                    value={metrics.presences}
                    status="presence"
                />
            </motion.div>

            <motion.div
                variants={item}
                className="w-full"
            >
                <CardStatus
                    name="Faltas Totais"
                    value={metrics.absence}
                    status="foul"
                />
            </motion.div>

            <motion.div
                variants={item}
                className="w-full"
            >
                <CardStatus
                    name="Faltas Abonadas"
                    value={metrics.justifyed}
                    status="paid"
                />
            </motion.div>

            <motion.div
                variants={item}
                className="w-full"
            >
                <CardStatus
                    name="Não Abonadas"
                    value={metrics.unjustifyed}
                    status="warning"
                />
            </motion.div>
        </motion.section>
    )
} 