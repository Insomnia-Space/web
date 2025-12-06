import apiClient from '@/lib/api-client';
import type { CreateUserDto, UpdateUserDto, User, UserDetail } from '@/types/user-types';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta: {
    timestamp: string;
    version: string;
  };
  pagination?: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    offset: number;
  };
}

interface UserListResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff';
  status: 'active' | 'inactive';
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

interface UserDetailResponse {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  status: 'active' | 'inactive';
  last_login: string | null;
  statistics: {
    total_recommendations_generated: number;
    total_overrides: number;
    avg_confidence_score: number;
  };
  created_at: string;
  updated_at: string;
}

export const UserService = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.search) queryParams.set('search', params.search);

    const response = await apiClient.get<ApiResponse<UserListResponse[]>>(
      `/api/v1/feature/users?${queryParams.toString()}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch users');
    }

    // Transform API response to match User type
    const users: User[] = response.data.data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === 'admin' ? 'admin' : 'user',
      status: user.status,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }));

    return users;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<UserDetailResponse>>(
      `/api/v1/feature/users/${id}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch user');
    }

    const userData = response.data.data;

    // Transform to UserDetail type
    const userDetail: UserDetail = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role === 'admin' ? 'admin' : 'user',
      status: userData.status,
      lastLogin: userData.last_login || undefined,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
      department: 'Engineering', // Mock data
      phone: '+62 812 3456 7890', // Mock data
    };

    return userDetail;
  },

  create: async (data: CreateUserDto) => {
    const response = await apiClient.post<ApiResponse<UserListResponse>>(
      '/api/v1/feature/users',
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role === 'admin' ? 'admin' : 'staff',
      }
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create user');
    }

    const userData = response.data.data;

    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role === 'admin' ? 'admin' : 'user',
      status: userData.status,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    };

    return user;
  },

  update: async (id: string, data: UpdateUserDto) => {
    const response = await apiClient.put<ApiResponse<UserListResponse>>(
      `/api/v1/feature/users/${id}`,
      data
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update user');
    }

    const userData = response.data.data;

    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role === 'admin' ? 'admin' : 'user',
      status: userData.status,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    };

    return user;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse>(
      `/api/v1/feature/users/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete user');
    }

    return response.data.data;
  },

  toggleStatus: async (id: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    const response = await apiClient.patch<ApiResponse<UserListResponse>>(
      `/api/v1/feature/users/${id}/status`,
      { status: newStatus }
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update status');
    }

    const userData = response.data.data;

    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role === 'admin' ? 'admin' : 'user',
      status: userData.status,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    };

    return user;
  },
};