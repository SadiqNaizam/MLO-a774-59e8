import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import OrderTrackerStepper from '@/components/OrderTrackerStepper';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import BottomNavigationShell from '@/components/BottomNavigationShell';
import { ArrowLeft, HelpCircle, Phone } from 'lucide-react';

// Sample order details - in a real app, fetch based on orderId
const sampleOrderData = {
  orderId: "ORD-123456789",
  items: [
    { name: "Margherita Pizza", quantity: 1, price: 12.99 },
    { name: "Coca-Cola", quantity: 2, price: 2.50 },
  ],
  totalAmount: 20.49, // Including tax/delivery
  estimatedDelivery: "4:30 PM - 4:45 PM",
  deliveryAddress: "123 Main St, Anytown, USA",
  statusSequence: ['confirmed', 'preparing', 'out_for_delivery', 'delivered'],
};


const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [currentStatusId, setCurrentStatusId] = useState(sampleOrderData.statusSequence[0]);
  const [progressValue, setProgressValue] = useState(10);

  console.log(`OrderTrackingPage loaded for order ID: ${orderId}`);

  useEffect(() => {
    // Simulate order status updates
    let statusIndex = 0;
    const interval = setInterval(() => {
      statusIndex++;
      if (statusIndex < sampleOrderData.statusSequence.length) {
        setCurrentStatusId(sampleOrderData.statusSequence[statusIndex]);
        setProgressValue( ( (statusIndex + 1) / sampleOrderData.statusSequence.length ) * 100 );
      } else {
        clearInterval(interval);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [orderId]);


  const order = { ...sampleOrderData, orderId: orderId || sampleOrderData.orderId }; // Use URL param if available

  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
       <header className="p-4 sticky top-0 bg-background z-10 shadow-sm flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')} aria-label="Go Home" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Track Order: {order.orderId}</h1>
      </header>

      <main className="flex-grow p-4 pb-20 space-y-6"> {/* Padding bottom for bottom nav */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Estimated Delivery: {order.estimatedDelivery}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <OrderTrackerStepper currentStepId={currentStatusId} />
            <div className="space-y-1">
                <Label htmlFor="order-progress" className="text-sm">Overall Progress</Label>
                <Progress id="order-progress" value={progressValue} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>{totalItems} item(s) totalling ${order.totalAmount.toFixed(2)}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              {order.items.map(item => (
                <li key={item.name} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-2">Delivering to: {order.deliveryAddress}</p>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-2">
                 <Button variant="outline" className="w-full sm:w-auto flex-grow">
                    <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
                </Button>
                <Button variant="outline" className="w-full sm:w-auto flex-grow">
                    <Phone className="mr-2 h-4 w-4" /> Call Restaurant
                </Button>
            </CardContent>
        </Card>
      </main>

      <BottomNavigationShell />
    </div>
  );
};

export default OrderTrackingPage;