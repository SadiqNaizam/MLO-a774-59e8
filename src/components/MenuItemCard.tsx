import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string | number) => void;
  onCustomize?: (id: string | number) => void; // For items needing customization
  isCustomizable?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  onCustomize,
  isCustomizable = false,
}) => {
  console.log(`Rendering MenuItemCard: ${name}`);

  const handleActionClick = () => {
    if (isCustomizable && onCustomize) {
      onCustomize(id);
    } else {
      onAddToCart(id);
    }
  };

  return (
    <Card className="w-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-md">
      {imageUrl && (
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
            />
          </AspectRatio>
        </CardHeader>
      )}
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-md font-semibold mb-1">{name}</CardTitle>
        {description && <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
        <Button variant="outline" size="sm" onClick={handleActionClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {isCustomizable ? 'Customize' : 'Add'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;