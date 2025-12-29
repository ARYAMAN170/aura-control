import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Typewriter effect for welcome message
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Welcome back to the Control Room';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email && password) {
      navigate('/dashboard');
    } else {
      setError('Please fill in all fields');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground particleCount={60} interactive />

      {/* Left side - Form (40%) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full lg:w-[45%] flex items-center justify-center p-8 relative z-10"
      >
        <GlassCard
          className="w-full max-w-md p-8"
          style={{ transform: 'perspective(1000px) rotateY(-2deg)' }}
          hoverEffect={false}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 10 }}
            >
              <span className="font-display text-xl text-primary-foreground">CR</span>
            </motion.div>
            <span className="font-heading font-semibold text-2xl">Control Room</span>
          </Link>

          {/* Typewriter welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              {displayText}
              <motion.span
                className="inline-block w-0.5 h-6 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </h1>
            <p className="text-muted-foreground">Enter your credentials to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                  focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className={cn(
                    "pl-10 bg-background/50 border-border/50 h-12 transition-all",
                    focusedField === 'email' && 'border-primary ring-2 ring-primary/20'
                  )}
                />
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                  focusedField === 'password' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className={cn(
                    "pl-10 pr-10 bg-background/50 border-border/50 h-12 transition-all",
                    focusedField === 'password' && 'border-primary ring-2 ring-primary/20'
                  )}
                />
                {/* Blinking eye toggle */}
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  whileTap={{ scale: 0.9 }}
                  animate={showPassword ? {} : { scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 0.2 }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </motion.button>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'password' ? 1 : 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <motion.div
                  className="w-5 h-5 rounded-md border border-border bg-background/50 flex items-center justify-center"
                  whileTap={{ scale: 0.9 }}
                >
                  <input type="checkbox" className="sr-only" />
                </motion.div>
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 link-underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-shake"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold relative overflow-hidden group"
              >
                <motion.span
                  className="flex items-center gap-2"
                  animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
                >
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.span>
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary-foreground"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:text-primary/80 link-underline">
              Create one
            </Link>
          </p>
        </GlassCard>
      </motion.div>

      {/* Right side - Visual (60%) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden lg:flex w-[55%] items-center justify-center relative"
      >
        {/* Floating elements */}
        <div className="relative">
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-secondary/20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          
          {/* Main visual card */}
          <motion.div
            className="relative glass-card p-8 w-80"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">Secure Access</h2>
            <p className="text-muted-foreground text-sm">
              Your gateway to managing users, roles, and permissions with style.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};