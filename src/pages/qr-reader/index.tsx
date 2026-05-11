import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { cn } from "@/shared/lib/utils";
import { CheckCircle, XCircle, Camera } from "lucide-react";
import { postStudentPresence } from "@/entities/student/api/post-student-presence";

export const QrReader = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    useEffect(() => {

        const scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            },
            false
        );

        const onScanSuccess = async (decodedText: string) => {
            if (status === "loading") return;

            try {
                setStatus("loading");
                scanner.pause();

                await postStudentPresence(decodedText);

                setStatus("success");
                setMessage("Presença confirmada!");

                setTimeout(() => {
                    setStatus("idle");
                    scanner.resume(); 
                }, 3000);

            } catch (error) {
                setStatus("error");
                setMessage("Erro ao validar QR Code");

                setTimeout(() => {
                    setStatus("idle");
                    scanner.resume();
                }, 3000);
            }
        };
        
        return () => {
            scanner.clear().catch(error => console.error("Erro ao limpar scanner", error));
        };
    }, []);

    return (
        <div
            className="
                w-full
                pt-8 px-8
                flex flex-col
                justify-center
                items-center
            "
        >
            <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
                Leitor de Presença
            </h1>

            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
                <div id="qr-reader" className="w-full"></div>

                {status !== "idle" && (
                    <div className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center z-10 animate-in fade-in duration-300",
                        status === "success" && "bg-green-500/90",
                        status === "error" && "bg-red-500/90",
                        status === "loading" && "bg-zinc-900/80"
                    )}>
                        {status === "success" && <CheckCircle className="text-white w-16 h-16 mb-2" />}
                        {status === "error" && <XCircle className="text-white w-16 h-16 mb-2" />}
                        {status === "loading" && <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />}

                        <p className="text-white font-medium text-center px-4">
                            {status === "loading" ? "Processando..." : message}
                        </p>
                    </div>
                )}
            </div>

            <p className="mt-8 text-zinc-500 text-sm flex items-center gap-2">
                <Camera size={16} /> Aponte a câmera para o QR Code do aluno
            </p>
        </div>
    );
};