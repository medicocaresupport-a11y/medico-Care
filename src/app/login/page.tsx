"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Mail, User, Lock, ArrowRight, ShieldCheck, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const toastVariants = {
    initial: (isMobile: boolean) => ({
        opacity: 0,
        y: isMobile ? 40 : -20,
        x: isMobile ? 0 : 40,
        scale: 0.95
    }),
    animate: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1
    },
    exit: (isMobile: boolean) => ({
        opacity: 0,
        y: isMobile ? 40 : -20,
        x: isMobile ? 0 : 40,
        scale: 0.95
    })
};

function LoginContent() {
    const { login, signup, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    const [isLoginTab, setIsLoginTab] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Track window resize to toggle between desktop slide and mobile slide animation
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            router.push(redirect);
        }
    }, [isAuthenticated, redirect, router]);

    // Automatically dismiss the error toast after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Email is required");
            return;
        }

        if (email.indexOf("@") === -1) {
            setError("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (!isLoginTab && !name) {
            setError("Name is required for Sign Up");
            return;
        }

        setFormLoading(true);

        try {
            if (isLoginTab) {
                const success = await login(email, password);
                if (success) {
                    router.push(redirect);
                } else {
                    setError("Login failed. Please check your credentials.");
                }
            } else {
                const success = await signup(name, email, password);
                if (success) {
                    router.push(redirect);
                } else {
                    setError("Sign up failed. Please try again.");
                }
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
            {/* Toast Notification */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        custom={isMobile}
                        variants={toastVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed z-50 flex items-center gap-3 px-5 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-rose-200/50 dark:border-rose-900/30 rounded-2xl shadow-xl shadow-rose-500/5 w-[calc(100%-2rem)] max-w-sm bottom-6 left-4 right-4 mx-auto md:bottom-auto md:top-20 md:right-6 md:left-auto md:mx-0 md:w-[360px]"
                    >
                        <div className="bg-rose-100 dark:bg-rose-950/50 p-2 rounded-xl text-rose-600 dark:text-rose-400">
                            <AlertCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Error</p>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{error}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl"
                >
                    {/* Header Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <Link href="/" className="flex items-center gap-1 mb-3">
                            <div className="rounded-xl text-primary flex items-center justify-center">
                                <Image
                                    src="/new_icon.PNG"
                                    alt="MedicoCare Logo"
                                    width={24}
                                    height={24}
                                    className="h-12 w-12 object-contain"
                                />
                            </div>
                            <span className="mb-1 font-black text-2xl tracking-tight text-foreground">
                                MedicoCare
                            </span>
                        </Link>
                        <h1 className="text-xl font-bold text-slate-950 dark:text-white">
                            {isLoginTab ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-sm text-slate-500 text-center mt-1">
                            {isLoginTab
                                ? "Log in to check out and access your clinical summary"
                                : "Sign up to begin your personalized care journey"}
                        </p>
                    </div>

                    {/* Tabs switcher */}
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 mb-8 relative">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLoginTab(true);
                                setError("");
                            }}
                            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all relative z-10 ${isLoginTab ? "text-primary-foreground" : "text-slate-600 dark:text-slate-400"
                                }`}
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsLoginTab(false);
                                setError("");
                            }}
                            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all relative z-10 ${!isLoginTab ? "text-primary-foreground" : "text-slate-600 dark:text-slate-400"
                                }`}
                        >
                            Sign Up
                        </button>

                        {/* Background slider indicator */}
                        <motion.div
                            className="absolute bg-primary rounded-xl top-1 bottom-1 left-1"
                            style={{ width: "calc(50% - 4px)" }}
                            animate={{ x: isLoginTab ? 0 : "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Sign Up fields */}
                        <AnimatePresence initial={false} mode="popLayout">
                            {!isLoginTab && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    key="name-field"
                                >
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white text-sm"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                    Password
                                </label>
                                {/* {isLoginTab && (
                                    <a href="#" className="text-xs font-bold text-primary hover:underline">
                                        Forgot?
                                    </a>
                                )} */}
                            </div>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={formLoading || isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 text-base mt-8 disabled:opacity-70"
                        >
                            {formLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    {isLoginTab ? "Log In to Account" : "Get Started"}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Safe, Secure, HIPPA-Compliant Data
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <span className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin inline-block mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading session...</p>
                </div>
            </main>
        }>
            <LoginContent />
        </Suspense>
    );
}
