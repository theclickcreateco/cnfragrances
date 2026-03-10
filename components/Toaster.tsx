"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

interface Toast {
    id: string;
    message: string;
    productName?: string;
}

export let showToast: (message: string, productName?: string) => void = () => { };

export default function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        showToast = (message: string, productName?: string) => {
            const id = Math.random().toString(36).substring(2, 9);
            setToasts((prev) => [...prev, { id, message, productName }]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 5000);
        };
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="pointer-events-auto flex items-center gap-4 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-6 py-4 rounded-xl min-w-[320px] animate-in fade-in slide-in-from-right-8 duration-300"
                >
                    <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-semibold text-gray-900">{toast.message}</p>
                        {toast.productName && (
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{toast.productName}</p>
                        )}
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
