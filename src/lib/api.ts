import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For handling cookies if needed (e.g. logout)
});

// Request interceptor to add the auth token header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Types
export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface GetMeResponse {
  success: boolean;
  data: User;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  pagination: {
    totalUsers: number;
    totalPages: number;
  };
  data: User[];
}

export interface GenericResponse<T> {
  success: boolean;
  data: T;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingUsers: number;
  newUsersThisMonth: number;
}

// --- Authentication Endpoints ---

export const signupUser = async (userData: { fullName: string; email: string; password: string }) => {
  const response = await api.post<AuthResponse>('/api/auth/signup', userData);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post<AuthResponse>('/api/auth/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post<MessageResponse>('/api/auth/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await api.get<GetMeResponse>('/api/auth/me');
  return response.data.data; // Returning the User object directly
};

// --- Admin Management Endpoints ---

export const getAllUsers = async (page: number = 1, limit: number = 10) => {
  const response = await api.get<UsersResponse>('/api/users', {
    params: { page, limit },
  });
  return response.data;
};

export const updateUserStatus = async (userId: string, status: 'active' | 'inactive') => {
  const response = await api.patch<GenericResponse<User>>(`/api/users/${userId}/status`, { status });
  return response.data.data; // Returning the updated User object
};

export const getDashboardStats = async () => {
  const response = await api.get<GenericResponse<DashboardStats>>('/api/users/stats');
  return response.data.data;
};

// --- User Profile Endpoints ---

export const updateProfile = async (profileData: { fullName: string; email: string }) => {
  const response = await api.put<GenericResponse<User>>('/api/users/profile', profileData);
  return response.data.data; // Returning the updated User object
};

export const changePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
  const response = await api.put<MessageResponse>('/api/users/change-password', passwordData);
  return response.data;
};

export default api;
