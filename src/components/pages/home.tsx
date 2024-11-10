import { HeroSection } from '@/components/hero-section';
import { Features } from '@/components/features';
import { FAQ } from '@/components/faq';

export function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      <HeroSection />
      <Features />
      <FAQ />
    </div>
  );
}