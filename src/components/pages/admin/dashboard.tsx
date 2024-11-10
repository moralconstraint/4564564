import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/pages/admin/overview';
import { Users } from '@/components/pages/admin/users';
import { Orders } from '@/components/pages/admin/orders';
import { Support } from '@/components/pages/admin/support';
import { Settings } from '@/components/pages/admin/settings';
import { Activity } from '@/components/pages/admin/activity';

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'users', label: 'Users' },
  { value: 'orders', label: 'Orders' },
  { value: 'support', label: 'Support' },
  { value: 'activity', label: 'Activity' },
  { value: 'settings', label: 'Settings' },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'users':
        return <Users />;
      case 'orders':
        return <Orders />;
      case 'support':
        return <Support />;
      case 'activity':
        return <Activity />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your application, users, and content
          </p>
        </div>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {renderContent()}
          </Tabs>
        </Card>
      </motion.div>
    </motion.div>
  );
}