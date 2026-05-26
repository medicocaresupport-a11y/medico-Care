"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingCart, Zap, Plus, Minus, Eye, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { catalog } from "@/lib/catalog";

function ProductCard({ item, i, onOpenModal, onAddToCart, onBuyNow, router }: { item: any, i: number, onOpenModal: (p: any) => void, onAddToCart: (p: any, v: any, q: number) => void, onBuyNow: (p: any, v: any, q: number) => void, router: any }) {
    const [selectedVariant, setSelectedVariant] = useState(item.Unit?.[0] || null);
    const [quantity, setQuantity] = useState(1);

    const getPrice = () => {
        if (selectedVariant) return selectedVariant.price;
        const priceFeature = item.features?.find((f: any) => typeof f === 'string' && f.startsWith('Price:'));
        return priceFeature ? priceFeature.replace('Price: ', '') : '$0.00';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group flex flex-col"
        >
            {/* Product Image Area */}
            <div className="relative aspect-square p-4 sm:p-6 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 overflow-hidden">
                {item.badge && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10">
                        {item.badge}
                    </span>
                )}
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500 object-contain p-4"
                />
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-6 flex flex-col flex-1">
                <h3 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-white mb-1 leading-tight text-center line-clamp-1 group-hover:text-primary transition-colors">
                    {item.name} {selectedVariant ? ` - ${selectedVariant.tablets}` : ''}
                </h3>

                <div className="text-lg sm:text-2xl font-black text-primary mb-4 text-center">
                    {getPrice()}
                </div>

                {/* Variant Selector (only if variants exist) */}
                {item.Unit && item.Unit.length > 0 && (
                    <div className="mb-3">
                        <select
                            value={selectedVariant?.tablets}
                            onChange={(e) => setSelectedVariant(item.Unit.find((v: any) => v.tablets === e.target.value))}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {item.Unit.map((v: any) => (
                                <option key={v.tablets} value={v.tablets}>{v.tablets}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Actions & Quantity Row */}
                <div className="flex items-center gap-2 mt-auto">
                    {/* Quantity Selector - Compact */}
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700 h-10 sm:h-12">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-slate-900 dark:text-white">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    <button
                        onClick={() => onAddToCart(item, selectedVariant, quantity)}
                        className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                        onClick={() => onBuyNow(item, selectedVariant, quantity)}
                        className="flex-1 h-10 sm:h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs transition-all shadow-sm"
                    >
                        <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> BUY
                    </button>

                    <button
                        onClick={() => onOpenModal(item)}
                        className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-colors"
                        title="Quick View"
                    >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export function FeaturedProducts() {
    const { addToCart } = useCart();
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedVariantInModal, setSelectedVariantInModal] = useState<any>(null);
    const [modalQuantity, setModalQuantity] = useState(1);

    const handleAddToCart = (product: any, variant: any, qty: number) => {
        const price = variant ? variant.price : (product.features?.find((f: any) => f.startsWith("Price:"))?.replace("Price: ", "") || "$0.00");
        addToCart({ ...product, price, selectedMg: variant?.tablets }, qty);
        if (selectedProduct) setSelectedProduct(null);
    };

    const handleBuyNow = (product: any, variant: any, qty: number) => {
        const price = variant ? variant.price : (product.features?.find((f: any) => f.startsWith("Price:"))?.replace("Price: ", "") || "$0.00");
        addToCart({ ...product, price, selectedMg: variant?.tablets }, qty);
        router.push("/checkout");
    };

    const openModal = (product: any) => {
        setModalQuantity(1);
        setSelectedProduct(product);
        setSelectedVariantInModal(product.Unit?.[0] || null);
    };

    const displayProducts = catalog.filter((p: any) => [12, 18, 19, 20, 21, 80, 81, 194].includes(p.id));

    return (
        <section id="products" className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs mb-4 uppercase tracking-widest"
                    >
                        Our Best Sellers
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
                    >
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Formulary</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                        Access our top-tier selection of authentic prescription medications and healthcare solutions, shipped directly with uncompromising quality control.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-16">
                    {displayProducts.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            item={product}
                            i={index}
                            onOpenModal={openModal}
                            onAddToCart={handleAddToCart}
                            onBuyNow={handleBuyNow}
                            router={router}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold hover:border-primary dark:hover:border-primary hover:text-primary transition-colors group shadow-sm"
                    >
                        View Full Catalog
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-6 right-6 z-10 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-full md:w-1/2 bg-white relative overflow-hidden group min-h-[300px] md:min-h-[400px]">
                                {selectedProduct.badge && (
                                    <span className="absolute top-8 left-8 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider z-20 shadow-sm">
                                        {selectedProduct.badge}
                                    </span>
                                )}
                                <Image
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    fill
                                    className="object-contain p-12 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col overflow-y-auto">
                                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                                    {Array.isArray(selectedProduct.category) ? selectedProduct.category[0] : selectedProduct.category}
                                </div>
                                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                                    {selectedProduct.name} {selectedVariantInModal ? ` - ${selectedVariantInModal.tablets}` : ''}
                                </h2>

                                <div className="text-3xl font-black text-primary mb-6">
                                    {selectedVariantInModal ? selectedVariantInModal.price : (selectedProduct.features?.find((f: any) => f.startsWith('Price:'))?.replace('Price: ', '') || '$0.00')}
                                </div>

                                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                    {selectedProduct.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                                        Product Options
                                    </h4>

                                    <div className="flex flex-col gap-6">
                                        {selectedProduct.Unit && (
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProduct.Unit.map((v: any) => (
                                                    <button
                                                        key={v.tablets}
                                                        onClick={() => setSelectedVariantInModal(v)}
                                                        className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${selectedVariantInModal?.tablets === v.tablets
                                                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary'
                                                            }`}
                                                    >
                                                        {v.tablets}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-6">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity</span>
                                            <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-700">
                                                <button
                                                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                                                >
                                                    <Minus className="w-5 h-5" />
                                                </button>
                                                <span className="w-12 text-center font-bold text-slate-900 dark:text-white text-xl">
                                                    {modalQuantity}
                                                </span>
                                                <button
                                                    onClick={() => setModalQuantity(modalQuantity + 1)}
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => handleAddToCart(selectedProduct, selectedVariantInModal, modalQuantity)}
                                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-black py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(selectedProduct, selectedVariantInModal, modalQuantity)}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 text-sm"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
