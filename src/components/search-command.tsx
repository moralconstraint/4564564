import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useHotkeys } from '@/hooks/use-hotkeys';
import { products } from '@/data/products';
import { Search } from 'lucide-react';
import { DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
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

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useHotkeys('meta+k', () => setOpen(true));
  useHotkeys('ctrl+k', () => setOpen(true));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const navigateToProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      // Check if the product is in 'unlock' or 'software' category and navigate accordingly
      const path = product.category === 'unlock'
        ? `/services/${product.id}`
        : product.category === 'software'
        ? `/services/${product.id}`
        : `/other/${product.id}`; // Fallback category if any other type exists
      window.location.href = path;
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full max-w-sm rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg"
      >
        <div className="flex items-center">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span className="flex-1 text-left">Search products...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        <CommandInput
          placeholder="Search products..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {filteredProducts.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => navigateToProduct(product.id)}
                className="flex items-center justify-between p-2"
              >
                <div className="flex-1">
                  <span className="font-medium">{product.name}</span>
                  <p className="text-sm text-muted-foreground">${product.price}</p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    'uppercase',
                    getStatusStyles(product.status)
                  )}
                >
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-current" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                  </span>
                  {product.status.toUpperCase()}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}