"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, Heart, ShieldPlus, Pill, Microscope, Sparkles } from "lucide-react";
import Image from "next/image";

export function Hero() {
    // Animation variants
    const containerVars: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVars: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    const floatingVars: Variants = {
        float: {
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
        floatReverse: {
            y: [10, -10, 10],
            rotate: [5, -5, 5],
            transition: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <section id="home" className="relative md:min-h-screen flex items-center py-7 md:py-0 justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 md:pt-20">
            {/* Dynamic Animated Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, -50, 0],
                        y: [0, 100, 0],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-emerald-400/10 dark:bg-emerald-400/5 blur-[150px] mix-blend-multiply dark:mix-blend-screen"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content */}
                    <motion.div
                        variants={containerVars}
                        initial="hidden"
                        animate="show"
                        className="text-center lg:text-left pt-15 md:pt-10 lg:pt-0"
                    >
                        <motion.div variants={itemVars} className="inline-block mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-primary font-medium text-sm">
                                <Sparkles className="h-4 w-4" />
                                <span>Next-Gen Healthcare Technology</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={itemVars}
                            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]"
                        >
                            Future of <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                                Medicine
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVars}
                            className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
                        >
                            Empowering a healthier tomorrow. Experience the pinnacle of cutting-edge pharmaceutical innovations, dedicated research, and uncompromising clinical excellence.
                        </motion.p>

                        <motion.div variants={itemVars} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link
                                href="#products"
                                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 focus:ring-4 focus:ring-primary/20 flex items-center justify-center gap-2 group transform hover:-translate-y-1"
                            >
                                Explore Products
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#about"
                                className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full font-semibold transition-all flex items-center justify-center shadow-sm hover:shadow transform hover:-translate-y-1"
                            >
                                Discover Our Impact
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Dynamic 3D/Floating Visual Composition */}
                    <div className="relative h-[600px] hidden lg:flex items-center justify-center">

                        {/* Center Main Orb */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-80 h-80 rounded-full bg-gradient-to-tr from-primary to-blue-400 p-1 shadow-2xl shadow-primary/30"
                        >
                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center overflow-hidden relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532187863486-abf9db0b84cb?auto=format&fit=crop&q=80&w=800&h=800')] opacity-30 dark:opacity-20 scale-150"
                                    style={{ backgroundSize: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-[2px]" />
                                <img
                                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600&h=600"
                                    alt="Medical Abstract"
                                    className="w-full h-full object-cover rounded-full mix-blend-overlay opacity-50 absolute inset-0"
                                />

                                {/* Plus shape in center */}
                                <div className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl shadow-xl flex items-center justify-center border border-white/20">
                                    <Heart className="w-16 h-16 text-primary fill-primary/20" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Orbiting / Floating Cards */}
                        <motion.div
                            variants={floatingVars}
                            animate="float"
                            className="absolute top-[15%] right-[10%] bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 z-20"
                        >
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                                <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Validation</div>
                                <div className="font-bold text-slate-900 dark:text-white">100% Clinical</div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={floatingVars}
                            animate="floatReverse"
                            className="absolute bottom-[20%] left-[5%] bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 z-20"
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <ShieldPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Protection</div>
                                <div className="font-bold text-slate-900 dark:text-white">FDA Approved</div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={floatingVars}
                            animate="float"
                            style={{ animationDelay: '1s' }}
                            className="absolute top-[30%] left-[0%] bg-white dark:bg-slate-900 p-3 rounded-full shadow-lg border border-slate-100 dark:border-slate-800 z-10"
                        >
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <Microscope className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                        </motion.div>

                        <motion.div
                            variants={floatingVars}
                            animate="floatReverse"
                            style={{ animationDelay: '1.5s' }}
                            className="absolute bottom-[35%] right-[0%] bg-white dark:bg-slate-900 p-3 rounded-full shadow-lg border border-slate-100 dark:border-slate-800 z-10"
                        >
                            <div className="p-2 rounded-xl text-primary flex items-center justify-center">
                                <Image
                                    src="/new_icon.PNG"
                                    alt="MedicoCare Logo"
                                    width={24}
                                    height={24}
                                    className="h-12 w-12 object-contain"
                                />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
