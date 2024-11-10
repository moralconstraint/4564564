import { Badge } from '@/components/ui/badge';
import { Crown, Shield, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TierBadgeProps {
  tier: string;
  className?: string;
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  const getTierIcon = () => {
    switch (tier.toLowerCase()) {
      case 'basic':
        return Star;
      case 'vip':
        return Shield;
      case 'gold':
        return Crown;
      default:
        return Star;
    }
  };

  const getTierColor = () => {
    switch (tier.toLowerCase()) {
      case 'basic':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'vip':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'gold':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return '';
    }
  };

  const Icon = getTierIcon();

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'gap-1 uppercase',
        getTierColor(),
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {tier}
    </Badge>
  );
}