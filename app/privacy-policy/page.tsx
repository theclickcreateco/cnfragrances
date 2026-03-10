import ScrollReveal from "@/components/ScrollReveal";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6 font-light">
            <ScrollReveal />
            <div className="max-w-3xl mx-auto">
                <div className="mb-20 reveal reveal-up">
                    <span className="text-gray-400 tracking-[0.4em] text-xs uppercase font-medium">Trust</span>
                    <h1 className="text-5xl font-serif uppercase mt-4 mb-4">Privacy Policy</h1>
                    <div className="w-16 h-px bg-black"></div>
                </div>

                <div className="space-y-12 text-sm leading-relaxed reveal reveal-up reveal-delay-200">
                    <p className="italic">Last Updated: March 2024</p>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, place an order, or contact support. This includes your name, phone number, shipping address, and order history.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">How We Use Your Data</h2>
                        <p>Your data is used solely to process orders, facilitate secure logins, and improve your experience on CN Fragrances. We use your phone number for order updates and secure login via SMS/Credentials.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Data Security</h2>
                        <p>We implement industry-standard security measures to protect your personal information. Your password is encrypted using advanced hashing algorithms before being stored in our database.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500">Third-Party Services</h2>
                        <p>We may share essential delivery information with our courier partners. We do not sell your personal data to any third-party marketing agencies.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
