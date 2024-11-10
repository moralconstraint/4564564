import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { PlatformIcon } from '@/components/platform-icons';
import { cn } from '@/lib/utils';

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

export function ServicesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'unlock' | 'software'>(
    categoryParam === 'unlock' || categoryParam === 'software' ? categoryParam : 'all'
  );

  useEffect(() => {
    if (categoryParam === 'unlock' || categoryParam === 'software') {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const featuredProducts = products.filter(product => 
    product.rating >= 4.8 && product.securityRating >= 9
  ).slice(0, 3);

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Featured Products Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/50 pb-16">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container relative pt-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {selectedCategory === 'all' ? 'Featured Products' : 
               selectedCategory === 'unlock' ? 'Unlock Services' : 
               'Software Solutions'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {selectedCategory === 'all' ? 'Our most popular and highly-rated services' :
               selectedCategory === 'unlock' ? 'Premium unlock services for all platforms' :
               'Professional-grade software solutions'}
            </p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedCategory('all');
                navigate('/services');
              }}
              className="min-w-[100px]"
            >
              All
            </Button>
            <Button
              variant={selectedCategory === 'unlock' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedCategory('unlock');
                navigate('/services?category=unlock');
              }}
              className="min-w-[100px]"
            >
              Unlock
            </Button>
            <Button
              variant={selectedCategory === 'software' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedCategory('software');
                navigate('/services?category=software');
              }}
              className="min-w-[100px]"
            >
              Software
            </Button>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={item}>
                <Card 
                  className="p-6 backdrop-blur-xl bg-background/30 border-white/10 hover:bg-background/40 transition-all cursor-pointer group relative overflow-hidden h-full"
                  onClick={() => navigate(`/services/${product.id}`)}
                >
                  <div className="absolute top-0 right-0 p-2">
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

                  <div className="flex flex-col h-full pt-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <div className="text-lg font-bold">
                        ${product.price}
                        {!product.noSubscription && <span className="text-sm text-muted-foreground">/mo</span>}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between">
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
                      <Button 
                        className="gap-2 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}