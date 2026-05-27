import Link from "next/link";
import { Scale, ShieldAlert, CheckCircle, HelpCircle, Mail, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Terms of Service | MedicoCare",
    description: "Read our rules, guidelines, and legal agreements for using MedicoCare.",
};

export default function TermsOfService() {
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
                        <Scale className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Effective Date: May 27, 2026 • 6 min read
                    </p>
                </div>

                {/* Content Block */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-10">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <Scale className="w-5 h-5 text-primary shrink-0" />
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            Welcome to MedicoCare. By using our website, ordering pharmaceutical catalog selections, or registering a secure account, you accept and comply with these Terms of Service.
                        </p>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            If you do not accept these constraints, you are advised to discontinue platform browsing and service consumption immediately.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                            2. Account Ownership & Registration
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            To purchase catalog listings or write reviews, you must register a secure login context. You are solely responsible for:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-650 dark:text-slate-450 text-sm">
                            <li>Maintaining the absolute confidentiality of your passwords and session cookies.</li>
                            <li>Providing truthful, complete identity details during registration and address setup.</li>
                            <li>Promptly notifying MedicoCare support in case of suspected breach or unauthorized access.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
                            3. Catalog Orders & Cold Chain Disclaimer
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            MedicoCare reserves the right to reject, modify, or limit order checkout quantities at its sole discretion:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-650 dark:text-slate-450 text-sm">
                            <li><strong>Product Descriptions:</strong> We make every effort to display highly accurate catalog pricing and details; however, typo errors or package revisions can occur.</li>
                            <li><strong>Prescriptions:</strong> Items requiring clinical validation must have verified medical documents uploaded during checkout before dispatch.</li>
                            <li><strong>Shipping & Delivery:</strong> Delicate medicines are processed under strict cold-chain logistics. Integrity is guaranteed up to point of delivery confirmation.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                            4. Limitation of Liability
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            In no event shall MedicoCare, its directors, partners, or pharmacists be held responsible for indirect, secondary, or circumstantial damage arising from medication usage, delayed cold-chain delivery, or platform downtime.
                        </p>
                    </section>

                    {/* Support Block */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-12 bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="font-bold text-slate-950 dark:text-white mb-1">
                                Need legal clarification?
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Reach our legal support team directly.
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
