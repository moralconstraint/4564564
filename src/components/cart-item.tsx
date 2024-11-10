import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TierBadge } from '@/components/ui/tier-badge';
import { DurationBadge } from '@/components/ui/duration-badge';
import { Price } from '@/components/ui/price';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-background/50"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-md border border-white/10 bg-background/50">
        <span className="text-lg font-medium">
          {item.name.substring(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">{item.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {item.tier && <TierBadge tier={item.tier} />}
          {item.duration && <DurationBadge months={item.duration} />}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <Price amount={item.price * item.quantity} size="lg" />
            {item.duration && (
              <div className="text-sm text-muted-foreground">
                <Price amount={item.price} size="sm" /> / month
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}