"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingBag, ChevronLeft, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import ScrollReveal from "@/components/ScrollReveal";
import StarRating from "@/components/StarRating";
import ProductReview from "@/components/ProductReview";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [reviewsData, setReviewsData] = useState<any>({ reviews: [], average: 0, total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, reviewsRes] = await Promise.all([
                    fetch(`/api/products/${id}`),
                    fetch(`/api/products/${id}/reviews`)
                ]);

                const pData = await productRes.json();
                const rData = await reviewsRes.json();

                setProduct(pData);
                setReviewsData(rData);
            } catch (error) {
                console.error("Failed to fetch product data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!product || product.error) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6">
            <h1 className="text-2xl font-serif uppercase tracking-widest text-gray-400">Product Not Found</h1>
            <Link href="/catalog" className="text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gold-500 hover:border-gold-500 transition-all">Back to Collection</Link>
        </div>
    );

    // Split ingredients for aesthetic display
    const description = product.description || "";
    const ingredients = description.split('.').filter((s: string) => s.trim().length > 0);
    const ingredientTags = ingredients[0]?.includes(':')
        ? ingredients[0].split(':')[1].split(',').map((s: string) => s.trim())
        : description.split(',').map((s: string) => s.trim());

    return (
        <main className="min-h-screen bg-white pt-32 pb-24">
            <ScrollReveal />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="mb-12 reveal reveal-up">
                    <Link href="/catalog" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-black transition-colors group">
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Collection
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

                    {/* Image & Reviews Section */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 border border-gray-100 group reveal reveal-up">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black shadow-sm border border-gray-100">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        {/* Customer impressions (Reviews list) */}
                        <div className="space-y-10 reveal reveal-up">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Customer Impressions</h3>
                                <div className="flex items-center gap-2">
                                    <StarRating rating={Math.round(reviewsData?.average || 0)} interactive={false} size={12} />
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{(reviewsData?.average ?? 0).toFixed(1)} / 5.0</span>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {(reviewsData?.reviews || []).length > 0 ? (
                                    reviewsData.reviews.map((review: any) => (
                                        <div key={review.id} className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">{review.user.name}</p>
                                                <StarRating rating={review.rating} interactive={false} size={10} />
                                            </div>
                                            {review.comment && (
                                                <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                                                    "{review.comment}"
                                                </p>
                                            )}
                                            <p className="text-[8px] text-gray-400 uppercase tracking-widest">
                                                {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400 italic font-light">No impressions shared yet. Be the first to leave your mark.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6 reveal reveal-up">
                            <div className="flex items-center gap-2">
                                <StarRating rating={Math.round(reviewsData?.average || 0)} interactive={false} size={14} />
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-2">
                                    {(reviewsData?.average ?? 0) > 0 ? `${(reviewsData?.average ?? 0).toFixed(1)} / 5.0` : "New Essence"} ({reviewsData?.total ?? 0})
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-tight leading-tight">{product.name}</h1>
                            <p className="text-2xl font-light text-gray-900 tracking-wide">Rs. {product.price.toLocaleString()}</p>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500 leading-relaxed font-light">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* Ingredients Tag Cloud */}
                        <div className="space-y-6 reveal reveal-up reveal-delay-100">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Key Accords</h3>
                            <div className="flex flex-wrap gap-3">
                                {ingredientTags.map((tag: string, i: number) => (
                                    <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 text-[10px] uppercase tracking-widest font-medium text-gray-600 hover:border-gold-500 hover:text-gold-500 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="space-y-8 pt-8 border-t border-gray-100 reveal reveal-up reveal-delay-200">
                            <div className="space-y-4">
                                <AddToCartButton product={product} />
                            </div>

                            <ProductReview productId={id as string} />

                            {/* Trust Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <ShieldCheck className="w-5 h-5 text-gold-500" />
                                    <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">100% Authentic</span>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <Truck className="w-5 h-5 text-gold-500" />
                                    <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Secure COD</span>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <RotateCcw className="w-5 h-5 text-gold-500" />
                                    <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Easy Returns</span>
                                </div>
                            </div>
                        </div>

                        {/* Experience Description */}
                        <div className="p-8 bg-gray-950 text-white space-y-6 reveal reveal-up reveal-delay-300">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-500">The Experience</h4>
                            <p className="text-sm font-light italic leading-relaxed opacity-80 italic">
                                "{product.name} is more than just a scent; it's a silent narrator of your journey. Crafted with artisanal precision to leave an enduring impression of elegance and mystery."
                            </p>
                            <div className="w-8 h-px bg-gold-500"></div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
