"use client";

import { CATEGORIES, catalog } from "@/lib/catalog";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CategoriesSection() {
    // Filter out 'All' category for the UI blocks
    const displayCategories = CATEGORIES.filter(c => c !== 'All');

    const categoryImages: Record<string, string> = {
        "Men's Health": "/categories/mens-health.jpg", // fit man
        "Women's Health": "/categories/womens-health.jpg", // healthy woman
        "Anti Viral": "/categories/anti-viral.jpg", // medical/health abstract
        "Eye Care": "/categories/eye-care.jpg", // nice eye close up
        "Anti Cancer": "/categories/anti-cancer.jpg", // medical care
        "Skin Care": "/categories/skin-care.jpg", // flawless skin
        "HIV & Herpes": "/categories/hiv-herpes.jpg", // clinical care
    };

    const getCategoryImage = (categoryName: string) => {
        return categoryImages[categoryName] || '/products/placeholder.jpg';
    };

    // Subtitles for the editorial vibe
    const getSubtitle = (category: string) => {
        const maps: Record<string, string> = {
            "Men's Health": "Targeted Vitality",
            "Women's Health": "Targeted Balance",
            "Skin Care": "Targeted Radiance",
            "Anti Viral": "Targeted Immunity",
            "Eye Care": "Targeted Vision",
            "Anti Cancer": "Targeted Oncology",
            "HIV & Herpes": "Advanced Care",
        };
        return maps[category] || "Clinical Solutions";
    };

    return (
        <section className="py-10 md:py-10 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Subtle background ambient blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-100/40 dark:bg-blue-900/10 blur-3xl rounded-[100%]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase">The Clinical Atelier</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Shop By Category
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl">
                        Discover pharmaceutical excellence tailored to your specific health needs through our editorially curated selections.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {displayCategories.map((category) => (
                        <Link
                            href={`/products?category=${encodeURIComponent(category)}`}
                            key={category}
                            className="group flex flex-col bg-white dark:bg-slate-900 rounded-[20px] p-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] transition-all duration-400 transform hover:-translate-y-1"
                        >
                            {/* Inner image frame (Nested Rounding principle) */}
                            <div className="relative h-34 sm:h-66 w-full bg-[#f3f4f5] dark:bg-slate-800 rounded-[16px] overflow-hidden flex items-center justify-center mb-4">
                                <Image
                                    src={getCategoryImage(category)}
                                    alt={category}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Content Block */}
                            <div className="px-4 pb-4 flex items-end justify-between">
                                <div>
                                    {/* <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                                        {getSubtitle(category)}
                                    </p> */}
                                    <h3 className="text-sm sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {category}
                                    </h3>
                                </div>

                                {/* Gradient interaction button */}
                                <div className="hidden sm:flex w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-sm">
                                    <ArrowUpRight className="w-5 h-5 group-hover:scale-110 group-hover:text-white transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
