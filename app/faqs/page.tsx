import ScrollReveal from "@/components/ScrollReveal";

export default function FAQs() {
    const categories = [
        {
            title: "Shopping & Orders",
            questions: [
                { q: "How do I place an order?", a: "Simply browse our collection, add items to your cart, and proceed to checkout. You can checkout as a guest or create an account for faster future shopping." },
                { q: "What payment methods do you accept?", a: "Currently, we offer Cash on Delivery (COD) as our primary payment method, ensuring a secure and hassle-free transaction for all our customers." },
                { q: "Can I cancel my order?", a: "Orders can be cancelled before they are dispatched. Please contact our support team as soon as possible if you wish to cancel an order." }
            ]
        },
        {
            title: "Shipping & Delivery",
            questions: [
                { q: "How long does shipping take?", a: "Standard delivery typically takes 3-5 business days depending on your location. You will receive a tracking ID once your order is dispatched." },
                { q: "Do you offer free shipping?", a: "Yes, we often offer free shipping promotions on certain order values. Check our homepage for current offers." },
                { q: "Can I track my order?", a: "Absolutely. Once your order is shipped, you can use the 'Track Order' page on our website with your Order ID and Phone number." }
            ]
        },
        {
            title: "Returns & Exchanges",
            questions: [
                { q: "What is your return policy?", a: "We accept returns for unused and unopened products within 7 days of delivery. For more details, please visit our Shipping & Returns policy page." },
                { q: "What if my product arrives damaged?", a: "We take great care in packaging, but if your item arrives damaged, please contact us within 24 hours of delivery with photos, and we will arrange a replacement." }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6 font-light">
            <ScrollReveal />
            <div className="max-w-4xl mx-auto">
                <div className="mb-20 reveal reveal-up">
                    <span className="text-gray-400 tracking-[0.4em] text-xs uppercase font-medium">Assistance</span>
                    <h1 className="text-5xl font-serif uppercase mt-4 mb-4">Frequently Asked Questions</h1>
                    <div className="w-16 h-px bg-black"></div>
                </div>

                <div className="space-y-16">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="reveal reveal-up" style={{ transitionDelay: `${idx * 100}ms` }}>
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gold-500 mb-8 pb-4 border-b border-gray-100">{cat.title}</h2>
                            <div className="space-y-10">
                                {cat.questions.map((item, i) => (
                                    <div key={i} className="space-y-3 group">
                                        <h3 className="text-base font-medium text-gray-900 uppercase tracking-wide group-hover:text-gold-500 transition-colors">
                                            {item.q}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed max-w-2xl italic">
                                            {item.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-gray-50 text-center reveal reveal-up">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Still have questions?</p>
                    <p className="text-lg font-serif mb-8">We're here to help you find your essence.</p>
                    <a href="mailto:support@cnfragrances.com" className="inline-block border border-black px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                        Contact Support
                    </a>
                </div>
            </div>
        </main>
    );
}
