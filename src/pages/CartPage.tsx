import React, { useState } from 'react';
import CartItemRow from '@/components/CartItemRow';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNavigationShell from '@/components/BottomNavigationShell';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'p1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://placehold.co/100x100/E99497/white?text=Pizza&font=roboto' },
  { id: 'd1', name: 'Coca-Cola', price: 2.50, quantity: 2, imageUrl: 'https://placehold.co/100x100/B9B9B9/white?text=Coke&font=roboto' },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  console.log('CartPage loaded');

  const handleRemoveItem = (id: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    console.log(`Removed item ${id} from cart`);
  };

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      console.log(`Changed quantity of item ${id} to ${newQuantity}`);
    }
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.08; // Example tax rate
  const total = subtotal + deliveryFee + taxes;

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout with cart:", cartItems);
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 sticky top-0 bg-background z-10 shadow-sm flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Your Cart</h1>
      </header>

      <main className="flex-grow p-4 pb-20"> {/* Padding bottom for bottom nav */}
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">Your cart is empty.</p>
            <Button onClick={() => navigate('/')} className="mt-4">Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              {cartItems.map(item => (
                <CartItemRow
                  key={item.id}
                  {...item}
                  onRemove={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <div className="relative flex-grow">
                  <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" disabled={!promoCode}>Apply</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (Est.)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <hr className="my-2"/>
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleProceedToCheckout} disabled={cartItems.length === 0}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>

      <BottomNavigationShell />
    </div>
  );
};

export default CartPage;