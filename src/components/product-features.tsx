import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ProductFeaturesProps {
  features: string[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Key Features</h3>
      <ul className="grid gap-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}