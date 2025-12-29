import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter = ({
  value,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const lastAnimatedValue = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;
    
    // Only animate if the value has changed
    if (lastAnimatedValue.current === value) return;
    lastAnimatedValue.current = value;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * value);
      
      setCount(currentCount);

      if (now < endTime) {
        requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  );
};