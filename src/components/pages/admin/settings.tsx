import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAdmin } from '@/lib/admin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export function Settings() {
  const { toast } = useToast();
  const { resetStats, resetActivities, resetAll } = useAdmin();
  const [loading, setLoading] = useState(false);

  const handleReset = async (type: 'stats' | 'activities' | 'all') => {
    setLoading(true);
    try {
      switch (type) {
        case 'stats':
          resetStats();
          toast({
            title: 'Success',
            description: 'Statistics have been reset successfully',
          });
          break;
        case 'activities':
          resetActivities();
          toast({
            title: 'Success',
            description: 'Activity log has been cleared successfully',
          });
          break;
        case 'all':
          resetAll();
          toast({
            title: 'Success',
            description: 'All admin data has been reset successfully',
          });
          break;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reset data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Admin Settings</h2>
            <p className="text-muted-foreground">
              Manage your admin panel settings and data
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
              <div>
                <h3 className="font-semibold">Reset Statistics</h3>
                <p className="text-sm text-muted-foreground">
                  Reset all statistical data to zero
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset Stats
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Statistics</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to reset all statistics? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleReset('stats')}
                      className="bg-primary"
                    >
                      Reset
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
              <div>
                <h3 className="font-semibold">Clear Activity Log</h3>
                <p className="text-sm text-muted-foreground">
                  Clear all activity history
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Clear Log
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Activity Log</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to clear the activity log? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleReset('activities')}
                      className="bg-primary"
                    >
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/20 bg-red-500/5">
              <div>
                <h3 className="font-semibold text-red-500">Reset All Data</h3>
                <p className="text-sm text-red-500/80">
                  Reset all admin data to default state
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Reset All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">
                      Reset All Data
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset ALL admin data including statistics, activities, and settings.
                      This action is irreversible. Are you absolutely sure?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleReset('all')}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Reset Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}