"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
        });
    };

    return (
        <div
            onClick={handleAddToCart}
            className="w-full bg-black/90 backdrop-blur-sm text-white py-4 flex justify-center items-center gap-3 cursor-pointer hover:bg-black transition-colors"
        >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Add to Cart</span>
        </div>
    );
}

