import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/lib/favorites';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case 'undetected':
      return 'text-green-500 border-green-500/20 bg-green-500/10';
    case 'updating':
      return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
    case 'detected':
      return 'text-red-500 border-red-500/20 bg-red-500/10';
    default:
      return '';
  }
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(isFavorite(product.id));

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      removeFavorite(product.id);
      setIsLiked(false);
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites`,
      });
    } else {
      addFavorite(product.id);
      setIsLiked(true);
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites`,
      });
    }
  };

  return (
    <Card 
      className="h-[400px] overflow-hidden transition-all duration-200 hover:shadow-lg backdrop-blur-xl bg-background/30 border-white/10 hover:bg-background/40 group cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="relative mb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hover:text-red-500 transition-colors",
                isLiked && "text-red-500"
              )}
              onClick={handleFavorite}
            >
              <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
            </Button>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "absolute top-0 right-12 gap-1 uppercase",
              getStatusStyles(product.status)
            )}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-current" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
            </span>
            {product.status.toUpperCase()}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {product.category}
              </Badge>
              {!product.noSubscription && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Subscription
                </Badge>
              )}
            </div>
            <span className="text-lg font-bold">
              ${product.price}
              {!product.noSubscription && <span className="text-sm text-muted-foreground">/mo</span>}
            </span>
          </div>

          <Button 
            className="w-full bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}