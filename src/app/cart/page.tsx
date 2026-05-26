"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
    const router = useRouter();
    const cartTotal = getCartTotal();
    const cartCount = getCartCount();

    const getProductPrice = (item: any): string => {
        if (item.price) return item.price;
        return "$0.00";
    };

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md mx-auto px-4"
                >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Looks like you haven't added any clinical solutions to your cart yet.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-sm hover:shadow-md hover:shadow-primary/20"
                    >
                        Browse Catalog
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                        You have {cartCount} item{cartCount !== 1 && 's'} in your cart
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="w-full lg:w-2/3 space-y-4">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={`${item.id}-${item.selectedMg}`}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-6 flex flex-row sm:flex-row gap-3 sm:gap-6 items-center shadow-sm relative overflow-hidden group"
                                >
                                    {/* Product Image */}
                                    <div className="w-20 h-20 sm:w-32 sm:h-32 aspect-square bg-slate-100 dark:bg-slate-800/50 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={120}
                                            height={120}
                                            className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal"
                                        />
                                    </div>

                                    {/* Product Details + Controls (stacked on mobile) */}
                                    <div className="flex-1 min-w-0 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">

                                        {/* Text Info */}
                                        <div className="flex-1 min-w-0 text-left">
                                            <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">
                                                {Array.isArray(item.category) ? item.category.join(", ") : (item.category?.split('/')[1] || item.category)}
                                            </div>
                                            <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2 leading-tight">
                                                {item.name} {item.selectedMg && <span className="text-primary ml-1">({item.selectedMg})</span>}
                                            </h3>
                                            <div className="text-sm sm:text-lg font-black text-slate-900 dark:text-white">
                                                {getProductPrice(item)}
                                            </div>
                                        </div>

                                        {/* Action Controls */}
                                        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg p-0.5 sm:p-1 border border-slate-200 dark:border-slate-700">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedMg)}
                                                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <span className="sr-only">Decrease quantity</span>
                                                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <span className="w-7 sm:w-10 text-center font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedMg)}
                                                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors"
                                                >
                                                    <span className="sr-only">Increase quantity</span>
                                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id, item.selectedMg)}
                                                className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-1.5 sm:p-2 rounded-lg transition-colors flex items-center gap-1 text-xs sm:text-sm font-medium"
                                            >
                                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="sm:hidden">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 sticky top-28 shadow-xl shadow-primary/5"
                        >
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6 text-sm">
                                {/* Map explicitly over each cart item */}
                                {cartItems.map((item) => {
                                    const priceStr = getProductPrice(item);
                                    const rawPrice = (priceStr && typeof priceStr === "string")
                                        ? parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0
                                        : 0;
                                    const itemTotal = rawPrice * item.quantity;
                                    return (
                                        <div key={`${item.id}-${item.selectedMg}`} className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                                            <span className="truncate pr-4 max-w-[150px] sm:max-w-[200px]">
                                                {item.name} {item.selectedMg && `(${item.selectedMg})`} (x{item.quantity})
                                            </span>
                                            <span className="text-slate-900 dark:text-white font-bold shrink-0">${itemTotal.toFixed(2)}</span>
                                        </div>
                                    );
                                })}

                                <div className="border-t border-slate-100 dark:border-slate-800 my-4 pt-4"></div>

                                <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                                    <span>Subtotal ({cartCount} items)</span>
                                    <span className="text-slate-900 dark:text-white font-bold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-slate-900 dark:text-white font-bold">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                                        <p className="text-[10px] text-slate-400 font-semibold dark:text-slate-500 mt-0.5 tracking-wide">Taxes included</p>
                                    </div>
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                                        ${cartTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push("/checkout")}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 text-lg"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
