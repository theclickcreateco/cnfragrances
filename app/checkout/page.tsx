"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Lock } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCartStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [trackingId, setTrackingId] = useState("");

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate an elegant, realistic Tracking ID format: CN-YYYYMMDD-XXXX
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
        const newTrackingId = `CN-${date}-${randomChars}`;

        setTrackingId(newTrackingId);
        setOrderPlaced(true);
        clearCart();
    };

    if (!isClient) return null;

    if (orderPlaced) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-32 text-center min-h-[70vh] flex flex-col justify-center">
                <CheckCircle2 className="w-20 h-20 text-black mx-auto mb-8" />
                <h1 className="text-4xl md:text-5xl font-serif mb-4 uppercase tracking-widest">Order Confirmed</h1>
                <p className="text-gray-600 mb-12 text-lg font-light">Thank you for your purchase. Your signature scent is being prepared for shipment.</p>

                <div className="bg-gray-50 border border-gray-200 p-8 mb-12 text-left max-w-lg mx-auto w-full shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-2 font-semibold">Tracking ID</p>
                    <p className="text-3xl font-serif tracking-wider text-black mb-6">{trackingId}</p>

                    <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment Method</p>
                            <p className="font-medium text-gray-900">Cash on Delivery</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</p>
                            <p className="font-medium text-gray-900">Processing</p>
                        </div>
                    </div>
                </div>

                <div>
                    <Link href="/" className="inline-block px-10 py-4 bg-black text-white hover:bg-gray-800 uppercase tracking-widest text-sm transition-colors font-medium">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
                <h1 className="text-3xl font-serif mb-6 uppercase tracking-widest">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't discovered your signature fragrance yet.</p>
                <Link href="/#featured" className="inline-block px-8 py-4 bg-black text-white hover:bg-gray-800 uppercase tracking-widest text-sm transition-colors">
                    Explore Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest mb-12">
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-black font-semibold">Checkout</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif mb-12 uppercase tracking-widest text-center md:text-left">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Form Section */}
                <div className="lg:col-span-7">
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-xl font-serif uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">1. Contact Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
                                    <input type="email" id="email" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors" placeholder="your@email.com" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="newsletter" className="w-4 h-4 text-black border-gray-300 focus:ring-black rounded-sm" />
                                    <label htmlFor="newsletter" className="text-sm text-gray-600">Email me with news and offers</label>
                                </div>
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section>
                            <h2 className="text-xl font-serif uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">2. Shipping Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                                    <input type="text" id="firstName" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                                    <input type="text" id="lastName" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                    <input type="text" id="address" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors" placeholder="Street address or P.O. Box" />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                    <input type="text" id="city" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal code *</label>
                                    <input type="text" id="postalCode" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                    <input type="tel" id="phone" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section>
                            <h2 className="text-xl font-serif uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">3. Payment</h2>
                            <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <input type="radio" id="cod" name="paymentMethod" defaultChecked className="w-4 h-4 text-black focus:ring-black border-gray-300" />
                                        <label htmlFor="cod" className="font-medium text-gray-900">Cash on Delivery (COD)</label>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 ml-7 mt-2">Pay with cash upon delivery. Safe and secure.</p>
                            </div>
                        </section>

                        {/* Mobile submit button (hidden on large screens) */}
                        <div className="block lg:hidden mt-8">
                            <button type="submit" form="checkout-form" className="w-full px-8 py-5 bg-black text-white hover:bg-gray-800 uppercase tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors font-medium flex justify-center items-center space-x-2">
                                <Lock className="w-4 h-4" />
                                <span>Complete Order</span>
                            </button>
                        </div>

                    </form>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-gray-50 border border-gray-200 p-6 sm:p-8 lg:sticky lg:top-28">
                        <h2 className="text-xl font-serif uppercase tracking-widest mb-6">Order Summary</h2>

                        <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-20 h-24 bg-gray-200 flex-shrink-0 border border-gray-200">
                                        <div className="absolute inset-0 flex items-center justify-center text-[8px] text-gray-400 uppercase tracking-widest text-center px-1">
                                            {item.name}
                                        </div>
                                        {/* <Image src={item.image} alt={item.name} fill className="object-cover" /> */}
                                        {/* Item Quantity Badge */}
                                        <div className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex-grow flex flex-col justify-center">
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{item.gender}</p>
                                        <p className="text-sm font-semibold mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-6 space-y-4">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-medium text-gray-900 pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                        </div>

                        <button type="submit" form="checkout-form" className="hidden lg:flex w-full mt-8 px-8 py-5 bg-black text-white hover:bg-gray-800 uppercase tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors font-medium justify-center items-center space-x-2">
                            <Lock className="w-4 h-4" />
                            <span>Complete Order</span>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}
