import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiscountBadgeProps {
  percentage: number;
  className?: string;
}

export function DiscountBadge({ percentage, className }: DiscountBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        'gap-1',
        'bg-red-500/10 text-red-500 border-red-500/20',
        className
      )}
    >
      <Tag className="w-3 h-3" />
      Save {percentage}%
    </Badge>
  );
}