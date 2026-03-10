"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, User, ShoppingCart, Music } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
    const totalItems = useCartStore((state) => state.totalItems());
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-0"
            : "bg-transparent border-transparent py-2"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="relative w-[150px] h-[35px] flex items-center">
                                <Image
                                    src="/cn-fragrances-logo.png"
                                    alt="CN Fragrances Logo"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Center: Primary Navigation */}
                    <nav className="hidden md:flex items-center justify-center space-x-12">
                        <Link href="/catalog" className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-500 hover:text-black transition-all hover:tracking-[0.5em]">
                            The Collection
                        </Link>
                    </nav>

                    {/* Right: Social & Functional Icons */}
                    <div className="flex items-center space-x-5 sm:space-x-8">
                        {/* Social */}
                        <div className="hidden sm:flex items-center space-x-5 mr-4 border-r border-gray-100 pr-8">
                            <a href="https://www.facebook.com/cnfragrancesfb" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/cn.fragrance" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Account & Cart */}
                        <div className="flex items-center space-x-5 sm:space-x-8">
                            <Link href="/account" className="text-gray-400 hover:text-black transition-colors" title="My Account">
                                <User className="w-5 h-5" />
                            </Link>
                            <Link href="/checkout" className="relative cursor-pointer text-gray-400 hover:text-black transition-colors" title="Shopping Cart">
                                <ShoppingCart className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}
