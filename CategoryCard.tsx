import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const CategoryCard = ({
  title,
  description,
  imageUrl,
  link,
}: CategoryCardProps) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md">
      <img
        src={imageUrl}
        alt={`${title} Collection`}
        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#424242] to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-montserrat font-bold text-2xl text-white mb-2">
          {title}
        </h3>
        <p className="text-white text-opacity-90 mb-4">{description}</p>
        <Link href={link}>
          <Button className="bg-white text-[#424242] hover:bg-[#4DD0E1] hover:text-white">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
