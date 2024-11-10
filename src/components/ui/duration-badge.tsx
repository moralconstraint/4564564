import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { pluralize } from '@/lib/utils';

interface DurationBadgeProps {
  months: number;
  className?: string;
}

export function DurationBadge({ months, className }: DurationBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        'gap-1',
        'bg-green-500/10 text-green-500 border-green-500/20',
        className
      )}
    >
      <Clock className="w-3 h-3" />
      {months} {pluralize(months, 'Month')}
    </Badge>
  );
}