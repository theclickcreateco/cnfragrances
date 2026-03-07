import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative w-full h-[85vh] overflow-hidden flex items-center bg-gray-900 border-b border-gray-800">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.png"
                    alt="Luxury Fragrance Collection"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col justify-center h-full">
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="space-y-2">
                        <span className="text-gold-500 tracking-[0.4em] text-xs uppercase font-semibold">Exquisite Artisanal Scents</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white uppercase tracking-tighter leading-none">
                            The Art of <br /> <span className="text-gray-400">Atmosphere</span>
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-lg leading-relaxed">
                        Curated fragrances that transform the ordinary into the extraordinary. Discover your signature essence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                        <Link
                            href="#featured"
                            className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:bg-black hover:text-white"
                        >
                            <span className="relative z-10">Explore Collection</span>
                            <div className="absolute inset-0 h-full w-0 bg-black transition-all group-hover:w-full"></div>
                        </Link>

                        <Link
                            href="/catalog"
                            className="inline-flex items-center justify-center px-10 py-5 border border-white/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative vertical line */}
            <div className="absolute left-8 bottom-0 h-24 w-px bg-white/20 hidden md:block"></div>
        </section>
    );
}
