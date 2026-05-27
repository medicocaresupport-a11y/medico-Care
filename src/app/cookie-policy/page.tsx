import Link from "next/link";
import { Cookie, Info, ShieldCheck, Settings, Mail, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Cookie Policy | MedicoCare",
    description: "Learn how and why MedicoCare uses cookies to improve your user experience.",
};

export default function CookiePolicy() {
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
                        <Cookie className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        Cookie Policy
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Last Updated: May 27, 2026 • 5 min read
                    </p>
                </div>

                {/* Content Block */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-10">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <Info className="w-5 h-5 text-primary shrink-0" />
                            1. What Are Cookies?
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            Cookies are lightweight text tokens cached on your device or browser as you navigate our platform. They serve as memory elements to improve checkout operations, save catalog preferences, and authorize secure sessions.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                            2. How We Use Cookies
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            MedicoCare classifies cookies into three primary groups:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850">
                                <h3 className="font-bold text-sm text-slate-950 dark:text-white mb-2 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                                    Essential
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Critical for securing user logins, tracking items in your Cart, and executing Checkout. These cannot be disabled.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850">
                                <h3 className="font-bold text-sm text-slate-950 dark:text-white mb-2 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                    Preferences
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Preserves light/dark mode preference toggle state and localized currency choices for future visits.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850">
                                <h3 className="font-bold text-sm text-slate-950 dark:text-white mb-2 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    Analytics
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Enables our R&D and support teams to analyze usage logs, traffic paths, and optimize pages for faster loading.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <Settings className="w-5 h-5 text-primary shrink-0" />
                            3. Managing Your Cookie Preferences
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            Most modern web browsers allow you to disable or purge cookies through their built-in privacy settings. Please note that if you reject essential cookies, certain key aspects of the MedicoCare cart and checkout process will fail to execute.
                        </p>
                    </section>

                    {/* Support Block */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-12 bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="font-bold text-slate-950 dark:text-white mb-1">
                                Need to consult our technical team?
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Learn more about cookies or data handling by contacting support.
                            </p>
                        </div>
                        <a
                            href="mailto:medicocare.support@gmail.com"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-primary-foreground text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-primary/20 shrink-0"
                        >
                            <Mail className="w-4 h-4" /> medicocare.support@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
