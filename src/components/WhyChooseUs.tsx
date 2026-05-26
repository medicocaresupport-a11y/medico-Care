"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, Ribbon } from "lucide-react";

export function WhyChooseUs() {
    const reasons = [
        {
            icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
            title: "Guaranteed Authenticity",
            description: "Every product comes with a verifiable certificate of authenticity directly from the manufacturer.",
            bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        },
        {
            icon: <Ribbon className="h-6 w-6 text-purple-600" />,
            title: "Premium Quality Control",
            description: "Rigorous multi-stage quality control ensuring 100% compliance with international safety standards.",
            bg: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        },
        {
            icon: <Truck className="h-6 w-6 text-blue-600" />,
            title: "Cold Chain Logistics",
            description: "Temperature-controlled supply chain guaranteeing the integrity of sensitive medications.",
            bg: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        },
        {
            icon: <Clock className="h-6 w-6 text-amber-600" />,
            title: "24/7 Clinical Support",
            description: "Round-the-clock access to certified pharmacists and healthcare professionals.",
            bg: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        },
    ];

    return (
        <section id="why-us" className="py-10 md:py-10 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 dark:bg-primary/5 rounded-l-[100px] -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[80px] rounded-full -z-10" />

                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 border-transparent hover:border-primary/20 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all ${index % 2 === 1 ? "sm:mt-12" : ""
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${reason.bg}`}>
                                    {reason.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                                    {reason.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {reason.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="lg:pl-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                            Why Choose MedicoCare
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            Uncompromising Standards for <span className="text-primary">Your Health</span>
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            When it comes to healthcare, there is no room for compromise. We have built our entire infrastructure around delivering safety, efficacy, and peace of mind to our patients and partners.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "FDA approved and internationally certified manufacturing facilities",
                                "End-to-end transparent supply chain tracking",
                                "Sustainable and eco-friendly packaging solutions",
                                "Dedicated patient support and medication guidance"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 bg-primary text-white rounded-full p-1">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-full font-semibold transition-colors shadow-lg">
                            Learn More About Our Process
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
