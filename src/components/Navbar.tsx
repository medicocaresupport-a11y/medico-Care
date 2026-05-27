"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Pill, ShoppingCart, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { isAuthenticated, user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/#about" },
        { name: "Products", href: "/products" },
        { name: "Why Us", href: "/#why-us" },
        { name: "Testimonials", href: "/#testimonials" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-1">
                        <div className="rounded-xl text-primary flex items-center justify-center">
                            <Image
                                src="/new_icon.PNG"
                                alt="MedicoCare Logo"
                                width={24}
                                height={24}
                                className="h-12 w-12 object-contain"
                            />
                        </div>
                        <span className="mb-1 font-bold text-xl tracking-tight text-foreground">
                            MedicoCare
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex items-center gap-4">
                            <Link href="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                                <ShoppingCart className="h-6 w-6" />
                                <AnimatePresence>
                                    {cartCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950 shadow-sm"
                                        >
                                            {cartCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>

                            <ThemeToggle />

                            {isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-3 bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-5 py-2.5 rounded-2xl">
                                        <User className="w-6 h-6 text-primary shrink-0" />
                                        <div className="flex flex-col items-start min-w-0">
                                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">
                                                {user?.name}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                                                {user?.email}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="text-xs font-bold text-rose-500 hover:bg-rose-500/10 p-2.5 rounded-full transition-all border border-rose-500/10 shrink-0"
                                        title="Log Out"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm"
                                >
                                    Log In
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/cart" className="relative p-2 text-slate-600 dark:text-slate-300">
                            <ShoppingCart className="h-6 w-6" />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950 shadow-sm"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                        <ThemeToggle />
                        <button
                            className="p-2 text-slate-600 dark:text-slate-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-lg"
                >
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-primary/5 hover:text-primary rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2">
                            {isAuthenticated ? (
                                <div className="pt-2">
                                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl mb-3">
                                        <User className="w-6 h-6 text-primary shrink-0" />
                                        <div className="flex flex-col items-start min-w-0">
                                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">
                                                {user?.name}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                                                {user?.email}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full py-3 px-5 rounded-lg text-base font-bold text-rose-500 hover:bg-rose-500/5 transition-all border border-rose-500/10 flex items-center justify-center gap-2"
                                    >
                                        <LogOut className="w-5 h-5" /> Log Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 rounded-lg text-base font-bold transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Log In
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
}
