import { useState, useCallback, useEffect } from 'react';
import { 
  loginUser, 
  signupUser, 
  logoutUser, 
  getMe, 
  type User 
} from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start loading to check auth status
  });

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }
        
        const user = await getMe();
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { user, token } = await loginUser({ email, password });
      localStorage.setItem('token', token);
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { 
        success: false, 
        error: error.response?.data?.message || 'Invalid credentials' 
      };
    }
  }, []);

  const signup = useCallback(async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      const { user, token } = await signupUser({
        fullName,
        email: data.email,
        password: data.password
      });
      
      localStorage.setItem('token', token);
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { 
        success: false, 
        error: error.response?.data?.message || 'Signup failed' 
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  return {
    ...authState,
    login,
    signup,
    logout,
  };
};