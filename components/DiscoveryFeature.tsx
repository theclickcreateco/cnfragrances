import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

interface Product {
    id: string;
    name: string;
    description: string;
    originalPrice: number;
    discountPrice: number | null;
    category: string;
    imageUrl: string;
    stock: number;
}

export default function DiscoveryFeature({ product }: { product: Product }) {
    if (!product) return null;

    return (
        <section className="py-24 bg-[#fafafa] overflow-hidden border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Left: Image Showcase */}
                    <div className="w-full lg:w-1/2 reveal reveal-left">
                        <div className="relative aspect-[4/5] md:aspect-square group overflow-hidden shadow-2xl">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2 space-y-10 reveal reveal-right">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-gold-500"></span>
                                <span className="text-gold-500 tracking-[0.4em] text-[10px] uppercase font-bold">Limited Edition Release</span>
                            </div>
                            
                            <h2 className="text-5xl md:text-6xl font-serif uppercase tracking-tight leading-[0.9] text-gray-900">
                                The Discovery <br />
                                <span className="text-gray-400 italic">Collector's Set</span>
                            </h2>
                            
                            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-10">
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Investment</span>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-3xl font-bold font-serif">Rs. {(product.discountPrice ?? product.originalPrice).toLocaleString()}</span>
                                    {product.discountPrice && (
                                        <span className="text-gray-400 line-through text-sm">Rs. {product.originalPrice.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="h-12 w-px bg-gray-200"></div>

                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Availability</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-black">
                                    {product.stock > 0 ? `Only ${product.stock} Sets Available` : 'Sold Out'}
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-64 transform hover:-translate-y-1 transition-transform duration-300">
                                <AddToCartButton product={product} />
                            </div>
                            
                            <Link 
                                href={`/product/${product.id}`}
                                className="inline-flex items-center justify-center px-8 py-4 border border-black/10 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500"
                            >
                                Product Details
                            </Link>
                        </div>

                        <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Contents</h4>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed">5 x 5ml Artisan Decants</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Packaging</h4>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed">Magnetic Luxury Closure Box</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
