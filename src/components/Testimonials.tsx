"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        content: "MedicoCare's advanced cardiology formulations have shown incredible results in my clinical practice. The adherence rates are up, and patient outcomes are significantly improved.",
        author: "Dr. Sarah Jenkins",
        role: "Chief of Cardiology, Metro Health",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
        content: "We've been partnering with MedicoCare for our regional hospitals for five years. Their supply chain reliability and cold chain logistics are unmatched in the industry.",
        author: "James Chen",
        role: "Director of Procurement, Regional Health",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
        content: "The continuous R&D investment by MedicoCare guarantees that we can offer our patients the most modern, effective, and safe therapies available globally.",
        author: "Dr. Emily Rodriguez",
        role: "Lead Researcher, LifeScience Institute",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=200&h=200",
    }
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-10 md:py-10 bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Trusted by <span className="text-primary">Professionals</span>
                    </h2>
                    <p className="text-lg text-slate-400">
                        Hear from industry leaders, healthcare professionals, and partners who trust MedicoCare for their medical solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-3xl relative"
                        >
                            <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/20" />

                            <div className="flex gap-1 text-amber-400 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-slate-300 leading-relaxed mb-8 relative z-10 text-lg">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{testimonial.author}</h4>
                                    <p className="text-sm text-primary">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
