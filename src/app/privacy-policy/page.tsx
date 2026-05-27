import Link from "next/link";
import { Shield, Lock, Eye, FileText, Mail, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | MedicoCare",
    description: "Learn how MedicoCare collects, protects, and handles your personal data.",
};

export default function PrivacyPolicy() {
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
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Last Updated: May 27, 2026 • 7 min read
                    </p>
                </div>

                {/* Content Block */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-10">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary shrink-0" />
                            1. Introduction
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            At MedicoCare, we value your trust and prioritize your privacy above all. This Privacy Policy governs our data processing practices for the website and services offered by MedicoCare.
                        </p>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            By utilizing our website or purchasing medical catalog items, you signify your agreement with the collection, storage, and usage parameters defined in this document.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <Eye className="w-5 h-5 text-primary shrink-0" />
                            2. Data We Collect
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            We gather information directly from you or automatically as you navigate through MedicoCare:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-650 dark:text-slate-450 text-sm">
                            <li><strong>Identity & Account Details:</strong> Your full name, email address, physical shipping address, and phone number when you register or checkout.</li>
                            <li><strong>Session & Interaction:</strong> IP address, device fingerprints, cookie tokens, and pages viewed during your secure browsing.</li>
                            <li><strong>Health Preferences:</strong> Optional tags, inquiries, or catalogs searched to facilitate customized support.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary shrink-0" />
                            3. Processing Rationale
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            We process your parameters to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-650 dark:text-slate-450 text-sm">
                            <li>Process orders, ship physical medicines, and secure online payments seamlessly.</li>
                            <li>Defend our platform from fraudulent, duplicate, or abusive behaviors.</li>
                            <li>Optimize platform user experiences through tailored catalog suggestions.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary shrink-0" />
                            4. Encryption & Security Standards
                        </h2>
                        <p className="text-slate-650 dark:text-slate-450 leading-relaxed text-sm">
                            MedicoCare implements state-of-the-art AES-256 SSL encryption for transmission and strict access privileges on server storage nodes. Our cold chain transport also carries secure logging variables to preserve health delivery standards.
                        </p>
                    </section>

                    {/* Support Block */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-12 bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="font-bold text-slate-950 dark:text-white mb-1">
                                Have questions about your privacy?
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Contact our Data Protection Officer for guidance.
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
