import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { RoleBadge } from '@/components/ui/RoleBadge';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/data/mockUsers';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', path: '/profile', icon: User },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isAuthenticated = true; // Mock auth state

  const activeIndex = navItems.findIndex(item => item.path === location.pathname);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Background with stepped silhouette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent backdrop-blur-xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ rotate: [-2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="font-display text-lg text-primary-foreground">CR</span>
              </div>
              <span className="hidden sm:block font-heading font-semibold text-xl text-foreground">
                Control Room
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ml-12 gap-1 relative">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={cn(
                      'relative px-4 py-2 rounded-lg font-medium text-sm transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                    whileHover={{ y: -2 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
            
            {/* Sliding active indicator */}
            <motion.div
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={false}
              animate={{
                x: activeIndex >= 0 ? activeIndex * 120 + 16 : 0,
                width: activeIndex >= 0 ? 88 : 0,
                opacity: activeIndex >= 0 ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <RoleBadge role={currentUser.role} showIcon={false} className="text-xs py-0.5 px-2" />
                </div>
                <UserAvatar
                  userId={currentUser.id}
                  firstName={currentUser.firstName}
                  lastName={currentUser.lastName}
                  size="md"
                  showCrown={currentUser.role === 'admin'}
                />
              </motion.button>

              {/* User dropdown menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute right-0 top-full mt-2 w-56 p-2 glass-card"
                  >
                    <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                      <motion.div
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Profile</span>
                      </motion.div>
                    </Link>
                    <Link to="/settings" onClick={() => setShowUserMenu(false)}>
                      <motion.div
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Settings</span>
                      </motion.div>
                    </Link>
                    <div className="border-t border-border/50 my-2" />
                    <motion.button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 transition-colors w-full text-destructive"
                      whileHover={{ x: 4 }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-4 p-2 rounded-lg hover:bg-muted/50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden relative bg-background/95 backdrop-blur-xl border-t border-border/50"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      location.pathname === item.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};