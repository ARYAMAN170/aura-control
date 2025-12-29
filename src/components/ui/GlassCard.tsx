import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  tiltEffect?: boolean;
  glowColor?: 'primary' | 'secondary' | 'accent';
}

export const GlassCard = ({
  children,
  className,
  hoverEffect = true,
  tiltEffect = false,
  glowColor,
  ...props
}: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (max 10 degrees)
    const rotateXValue = (mouseY / (rect.height / 2)) * -5;
    const rotateYValue = (mouseX / (rect.width / 2)) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const glowClasses = {
    primary: 'hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]',
    secondary: 'hover:shadow-[0_0_40px_hsl(var(--secondary)/0.3)]',
    accent: 'hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)]',
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'glass-card',
        hoverEffect && 'transition-all duration-300',
        glowColor && glowClasses[glowColor],
        className
      )}
      style={{
        transform: tiltEffect
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : undefined,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hoverEffect ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};