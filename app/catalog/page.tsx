import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/app/db";
import AddToCartButton from "@/components/AddToCartButton";
import ScrollReveal from "@/components/ScrollReveal";

export default async function CatalogPage() {
    const products = await prisma.product.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div className="min-h-screen bg-white pt-32 pb-24">
            <ScrollReveal />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-16 reveal reveal-up">
                    <span className="text-gray-400 tracking-[0.4em] text-xs uppercase font-medium">Complete Collection</span>
                    <h1 className="text-5xl md:text-7xl font-serif uppercase mt-4 mb-8">All Fragrances</h1>
                    <div className="w-24 h-px bg-black"></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="group flex flex-col reveal reveal-up"
                            style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                        >
                            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-50 border border-gray-100 hover-lift">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                                    <AddToCartButton product={product} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Link href={`/product/${product.id}`} className="block">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 group-hover:text-gray-500 transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-gray-600 font-medium tracking-wide">Rs. {product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200">
                        <p className="text-gray-400 uppercase tracking-widest text-xs">No products found in the collection.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
