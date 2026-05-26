"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle2, X, Plus, Minus, ShoppingCart, Zap, Search, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useCart } from "@/context/CartContext";

import { catalog, CATEGORIES } from '@/lib/catalog';


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
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col"
        >
            {/* Product Image Area */}
            <div className="relative aspect-square p-4 sm:p-6 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 overflow-hidden">
                {item.badge && (
                    <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider z-10">
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
            <div className="p-3 sm:p-5 flex flex-col flex-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1 leading-tight text-center line-clamp-1">
                    {item.name} {selectedVariant ? ` - ${selectedVariant.tablets}` : ''}
                </h3>
                <div className="text-lg sm:text-xl font-black text-primary mb-3 text-center">
                    {getPrice()}
                </div>

                {/* Desktop/Tablet View Layout */}
                {item.Unit && item.Unit.length > 0 && (
                    <div className="mb-3 hidden md:block">
                        <select
                            value={selectedVariant?.tablets}
                            onChange={(e) => setSelectedVariant(item.Unit.find((v: any) => v.tablets === e.target.value))}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {item.Unit.map((v: any) => (
                                <option key={v.tablets} value={v.tablets}>{v.tablets}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Desktop/Tablet Actions & Quantity Row */}
                <div className="hidden md:flex items-center gap-2 mt-auto">
                    {/* Quantity Selector - Compact */}
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 h-9">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-[10px] font-bold text-slate-900 dark:text-white">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    <button
                        onClick={() => onAddToCart(item, selectedVariant, quantity)}
                        className="w-9 h-9 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => onBuyNow(item, selectedVariant, quantity)}
                        className="flex-1 h-9 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg flex items-center justify-center gap-1 text-[10px] sm:text-xs transition-all shadow-sm"
                    >
                        <Zap className="w-3 h-3" /> BUY
                    </button>
                    <button
                        onClick={() => onOpenModal(item)}
                        className="w-9 h-9 shrink-0 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-colors"
                        title="Quick View"
                    >
                        <Eye className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Mobile View Layout (Stays clean & fits nicely inside small grid columns) */}
                <div className="flex flex-col gap-2 mt-auto md:hidden w-full">
                    {/* Item Unit Dropdown (only if variants exist) */}
                    {item.Unit && item.Unit.length > 0 && (
                        <div className="w-full">
                            <select
                                value={selectedVariant?.tablets}
                                onChange={(e) => setSelectedVariant(item.Unit.find((v: any) => v.tablets === e.target.value))}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 text-center"
                            >
                                {item.Unit.map((v: any) => (
                                    <option key={v.tablets} value={v.tablets}>{v.tablets}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Quantity Selector (Centered / Balanced) */}
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 h-9 w-full">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors active:scale-90"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors active:scale-90"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    {/* 3 Buttons Side by Side: Cart, Buy, Eye */}
                    <div className="grid grid-cols-3 gap-1.5 w-full">
                        <button
                            onClick={() => onAddToCart(item, selectedVariant, quantity)}
                            className="h-9 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                            title="Add to Cart"
                        >
                            <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => onBuyNow(item, selectedVariant, quantity)}
                            className="h-9 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg flex items-center justify-center text-[10px] uppercase transition-all shadow-sm active:scale-95"
                        >
                            BUY
                        </button>
                        <button
                            onClick={() => onOpenModal(item)}
                            className="h-9 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-colors active:scale-95"
                            title="Quick View"
                        >
                            <Eye className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProductsContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    useEffect(() => {
        if (searchParams.get('category')) {
            setSelectedCategory(searchParams.get('category') as string);
        }
    }, [searchParams]);

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedVariantInModal, setSelectedVariantInModal] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [sortBy, setSortBy] = useState('Most Recent');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useCart();
    const router = useRouter();

    const extractPrice = (item: any): number => {
        if (item.Unit && item.Unit.length > 0) {
            return parseFloat(item.Unit[0].price.replace(/[^0-9.]/g, '')) || 0;
        }
        const pf = item.features?.find((f: string) => typeof f === 'string' && f.startsWith('Price:'));
        if (!pf) return 0;
        return parseFloat(pf.replace('Price: ', '').replace(/[^0-9.]/g, '')) || 0;
    };

    const filteredProducts = catalog
        .filter(item => {
            const matchesCategory = selectedCategory === 'All' ||
                (Array.isArray(item.category) && (item.category as string[]).includes(selectedCategory));
            const searchLower = searchQuery.toLowerCase();
            const matchesName = item.name.toLowerCase().includes(searchLower);
            const matchesCategorySearch = Array.isArray(item.category) &&
                item.category.some(cat => cat.toLowerCase().includes(searchLower));
            // Check variant prices or normal price
            let priceString = '';
            if (item.Unit) {
                priceString = item.Unit.map((v: any) => v.price).join(' ');
            } else {
                const priceFeature = item.features?.find((f: string) => typeof f === 'string' && f.startsWith('Price:'));
                priceString = priceFeature ? priceFeature.replace('Price: ', '') : '';
            }
            const matchesPrice = priceString.toLowerCase().includes(searchLower);

            return matchesCategory && (matchesName || matchesCategorySearch || matchesPrice);
        })
        .slice()
        .sort((a, b) => {
            if (sortBy === 'Price: Low to High') return extractPrice(a) - extractPrice(b);
            if (sortBy === 'Price: High to Low') return extractPrice(b) - extractPrice(a);
            if (sortBy === 'Name: A to Z') return a.name.localeCompare(b.name);
            return 0;
        });

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
        setQuantity(1);
        setSelectedProduct(product);
        setSelectedVariantInModal(product.Unit?.[0] || null);
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <div className="mb-10">
                    <nav className="flex text-sm text-slate-500 mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="mx-2">›</span>
                        <span className="text-slate-900 dark:text-white font-medium">Products</span>
                    </nav>

                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Medical Solutions Catalog
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">
                        Explore our comprehensive range of high-quality pharmaceutical and medical solutions designed for modern healthcare precision and excellence.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
                    <aside className="w-full lg:w-1/5 shrink-0">
                        <div className="lg:hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-sm overflow-x-auto scrollbar-hide">
                            <div className="flex items-center gap-1 min-w-max">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                                Categories
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {CATEGORIES.map((cat) => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat
                                                ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div className="w-full lg:w-4/5 flex-1 flex flex-col">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 sm:p-4 mb-3 sm:mb-8 mt-3 lg:mt-0 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium shrink-0">
                                    Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> results
                                </div>

                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white outline-none ring-1 ring-slate-200 dark:ring-slate-700 transition-all"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 w-full md:w-auto justify-end">
                                <span className="shrink-0">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-slate-50 dark:bg-slate-800 border-none rounded-md px-2 py-1 sm:px-3 sm:py-1.5 focus:ring-0 cursor-pointer font-medium text-slate-900 dark:text-white outline-none ring-1 ring-slate-200 dark:ring-slate-700 text-xs sm:text-sm">
                                    <option>Most Recent</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Name: A to Z</option>
                                </select>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-12">
                                {filteredProducts.map((item, i) => (
                                    <ProductCard
                                        key={item.id}
                                        item={item}
                                        i={i}
                                        onOpenModal={openModal}
                                        onAddToCart={handleAddToCart}
                                        onBuyNow={handleBuyNow}
                                        router={router}
                                    />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm mb-12"
                            >
                                <div className="bg-primary/10 p-6 rounded-full mb-6">
                                    <SearchX className="w-12 h-12 text-primary opacity-50" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Medicines Found</h3>
                                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
                                    We couldn't find any medicines matching your search or selected category. Try adjusting your filters or search terms.
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 active:scale-95"
                                >
                                    Clear All Filters
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
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
                            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-full md:w-1/2 bg-white relative overflow-hidden group min-h-[300px] md:min-h-[400px]">
                                {selectedProduct.badge && (
                                    <span className="absolute top-6 left-6 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-20 shadow-sm">
                                        {selectedProduct.badge}
                                    </span>
                                )}
                                <Image
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    fill
                                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-4 sm:p-8 md:p-10 flex flex-col overflow-y-auto">
                                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                                    {selectedProduct.category ? (typeof selectedProduct.category === 'string' ? selectedProduct.category : selectedProduct.category.join(", ")) : ""}
                                </div>
                                <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2 sm:mb-4 leading-tight">
                                    {selectedProduct.name} {selectedVariantInModal ? ` - ${selectedVariantInModal.tablets}` : ''}
                                </h2>
                                <div className="text-2xl sm:text-3xl font-black text-primary mb-4 sm:mb-6">
                                    {selectedVariantInModal ? selectedVariantInModal.price : (selectedProduct.features?.find((f: any) => f.startsWith('Price:'))?.replace('Price: ', '') || '$0.00')}
                                </div>

                                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-8 leading-relaxed">
                                    {selectedProduct.description}
                                </p>

                                <div className="mb-4 sm:mb-8">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                                        Product Options
                                    </h4>
                                    <div className="flex flex-col gap-4">
                                        {selectedProduct.Unit && (
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProduct.Unit.map((v: any) => (
                                                    <button
                                                        key={v.tablets}
                                                        onClick={() => setSelectedVariantInModal(v)}
                                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedVariantInModal?.tablets === v.tablets
                                                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary'
                                                            }`}
                                                    >
                                                        {v.tablets}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity</span>
                                            <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-10 h-10 rounded-md flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-bold text-slate-900 dark:text-white text-lg">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-10 h-10 rounded-md flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-3 sm:pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <button
                                        onClick={() => handleAddToCart(selectedProduct, selectedVariantInModal, quantity)}
                                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(selectedProduct, selectedVariantInModal, quantity)}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 flex justify-center text-slate-500">
                Loading products...
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
