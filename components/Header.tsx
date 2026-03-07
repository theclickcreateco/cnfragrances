"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, User, ShoppingCart, Music } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
    const totalItems = useCartStore((state) => state.totalItems());
    return (
        <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Left: Social Icons */}
                    <div className="flex items-center space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black transition-colors">
                            {/* TikTok placeholder icon */}
                            <Music className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Center: Logo */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <Link href="/" className="flex items-center">
                            {/* Placeholder logo - will use real image when added */}
                            <div className="relative w-[180px] h-[40px] flex items-center justify-center">
                                {/* <span className="font-serif text-2xl font-bold tracking-widest uppercase">CN Fragrances</span> */}

                                <Image
                                    src="/cn-fragrances-logo.png"
                                    alt="CN Fragrances Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />

                            </div>
                        </Link>
                    </div>

                    {/* Right: Account & Cart Icons */}
                    <div className="flex items-center space-x-6">
                        <Link href="/account" className="text-gray-600 hover:text-black transition-colors flex items-center space-x-2">
                            <User className="w-5 h-5" />
                            <span className="hidden sm:inline text-sm font-medium">Account</span>
                        </Link>
                        <Link href="/checkout" className="relative cursor-pointer text-gray-600 hover:text-black transition-colors flex items-center space-x-2">
                            <ShoppingCart className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
}
