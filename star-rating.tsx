import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
  size?: number;
}

export function StarRating({
  rating,
  max = 5,
  className = "",
  size = 16,
}: StarRatingProps) {
  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${
            i < rating ? "text-[#4DD0E1] fill-[#4DD0E1]" : "text-gray-300"
          }`}
          size={size}
        />
      ))}
    </div>
  );
}
