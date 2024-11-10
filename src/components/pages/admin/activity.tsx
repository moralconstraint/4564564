import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/lib/admin';
import { Search, User, ShoppingCart, MessageSquare, Settings } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

const getActivityIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'user':
      return <User className="h-4 w-4" />;
    case 'transaction':
      return <ShoppingCart className="h-4 w-4" />;
    case 'ticket':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Settings className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'user':
      return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    case 'transaction':
      return 'text-green-500 bg-green-500/10 border-green-500/20';
    case 'ticket':
      return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    default:
      return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }
};

export function Activity() {
  const { activities } = useAdmin();
  const [search, setSearch] = useState('');

  const filteredActivities = activities.filter(activity => {
    const searchTerm = search.toLowerCase();
    return (
      activity.action?.toLowerCase().includes(searchTerm) ||
      activity.details?.toLowerCase().includes(searchTerm) ||
      activity.userEmail?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Activity Log</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card className="p-6">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No activities found
          </div>
        ) : (
          <div className="space-y-6">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-6 last:pb-0 last:border-0 border-b border-border"
              >
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.action}</p>
                    <Badge variant="outline" className={getActivityColor(activity.type)}>
                      {activity.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                  {activity.userEmail && (
                    <p className="text-sm text-muted-foreground">
                      User: {activity.userEmail}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}