import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CategoryChip from '@/components/CategoryChip';
import RestaurantCard from '@/components/RestaurantCard';
import BottomNavigationShell from '@/components/BottomNavigationShell';
import { Search, Pizza, Sushi, Salad, Burger } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const placeholderCategories = [
  { name: 'All', icon: <Search className="h-4 w-4" /> },
  { name: 'Pizza', icon: <Pizza className="h-4 w-4" /> },
  { name: 'Sushi', icon: <Sushi className="h-4 w-4" /> },
  { name: 'Salads', icon: <Salad className="h-4 w-4" /> },
  { name: 'Burgers', icon: <Burger className="h-4 w-4" /> },
  { name: 'Italian' },
  { name: 'Mexican' },
  { name: 'Chinese' },
];

const placeholderRestaurants = [
  { id: "1", name: 'Pizza Paradise', imageUrl: 'https://placehold.co/600x400/E99497/white?text=Pizza+Place&font=roboto', cuisineTypes: ['Pizza', 'Italian'], rating: 4.5, deliveryTime: '25-35 min' },
  { id: "2", name: 'Sushi Central', imageUrl: 'https://placehold.co/600x400/AEC6CF/white?text=Sushi+Spot&font=roboto', cuisineTypes: ['Sushi', 'Japanese'], rating: 4.8, deliveryTime: '30-40 min' },
  { id: "3", name: 'Burger Barn', imageUrl: 'https://placehold.co/600x400/FFD3B6/black?text=Burger+Joint&font=roboto', cuisineTypes: ['Burgers', 'American'], rating: 4.2, deliveryTime: '20-30 min' },
  { id: "4", name: 'Healthy Greens', imageUrl: 'https://placehold.co/600x400/C1E1C1/black?text=Salad+Shop&font=roboto', cuisineTypes: ['Salads', 'Healthy'], rating: 4.6, deliveryTime: '15-25 min' },
];

const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  console.log('Homepage loaded');

  const handleRestaurantClick = (id: string | number) => {
    console.log(`Navigating to restaurant with id: ${id}`);
    navigate(`/restaurant/${id}`);
  };

  const filteredRestaurants = placeholderRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisineTypes.some(cuisine => cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 sticky top-0 bg-background z-10 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search restaurants or cuisines..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="flex-grow pb-20"> {/* Padding bottom for bottom nav */}
        <section className="py-4 px-1">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 pb-2 px-3">
              {placeholderCategories.map((category) => (
                <CategoryChip
                  key={category.name}
                  categoryName={category.name}
                  icon={category.icon}
                  isActive={activeCategory === category.name}
                  onClick={() => setActiveCategory(category.name)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section className="px-4 py-2">
          <h2 className="text-xl font-semibold mb-4">Featured Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={handleRestaurantClick}
              />
            ))}
          </div>
          {filteredRestaurants.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No restaurants found matching your search.</p>
          )}
        </section>
      </main>

      <BottomNavigationShell />
    </div>
  );
};

export default Homepage;