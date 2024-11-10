import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Zap, Shield, Crown, Gamepad } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'basic-plan',
    name: 'Basic',
    price: 29.99,
    duration: 1,
    description: 'Essential features for casual players',
    features: [
      'All Unlock Services',
      '2 Bot Lobbies per Week',
      'Basic Support',
      'Weekly Updates',
    ],
    icon: Gamepad,
  },
  {
    id: 'pro-plan',
    name: 'Pro',
    price: 52.99,
    duration: 1,
    description: 'Perfect for serious players',
    features: [
      'All Unlock Services',
      '1 Tool of Choice (1 Month Sub)',
      '5 Bot Lobbies per Week',
      'Priority Support',
      'Discord Community Access',
      'Multi-Platform Support',
    ],
    popular: true,
    icon: Shield,
  },
  {
    id: 'ultimate-plan',
    name: 'Ultimate',
    price: 199.99,
    duration: 3,
    description: 'Complete suite for professionals',
    features: [
      'Unlock All Services',
      'Access 1 Tool Per Month (Choose from 3 for 3 Months)',
      '15 Bot Lobbies Weekly',
      '24/7 VIP Support',
      'Private Discord Channel',
      'Early Update Access',
      'Receive a Monthly Key: Submit it in a ticket to select your tool',
    ],
    icon: Crown,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function PricingPage() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: typeof plans[0]) => {
    // Add the plan to cart as a subscription
    addItem({
      id: plan.id,
      name: `${plan.name} Plan`,
      description: plan.description,
      price: plan.price,
      duration: plan.duration,
      category: 'subscription',
      status: 'undetected',
      platforms: ['windows'],
      rating: 5,
      securityRating: 10,
      noSubscription: false,
    });

    // Show success toast
    toast({
      title: "Plan Added to Cart",
      description: `${plan.name} Plan has been added to your cart.`,
    });

    // Navigate to cart
    navigate('/cart');
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="container py-12"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="relative">
          <div className="text-center mb-12">
            <motion.div variants={item} className="flex justify-center">
              <Zap className="h-12 w-12 text-primary mb-4" />
            </motion.div>
            <motion.h1 variants={item} className="text-4xl font-bold tracking-tight mb-4">
              Choose Your Plan
            </motion.h1>
            <motion.p variants={item} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect package for your gaming needs. All plans include our
              core features with varying levels of access and support.
            </motion.p>
          </div>

          <motion.div variants={container} className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={item}>
                <Card className={`relative p-6 ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="text-center mb-6">
                    <plan.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.duration} month{plan.duration > 1 ? 's' : ''}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-12 text-center">
            <div className="bg-primary/5 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-2">100% Satisfaction Guaranteed</h3>
              <p className="text-muted-foreground">
                Try any plan risk-free with our 24-hour money-back guarantee. No questions asked.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <Button variant="link" onClick={() => navigate('/terms')}>Read Terms</Button>
                <Button variant="link" onClick={() => navigate('/support')}>Contact Support</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}