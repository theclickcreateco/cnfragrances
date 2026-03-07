import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/app/db";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 5,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Featured Products */}
      <section id="featured" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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
            {featuredProducts.map((product: any) => (
              <div key={product.id} className="group relative flex flex-col bg-transparent pb-8 transition-all duration-500">
                {/* Product Image Container */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-50 border border-gray-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
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
                    <Link href={`/product/${product.id}`} className="block group/link">
                      <h3 className="text-base font-medium text-gray-900 group-hover/link:text-gray-500 transition-colors uppercase tracking-wide leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  <p className="text-gray-900 font-semibold text-lg">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aesthetic Spacer / Call to Action */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 h-full w-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-gray-900 h-full"></div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-center space-y-8 px-6">
          <h3 className="text-3xl md:text-5xl font-serif italic text-gray-800 max-w-3xl mx-auto leading-relaxed">
            "Fragrance is the most intense form of memory"
          </h3>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-sm">— Christian Dior</p>
        </div>
      </section>
    </div>
  );
}

