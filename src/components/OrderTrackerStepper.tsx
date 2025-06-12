import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, Hourglass, Truck, PackageCheck, CookingPot } from 'lucide-react'; // Example icons

interface Step {
  id: string;
  name: string;
  icon?: React.ElementType;
  description?: string;
}

interface OrderTrackerStepperProps {
  steps: Step[];
  currentStepId: string;
  // Optional: Could add estimated times, etc.
}

const defaultSteps: Step[] = [
    { id: 'confirmed', name: 'Order Confirmed', icon: CheckCircle, description: "We've received your order." },
    { id: 'preparing', name: 'Preparing Food', icon: CookingPot, description: "The kitchen is working on it!" },
    { id: 'out_for_delivery', name: 'Out for Delivery', icon: Truck, description: "Your meal is on its way." },
    { id: 'delivered', name: 'Delivered', icon: PackageCheck, description: "Enjoy your food!" },
];


const OrderTrackerStepper: React.FC<OrderTrackerStepperProps> = ({
  steps = defaultSteps,
  currentStepId,
}) => {
  console.log(`Rendering OrderTrackerStepper, Current Step ID: ${currentStepId}`);
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  return (
    <div className="w-full py-4">
      <div className="flex items-start">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const IconComponent = step.icon || (isCompleted ? CheckCircle : isActive ? Hourglass : Circle);

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    isCompleted ? "bg-green-500 border-green-500 text-white" :
                    isActive ? "bg-blue-500 border-blue-500 text-white animate-pulse" :
                    "bg-gray-100 border-gray-300 text-gray-400"
                  )}
                  aria-label={step.name}
                >
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <p className={cn(
                    "mt-1 text-xs md:text-sm text-center w-20 md:w-24 font-medium",
                    isCompleted ? "text-green-600" :
                    isActive ? "text-blue-600" :
                    "text-gray-500"
                )}>
                    {step.name}
                </p>
                {isActive && step.description && (
                    <p className="text-xs text-blue-500 mt-0.5 text-center w-24 md:w-32">{step.description}</p>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-1 mt-4 md:mt-5", // Adjusted for icon size
                    isCompleted || isActive ? "bg-green-500" : "bg-gray-300"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTrackerStepper;