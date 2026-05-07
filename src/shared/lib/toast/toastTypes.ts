//REACT HOT TOAST
import toast from "react-hot-toast"

type ToastTypes = 
    "success" 
    | "error" 
    | "warn"
    | "info"

interface ToastProps {
    message: string;
    theme?: boolean;
    type: ToastTypes
}

export const handleToasts = ({ message, theme, type }: ToastProps) => {

    const style = {
        backgroundColor: theme ? "#FFFFFF" : "#18181b",
        borderWidth: "1px",
        borderColor: theme ? "#e4e4e7" : "#27272a",
        color: theme ? "#000000" : "#FFFAFE"
    }

    const toastTypes = {
        "success": () => toast.success(message, { style }),
        "error": () => toast.error(message, { style }),
        "warn": () => toast(message, { icon: "⚠️", style }),
        "info": () => toast(message, { icon: "ℹ️", style })
    }

    return toastTypes[type]();
}