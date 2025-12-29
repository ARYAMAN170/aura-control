import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { UserStatus } from '@/data/mockUsers';

interface StatusBadgeProps {
  status: UserStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const statusConfig = {
  active: {
    color: 'bg-success',
    label: 'Active',
    pulseColor: 'bg-success/50',
  },
  inactive: {
    color: 'bg-muted-foreground',
    label: 'Inactive',
    pulseColor: 'bg-muted-foreground/50',
  },
  pending: {
    color: 'bg-warning',
    label: 'Pending',
    pulseColor: 'bg-warning/50',
  },
};

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
};

export const StatusBadge = ({
  status,
  showLabel = false,
  size = 'md',
  className,
}: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.inactive;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        {/* Pulse ring for active status */}
        {status === 'active' && (
          <motion.div
            className={cn(
              'absolute inset-0 rounded-full',
              config.pulseColor
            )}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
        
        {/* Status dot */}
        <motion.div
          className={cn(
            'rounded-full relative',
            config.color,
            sizeClasses[size]
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground capitalize">
          {config.label}
        </span>
      )}
    </div>
  );
};