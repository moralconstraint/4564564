import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useAdmin } from '@/lib/admin';
import { Users, DollarSign, MessageSquare, TrendingUp } from 'lucide-react';
import { SalesChart } from '@/components/charts/sales-chart';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Overview() {
  const { stats } = useAdmin();

  const statCards = [
    {
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      description: 'Active platform users',
    },
    {
      label: 'Total Sales',
      value: stats?.totalSales || 0,
      icon: DollarSign,
      description: 'Completed transactions',
    },
    {
      label: 'Active Tickets',
      value: stats?.activeTickets || 0,
      icon: MessageSquare,
      description: 'Open support tickets',
    },
    {
      label: 'Monthly Revenue',
      value: `$${(stats?.monthlyRevenue || 0).toLocaleString()}`,
      icon: TrendingUp,
      description: 'Revenue this month',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <div className="h-[350px]">
            <SalesChart />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}