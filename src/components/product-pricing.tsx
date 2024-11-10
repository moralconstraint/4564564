import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/ui/use-toast';

interface ProductPricingProps {
  product: Product;
}

export function ProductPricing({ product }: ProductPricingProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    setLoading(false);
  };

  return (
    <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-3xl font-bold">${product.price}</p>
          {!product.noSubscription && (
            <p className="text-sm text-white/60">per month</p>
          )}
        </div>
        <Button 
          size="lg" 
          className="gap-2 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]" 
          onClick={handleAddToCart}
          disabled={loading}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Delivery</span>
          <span>Instant</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Updates</span>
          <span>Lifetime</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Support</span>
          <span>24/7 Priority</span>
        </div>
      </div>
    </Card>
  );
}