import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getAvatarGradient, getInitials } from '@/data/mockUsers';
import { Crown } from 'lucide-react';

interface UserAvatarProps {
  userId: string;
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCrown?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const crownSizes = {
  sm: 'w-3 h-3 -top-1 -right-1',
  md: 'w-4 h-4 -top-1 -right-1',
  lg: 'w-5 h-5 -top-2 -right-2',
  xl: 'w-6 h-6 -top-2 -right-2',
};

export const UserAvatar = ({
  userId,
  firstName,
  lastName,
  size = 'md',
  showCrown = false,
  animated = true,
  className,
}: UserAvatarProps) => {
  const gradient = getAvatarGradient(userId);
  const initials = getInitials(firstName, lastName);

  return (
    <motion.div
      className={cn('relative group', className)}
      whileHover={animated ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {/* Animated gradient border */}
      <div
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm',
          gradient
        )}
        style={{ transform: 'scale(1.1)' }}
      />
      
      {/* Avatar */}
      <div
        className={cn(
          'relative rounded-full flex items-center justify-center font-heading font-bold text-white bg-gradient-to-br shadow-lg',
          sizeClasses[size],
          gradient
        )}
      >
        {initials}
        
        {/* Breathing animation overlay */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      {/* Crown for admin - Easter egg */}
      {showCrown && (
        <motion.div
          className={cn(
            'absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            crownSizes[size]
          )}
          initial={{ rotate: -20, y: 5 }}
          animate={{ rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Crown className="w-full h-full text-secondary fill-secondary drop-shadow-lg" />
        </motion.div>
      )}
    </motion.div>
  );
};