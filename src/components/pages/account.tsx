import { Routes, Route, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useLocation } from 'react-router-dom';
import { ProfilePage } from './account/profile';
import { BillingPage } from './account/billing';
import { SettingsPage } from './account/settings';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export function AccountPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop();

  // Redirect to profile by default
  if (location.pathname === '/account') {
    navigate('/account/profile');
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible" 
      className="container py-8"
    >
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Account</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
          <Tabs value={currentPath} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <Link to="/account/profile">
                <TabsTrigger value="profile" className="w-full">Profile</TabsTrigger>
              </Link>
              <Link to="/account/billing">
                <TabsTrigger value="billing" className="w-full">Billing</TabsTrigger>
              </Link>
              <Link to="/account/settings">
                <TabsTrigger value="settings" className="w-full">Settings</TabsTrigger>
              </Link>
            </TabsList>

            <Routes>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<ProfilePage />} />
            </Routes>
          </Tabs>
        </Card>
      </div>
    </motion.div>
  );
}