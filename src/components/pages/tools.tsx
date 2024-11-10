import { ProductCard } from '@/components/product-card';
import { products } from '@/data/products';

export function ToolsPage() {
  const advancedTools = products.filter(
    (product) => product.category === 'advanced'
  );

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Tools</h1>
        <p className="text-muted-foreground">
          Professional-grade tools for advanced users.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {advancedTools.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}