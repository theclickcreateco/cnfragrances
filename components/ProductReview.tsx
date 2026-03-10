"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { Loader2, CheckCircle } from "lucide-react";

interface ProductReviewProps {
    productId: string;
}

export default function ProductReview({ productId }: ProductReviewProps) {
    const { data: session } = useSession();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch(`/api/products/${productId}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating, comment }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
            } else {
                setError(data.error || "Failed to submit review");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!session) {
        return (
            <div className="p-8 bg-gray-50 border border-gray-100 text-center">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">Join the Conversation</p>
                <p className="text-sm font-light text-gray-600 mb-6">Please sign in to share your impression of this fragrance.</p>
                <a href="/account" className="inline-block border border-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    Sign In
                </a>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="p-8 bg-gray-50 border border-gray-100 text-center animate-reveal">
                <CheckCircle className="w-8 h-8 text-gold-500 mx-auto mb-4" />
                <p className="text-sm font-serif italic mb-2">Thank you for your feedback.</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Your impression has been shared.</p>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 border border-gray-100">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Share Your Impression</h4>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Rating</p>
                    <StarRating rating={rating} onRatingChange={setRating} size={24} />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Comment (Optional)</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                        placeholder="Share your thoughts on the notes and longevity..."
                        rows={3}
                    />
                </div>

                {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{error}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 disabled:bg-gray-400 transition-all flex justify-center items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Processing
                        </>
                    ) : (
                        "Submit Impression"
                    )}
                </button>
            </form>
        </div>
    );
}
