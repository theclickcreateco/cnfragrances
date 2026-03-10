import ScrollReveal from "@/components/ScrollReveal";
import { Package, Search } from "lucide-react";

export default function TrackOrder() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6">
            <ScrollReveal />
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-16 reveal reveal-up">
                    <Package className="w-8 h-8 mx-auto mb-6 text-gold-500" />
                    <span className="text-gray-400 tracking-[0.4em] text-xs uppercase font-medium">Order Status</span>
                    <h1 className="text-4xl md:text-5xl font-serif uppercase mt-4 mb-4">Track Your Journey</h1>
                    <div className="w-12 h-px bg-black mx-auto"></div>
                </div>

                <div className="bg-gray-50 p-8 md:p-12 border border-gray-100 reveal reveal-up reveal-delay-200">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Order ID</label>
                            <input
                                type="text"
                                placeholder="e.g. #9901"
                                className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Enter mobile number"
                                className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                            />
                        </div>
                        <button className="w-full bg-black text-white py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gray-800 transition-all flex justify-center items-center gap-2">
                            <Search className="w-3 h-3" />
                            Track Order
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center text-xs text-gray-400 reveal reveal-up reveal-delay-300">
                    <p>Enter the Order ID from your confirmation text to see the current status of your delivery.</p>
                </div>
            </div>
        </main>
    );
}
