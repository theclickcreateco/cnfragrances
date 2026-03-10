"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
    size?: number;
}

export default function StarRating({ rating, onRatingChange, interactive = true, size = 20 }: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={!interactive}
                    className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all duration-200`}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    onClick={() => interactive && onRatingChange?.(star)}
                >
                    <Star
                        size={size}
                        className={`${(hoverRating || rating) >= star
                                ? "fill-gold-500 text-gold-500"
                                : "text-gray-200"
                            } transition-colors duration-200`}
                    />
                </button>
            ))}
        </div>
    );
}
