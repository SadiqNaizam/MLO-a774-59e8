import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import MenuItemCard from '@/components/MenuItemCard';
import BottomNavigationShell from '@/components/BottomNavigationShell';
import { ChevronDown, Star, Utensils, Bike, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox'; // For customization dialog

// Sample data - in a real app, this would come from an API based on restaurantId
const restaurantDetailsData: { [key: string]: any } = {
  "1": {
    name: 'Pizza Paradise',
    logoUrl: 'https://placehold.co/100x100/E99497/white?text=PP&font=roboto',
    cuisine: 'Italian, Pizza',
    rating: 4.5,
    deliveryTime: '25-35 min',
    menu: {
      'Appetizers': [
        { id: 'a1', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 5.99, imageUrl: 'https://placehold.co/300x200/FDEBD0/black?text=Garlic+Bread&font=roboto' },
      ],
      'Pizzas': [
        { id: 'p1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://placehold.co/300x200/E99497/white?text=Margherita&font=roboto', isCustomizable: true },
        { id: 'p2', name: 'Pepperoni Pizza', description: 'Pizza with generous pepperoni topping.', price: 14.99, imageUrl: 'https://placehold.co/300x200/F3E5AB/black?text=Pepperoni&font=roboto', isCustomizable: true },
      ],
      'Drinks': [
        { id: 'd1', name: 'Coca-Cola', description: 'Refreshing classic Coke.', price: 2.50, imageUrl: 'https://placehold.co/300x200/B9B9B9/white?text=Coke&font=roboto' },
      ],
    }
  },
  // Add more restaurant details as needed
};

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isCustomizable?: boolean;
}

interface CustomizationOption {
  id: string;
  label: string;
  priceChange?: number; // e.g., +1.00
}

const RestaurantMenuPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [currentItemForCustomization, setCurrentItemForCustomization] = useState<MenuItem | null>(null);
  const [customizationOtp, setCustomizationOtp] = useState('');

  console.log(`RestaurantMenuPage loaded for restaurant ID: ${id}`);

  const restaurant = id ? restaurantDetailsData[id] : null;

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl">Restaurant not found.</p>
        <Button onClick={() => navigate('/')} className="mt-4">Go Home</Button>
        <BottomNavigationShell />
      </div>
    );
  }

  const handleAddToCart = (itemId: string | number) => {
    console.log(`Added item ${itemId} to cart (basic)`);
    // Add to cart logic here - e.g., update global state / local storage
    // For now, just a log
  };

  const handleOpenCustomizeDialog = (itemId: string | number) => {
    const itemToCustomize = Object.values(restaurant.menu).flat().find(item => item.id === itemId) as MenuItem | undefined;
    if (itemToCustomize) {
      setCurrentItemForCustomization(itemToCustomize);
      setIsCustomizationDialogOpen(true);
    }
  };
  
  const placeholderCustomizationOptions: CustomizationOption[] = [
    { id: 'extra-cheese', label: 'Extra Cheese', priceChange: 1.50 },
    { id: 'gluten-free-crust', label: 'Gluten-Free Crust', priceChange: 2.00 },
    { id: 'no-onions', label: 'No Onions' },
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 sticky top-0 bg-background z-10 shadow-sm flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
          <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Utensils className="h-3.5 w-3.5" /> {restaurant.cuisine}
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 pb-20 space-y-6">
        <div className="flex justify-around text-sm text-muted-foreground bg-secondary p-2 rounded-md">
            <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {restaurant.rating} Rating</div>
            <div className="flex items-center gap-1"><Bike className="h-4 w-4" /> {restaurant.deliveryTime}</div>
        </div>

        {Object.entries(restaurant.menu).map(([category, items]) => (
          <Collapsible key={category} defaultOpen className="border-b last:border-b-0">
            <CollapsibleTrigger className="flex justify-between items-center w-full py-3 text-lg font-medium">
              {category} <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4 space-y-3">
              {(items as MenuItem[]).map((item) => (
                <MenuItemCard
                  key={item.id}
                  {...item}
                  onAddToCart={handleAddToCart}
                  onCustomize={item.isCustomizable ? handleOpenCustomizeDialog : undefined}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </main>

      <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize {currentItemForCustomization?.name}</DialogTitle>
            <DialogDescription>
              Make this item just the way you like it.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <Label>Options:</Label>
            {placeholderCustomizationOptions.map(opt => (
                <div key={opt.id} className="flex items-center space-x-2">
                    <Checkbox id={`customize-${opt.id}`} />
                    <label
                        htmlFor={`customize-${opt.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {opt.label} {opt.priceChange ? `(+$${opt.priceChange.toFixed(2)})` : ''}
                    </label>
                </div>
            ))}

            <Label htmlFor="otp-custom" className="mt-4 block">Special Option Code (if any):</Label>
            <InputOTP id="otp-custom" maxLength={6} value={customizationOtp} onChange={setCustomizationOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-muted-foreground">Enter a 6-digit code if applicable for this item.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizationDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              console.log("Customized item with OTP:", customizationOtp, "and selected options.");
              // Add logic for adding customized item to cart
              setIsCustomizationDialogOpen(false);
              setCustomizationOtp('');
            }}>
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNavigationShell />
    </div>
  );
};

export default RestaurantMenuPage;