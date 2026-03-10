import ScrollReveal from "@/components/ScrollReveal";

export default function OurStory() {
    return (
        <main className="min-h-screen bg-white">
            <ScrollReveal />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-gray-950 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <div className="grid grid-cols-12 h-full w-full pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-r border-white/10 h-full"></div>
                        ))}
                    </div>
                </div>
                <div className="relative z-10 text-center space-y-4 reveal reveal-up">
                    <span className="text-gold-500 tracking-[0.6em] text-[10px] uppercase font-bold">The Essence</span>
                    <h1 className="text-5xl md:text-8xl font-serif text-white uppercase tracking-tighter">Our Story</h1>
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto space-y-16">
                    <div className="space-y-8 reveal reveal-up">
                        <h2 className="text-3xl md:text-4xl font-serif italic text-center leading-relaxed">
                            "Fragrance is the invisible bridge between the physical world and our deepest emotions."
                        </h2>
                        <div className="w-12 h-px bg-gold-500 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-600 leading-relaxed font-light">
                        <div className="space-y-6 reveal reveal-up">
                            <p>
                                Founded with a passion for the artisanal and the authentic, CN Fragrances began as a quest to Redefine luxury in the world of scents. We believe that a fragrance should not just be worn, but experienced—a silent narrator of one's journey and a companion to one's soul.
                            </p>
                            <p>
                                Every piece in our collection is curated with meticulous attention to detail. We source the finest ingredients from around the sphere, ensuring that each note rings true and every blend tells a unique story of elegance and sophistication.
                            </p>
                        </div>
                        <div className="space-y-6 reveal reveal-up reveal-delay-200">
                            <p>
                                Based in the heart of our vibrant community, we are more than just a boutique. We are a destination for those who seek the extraordinary. Our philosophy is rooted in the belief that true luxury is found in the subtle, the rare, and the masterfully crafted.
                            </p>
                            <p>
                                Join us on this olfactory journey. Discover a collection where tradition meets modernity, and where every scent is an invitation to explore the art of atmosphere.
                            </p>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-gray-100 text-center reveal reveal-up">
                        <span className="text-[10px] font-bold uppercase tracking-widest block mb-6">Explore the Artisanal</span>
                        <div className="flex justify-center gap-8">
                            <div className="text-center">
                                <p className="text-2xl font-serif mb-1">Premium</p>
                                <p className="text-[8px] text-gray-400 uppercase tracking-widest">Ingredients</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-serif mb-1">Artisanal</p>
                                <p className="text-[8px] text-gray-400 uppercase tracking-widest">Curation</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-serif mb-1">Enduring</p>
                                <p className="text-[8px] text-gray-400 uppercase tracking-widest">Impressions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
