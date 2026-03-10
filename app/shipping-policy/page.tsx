import ScrollReveal from "@/components/ScrollReveal";

export default function ShippingPolicy() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6 font-light">
            <ScrollReveal />
            <div className="max-w-3xl mx-auto prose prose-gray">
                <div className="mb-20 reveal reveal-up">
                    <span className="text-gray-400 tracking-[0.4em] text-xs uppercase font-medium">Logistics</span>
                    <h1 className="text-5xl font-serif uppercase mt-4 mb-4">Shipping & Returns</h1>
                    <div className="w-16 h-px bg-black"></div>
                </div>

                <div className="space-y-12 text-sm leading-relaxed reveal reveal-up reveal-delay-200">
                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Domestic Shipping</h2>
                        <p>We provide nationwide shipping across Pakistan. All orders are processed within 1-2 business days. Standard delivery typically takes 3-5 business days.</p>
                        <p>Orders are shipped primarily via recognized courier services ensuring safe handling of glass bottles and artisanal liquids.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Shipping Rates</h2>
                        <ul className="list-none space-y-2 p-0">
                            <li>• Standard Shipping: Rs. 250</li>
                            <li>• Free Shipping: Available for orders above Rs. 5000</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Return & Exchange Policy</h2>
                        <p>Due to the artisanal nature of our fragrances and hygiene safety, we can only accept returns on items that are unopened, unused, and in their original plastic wrapping.</p>
                        <p>Returns must be initiated within 7 days of delivery. If you receive a damaged or incorrect item, please notify us within 24 hours of receipt for an immediate replacement.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">International Shipping</h2>
                        <p>Currently, CN Fragrances only ships within Pakistan. We are exploring international shipping options and hope to share our essences globally in the near future.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
