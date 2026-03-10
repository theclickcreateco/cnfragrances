import ScrollReveal from "@/components/ScrollReveal";

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6 font-light">
            <ScrollReveal />
            <div className="max-w-3xl mx-auto">
                <div className="mb-20 reveal reveal-up">
                    <span className="text-gray-400 tracking-[0.4em] text-xs uppercase font-medium">Compliance</span>
                    <h1 className="text-5xl font-serif uppercase mt-4 mb-4">Terms of Service</h1>
                    <div className="w-16 h-px bg-black"></div>
                </div>

                <div className="space-y-12 text-sm leading-relaxed reveal reveal-up reveal-delay-200">
                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Agreement to Terms</h2>
                        <p>By accessing or using the CN Fragrances website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Order Acceptance</h2>
                        <p>Order placement does not constitute contract fulfillment. We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspicion of fraudulent activity.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">User Responsibilities</h2>
                        <p>You are responsible for maintaining the confidentiality of your account credentials and for providing accurate shipping and contact information.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Intellectual Property</h2>
                        <p>All content on this site, including imagery, logos, and fragrance descriptions, is the property of CN Fragrances and protected by intellectual property laws.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
