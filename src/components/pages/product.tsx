import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/lib/cart';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';
import {
  Heart,
  Share2,
  ShoppingCart,
  HelpCircle,
  CheckCircle2,
  Loader2,
  ChevronLeft,
} from 'lucide-react';

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

export function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedTier, setSelectedTier] = useState('basic');
  const [selectedDuration, setSelectedDuration] = useState('1');
  const [isFavorited, setIsFavorited] = useState(false);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const calculatePrice = () => {
    let basePrice = product.price;
    
    // Only apply tier and duration pricing for software products
    if (product.category === 'software') {
      // Apply tier pricing if applicable
      if (selectedTier && product.tiers) {
        basePrice = product.tiers[selectedTier].price;
      }
      
      // Apply duration discount and multiply by months
      if (selectedDuration && product.durations) {
        const duration = parseInt(selectedDuration);
        const durationOption = product.durations.find(d => d.months === duration);
        if (durationOption) {
          // Apply duration discount to the base price
          const discountedPrice = basePrice * (1 - durationOption.discount);
          // Multiply by number of months
          return discountedPrice * duration;
        }
      }
    }
    
    return basePrice;
  };

  const handleAddToCart = () => {
    setLoading(true);
    const finalPrice = calculatePrice();
    const duration = product.category === 'software' ? parseInt(selectedDuration) : undefined;
    
    addItem({
      ...product,
      tier: product.category === 'software' ? selectedTier : undefined,
      duration,
      price: duration ? finalPrice / duration : finalPrice, // Store the per-month price for subscription products
    });
    
    setShowSuccessMessage(true);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    setTimeout(() => {
      setShowSuccessMessage(false);
      setLoading(false);
    }, 2000);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Unable to share product.",
        variant: "destructive",
      });
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited 
        ? `${product.name} has been removed from your favorites.`
        : `${product.name} has been added to your favorites.`,
    });
  };

  return (
    <div className="container max-w-7xl py-8">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 backdrop-blur-xl bg-background/30 border-white/10">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "uppercase",
                        getStatusStyles(product.status)
                      )}
                    >
                      <span className="relative flex h-2 w-2 mr-1">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-current" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                      </span>
                      {product.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={cn(
                        "hover:text-red-500",
                        isFavorited && "text-red-500"
                      )}
                      onClick={handleFavorite}
                    >
                      <Heart className="w-5 h-5" fill={isFavorited ? "currentColor" : "none"} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={handleShare}
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">{product.description}</p>
              </div>

              {product.category === 'software' && (
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <Label>Subscription Tier</Label>
                    <Select
                      value={selectedTier}
                      onValueChange={setSelectedTier}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Subscription Length</Label>
                    <Select
                      value={selectedDuration}
                      onValueChange={setSelectedDuration}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Month</SelectItem>
                        <SelectItem value="3">3 Months</SelectItem>
                        <SelectItem value="6">6 Months</SelectItem>
                        <SelectItem value="12">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.platforms.map((platform) => (
                  <Card key={platform} className="p-4 backdrop-blur-xl bg-background/20 border-white/10">
                    <div className="text-center">
                      <h3 className="font-medium capitalize">{platform}</h3>
                      <p className="text-sm text-muted-foreground">Supported</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          {product.features && (
            <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {product.requirements && (
            <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {product.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronLeft className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {product.faq && (
            <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
              <h2 className="text-xl font-semibold mb-4">FAQ</h2>
              <div className="space-y-4">
                {product.faq.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
        
        <div>
          <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-baseline justify-between">
                <div className="space-y-1">
                  <span className="text-4xl font-bold">${calculatePrice().toFixed(2)}</span>
                  {product.category === 'software' && selectedDuration && (
                    <p className="text-sm text-muted-foreground">
                      ${(calculatePrice() / parseInt(selectedDuration)).toFixed(2)} per month
                    </p>
                  )}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {showSuccessMessage ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-500/20 text-green-500"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Added to cart!
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Button 
                      size="lg"
                      className="w-full gap-2 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                      onClick={handleAddToCart}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                      Add to Cart
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>Instant</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updates</span>
                  <span>Lifetime</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Support</span>
                  <span>24/7 Priority</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => navigate('/support')}
                >
                  <HelpCircle className="w-4 h-4" />
                  Need Help?
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}