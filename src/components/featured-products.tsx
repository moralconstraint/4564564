import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { PlatformIcon } from '@/components/platform-icons';
import { ChevronLeft, ChevronRight, Star, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const featuredProducts = products.filter((product) => 
  product.rating >= 4.8 && product.securityRating >= 9
).slice(0, 3);

const getStatusColor = (status: string) => {
  switch (status) {
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

export function FeaturedProducts() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 3;

  const nextPage = () => {
    setCurrentIndex((prev) =>
      prev + productsPerPage >= featuredProducts.length ? 0 : prev + productsPerPage
    );
  };

  const prevPage = () => {
    setCurrentIndex((prev) =>
      prev - productsPerPage < 0
        ? featuredProducts.length - productsPerPage
        : prev - productsPerPage
    );
  };

  return (
    <section className="container py-16">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
        
        <div className="relative">
          <div className="text-center mb-12">
            <div className="inline-block p-3 rounded-2xl bg-primary/10 backdrop-blur-sm mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular and highly-rated services
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <AnimatePresence mode="wait">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="group relative overflow-hidden backdrop-blur-xl bg-background/30 border-white/10 hover:bg-background/40 transition-all cursor-pointer"
                    onClick={() => navigate(`/services/${product.id}`)}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative p-6">
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "gap-1",
                            getStatusColor(product.status)
                          )}
                        >
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-current" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                          </span>
                          {product.status}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{product.rating}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <span className="font-medium">{product.securityRating}/10</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex gap-2">
                            {product.platforms.map((platform) => (
                              <div
                                key={platform}
                                className="w-8 h-8 rounded-md bg-background/50 flex items-center justify-center"
                              >
                                <PlatformIcon platform={platform} />
                              </div>
                            ))}
                          </div>
                          <span className="text-xl font-bold">${product.price}</span>
                        </div>

                        <Button 
                          className="w-full mt-4 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] group-hover:translate-y-0 translate-y-1 transition-transform"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}