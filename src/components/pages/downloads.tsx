import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTransactions } from '@/lib/transactions';
import { Download, Shield, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function DownloadsPage() {
  const { transactions } = useTransactions();
  const [downloading, setDownloading] = useState<string | null>(null);

  // Filter only software transactions
  const softwareTransactions = transactions.filter(t => t.type === 'software');

  const handleDownload = async (transactionId: string) => {
    setDownloading(transactionId);
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDownloading(null);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container py-8"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Downloads</h1>
          <p className="text-muted-foreground">
            Access and download your purchased software
          </p>
        </div>

        {softwareTransactions.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Downloads Available</h2>
            <p className="text-muted-foreground mb-6">
              You haven't purchased any software products yet.
            </p>
            <Button onClick={() => window.location.href = '/services'}>
              Browse Products
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {softwareTransactions.map((transaction) => (
              <motion.div key={transaction.id} variants={itemVariants}>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{transaction.description}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="capitalize">
                            {transaction.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Order ID: {transaction.id}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDownload(transaction.id)}
                      disabled={downloading === transaction.id}
                      className={cn(
                        "gap-2 bg-primary/50 hover:bg-primary/60 text-white",
                        "shadow-[0_0_20px_rgba(124,58,237,0.3)]",
                        "hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                      )}
                    >
                      <Download className="w-4 h-4" />
                      {downloading === transaction.id ? 'Downloading...' : 'Download'}
                    </Button>
                  </div>
                  <div className="mt-4 p-4 rounded-lg bg-muted/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">License Key</p>
                        <code className="text-xs bg-background/50 p-1 rounded">
                          {transaction.key}
                        </code>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <Badge 
                          variant="outline" 
                          className="bg-green-500/10 text-green-500 border-green-500/20"
                        >
                          ACTIVE
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}