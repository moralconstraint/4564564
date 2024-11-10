import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Package, Copy, MessageSquare } from 'lucide-react';
import { useTransactions } from '@/lib/transactions';
import { useToast } from '@/components/ui/use-toast';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const transaction = location.state?.transaction;

  useEffect(() => {
    if (!transaction) {
      navigate('/');
    }

    const timer = setTimeout(() => {
      navigate('/account/billing');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate, transaction]);

  if (!transaction) return null;

  const handleCopy = () => {
    if (transaction.type === 'software') {
      navigator.clipboard.writeText(transaction.key);
      toast({
        title: "Copied!",
        description: "License key copied to clipboard",
      });
    } else {
      navigator.clipboard.writeText(transaction.id);
      toast({
        title: "Copied!",
        description: "Order ID copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center backdrop-blur-xl bg-background/30 border-white/10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </motion.div>

          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Your order has been processed successfully.
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-lg bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Order ID:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <code className="text-lg font-mono">{transaction.id}</code>
            </div>

            {transaction.type === 'software' ? (
              <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-background/50">
                <Package className="w-5 h-5 text-primary" />
                <span>Software will be available in downloads</span>
              </div>
            ) : transaction.type === 'subscription' && (
              <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-background/50">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Please create a support ticket to activate your subscription</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/account/billing')} 
              className="w-full bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              View Order Details
            </Button>
            {transaction.type === 'software' ? (
              <Button 
                onClick={() => navigate('/downloads')}
                className="w-full"
              >
                Go to Downloads
              </Button>
            ) : transaction.type === 'subscription' && (
              <Button 
                onClick={() => navigate('/support')}
                className="w-full"
              >
                Create Support Ticket
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            You will be redirected automatically in a few seconds...
          </p>
        </Card>
      </motion.div>
    </div>
  );
}