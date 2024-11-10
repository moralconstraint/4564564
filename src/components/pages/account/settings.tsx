import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/components/theme-provider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Bell, Moon, Sun, Globe, Shield, Trash2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, updateSettings, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    notifications: user?.notifications || {
      email: true,
      updates: true,
      marketing: false,
    },
    language: user?.language || 'en',
    twoFactor: user?.twoFactor || false,
  });

  const handleSettingsUpdate = async (newSettings: any) => {
    setLoading(true);
    try {
      await updateSettings(newSettings);
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Simulate account deletion
      await new Promise(resolve => setTimeout(resolve, 1000));
      signOut();
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Select your preferred theme
                </p>
              </div>
            </div>
            <Select
              value={theme}
              onValueChange={(value) => {
                setTheme(value as 'dark' | 'light' | 'system');
                handleSettingsUpdate({ theme: value });
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-white/10" />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5" />
              <Label>Notifications</Label>
            </div>
            <div className="space-y-4 ml-9">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="cursor-pointer">
                  Email notifications
                </Label>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => {
                    const newSettings = {
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: checked,
                      },
                    };
                    setSettings(newSettings);
                    handleSettingsUpdate(newSettings);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="update-notifications" className="cursor-pointer">
                  Product updates
                </Label>
                <Switch
                  id="update-notifications"
                  checked={settings.notifications.updates}
                  onCheckedChange={(checked) => {
                    const newSettings = {
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        updates: checked,
                      },
                    };
                    setSettings(newSettings);
                    handleSettingsUpdate(newSettings);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-notifications" className="cursor-pointer">
                  Marketing emails
                </Label>
                <Switch
                  id="marketing-notifications"
                  checked={settings.notifications.marketing}
                  onCheckedChange={(checked) => {
                    const newSettings = {
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        marketing: checked,
                      },
                    };
                    setSettings(newSettings);
                    handleSettingsUpdate(newSettings);
                  }}
                />
              </div>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5" />
              <div>
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">
                  Select your preferred language
                </p>
              </div>
            </div>
            <Select
              value={settings.language}
              onValueChange={(value) => {
                const newSettings = { ...settings, language: value };
                setSettings(newSettings);
                handleSettingsUpdate(newSettings);
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-white/10" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5" />
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Switch
              checked={settings.twoFactor}
              onCheckedChange={(checked) => {
                const newSettings = { ...settings, twoFactor: checked };
                setSettings(newSettings);
                handleSettingsUpdate(newSettings);
              }}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-500">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all of your data
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  );
}