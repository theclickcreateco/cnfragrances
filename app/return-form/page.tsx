import ScrollReveal from "@/components/ScrollReveal";
import { RefreshCw } from "lucide-react";

export default function ReturnForm() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6">
            <ScrollReveal />
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-16 reveal reveal-up">
                    <RefreshCw className="w-8 h-8 mx-auto mb-6 text-gold-500" />
                    <span className="text-gray-400 tracking-[0.4em] text-xs uppercase font-medium">Returns & Exchanges</span>
                    <h1 className="text-4xl md:text-5xl font-serif uppercase mt-4 mb-4">Request Return</h1>
                    <div className="w-12 h-px bg-black mx-auto"></div>
                </div>

                <div className="bg-gray-50 p-8 md:p-12 border border-gray-100 reveal reveal-up reveal-delay-200">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Order ID</label>
                            <input
                                type="text"
                                placeholder="#9901"
                                className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Reason for Return</label>
                            <select className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer">
                                <option>Received wrong item</option>
                                <option>Damaged on arrival</option>
                                <option>Fragrance not as expected</option>
                                <option>Product leaked</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Additional Details</label>
                            <textarea
                                placeholder="Describe the issue..."
                                rows={4}
                                className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                            ></textarea>
                        </div>
                        <button className="w-full bg-black text-white py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gray-800 transition-all">
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
