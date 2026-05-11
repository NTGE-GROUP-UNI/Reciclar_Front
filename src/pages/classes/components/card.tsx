import { Clock4, Eraser, FolderOpen, Pencil, UserRoundCheck } from 'lucide-react';
import { useEffect, useState, type SetStateAction } from 'react';
import { useNavigate } from "react-router-dom";
import { animate, motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useCurrentClassroom } from '@/shared/store/classroom/classroom.store';
import type { IClassSummary } from '@/entities/classroom/model/types';
import { Button } from '@/shared/components/shared';

interface ClassesProps {
    classroom: IClassSummary;
    setOpenModalDanger: React.Dispatch<SetStateAction<boolean>>,
    setOpenModalEdit: React.Dispatch<SetStateAction<boolean>>
}

export const Card = ({
    classroom,
    setOpenModalDanger,
    setOpenModalEdit
}: ClassesProps) => {

    const navigate = useNavigate();
    const { changeClassroom } = useCurrentClassroom();

    const count = useMotionValue(0);
    const [displayActive, setDisplayActive] = useState<number>(0);

    useEffect(() => {
        const controls = animate(count, classroom.totalStudents, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
        return () => controls.stop();
    }, []);

    useMotionValueEvent(count, "change", (latest) => {
        setDisplayActive(Math.floor(latest));
    })

    const handleClick = () => {
        navigate(`/classes/${classroom.shift}/${classroom.className?.slice(6)}`, { replace: true });
    }

    const handleDelete = () => {
        changeClassroom({
            ...classroom
        })

        setOpenModalDanger(true);
    }

    const handleEdit = () => {
        changeClassroom({
            ...classroom
        })

        setOpenModalEdit(true);
    }

    return (
        <div
            className="
                w-full md:max-w-72 bg-zinc-100
                dark:bg-zinc-900
                border border-zinc-300
                dark:border-zinc-800
                rounded-lg shadow-sm p-6
                flex flex-col cursor-pointer
                hover:scale-105 transition-transform 
                duration-75 relative z-10
            "
        >
            <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1, ease: "easeIn" }}
                onClick={handleDelete}
                className="
                    flex-shrink-0
                    bg-red-400 dark:bg-red-700
                    border border-red-700 dark:border-red-500
                    text-red-800 dark:text-red-400
                    w-10 h-10 rounded-lg
                    flex items-center justify-center gap-2
                    absolute right-8 top-8 z-20
                "
            >
                <Eraser height={20} width={20} />
            </motion.button>

            <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1, ease: "easeIn" }}
                onClick={handleEdit}
                className="
                    flex-shrink-0
                    bg-blue-400 dark:bg-blue-700
                    border border-blue-700 dark:border-blue-500
                    text-blue-800 dark:text-blue-400
                    w-10 h-10 rounded-lg
                    flex items-center justify-center gap-2
                    absolute right-20 top-8 z-20
                "
            >
                <Pencil height={20} width={20} />
            </motion.button>
            <h1
                className="
                    text-zinc-900 dark:text-zinc-50
                    text-lg font-bold leading-normal m-0
                "
            >
                {classroom.className}
            </h1>
            <div
                className="
                    flex gap-2
                    items-center
                "
            >
                <Clock4
                    height={16}
                    width={16}
                    className="
                        text-zinc-500 dark:text-zinc-400
                    "
                />
                <h2
                    className="
                        text-zinc-500 dark:text-zinc-400 font-normal
                        text-md leading-normal m-0
                    "
                >
                    {classroom.shift}
                </h2>
            </div>
            <div
                className="
                    w-full flex justify-between border border-blue-500
                    bg-blue-200 dark:bg-blue-900 rounded-lg
                    py-4 px-4 items-center my-4
                "
            >
                <div
                    className="
                        flex gap-2 items-center
                    "
                >
                    <UserRoundCheck
                        height={22}
                        width={22}
                        className="
                        text-blue-500 dark:text-blue-300 flex-shrink-0
                    "
                    />
                    <h3
                        className="
                            text-blue-700 dark:text-blue-300 font-normal
                            text-md leading-normal m-0
                        "
                    >
                        Alunos ativos
                    </h3>
                </div>
                <span
                    className="
                        text-blue-600 dark:text-blue-400 font-bold
                        text-md leading-normal m-0
                    "
                >
                    {displayActive}
                </span>
            </div>
            <Button
                typeButton='blue'
                onClick={handleClick}
            >
                <FolderOpen height={20} width={20} /> Acessar turma
            </Button>
        </div>
    )
}