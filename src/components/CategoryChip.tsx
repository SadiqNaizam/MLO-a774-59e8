import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Using Badge as a base for styling

interface CategoryChipProps {
  categoryName: string;
  icon?: React.ReactNode; // Optional icon
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  categoryName,
  icon,
  isActive = false,
  onClick,
  className,
}) => {
  console.log(`Rendering CategoryChip: ${categoryName}, Active: ${isActive}`);
  return (
    <Badge
      variant={isActive ? 'default' : 'outline'}
      className={cn(
        "cursor-pointer flex items-center gap-2 py-2 px-3 rounded-full transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {icon}
      <span className="text-sm font-medium">{categoryName}</span>
    </Badge>
  );
};

export default CategoryChip;