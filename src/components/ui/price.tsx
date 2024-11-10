import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

interface PriceProps {
  amount: number;
  currency?: string;
  className?: string;
  showPrefix?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'destructive';
}

export function Price({
  amount,
  currency = 'USD',
  className = '',
  showPrefix = true,
  size = 'md',
  variant = 'default',
}: PriceProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const variantClasses = {
    default: 'text-foreground',
    success: 'text-green-500',
    destructive: 'text-red-500',
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`font-semibold ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {showPrefix && <span className="text-muted-foreground">$</span>}
      {formatPrice(amount, { currency, minimumFractionDigits: 2 }).replace('$', '')}
    </motion.span>
  );
}