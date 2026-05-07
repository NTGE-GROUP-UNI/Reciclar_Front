import QRCode from "qrcode";
import { useEffect, useRef, type SetStateAction } from "react";
import { X, ArrowDownToLine } from "lucide-react";
import {
    Button
} from "@/shared/components/shared";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCurrentStudent } from "@/shared/store/student/student.store";

interface ModalProps {
    setOpenModalQrCode: React.Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({ setOpenModalQrCode }: ModalProps) => {

    const { student } = useCurrentStudent();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!cardRef.current) return;

        const canvas = await html2canvas(cardRef.current, {
            scale: 2
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const imgWidth = 160;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pageWidth = pdf.internal.pageSize.getWidth();
        const x = (pageWidth - imgWidth) / 2;
        pdf.addImage(imgData, "PNG", x, 40, imgWidth, imgHeight);

        pdf.save(`Carteirinha_${student?.fullName?.replaceAll(" ", "_")}.pdf`);
    };

    useEffect(() => {
        if (canvasRef.current && student) {

            console.log(student);

            QRCode.toCanvas(canvasRef.current, student.qrcodeId, {
                width: 220
            });
        }
    }, []);

    return (
        <section className="w-full h-full bg-zinc-950/50 fixed top-0 right-0 flex items-center justify-center z-50 flex-col">
            <div className="w-full bg-zinc-50 max-w-md rounded-lg shadow-sm flex flex-col items-center border border-zinc-200">
                <div className="w-full flex justify-center items-center border-b border-zinc-200">
                    <div className="w-full flex justify-between p-8 items-center">
                        <h1 className="font-medium text-zinc-950 text-xl dark:text-zinc-50">
                            Carterinha do Aluno
                        </h1>

                        <button
                            className="bg-transparent hover:bg-zinc-200 transition-colors duration-150 p-1 rounded-lg"
                            onClick={() => setOpenModalQrCode(prev => !prev)}
                        >
                            <X height={20} width={20} />
                        </button>
                    </div>
                </div>

                <div ref={cardRef} className="p-6 w-full">
                    <div className="w-full bg-blue-800 rounded-lg p-6">
                        <h2 className="font-medium text-zinc-50 text-xl text-center">
                            Instituto Reciclar
                        </h2>

                        <h3 className="text-zinc-200 text-md text-center mb-6">
                            Carteira de Identificação
                        </h3>

                        <div className="w-full bg-white rounded-lg p-6 flex flex-col items-center">
                            <canvas ref={canvasRef} className="mx-auto" />

                            <h4 className="text-zinc-700 text-md dark:text-zinc-50 mt-2">
                                Nome:
                            </h4>

                            <span className="font-medium text-zinc-900 text-lg dark:text-zinc-50">
                                {student?.fullName}
                            </span>

                            <div className="flex gap-6 mt-4">
                                <div>
                                    <h4 className="text-zinc-700 text-md dark:text-zinc-50 text-center">
                                        Turma
                                    </h4>
                                    <span className="font-medium text-zinc-900 text-lg dark:text-zinc-50 text-center">
                                        {student?.className}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-zinc-700 text-md dark:text-zinc-50 text-center">
                                        Turno
                                    </h4>
                                    <span className="font-medium text-zinc-900 text-lg dark:text-zinc-50 text-center">
                                        {student?.shift}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-md">
                <Button onClick={handleDownload} typeButton="sign-in">
                    <span className="flex gap-2 items-center">
                        <ArrowDownToLine height={18} width={18} />
                        Baixar Carterinha
                    </span>
                </Button>
            </div>
        </section>
    );
}