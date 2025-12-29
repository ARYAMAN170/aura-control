import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, ShieldCheck, User } from 'lucide-react';
import type { UserRole } from '@/data/mockUsers';

interface RoleBadgeProps {
  role: UserRole;
  showIcon?: boolean;
  className?: string;
}

const roleConfig = {
  admin: {
    className: 'role-badge-admin',
    icon: ShieldCheck,
    label: 'Admin',
  },
  moderator: {
    className: 'role-badge-moderator',
    icon: Shield,
    label: 'Moderator',
  },
  user: {
    className: 'role-badge-user',
    icon: User,
    label: 'User',
  },
};

export const RoleBadge = ({
  role,
  showIcon = true,
  className,
}: RoleBadgeProps) => {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <motion.div
      className={cn('role-badge', config.className, className)}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ 
        y: -2,
        boxShadow: '0 4px 12px hsl(var(--background) / 0.5)',
      }}
      transition={{ duration: 0.2 }}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1 inline" />}
      {config.label}
    </motion.div>
  );
};