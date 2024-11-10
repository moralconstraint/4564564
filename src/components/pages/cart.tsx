import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';

const calculateItemPrice = (item: any): number => {
  let price = item.price;
  
  // Apply tier pricing if applicable
  if (item.tier && item.tiers) {
    price = item.tiers[item.tier].price;
  }

  // Apply duration multiplier and discount if applicable
  if (item.duration && item.durations) {
    const durationOption = item.durations.find((d: any) => d.months === item.duration);
    if (durationOption) {
      // Apply duration discount
      price = price * (1 - durationOption.discount);
      // Multiply by number of months
      price = price * item.duration;
    }
  }

  return price;
};

export function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const tax = total * 0.03; // Changed to 3%
  const finalTotal = total + tax;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button asChild className="mt-4">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => {
                    const itemPrice = calculateItemPrice(item);
                    const totalItemPrice = itemPrice * item.quantity;
                    const monthlyPrice = item.duration ? (itemPrice / item.duration).toFixed(2) : itemPrice.toFixed(2);
                    
                    return (
                      <TableRow key={`${item.id}-${item.tier}-${item.duration}`}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-background/50">
                              <span className="text-sm font-medium">
                                {item.name.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{item.name}</h3>
                              <div className="text-sm text-white/60 space-y-1">
                                {item.tier && (
                                  <p className="capitalize">{item.tier} Tier</p>
                                )}
                                {item.duration && (
                                  <div>
                                    <p>{item.duration} Month{item.duration > 1 ? 's' : ''}</p>
                                    <p className="text-xs">${monthlyPrice}/month</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, Math.max(0, item.quantity - 1), item.tier, item.duration)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1, item.tier, item.duration)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">${totalItemPrice.toFixed(2)}</div>
                            {item.duration && (
                              <div className="text-sm text-muted-foreground">
                                ${monthlyPrice}/month × {item.duration} months
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id, item.tier, item.duration)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>
          
          <div>
            <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => {
                  const itemPrice = calculateItemPrice(item);
                  const totalItemPrice = itemPrice * item.quantity;
                  
                  return (
                    <div key={`${item.id}-${item.tier}-${item.duration}`} className="flex justify-between text-sm">
                      <div>
                        <span>{item.name}</span>
                        {item.quantity > 1 && <span className="text-muted-foreground"> × {item.quantity}</span>}
                        {item.duration && (
                          <div className="text-xs text-muted-foreground">
                            {item.duration} months @ ${(itemPrice / item.duration).toFixed(2)}/month
                          </div>
                        )}
                      </div>
                      <span>${totalItemPrice.toFixed(2)}</span>
                    </div>
                  );
                })}
                
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (3%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                asChild 
                className="w-full mt-4 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}