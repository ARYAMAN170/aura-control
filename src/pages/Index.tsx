import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Shield, Zap, Sparkles } from 'lucide-react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Easter egg: Konami code
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          document.body.classList.add('konami-mode');
          console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'font-size: 24px; color: #00FFF0; text-shadow: 0 0 10px #00FFF0;');
          console.log('%c   ___            _             _   ____                       ', 'color: #FFB627');
          console.log('%c  / __\\ ___  _ __| |_ _ __ ___ | | |  _ \\ ___   ___  _ __ ___  ', 'color: #FFB627');
          console.log('%c / /   / _ \\| \'_ \\| __| \'__/ _ \\| | | |_) / _ \\ / _ \\| \'_ ` _ \\ ', 'color: #FFB627');
          console.log('%c/ /___| (_) | | | | |_| | | (_) | | |  _ < (_) | (_) | | | | | |', 'color: #FFB627');
          console.log('%c\\____/ \\___/|_| |_|\\__|_|  \\___/|_| |_| \\_\\___/ \\___/|_| |_| |_|', 'color: #FFB627');
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Console ASCII art on load
  useEffect(() => {
    console.log('%c🚀 Welcome to Control Room! 🚀', 'font-size: 20px; color: #00FFF0; font-weight: bold;');
    console.log('%cBuilt with ❤️ using React, Framer Motion & Tailwind', 'color: #94D2BD;');
    console.log('%c💡 Tip: Try the Konami code for a surprise!', 'color: #FFB627;');
  }, []);

  const features = [
    { icon: Users, title: 'User Management', description: 'Manage users with style and precision' },
    { icon: Shield, title: 'Role-Based Access', description: 'Granular permissions and role control' },
    { icon: Zap, title: 'Real-Time Updates', description: 'Instant synchronization across your team' },
    { icon: Sparkles, title: 'Beautiful Interface', description: 'A joy to use, every single day' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground particleCount={80} interactive />

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Logo */}
          <motion.div
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="font-display text-3xl text-primary-foreground">CR</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display mb-6">
            <span className="gradient-text">Control Room</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A sophisticated user management system with an artistically designed interface
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 h-14 group">
                Enter Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 h-14">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full px-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <GlassCard className="p-6 h-full" hoverEffect tiltEffect>
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;