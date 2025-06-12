import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom
import { Home, ShoppingCart, User, Compass, ListOrdered } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/explore', label: 'Explore', icon: Compass }, // Example, adjust as per your app
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/orders', label: 'Orders', icon: ListOrdered },
  { path: '/account', label: 'Account', icon: User },
];

const BottomNavigationShell: React.FC = () => {
  const location = useLocation();
  console.log("Rendering BottomNavigationShell, current path:", location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-t-lg z-50 md:hidden"> {/* Hide on medium screens and up */}
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors p-1",
                isActive && "text-primary"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={cn("w-6 h-6 mb-0.5", isActive ? "fill-primary stroke-primary-foreground" : "")} strokeWidth={isActive ? 2.5 : 2}/>
              <span className={cn("text-xs", isActive && "font-semibold")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigationShell;