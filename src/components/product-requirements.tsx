import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProductRequirementsProps {
  requirements: string[];
}

export function ProductRequirements({ requirements }: ProductRequirementsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Requirements</h3>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please ensure you meet these requirements before purchase
        </AlertDescription>
      </Alert>
      <ul className="mt-4 space-y-2">
        {requirements.map((requirement, index) => (
          <li key={index} className="text-sm">
            • {requirement}
          </li>
        ))}
      </ul>
    </Card>
  );
}