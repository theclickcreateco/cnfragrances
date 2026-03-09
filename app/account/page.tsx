import { auth, signOut } from "@/auth";
import Link from "next/link";
import { prisma } from "@/app/db";
import { Package, User, LogOut, ChevronRight, ShoppingBag, Clock, CreditCard } from "lucide-react";
import AuthForms from "@/components/AuthForms";

export default async function AccountPage() {
    const session = await auth();

    if (!session) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 min-h-[80vh] flex flex-col items-center justify-center">
                <div className="text-center space-y-8 max-w-md w-full">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl font-serif uppercase tracking-widest">My Account</h1>
                        <p className="text-gray-500 font-light leading-relaxed">
                            Sign in to view your orders and receive exclusive updates.
                        </p>
                    </div>

                    <AuthForms />

                    <p className="text-[10px] text-gray-400 uppercase tracking-widest pt-8 border-t border-gray-100 w-full">
                        Secure checkout powered by CN Fragrances
                    </p>
                </div>
            </div>
        );
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user?.id },
        orderBy: { createdAt: 'desc' },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div className="space-y-4">
                    <span className="text-gray-400 tracking-[0.2em] text-xs uppercase font-medium">Welcome Back</span>
                    <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-tight">{session.user?.name || 'My Account'}</h1>
                    <div className="w-20 h-0.5 bg-black"></div>
                </div>

                <form action={async () => {
                    "use server"
                    await signOut()
                }}>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
                        <LogOut className="w-3 h-3" />
                        Sign Out
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Profile Overview */}
                <div className="lg:col-span-4 space-y-12">
                    <section className="bg-gray-50 p-8 border border-gray-100">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-gray-200 pb-4">Profile Details</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Full Name</label>
                                <p className="text-sm font-medium">{session.user?.name}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Email Address</label>
                                <p className="text-sm font-medium">{session.user?.email}</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 border border-gray-100">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-gray-200 pb-4">Member Insights</h2>
                        <div className="space-y-4 text-sm text-gray-600 font-light leading-relaxed">
                            <p>You have been a member since {new Date().getFullYear()}. Explore our curated fragrance collections tailored to your olfactory preferences.</p>
                            <Link href="/catalog" className="inline-block text-black font-bold uppercase tracking-widest text-[10px] border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-all">
                                Discover More
                            </Link>
                        </div>
                    </section>
                </div>

                {/* Order History */}
                <div className="lg:col-span-8">
                    <h2 className="text-2xl font-serif uppercase tracking-widest mb-10 pb-4 border-b border-gray-100">Purchase History</h2>

                    {orders.length === 0 ? (
                        <div className="py-20 text-center bg-gray-50 border border-dashed border-gray-200">
                            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-light">Your fragrance journey is just beginning.</p>
                            <Link href="/#featured" className="inline-block mt-6 px-8 py-3 bg-black text-white uppercase tracking-widest text-[10px] font-bold hover:bg-gray-800 transition-all">
                                Shop Collection
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-100 hover:border-gray-200 transition-all">
                                    <div className="bg-gray-50/50 p-6 flex flex-wrap justify-between items-center gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Order ID</p>
                                            <p className="text-xs font-serif font-bold tracking-wider">{order.trackingId}</p>
                                        </div>
                                        <div className="flex gap-8">
                                            <div className="space-y-1">
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Date</p>
                                                <p className="text-xs font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Total</p>
                                                <p className="text-xs font-bold">Rs. {order.totalAmount.toFixed(2)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Status</p>
                                                <span className="inline-block px-2 py-0.5 bg-black text-white text-[9px] font-bold uppercase tracking-widest">
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex -space-x-4 overflow-hidden">
                                            {order.orderItems.map((item) => (
                                                <div key={item.id} className="relative w-12 h-16 border-2 border-white bg-gray-100">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            {order.orderItems.length > 3 && (
                                                <div className="relative w-12 h-16 border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                                                    +{order.orderItems.length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Link href={`/orders/${order.id}`} className="text-[10px] text-gray-400 uppercase tracking-widest font-bold hover:text-black transition-all flex items-center gap-1">
                                                Details <ChevronRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
