import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X, Sparkles, Shield, Zap } from 'lucide-react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const checkPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const levels: PasswordStrength[] = [
    { score: 0, label: 'Too weak', color: 'bg-destructive' },
    { score: 1, label: 'Weak', color: 'bg-destructive' },
    { score: 2, label: 'Fair', color: 'bg-warning' },
    { score: 3, label: 'Good', color: 'bg-success/70' },
    { score: 4, label: 'Strong', color: 'bg-success' },
  ];

  return levels[score];
};

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const passwordStrength = checkPasswordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
  const formProgress = [formData.firstName, formData.lastName, formData.email, formData.password, formData.confirmPassword]
    .filter(Boolean).length / 5 * 100;

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    const result = await signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      setShowConfetti(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError(result.error || 'Signup failed');
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: Shield, text: 'Enterprise-grade security' },
    { icon: Zap, text: 'Real-time collaboration' },
    { icon: Sparkles, text: 'Beautiful, intuitive interface' },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground particleCount={60} interactive />

      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '100%',
                  backgroundColor: ['#00FFF0', '#FFB627', '#B565D8', '#4ECDC4', '#FF6B6B'][Math.floor(Math.random() * 5)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                }}
                animate={{
                  y: -window.innerHeight * 1.5,
                  x: (Math.random() - 0.5) * 200,
                  rotate: Math.random() * 720,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: 'easeOut',
                  delay: Math.random() * 0.3,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Left side - Form */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full lg:w-[50%] flex items-center justify-center p-8 relative z-10"
      >
        <GlassCard className="w-full max-w-lg p-8" hoverEffect={false}>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Complete your profile</span>
              <span>{Math.round(formProgress)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-6">
            <img src="/image.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-lg object-cover" />
            <span className="font-heading font-semibold text-xl">Control Room</span>
          </Link>

          <h1 className="text-2xl font-heading font-bold mb-1">Create your account</h1>
          <p className="text-muted-foreground text-sm mb-6">Join thousands of teams managing users efficiently</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm">First Name</Label>
                <div className="relative">
                  <User className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                    focusedField === 'firstName' ? 'text-primary' : 'text-muted-foreground'
                  )} />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange('firstName')}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John"
                    className="pl-10 bg-background/50 h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Doe"
                  className="bg-background/50 h-11"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <div className="relative">
                <Mail className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                  focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="pl-10 bg-background/50 h-11"
                />
              </div>
            </div>

            {/* Password field with strength meter */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                  focusedField === 'password' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-background/50 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Liquid fill password strength */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1"
                >
                  <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                    <motion.div
                      className={cn("h-full transition-colors", passwordStrength.color)}
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                    {/* Liquid bubble effect */}
                    <motion.div
                      className="absolute top-0 h-full w-4 bg-white/30 rounded-full blur-sm"
                      animate={{ left: ['0%', `${(passwordStrength.score / 4) * 100 - 10}%`] }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className={cn("text-xs", passwordStrength.color.replace('bg-', 'text-'))}>
                    {passwordStrength.label}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                  focusedField === 'confirmPassword' ? 'text-primary' : 'text-muted-foreground'
                )} />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className={cn(
                    "pl-10 pr-10 bg-background/50 h-11 transition-all",
                    formData.confirmPassword && (passwordsMatch ? 'border-success' : 'border-destructive')
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Match indicator */}
              {formData.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex items-center gap-1 text-xs",
                    passwordsMatch ? 'text-success' : 'text-destructive'
                  )}
                >
                  {passwordsMatch ? (
                    <>
                      <Check className="w-3 h-3" />
                      Passwords match
                    </>
                  ) : (
                    <>
                      <X className="w-3 h-3" />
                      Passwords don't match
                    </>
                  )}
                </motion.div>
              )}
            </div>

            {/* Profile preview */}
            {formData.firstName && formData.lastName && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <UserAvatar
                  userId={`preview-${formData.email}`}
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  size="md"
                  animated={false}
                />
                <div>
                  <p className="text-sm font-medium">{formData.firstName} {formData.lastName}</p>
                  <p className="text-xs text-muted-foreground">{formData.email || 'your@email.com'}</p>
                </div>
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold relative overflow-hidden group"
            >
              <motion.span
                className="flex items-center gap-2"
                animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
              >
                Create Account
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
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:text-primary/80 link-underline">
              Sign in
            </Link>
          </p>
        </GlassCard>
      </motion.div>

      {/* Right side - Benefits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden lg:flex w-[50%] items-center justify-center relative"
      >
        <div className="space-y-6 max-w-md">
          <motion.h2
            className="text-4xl font-display gradient-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join the Control Room
          </motion.h2>
          
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.text}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-4 glass-card p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-medium">{benefit.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};