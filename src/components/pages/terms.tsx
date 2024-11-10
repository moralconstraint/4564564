import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function TermsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using our services, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not
              use our services.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">2. Service Usage</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services in accordance with all applicable laws</li>
                <li>Maintain the security of your account credentials</li>
                <li>
                  Not share your account or subscription with unauthorized users
                </li>
                <li>
                  Not attempt to reverse engineer or modify our tools
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              3. Subscription Terms
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Subscriptions are billed in advance on a recurring basis. You can
                cancel your subscription at any time, but:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No refunds for partial subscription periods</li>
                <li>
                  Access continues until the end of the current billing period
                </li>
                <li>
                  Cancellation takes effect at the end of the current period
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              4. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              We provide our services "as is" without any warranty. We are not
              responsible for any damages or losses resulting from your use of our
              services.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes via email or through our
              website.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, please contact us at
              legal@codtools.com
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}