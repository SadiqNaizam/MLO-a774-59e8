import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BottomNavigationShell from '@/components/BottomNavigationShell';
import { ArrowLeft, CreditCard, Truck, Wallet } from 'lucide-react';

const formSchema = z.object({
  addressLine1: z.string().min(5, "Address line 1 is required and should be at least 5 characters."),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required."),
  postalCode: z.string().min(5, "Postal code is required.").regex(/^\d{5}$/, "Invalid postal code format."),
  country: z.string().min(2, "Country is required."),
  paymentMethod: z.enum(["card", "cod", "wallet"], {
    required_error: "You need to select a payment method.",
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  savePaymentDetails: z.boolean().default(false).optional(),
  saveAddress: z.boolean().default(false).optional(),
}).refine(data => {
    if (data.paymentMethod === "card") {
        return data.cardNumber && data.cardNumber.length === 16 && data.cardExpiry && data.cardCvc;
    }
    return true;
}, {
    message: "Card details are incomplete.",
    path: ["cardNumber"], // Or a more general path
});


const CheckoutPage = () => {
  const navigate = useNavigate();
  console.log('CheckoutPage loaded');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      country: "USA", // Default country
      paymentMethod: undefined,
      savePaymentDetails: false,
      saveAddress: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Checkout form submitted:", values);
    // Simulate order placement
    const orderId = `ORD-${Date.now()}`;
    console.log(`Order ${orderId} placed successfully.`);
    // In a real app, you would navigate after successful API call
    navigate(`/track-order/${orderId}`);
  }

  const paymentMethod = form.watch("paymentMethod");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 sticky top-0 bg-background z-10 shadow-sm flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Checkout</h1>
      </header>

      <main className="flex-grow p-4 pb-20"> {/* Padding bottom for bottom nav */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5"/> Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl><Input placeholder="Apartment, suite, etc." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                 <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="CAN">Canada</SelectItem>
                          <SelectItem value="MEX">Mexico</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="saveAddress" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none"><FormLabel>Save this address for future orders</FormLabel></div>
                    </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5"/> Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="card" /></FormControl>
                            <FormLabel className="font-normal flex items-center gap-2"><CreditCard className="h-4 w-4"/> Credit/Debit Card</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="cod" /></FormControl>
                            <FormLabel className="font-normal flex items-center gap-2"><Truck className="h-4 w-4"/> Cash on Delivery</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="wallet" /></FormControl>
                            <FormLabel className="font-normal flex items-center gap-2"><Wallet className="h-4 w-4"/> Digital Wallet</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {paymentMethod === 'card' && (
                  <div className="space-y-2 p-3 border rounded-md">
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                            <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cardCvc" render={({ field }) => (
                            <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                  </div>
                )}
                 <FormField control={form.control} name="savePaymentDetails" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={paymentMethod !== 'card'} /></FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Save payment details for future orders</FormLabel>
                            {paymentMethod !== 'card' && <FormDescription className="text-xs">Only available for card payments.</FormDescription>}
                        </div>
                    </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Order Review</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Please review your order details before placing. (Order summary details would go here)</p>
                <p className="text-lg font-semibold mt-2">Total: $XX.XX</p> {/* Placeholder, calculate from cart context in real app */}
              </CardContent>
            </Card>
            
            <Button type="submit" className="w-full" size="lg">Place Order</Button>
          </form>
        </Form>
      </main>

      <BottomNavigationShell />
    </div>
  );
};

export default CheckoutPage;