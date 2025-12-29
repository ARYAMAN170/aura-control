import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Calendar, MapPin, Building, Clock, Shield, 
  Edit2, Check, X, Lock, Eye, EyeOff, ChevronDown 
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { RoleBadge } from '@/components/ui/RoleBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { updateProfile, changePassword } from '@/lib/api';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner'; // Assuming sonner is used for toasts based on package.json/file list
import { useIsMobile } from '@/hooks/use-mobile';

interface EditableFieldProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  onSave: (value: string) => void;
  type?: 'text' | 'email';
}

const EditableField = ({ label, value, icon: Icon, onSave, type = 'text' }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="relative">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <Input
                  type={type}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="pl-10 bg-background/50 h-10"
                  autoFocus
                />
              </div>
              <motion.button
                onClick={handleSave}
                className="p-2 rounded-lg bg-success/20 text-success hover:bg-success/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Check className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="display"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className={cn(
                  "font-medium",
                  type === 'email' && "font-mono text-sm"
                )}>
                  {value}
                </span>
              </div>
              <motion.button
                onClick={() => setIsEditing(true)}
                className={cn(
                  "p-2 rounded-lg hover:bg-muted/50 transition-all",
                  isHovered || isMobile ? "opacity-100" : "opacity-0"
                )}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit2 className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const ProfilePage = () => {
  const { user, isLoading, updateUser } = useAuth();
  const [showPasswordSection, setShowPasswordSection] = useState(true);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  if (isLoading || !user) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  const firstName = user.fullName.split(' ')[0];
  const lastName = user.fullName.split(' ').slice(1).join(' ') || '';

  const handleUpdateProfile = async (field: 'firstName' | 'lastName' | 'email', value: string) => {
    try {
      let newFullName = user.fullName;
      let newEmail = user.email;

      if (field === 'firstName') {
        newFullName = `${value} ${lastName}`.trim();
      } else if (field === 'lastName') {
        newFullName = `${firstName} ${value}`.trim();
      } else if (field === 'email') {
        newEmail = value;
      }

      const updatedUser = await updateProfile({ fullName: newFullName, email: newEmail });
      updateUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      toast.success('Password changed successfully');
      setPasswords({ current: '', new: '', confirm: '' });
      setShowPasswordSection(false);
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error('Failed to change password');
    }
  };

  // Calculate profile completion
  const fields = [firstName, lastName, user.email];
  const completedFields = fields.filter(Boolean).length;
  const completionPercentage = (completedFields / fields.length) * 100;

  // Calculate days since joined
  const joinedDate = new Date(user.createdAt);
  const isValidDate = !isNaN(joinedDate.getTime());
  const daysSinceJoined = isValidDate 
    ? Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MainLayout>
      <div className="min-h-screen p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column - Avatar & Quick Stats */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Avatar Card */}
              <GlassCard className="p-8 text-center relative overflow-visible">
                {/* Parallax-like background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative">
                  <UserAvatar
                    userId={user._id}
                    firstName={firstName}
                    lastName={lastName}
                    size="xl"
                    showCrown={user.role === 'admin'}
                    className="mx-auto mb-4"
                  />
                  
                  <h2 className="text-2xl font-heading font-bold mb-1">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground font-mono mb-4">{user.email}</p>
                  
                  <div className="flex items-center justify-center gap-3">
                    <RoleBadge role={user.role} />
                    <StatusBadge status={user.status} showLabel />
                  </div>
                </div>
              </GlassCard>

              {/* Profile Completion */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-primary font-bold">{Math.round(completionPercentage)}%</span>
                </div>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  {/* Animated glow */}
                  <motion.div
                    className="absolute inset-y-0 w-8 bg-white/30 blur-sm rounded-full"
                    animate={{ left: ['0%', `${completionPercentage - 5}%`, '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </div>
              </GlassCard>

              {/* Quick Stats */}
              <GlassCard className="p-6 space-y-4">
                <h3 className="font-heading font-semibold">Activity</h3>
                
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                  whileHover={{ x: 4 }}
                >
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Member for</p>
                    <p className="font-semibold">{daysSinceJoined} days</p>
                  </div>
                </motion.div>
              </GlassCard>
            </motion.div>

            {/* Right Column - Editable Fields */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <GlassCard className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EditableField
                    label="First Name"
                    value={firstName}
                    icon={User}
                    onSave={(val) => handleUpdateProfile('firstName', val)}
                  />
                  <EditableField
                    label="Last Name"
                    value={lastName}
                    icon={User}
                    onSave={(val) => handleUpdateProfile('lastName', val)}
                  />
                  <EditableField
                    label="Email Address"
                    value={user.email}
                    icon={Mail}
                    onSave={(val) => handleUpdateProfile('email', val)}
                    type="email"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Joined</p>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {isValidDate ? format(joinedDate, 'MMMM d, yyyy') : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Security Section */}
              <GlassCard className="p-6">
                <motion.button
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="w-full flex items-center justify-between"
                >
                  <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security & Password
                  </h3>
                  <motion.div
                    animate={{ rotate: showPasswordSection ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showPasswordSection && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-4">
                        <p className="text-sm text-muted-foreground">Change your password</p>
                        
                        {(['current', 'new', 'confirm'] as const).map((field) => (
                          <div key={field} className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type={showPasswords[field] ? 'text' : 'password'}
                              placeholder={field === 'current' ? 'Current password' : field === 'new' ? 'New password' : 'Confirm new password'}
                              value={passwords[field]}
                              onChange={(e) => setPasswords(prev => ({ ...prev, [field]: e.target.value }))}
                              className="pl-10 pr-10 bg-background/50"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPasswords[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}

                        <Button className="w-full sm:w-auto" onClick={handlePasswordChange}>
                          Update Password
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>

              {/* Danger Zone */}
              <GlassCard className="p-6 border-destructive/20">
                <h3 className="font-heading font-semibold text-lg text-destructive mb-4">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};