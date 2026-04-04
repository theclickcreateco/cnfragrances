"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, User, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';

export default function MobileMenu() {
    const pathname = usePathname();
    const totalItems = useCartStore((state) => state.totalItems());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Catalog', href: '/catalog', icon: Grid },
        { name: 'Account', href: '/account', icon: User },
        { name: 'Cart', href: '/checkout', icon: ShoppingCart, badge: totalItems > 0 ? totalItems : null },
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
            {/* Added a subtle glow effect behind the menu */}
            <div className="absolute inset-0 bg-black/20 blur-xl rounded-full"></div>
            
            <nav className="relative flex justify-between items-center bg-black/95 backdrop-blur-xl px-8 py-4 rounded-full shadow-2xl border border-white/10">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                                isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            <div className="relative">
                                <Icon className="w-5 h-5 transition-transform duration-300 hover:scale-110" strokeWidth={isActive ? 2.5 : 2} />
                                {mounted && item.badge !== null && item.badge !== undefined && (
                                    <span className="absolute -top-2 -right-2.5 bg-white text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            {isActive && (
                                <span className="absolute -bottom-3 w-1 h-1 bg-white rounded-full"></span>
                            )}
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
