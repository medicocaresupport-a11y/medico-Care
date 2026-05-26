"use client";

import { motion } from "framer-motion";
import { FlaskConical, Stethoscope, Microscope, Award, CheckCircle2 } from "lucide-react";

export function AboutIndustry() {
    const features = [
        {
            icon: <FlaskConical className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
            title: "Pioneering R&D",
            description: "Investing in revolutionary research to develop next-generation therapies.",
            bg: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            icon: <Microscope className="h-6 w-6 text-primary dark:text-primary" />,
            title: "Clinical Excellence",
            description: "Rigorous testing and trials ensuring the highest standards of safety.",
            bg: "bg-primary/20 dark:bg-primary/20",
        },
        {
            icon: <Stethoscope className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
            title: "Global Reach",
            description: "Delivering life-saving medicines to communities worldwide.",
            bg: "bg-emerald-100 dark:bg-emerald-900/30",
        },
        {
            icon: <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
            title: "Certified Quality",
            description: "Recognized internationally for manufacturing and quality control.",
            bg: "bg-purple-100 dark:bg-purple-900/30",
        },
    ];

    return (
        <section id="about" className="py-10 md:py-10 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs mb-4 uppercase tracking-widest"
                    >
                        About Our Impact
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
                    >
                        Leading the Way in <span className="text-primary">Medical Innovation</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                        For over two decades, MedicoCare has been at the forefront of pharmaceutical advancement. We believe that access to high-quality healthcare is a fundamental right, not a privilege.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Image/Stats Composition */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800&h=1000"
                                alt="Laboratory Research"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                            {/* Overlay Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-black text-white">20+</div>
                                        <div className="text-sm font-medium text-slate-300">Years Exp.</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/20" />
                                    <div>
                                        <div className="text-3xl font-black text-white">50M</div>
                                        <div className="text-sm font-medium text-slate-300">Patients</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/20" />
                                    <div>
                                        <div className="text-3xl font-black text-white">150+</div>
                                        <div className="text-sm font-medium text-slate-300">Products</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMzOGJkZjgiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] z-[-1]" />
                    </motion.div>

                    {/* Right Column: Features and Text */}
                    <div className="lg:col-span-7">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Commitment to Global Health
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Our state-of-the-art laboratories and dedicated team of brilliant scientists work tirelessly to address the world’s most pressing medical challenges, creating sustainable and effective treatments through rigorous methodologies.
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                            {["FDA Inspected Facilities", "GMP Certified Manufacturing", "Sustainable Practices", "Continuous Innovation"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                                >
                                    <div className={`mt-1 shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg}`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
