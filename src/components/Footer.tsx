import Link from "next/link";
import Image from "next/image";
import { Pill, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-10 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1 space-y-6">
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
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Trusted healthcare solutions and premium pharmaceutical products designed for a healthier tomorrow.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About Us", href: "/#about" },
                                { name: "Our Products", href: "/products" },
                                { name: "Why Choose Us", href: "/#why-us" },
                                { name: "Testimonials", href: "/#testimonials" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-6">Legal Area</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Privacy Policy", href: "/privacy-policy" },
                                { name: "Terms of Service", href: "/terms-of-service" },
                                { name: "Cookie Policy", href: "/cookie-policy" },
                                { name: "Sitemap", href: "/sitemap" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-semibold text-foreground mb-6">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href="mailto:medicocare.support@gmail.com" className="hover:text-primary transition-colors">
                                    medicocare.support@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-500">
                    <p>© {new Date().getFullYear()} MedicoCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
