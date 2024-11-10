import { Card } from '@/components/ui/card';
import {
  Shield,
  Zap,
  Clock,
  Award,
  RefreshCw,
  Headphones,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure & Undetected',
    description:
      'Our tools use advanced security measures to ensure they remain undetected.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Instant activation and quick updates to keep you in the game.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description:
      'Round-the-clock customer support to assist you whenever you need help.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description:
      'High-quality tools developed by experienced professionals.',
  },
  {
    icon: RefreshCw,
    title: 'Regular Updates',
    description:
      'Constant updates to ensure compatibility with the latest game versions.',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description:
      'VIP support with faster response times for premium members.',
  },
];

export function Features() {
  return (
    <section className="container py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Why Choose Us
        </h2>
        <p className="text-lg text-muted-foreground">
          Experience the best in gaming enhancement tools
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <feature.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}