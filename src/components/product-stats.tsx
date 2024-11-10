import { Shield, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';

interface ProductStatsProps {
  product: Product;
}

export function ProductStats({ product }: ProductStatsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Badge
        variant={
          product.status === 'undetected'
            ? 'success'
            : product.status === 'updating'
            ? 'warning'
            : 'destructive'
        }
        className="uppercase"
      >
        {product.status}
      </Badge>
      
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className="font-medium">{product.rating}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-primary" />
        <Progress value={product.securityRating * 10} className="w-16" />
        <span className="text-sm font-medium">{product.securityRating}/10</span>
      </div>
    </div>
  );
}