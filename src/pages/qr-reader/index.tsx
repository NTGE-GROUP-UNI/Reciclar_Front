import { postStudentPresence } from "@/entities/student/api/post-student-presence";
import { cn } from "@/shared/utils/tailwind-merge/cn";
import { BadgeInfo, Camera, CheckCircle, Flag, FlagOff, Wind, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/shared/components/shared";
import { Spinner } from "@/shared/ui/spinner";
import { useLocation } from "react-router-dom";
import { patchStudentRegisterAbsence } from "@/entities/student/api/patch-student-register-absence";
import { patchStudentRemoveAbsence } from "@/entities/student/api/patch-student-remove-absence";

export const QrReader = () => {

    const scannerRef = useRef<Html5Qrcode | null>(null);
    const isProcessingRef = useRef(false);
    const location = useLocation();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [selectButton, setSelectButton] = useState<string | null>(null)

    const handleClickAction = (action: string) => {
        setSelectButton(action);
        startScanner(action);
    }

    const startScanner = async (action: string) => {
        if (scannerRef.current || isCameraActive) return;

        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        console.log(action);

        try {
            await scanner.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                async (decodedText) => {
                    if (isProcessingRef.current) return;
                    isProcessingRef.current = true;

                    try {
                        setStatus("loading");

                        if (action === "register_entry"){
                            await postStudentPresence(decodedText, "entry");
                            setStatus("success");
                            setMessage("Presença registrada!");
                            return;
                        }

                        if (action === "register_exit") {
                            await postStudentPresence(decodedText, "exit");
                            setStatus("success");
                            setMessage("Saída registrada!");
                            return;
                        }

                        if (action === "register_absence") {
                            await patchStudentRegisterAbsence(decodedText);
                            setStatus("success");
                            setMessage("Falta confirmada!");
                            return;
                        }

                        if (action === "remove_absence") {
                            await patchStudentRemoveAbsence(decodedText);
                            setStatus("success");
                            setMessage("Falta removida!");
                            return;
                        }
                        
                    } catch {
                        setStatus("error");
                        setMessage("Erro ao validar QR Code");
                    } finally {
                        setTimeout(() => {
                            setStatus("idle");
                            isProcessingRef.current = false;
                        }, 3000);
                    }
                },
                () => { }
            );

            setIsCameraActive(true);
        } catch (error) {
            console.error(error);
            scannerRef.current = null;
        }
    };

    const stopScanner = async () => {
        if (!scannerRef.current) return;

        try {
            const state = scannerRef.current.getState();
            if (state === 2 || state === 3) {
                await scannerRef.current.stop();
            }
            scannerRef.current.clear();
            setSelectButton(null)
        } catch (error) {
            console.error("Erro ao parar scanner:", error);
        } finally {
            scannerRef.current = null;
            isProcessingRef.current = false;
            setIsCameraActive(false);
            setStatus("idle");
        }
    };

    useEffect(() => {
        return () => {
            stopScanner();
        };
    }, [location.pathname]);

    return (
        <div className="w-full p-8 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold m-0 text-zinc-600">Leitor de Presença</h1>
                {isCameraActive ? <Spinner className="text-zinc-600" /> : null}
            </div>

            <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl overflow-hidden">
                <div id="qr-reader" className="w-full min-h-[300px]" />

                {status !== "idle" && (
                    <div className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center z-10",
                        status === "success" && "bg-green-500/90",
                        status === "error" && "bg-red-500/90",
                        status === "loading" && "bg-zinc-900/80"
                    )}>
                        {status === "success" && <CheckCircle className="text-white w-16 h-16 mb-2" />}
                        {status === "error" && <XCircle className="text-white w-16 h-16 mb-2" />}
                        {status === "loading" && (
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
                        )}
                        <p className="text-white font-medium">
                            {status === "loading" ? "Processando..." : message}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex gap-4 mt-4 w-full max-w-sm">
                {!isCameraActive ? (
                    !selectButton ?
                    <div className="flex flex-col gap-2 w-full">
                            <Button typeButton="blue" onClick={() => handleClickAction("register_entry")}><strong>Registrar entrada</strong> <Flag /></Button>
                            <Button typeButton="red" onClick={() => handleClickAction("register_exit")}><strong>Registrar saída</strong> <Wind /></Button>
                            <Button typeButton="red" onClick={() => handleClickAction("register_absence")}><strong>Registrar falta</strong> <FlagOff /></Button>
                            <Button typeButton="red" onClick={() => handleClickAction("remove_absence")}><strong>Remover falta</strong> <FlagOff /></Button>
                    </div>
                    :
                    null
                ) : (
                    <Button typeButton="red" onClick={stopScanner}>Parar câmera</Button>
                )}
            </div>

            <p className="mt-6 text-zinc-500 text-sm flex items-center gap-2">
                <Camera size={16} />
                Aponte a câmera para o QR Code do aluno
            </p>
        </div>
    );
};