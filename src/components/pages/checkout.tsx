import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/lib/cart';
import { useTransactions } from '@/lib/transactions';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CreditCard as CreditCardIcon, Plus } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const savedCards = [
  {
    id: 1,
    type: 'Visa',
    last4: '4242',
    expiry: '12/24',
    default: true,
  },
];

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

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { addTransaction } = useTransactions();
  const { toast } = useToast();
  const tax = total * 0.03; // Changed to 3%
  const finalTotal = total + tax;
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('saved');
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process each item in the cart
      const transactions = items.map(item => addTransaction(item));
      
      // Clear the cart
      clearCart();
      
      // Navigate to success page with the first transaction
      // (typically there will be one item in cart due to the nature of the products)
      navigate('/payment-success', { 
        state: { transaction: transactions[0] },
        replace: true 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Payment failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="container py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold tracking-tight mb-8"
        >
          Checkout
        </motion.h1>
        
        <form onSubmit={handleSubmit} className="grid gap-8">
          <motion.div variants={itemVariants}>
            <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
              <h3 className="text-lg font-semibold mb-6">Payment Method</h3>
              
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                {savedCards.map(card => (
                  <div key={card.id} className="flex items-center space-x-4 p-4 rounded-lg border border-white/10 bg-background/50">
                    <RadioGroupItem value="saved" id="saved" />
                    <Label htmlFor="saved" className="flex-1 flex items-center gap-4 cursor-pointer">
                      <CreditCardIcon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">
                          {card.type} ending in {card.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {card.expiry}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}

                <div className="flex items-center space-x-4 p-4 rounded-lg border border-white/10 bg-background/50">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="flex-1 flex items-center gap-4 cursor-pointer">
                    <Plus className="h-5 w-5 text-primary" />
                    <span className="font-medium">Use a new card</span>
                  </Label>
                </div>
              </RadioGroup>

              <AnimatePresence mode="wait">
                {paymentMethod === 'new' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 mt-6"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          required 
                          className="bg-background/50 border-white/10"
                          value={newCard.name}
                          onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          required 
                          className="bg-background/50 border-white/10"
                          value={newCard.number}
                          onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="expMonth">Expiration Month</Label>
                        <Input 
                          id="expMonth" 
                          required 
                          className="bg-background/50 border-white/10"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expYear">Expiration Year</Label>
                        <Input 
                          id="expYear" 
                          required 
                          className="bg-background/50 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          required 
                          className="bg-background/50 border-white/10"
                          value={newCard.cvc}
                          onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
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
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Tax (3%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold mt-4">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full mt-6 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Pay $${finalTotal.toFixed(2)}`
                )}
              </Button>
            </Card>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}