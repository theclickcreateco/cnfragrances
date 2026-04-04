"use client";

import { useState } from "react";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "./Toaster";

interface Product {
    id: string;
    name: string;
    originalPrice: number;
    discountPrice: number | null;
    imageUrl: string;
    category: string;
    stock: number;
}

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isAdding || isAdded || product.stock <= 0) return;

        setIsAdding(true);

        // Simulate a small delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 600));

        addItem({
            id: product.id,
            name: product.name,
            price: product.discountPrice ?? product.originalPrice,
            originalPrice: product.originalPrice,
            discountPrice: product.discountPrice,
            imageUrl: product.imageUrl,
            category: product.category,
        });

        setIsAdding(false);
        setIsAdded(true);
        showToast("Item added to cart", product.name);

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding || isAdded || product.stock <= 0}
            className={`w-full py-4 flex justify-center items-center gap-3 transition-all duration-300 active:scale-95 ${
                isAdded
                    ? "bg-green-600 text-white"
                    : product.stock <= 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-black/90 backdrop-blur-sm text-white hover:bg-black"
            } disabled:cursor-default`}
        >
            {product.stock <= 0 ? (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Out of Stock</span>
            ) : isAdding ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Adding...</span>
                </>
            ) : isAdded ? (
                <>
                    <Check className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Added!</span>
                </>
            ) : (
                <>
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Add to Cart</span>
                </>
            )}
        </button>
    );
}
