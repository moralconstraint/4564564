import { useNavigate } from 'react-router-dom';
import { ProductCard } from '@/components/product-card';
import { products } from '@/data/products';

export function ServicesPage() {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/services/${productId}`);
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>
    </div>
  );
}