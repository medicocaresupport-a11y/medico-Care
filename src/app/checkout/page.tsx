"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Lock, ShoppingBag, ShieldCheck, Mail, User, MapPin, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cartItems, cartTotal, cartCount, clearCart } = useCart();
    const { isAuthenticated, isLoading: authLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirect=/checkout");
        }
    }, [isAuthenticated, authLoading, router]);

    const [isProcessing, setIsProcessing] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        email: user?.email || "",
        firstName: user?.name?.split(" ")[0] || "",
        lastName: user?.name?.split(" ").slice(1).join(" ") || "",
        address: "",
        city: "",
        state: "",
        zip: "",
        nameOnCard: user?.name || ""
    });

    // Update form when user details load
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email,
                firstName: user.name.split(" ")[0] || "",
                lastName: user.name.split(" ").slice(1).join(" ") || "",
                nameOnCard: user.name
            }));
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state || !formData.zip) {
            alert("Please fill in all shipping details first.");
            return;
        }

        setIsProcessing(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail: formData.email,
                    shippingAddress: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zip: formData.zip
                    },
                    items: cartItems,
                    totalAmount: cartTotal
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create order");
            }

            window.open("https://www.paypal.com/ncp/payment/5CD42262QAFDL", "_blank");

            // alert("Order placed successfully! Redirecting you to finalize your payment.");

            if (clearCart) clearCart();
            router.push("/");
        } catch (err: any) {
            console.error("Checkout error:", err);
            alert(err.message || "An error occurred while placing your order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const getProductPrice = (product: any): string => {
        if (product.price) return product.price;
        if (product.features) {
            const priceFeature = product.features.find((f: string) => f?.startsWith("Price:"));
            if (priceFeature) return priceFeature.replace("Price: ", "");
        }
        return "$0.00";
    };

    if (authLoading || !isAuthenticated) {
        return (
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 justify-center flex flex-col items-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <span className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin inline-block mb-4 animate-spin-slow" />
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Verifying secure checkout session...</p>
                </motion.div>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 justify-center flex flex-col items-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Your Cart is Empty</h1>
                    <p className="text-slate-600 mb-8">Please add items to your cart before proceeding to checkout.</p>
                    <Link href="/products" className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-full">
                        Browse Catalog
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Secure Checkout</h1>
                        <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                            <Lock className="w-4 h-4 text-emerald-500" /> SSL Encrypted & Secure
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* LEFT COLUMN: Forms */}
                    <div className="w-full lg:w-3/5 space-y-10">

                        {/* Contact & Shipping */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                                Contact & Shipping
                            </h2>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" placeholder="you@example.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                                        <div className="relative">
                                            <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" placeholder="John" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                                        <div className="relative">
                                            <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" placeholder="Doe" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Address</label>
                                    <div className="relative">
                                        <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" placeholder="123 Main St" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">City</label>
                                        <div className="relative">
                                            <Building2 className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" placeholder="City" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">State</label>
                                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" placeholder="NY" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">ZIP Code</label>
                                        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" placeholder="10001" />
                                    </div>
                                </div>
                            </form>
                        </section>

                        {/* Place Order */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                                Place Order
                            </h2>

                            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-6">
                                <p className="text-slate-600 dark:text-slate-400 font-medium">
                                    Confirm your shipping details above and click the button below to place your order. You will be redirected to PayPal to complete your payment securely.
                                </p>

                                <button
                                    type="button"
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                    className="w-full max-w-md bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg disabled:opacity-70 cursor-pointer"
                                >
                                    {isProcessing ? (
                                        <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing Order...</>
                                    ) : (
                                        <>Place Order & Pay ${cartTotal.toFixed(2)}</>
                                    )}
                                </button>
                            </div>
                        </section>

                    </div>

                    {/* RIGHT COLUMN: Order Summary (Invoice) */}
                    <div className="w-full lg:w-2/5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 sticky top-28 shadow-xl shadow-slate-200/20 dark:shadow-none"
                        >
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" /> Order Summary
                            </h2>

                            {/* Compact Cart Items */}
                            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => {
                                    const priceStr = getProductPrice(item);
                                    const rawPrice = (priceStr && typeof priceStr === "string")
                                        ? parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0
                                        : 0;

                                    return (
                                        <div key={`${item.id}-${item.selectedMg}`} className="flex gap-4 items-center">
                                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                                <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                                                    {item.name} {item.selectedMg && <span className="text-primary text-[10px] ml-1">({item.selectedMg})</span>}
                                                </h4>
                                                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-bold text-slate-900 dark:text-white">
                                                ${(rawPrice * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4 text-sm mb-6">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                                    <span>Subtotal ({cartCount} items)</span>
                                    <span className="text-slate-900 dark:text-white font-bold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-slate-900 dark:text-white font-bold">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                                        <p className="text-[10px] text-slate-400 font-semibold dark:text-slate-500 mt-0.5 tracking-wide">Taxes included</p>
                                    </div>
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                                        ${cartTotal.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1 mt-6">
                                    <ShieldCheck className="w-4 h-4" /> Guaranteed Safe Checkout
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </main>
    );
}
