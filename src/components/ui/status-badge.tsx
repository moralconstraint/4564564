import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'undetected' | 'detected' | 'updating';
  animate?: boolean;
  className?: string;
}

export function StatusBadge({ status, animate = true, className }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'undetected':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'updating':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'detected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return '';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "uppercase",
        getStatusStyles(status),
        className
      )}
    >
      {animate && (
        <span className="relative flex h-2 w-2 mr-1">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {status.toUpperCase()}
    </Badge>
  );
}