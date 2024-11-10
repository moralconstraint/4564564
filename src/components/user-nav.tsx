import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  LogOut,
  Settings,
  CreditCard,
  MessageSquare,
  Loader2,
  ChevronDown,
  UserCircle,
  Bell,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const dropdownAnimation = {
  initial: { opacity: 0, scale: 0.95, y: -20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
  transition: { duration: 0.2, ease: "easeOut" }
};

const itemAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2 }
};

export function UserNav() {
  const { user, signIn, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(authData.email, authData.password);
      setShowAuthDialog(false);
      toast({
        title: "Success",
        description: "You have been signed in successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className={cn(
              "relative group border-white/10 bg-background/50",
              "hover:bg-accent/50 hover:border-primary/30",
              "transition-all duration-300"
            )}
          >
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            <UserCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Sign in to access your account and purchases
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={authData.email}
                onChange={(e) =>
                  setAuthData({ ...authData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={authData.password}
                onChange={(e) =>
                  setAuthData({ ...authData, password: e.target.value })
                }
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className={cn(
            "relative group border-white/10 bg-background/50",
            "hover:bg-accent/50 hover:border-primary/30",
            "transition-all duration-300"
          )}
        >
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
          <UserCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
        </Button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        <DropdownMenuContent
          align="end"
          className="w-56 p-2 backdrop-blur-xl bg-background/80 border-white/10"
          asChild
        >
          <motion.div {...dropdownAnimation}>
            <DropdownMenuLabel className="font-normal">
              <motion.div {...itemAnimation} className="flex flex-col gap-2 p-2">
                <p className="text-sm font-medium">{user.email}</p>
                <Badge variant="outline" className="w-fit gap-1 text-xs">
                  <Shield className="h-3 w-3" /> Premium Member
                </Badge>
              </motion.div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuGroup>
              <motion.div {...itemAnimation}>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuItem asChild>
                  <Link to="/account/billing" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </Link>
                </DropdownMenuItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuItem asChild>
                  <Link to="/account/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuItem asChild>
                  <Link to="/support" className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span>Support</span>
                  </Link>
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/10" />
            <motion.div {...itemAnimation}>
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </motion.div>
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
}