import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For quantity input
import { X, Plus, Minus } from 'lucide-react';

interface CartItemRowProps {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  onRemove: (id: string | number) => void;
  onQuantityChange: (id: string | number, newQuantity: number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onRemove,
  onQuantityChange,
}) => {
  console.log(`Rendering CartItemRow: ${name}, Quantity: ${quantity}`);

  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    } else {
      onRemove(id); // Or onQuantityChange(id, 0) if you handle removal that way
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
        if (newQuantity === 0) {
            onRemove(id);
        } else {
            onQuantityChange(id, newQuantity);
        }
    }
  };


  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 object-cover rounded-md"
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
        />
      )}
      <div className="flex-grow">
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleDecrement} aria-label="Decrease quantity">
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          className="h-7 w-10 text-center px-0"
          aria-label={`Quantity for ${name}`}
          min="0"
        />
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleIncrement} aria-label="Increase quantity">
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="font-semibold text-sm w-16 text-right">
        ${(price * quantity).toFixed(2)}
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(id)} aria-label={`Remove ${name} from cart`}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItemRow;