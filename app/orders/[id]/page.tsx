import { auth } from "@/auth";
import { prisma } from "@/app/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, Clock, ShieldCheck, Truck, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const { id } = await params;

    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!order) {
        return notFound();
    }

    // Security check: ensure the order belongs to the user (if logged in) or allow if admin (future)
    // For now, if order has a userId and user is logged in, they must match.
    // If order has no userId (guest), anyone with the link can see it (tracking style).
    if (order.userId && (!session || session.user?.id !== order.userId)) {
        return redirect("/account");
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mb-12">
                <Link href="/account" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-black transition-colors group">
                    <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Account
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Order Content */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="space-y-4 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em]">
                                {order.status}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                                Ordered {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-tight">Order Details</h1>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Ref: {order.trackingId}</p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Items Ordered</h2>
                        <div className="space-y-4">
                            {order.orderItems.map((item) => (
                                <div key={item.id} className="flex gap-6 p-4 bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
                                    <div className="relative w-20 h-24 bg-white border border-gray-100 flex-shrink-0">
                                        <Image
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div className="space-y-1">
                                            <h3 className="text-sm font-medium uppercase tracking-widest">{item.product.name}</h3>
                                            <p className="text-[10px] text-gray-400 uppercase font-medium">{item.product.category}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <p className="text-xs text-gray-500 font-light">Quantity: {item.quantity}</p>
                                            <p className="text-sm font-bold tracking-wider">Rs. {item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Summary */}
                <div className="lg:col-span-4 space-y-8">
                    <section className="bg-gray-50 p-8 border border-gray-100 space-y-8">
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-gray-200 pb-4">Shipping To</h3>
                            <div className="space-y-4">
                                <p className="text-sm font-serif leading-relaxed text-gray-900 whitespace-pre-line">
                                    {order.shippingAddress}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-gray-200 pb-4">Payment</h3>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</p>
                                <p className="text-[10px] text-gray-500 uppercase font-medium">To be paid at time of delivery</p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-200 space-y-4">
                            <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                <span>Subtotal</span>
                                <span>Rs. {order.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-serif tracking-widest pt-4 border-t border-gray-200">
                                <span className="uppercase text-sm font-serif">Total</span>
                                <span>Rs. {order.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </section>

                    <div className="p-8 bg-gray-950 text-white space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-500">Need Assistance?</h4>
                        <p className="text-xs font-light italic leading-relaxed opacity-80">
                            Our team is available 24/7 to ensure your experience with CN Fragrances is perfect.
                        </p>
                        <div className="w-8 h-px bg-gold-500"></div>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">WhatsApp: +92-324-2190187</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
