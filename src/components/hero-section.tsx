import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Shield, Award } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="container flex flex-col items-center gap-4 text-center py-24">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Premium Services for
            <br className="hidden sm:inline" />
            <span className="text-primary">Call of Duty</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Elevate your gaming experience with our professional-grade services, trusted by thousands of players worldwide.
          </p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
          <Button size="lg" className="gap-2" asChild>
            <Link to="/services">
              Explore Services
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/support')}
          >
            Get Support
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
          <div className="flex items-center gap-4 rounded-lg border bg-background/60 p-4 backdrop-blur">
            <Zap className="h-6 w-6 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Instant activation at your service
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border bg-background/60 p-4 backdrop-blur">
            <Shield className="h-6 w-6 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Secure & Reliable</h3>
              <p className="text-sm text-muted-foreground">
                Our services are undetected and secure
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border bg-background/60 p-4 backdrop-blur">
            <Award className="h-6 w-6 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Premium Support</h3>
              <p className="text-sm text-muted-foreground">
                24/7 dedicated assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
