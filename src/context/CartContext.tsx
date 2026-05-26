"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string | string[];
    selectedMg?: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number, mg?: string) => void;
    updateQuantity: (productId: number, quantity: number, mg?: string) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('medico_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('medico_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product, quantity: number) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id && item.selectedMg === product.selectedMg
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            }

            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: number, mg?: string) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === productId && item.selectedMg === mg)));
    };

    const updateQuantity = (productId: number, quantity: number, mg?: string) => {
        if (quantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                (item.id === productId && item.selectedMg === mg) ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const priceValue = parseFloat(item.price.replace('$', '').replace(',', ''));
            return total + (isNaN(priceValue) ? 0 : priceValue * item.quantity);
        }, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
            cartTotal: getCartTotal(),
            cartCount: getCartCount()
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
