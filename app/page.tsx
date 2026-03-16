import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import AddToCartButton from "@/components/AddToCartButton";
import ScrollReveal from "@/components/ScrollReveal";
import { prisma } from "@/app/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 5,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollReveal />
      <Hero />

      {/* Featured Products */}
      <section id="featured" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal reveal-up">
            <div className="space-y-4">
              <span className="text-gray-400 tracking-[0.2em] text-xs uppercase font-medium">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tight">Essential Scents</h2>
              <div className="w-20 h-0.5 bg-black"></div>
            </div>
            <Link href="/catalog" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group relative flex flex-col bg-transparent pb-8 transition-all duration-500 reveal reveal-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Product Image Container */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-50 border border-gray-100 hover-lift">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <AddToCartButton product={product} />
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-3 px-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-500 transition-colors uppercase tracking-wide leading-snug">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-gray-900 font-semibold text-lg">Rs. {product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Fragrance Journey Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal reveal-up">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">Philosophy</h2>
            <p className="text-3xl md:text-5xl font-serif max-w-2xl mx-auto leading-tight">The Anatomy of a Signature Scent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -z-10 hidden md:block"></div>

            <div className="space-y-6 text-center reveal reveal-up reveal-delay-100">
              <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                <span className="font-serif text-xl italic">01</span>
              </div>
              <h4 className="text-lg font-bold uppercase tracking-widest">Top Notes</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                The immediate impression. Citrus and herbs that spark the initial attraction, lasting for the first 15 minutes of your journey.
              </p>
            </div>

            <div className="space-y-6 text-center reveal reveal-up reveal-delay-200">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <span className="font-serif text-xl italic">02</span>
              </div>
              <h4 className="text-lg font-bold uppercase tracking-widest">Heart Notes</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                The soul of the fragrance. Floral and spicy essences that define the personality and linger for several hours.
              </p>
            </div>

            <div className="space-y-6 text-center reveal reveal-up reveal-delay-300">
              <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                <span className="font-serif text-xl italic">03</span>
              </div>
              <h4 className="text-lg font-bold uppercase tracking-widest">Base Notes</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                The lasting memory. Rich woods and musks that merge with your skin, providing the deep, enduring foundation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-20 reveal reveal-up">
            <span className="text-gold-500 tracking-[0.4em] text-[10px] uppercase font-bold mb-4">Voices of Elegance</span>
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tight">Client Impressions</h2>
            <div className="w-12 h-px bg-gold-500 mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 border border-white/10 hover:border-white/20 transition-colors bg-white/5 backdrop-blur-sm reveal reveal-up reveal-delay-100">
              <p className="text-lg font-light italic leading-relaxed mb-8 text-gray-300">
                "The complexity of the notes is unlike anything I've found in commercial stores. I've finally found my signature essence that lasts through the entire day."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 font-serif italic text-sm border border-gold-500/30">JS</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest">James S.</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Verified Purchase</p>
                </div>
              </div>
            </div>

            <div className="p-10 border border-white/10 hover:border-white/20 transition-colors bg-white/5 backdrop-blur-sm reveal reveal-up reveal-delay-200">
              <p className="text-lg font-light italic leading-relaxed mb-8 text-gray-300">
                "From the packaging to the fragrance itself, everything about CN Fragrances screams luxury. The customer support was as premium as the products."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 font-serif italic text-sm border border-gold-500/30">EM</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest">Eleanor M.</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aesthetic Spacer / Quote */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full w-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-gray-900 h-full"></div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-center space-y-8 px-6 reveal">
          <h3 className="text-3xl md:text-5xl font-serif italic text-gray-800 max-w-3xl mx-auto leading-relaxed">
            "Fragrance is the most intense form of memory"
          </h3>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-sm">— Christian Dior</p>
        </div>
      </section>
    </div>
  );
}
