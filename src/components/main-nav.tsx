import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SearchCommand } from '@/components/search-command';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  Settings, 
  LogOut, 
  ShoppingCart,
  Building2,
  Shield,
  HelpCircle,
  CreditCard,
  Info,
  Wrench,
  Download,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';

export function MainNav() {
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold">
            Name Here
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-menu-trigger">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Store</span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="nav-menu-content">
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link 
                      to="/services?category=unlock" 
                      className="nav-menu-item block p-3 space-y-1 rounded-lg hover:bg-accent/50"
                      onClick={() => navigate('/services?category=unlock')}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Unlock Services</div>
                          <div className="text-sm text-muted-foreground">
                            Premium unlock services for all platforms
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link 
                      to="/services?category=software" 
                      className="nav-menu-item block p-3 space-y-1 rounded-lg hover:bg-accent/50"
                      onClick={() => navigate('/services?category=software')}
                    >
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Software</div>
                          <div className="text-sm text-muted-foreground">
                            Professional-grade software solutions
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-menu-trigger">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Company</span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="nav-menu-content">
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link 
                      to="/about" 
                      className="nav-menu-item block p-3 space-y-1 rounded-lg hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        <div>
                          <div className="font-medium">About Us</div>
                          <div className="text-sm text-muted-foreground">
                            Learn more about our company
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link 
                      to="/support" 
                      className="nav-menu-item block p-3 space-y-1 rounded-lg hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Support</div>
                          <div className="text-sm text-muted-foreground">
                            Get help from our team
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link 
                      to="/pricing" 
                      className="nav-menu-item block p-3 space-y-1 rounded-lg hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Subscription Service</div>
                          <div className="text-sm text-muted-foreground">
                            View our pricing plans
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <SearchCommand />
          
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAdmin() && (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => navigate('/account/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/account/billing')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/account/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/downloads')}>
                  <Download className="mr-2 h-4 w-4" />
                  Downloads
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" onClick={() => navigate('/auth/sign-in')}>
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}