import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Users, UserCheck, UserX, Clock, TrendingUp, MoreVertical, Power, Trash2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RoleBadge } from '@/components/ui/RoleBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllUsers, updateUserStatus, getDashboardStats, type User, type DashboardStats } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, rotate: -1 },
  visible: { opacity: 1, y: 0, rotate: 0 },
};

export const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    pendingUsers: 0,
    newUsersThisMonth: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getAllUsers(1, 100);
        if (usersResponse?.data) {
          setUsers(usersResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }

      try {
        const statsResponse = await getDashboardStats();
        if (statsResponse) {
          setStats(statsResponse);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await updateUserStatus(userId, newStatus);
      
      setUsers(prev => prev.map(u => 
        u._id === userId 
          ? { ...u, status: newStatus }
          : u
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Removed deleteUser as it's not in the API requirements

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'primary', size: 'large' },
    { label: 'Active', value: stats.activeUsers, icon: UserCheck, color: 'success', size: 'medium' },
    { label: 'Inactive', value: stats.inactiveUsers, icon: UserX, color: 'muted', size: 'medium' },
    { label: 'Pending', value: stats.pendingUsers, icon: Clock, color: 'warning', size: 'small' },
    { label: 'New This Month', value: stats.newUsersThisMonth, icon: TrendingUp, color: 'secondary', size: 'small' },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-4xl lg:text-5xl font-display gradient-text">Control Room</h1>
          <p className="text-muted-foreground">Manage your team with precision</p>
        </motion.div>

        {/* Bento Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={cn(
                stat.size === 'large' && 'col-span-2 row-span-2',
                stat.size === 'medium' && 'col-span-1 md:col-span-2 lg:col-span-2',
              )}
            >
              <GlassCard 
                className={cn(
                  'p-6 h-full flex flex-col justify-between',
                  stat.size === 'large' && 'p-8'
                )}
                hoverEffect
                glowColor={stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : undefined}
              >
                <stat.icon className={cn(
                  'w-6 h-6 mb-4',
                  stat.color === 'primary' && 'text-primary',
                  stat.color === 'success' && 'text-success',
                  stat.color === 'warning' && 'text-warning',
                  stat.color === 'secondary' && 'text-secondary',
                  stat.color === 'muted' && 'text-muted-foreground',
                )} />
                <div>
                  <AnimatedCounter
                    value={stat.value}
                    className={cn(
                      'font-display block',
                      stat.size === 'large' ? 'text-5xl' : 'text-3xl',
                      stat.color === 'primary' && 'text-primary',
                      stat.color === 'success' && 'text-success',
                      stat.color === 'warning' && 'text-warning',
                      stat.color === 'secondary' && 'text-secondary',
                    )}
                  />
                  <span className="text-sm text-muted-foreground mt-1 block">{stat.label}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-4 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'admin', 'moderator', 'user'] as const).map((role) => (
                <Button
                  key={role}
                  variant={roleFilter === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRoleFilter(role)}
                  className="capitalize"
                >
                  {role}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              {(['all', 'active', 'inactive', 'pending'] as const).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* User Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredUsers.map((user, i) => (
              <motion.div
                key={user._id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ delay: i * 0.05 }}
                onHoverStart={() => setHoveredCard(user._id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <GlassCard
                  className="p-5 relative overflow-visible"
                  tiltEffect
                  hoverEffect
                >
                  {/* Status indicator */}
                  <div className="absolute top-4 right-4">
                    <StatusBadge status={user.status} />
                  </div>

                  {/* User info */}
                  <div className="flex items-start gap-4">
                    <UserAvatar
                      userId={user._id}
                      firstName={user.fullName.split(' ')[0]}
                      lastName={user.fullName.split(' ').slice(1).join(' ') || ''}
                      size="lg"
                      showCrown={user.role === 'admin'}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground truncate" style={{ transform: 'rotate(-0.5deg)' }}>
                        {user.fullName}
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground truncate mt-1">
                        {user.email}
                      </p>
                      <div className="mt-3">
                        <RoleBadge role={user.role} />
                      </div>
                    </div>
                  </div>

                  {/* Action buttons - appear on hover or always on mobile */}
                  <AnimatePresence>
                    {(hoveredCard === user._id || isMobile) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2"
                      >
                        <Button
                          size="icon"
                          variant={user.status === 'active' ? 'outline' : 'default'}
                          className="w-8 h-8 rounded-full shadow-lg"
                          onClick={() => toggleUserStatus(user._id, user.status)}
                        >
                          {user.status === 'active' ? <Power className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-heading text-muted-foreground">No users found</h3>
            <p className="text-sm text-muted-foreground/70">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};