import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react'; // Example icons

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating?: number; // e.g., 4.5
  deliveryTime?: string; // e.g., "25-35 min"
  onClick?: (id: string | number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  onClick,
}) => {
  console.log(`Rendering RestaurantCard: ${name}`);
  return (
    <Card
        className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer"
        onClick={() => onClick?.(id)}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.(id)}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${name}`}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 truncate">
          {cuisineTypes.join(', ')}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-gray-500">
        {rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
        {deliveryTime && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;