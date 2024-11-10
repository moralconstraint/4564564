import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from '@/components/pages/home';
import { ProductPage } from '@/components/pages/product';
import { ServicesPage } from '@/components/pages/services';
import { CartPage } from '@/components/pages/cart';
import { CheckoutPage } from '@/components/pages/checkout';
import { AccountPage } from '@/components/pages/account';
import { SupportPage } from '@/components/pages/support';
import { AboutPage } from '@/components/pages/about';
import { PrivacyPage } from '@/components/pages/privacy';
import { TermsPage } from '@/components/pages/terms';
import { PricingPage } from '@/components/pages/pricing';
import { NotFoundPage } from '@/components/pages/not-found';
import { SignInPage } from '@/components/pages/auth/sign-in';
import { SignUpPage } from '@/components/pages/auth/sign-up';
import { PaymentSuccessPage } from '@/components/pages/payment-success';
import { DownloadsPage } from '@/components/pages/downloads';
import { AdminDashboard } from '@/components/pages/admin/dashboard';
import { PageWrapper } from '@/components/page-wrapper';
import { useAuth } from '@/lib/auth';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return children;
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth/');
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <div className="relative min-h-screen flex flex-col">
        {/* Background effects */}
        <div className="fixed inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)] blur-[0.5px]" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute w-[800px] h-[800px] bg-primary/30 rounded-full blur-[128px] opacity-50" />
        </div>
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-background/95 [mask-image:radial-gradient(transparent_45%,black)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {!isAuthPage && <MainNav />}
          <main className="flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                {/* Auth Routes */}
                <Route path="/auth/sign-in" element={<SignInPage />} />
                <Route path="/auth/sign-up" element={<SignUpPage />} />

                {/* Protected Routes */}
                <Route path="/" element={
                  <RequireAuth>
                    <PageWrapper><Home /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/services" element={
                  <RequireAuth>
                    <PageWrapper><ServicesPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/services/:productId" element={
                  <RequireAuth>
                    <PageWrapper><ProductPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/cart" element={
                  <RequireAuth>
                    <PageWrapper><CartPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/checkout" element={
                  <RequireAuth>
                    <PageWrapper><CheckoutPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/payment-success" element={
                  <RequireAuth>
                    <PageWrapper><PaymentSuccessPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/downloads" element={
                  <RequireAuth>
                    <PageWrapper><DownloadsPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/account/*" element={
                  <RequireAuth>
                    <PageWrapper><AccountPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/support" element={
                  <RequireAuth>
                    <PageWrapper><SupportPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/about" element={
                  <RequireAuth>
                    <PageWrapper><AboutPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/privacy" element={
                  <RequireAuth>
                    <PageWrapper><PrivacyPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/terms" element={
                  <RequireAuth>
                    <PageWrapper><TermsPage /></PageWrapper>
                  </RequireAuth>
                } />
                <Route path="/pricing" element={
                  <RequireAuth>
                    <PageWrapper><PricingPage /></PageWrapper>
                  </RequireAuth>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <RequireAdmin>
                    <PageWrapper><AdminDashboard /></PageWrapper>
                  </RequireAdmin>
                } />

                <Route path="*" element={
                  <RequireAuth>
                    <PageWrapper><NotFoundPage /></PageWrapper>
                  </RequireAuth>
                } />
              </Routes>
            </AnimatePresence>
          </main>
          {!isAuthPage && <Footer />}
          <Toaster />
        </div>
      </div>
    </ThemeProvider>
  );
}