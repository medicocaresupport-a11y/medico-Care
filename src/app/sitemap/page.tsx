import Link from "next/link";
import { LayoutGrid, Home, Package, ShoppingCart, ShieldAlert, Mail, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Sitemap | MedicoCare",
    description: "Navigate all pages, products, and features on MedicoCare easily.",
};

export default function Sitemap() {
    const sitemapLinks = [
        {
            title: "Core Pages",
            icon: <Home className="w-5 h-5 text-primary shrink-0" />,
            links: [
                { name: "Home", href: "/" },
                { name: "About Impact", href: "/#about" },
                { name: "Why Choose Us", href: "/#why-us" },
                { name: "Testimonials", href: "/#testimonials" },
            ]
        },
        {
            title: "E-Commerce",
            icon: <Package className="w-5 h-5 text-emerald-500 shrink-0" />,
            links: [
                { name: "Product Catalog", href: "/products" },
                { name: "Shopping Cart", href: "/cart" },
                { name: "Secure Checkout", href: "/checkout" },
            ]
        },
        {
            title: "Legal & Support",
            icon: <ShieldAlert className="w-5 h-5 text-purple-500 shrink-0" />,
            links: [
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms-of-service" },
                { name: "Cookie Policy", href: "/cookie-policy" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                {/* Hero Header */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none mb-10">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
                        <LayoutGrid className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        Sitemap
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Use this structured page map to discover all pages, catalog links, and legal notices easily.
                    </p>
                </div>

                {/* Content Block */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sitemapLinks.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                                <h2 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                                    {section.icon}
                                    {section.title}
                                </h2>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Support Block */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-12 bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="font-bold text-slate-950 dark:text-white mb-1">
                                Looking for something else?
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Reach our customer support desk for further help.
                            </p>
                        </div>
                        <a
                            href="mailto:medicocare.support@gmail.com"
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs sm:text-sm font-bold px-4 py-3 sm:px-5 rounded-xl transition-all shadow-md shadow-primary/20 w-full md:w-auto shrink-0 break-all"
                        >
                            medicocare.support@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
