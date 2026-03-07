"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    gender: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    return (
        <div
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/80 backdrop-blur-sm text-white py-3 flex justify-center items-center gap-2 cursor-pointer"
        >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-widest">Add to Cart</span>
        </div>
    );
}
