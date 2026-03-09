"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { registerWithPhone } from "@/app/actions/auth";
import { Phone, Lock, User, Loader2, AlertCircle } from "lucide-react";

export default function AuthForms() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const phone = formData.get("phone") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;

        try {
            if (mode === "signup") {
                const result = await registerWithPhone(formData);
                if (!result.success) {
                    setError(result.error || "Failed to register");
                    setIsLoading(false);
                    return;
                }
            }

            const loginResult = await signIn("credentials", {
                phone,
                password,
                redirect: true,
                callbackUrl: "/account",
            });

            if (loginResult?.error) {
                setError("Invalid phone number or password");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full space-y-8">
            {/* Google Login */}
            <div className="space-y-4">
                <button
                    onClick={() => signIn("google", { callbackUrl: "/account" })}
                    className="w-full px-8 py-4 border border-gray-200 hover:border-black transition-all uppercase tracking-widest text-[10px] font-bold flex items-center justify-center gap-3 group"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-100"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
                    <span className="bg-white px-4 text-gray-400">Or</span>
                </div>
            </div>

            {/* Mobile Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            className="w-full border border-gray-100 bg-gray-50/50 px-12 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
                        />
                    </div>
                )}
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Mobile Number"
                        required
                        className="w-full border border-gray-100 bg-gray-50/50 px-12 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full border border-gray-100 bg-gray-50/50 px-12 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
                    />
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase tracking-widest font-bold bg-red-50 p-3 border border-red-100">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gray-800 transition-all flex justify-center items-center gap-2 disabled:bg-gray-400"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        mode === "login" ? "Sign In" : "Create Account"
                    )}
                </button>
            </form>

            <div className="text-center">
                <button
                    onClick={() => {
                        setMode(mode === "login" ? "signup" : "login");
                        setError(null);
                    }}
                    className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors"
                >
                    {mode === "login"
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Sign In"}
                </button>
            </div>
        </div>
    );
}
