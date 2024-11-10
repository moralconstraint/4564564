import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from '@/components/pages/home';
import { ProductPage } from '@/components/pages/product';
import { ServicesPage } from '@/components/pages/services';
import { ToolsPage } from '@/components/pages/tools';
import { CartPage } from '@/components/pages/cart';
import { CheckoutPage } from '@/components/pages/checkout';
import { AccountPage } from '@/components/pages/account';
import { SupportPage } from '@/components/pages/support';
import { AboutPage } from '@/components/pages/about';
import { ContactPage } from '@/components/pages/contact';
import { PrivacyPage } from '@/components/pages/privacy';
import { TermsPage } from '@/components/pages/terms';
import { PricingPage } from '@/components/pages/pricing';
import { NotFoundPage } from '@/components/pages/not-found';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
      <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
      <Route path="/tools" element={<PageWrapper><ToolsPage /></PageWrapper>} />
      <Route path="/services/:productId" element={<PageWrapper><ProductPage /></PageWrapper>} />
      <Route path="/tools/:productId" element={<PageWrapper><ProductPage /></PageWrapper>} />
      <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
      <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
      <Route path="/account/*" element={<PageWrapper><AccountPage /></PageWrapper>} />
      <Route path="/support" element={<PageWrapper><SupportPage /></PageWrapper>} />
      <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
      <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
      <Route path="/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
      <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
      <Route path="/pricing" element={<PageWrapper><PricingPage /></PageWrapper>} />
      <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
    </RouterRoutes>
  );
}