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
                            <Link
                                href="#contact"
                                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm"
                            >
                                Contact Us
                            </Link>

                            {isAuthenticated ? (
                                <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-3.5 pr-2 py-1.5 rounded-full">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-primary" />
                                        {user?.name.split(" ")[0]}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="text-xs font-bold text-rose-500 hover:bg-rose-500/10 p-1.5 rounded-full transition-all"
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
                            <Link
                                href="#contact"
                                className="block w-full text-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 px-5 py-3 rounded-lg text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>

                            {isAuthenticated ? (
                                <div className="pt-2">
                                    <div className="flex items-center justify-between px-3 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl mb-3">
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <User className="w-4 h-4 text-primary" />
                                            {user?.name}
                                        </span>
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
