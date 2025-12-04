import type { User, CreateUserDto, UpdateUserDto } from '@/types/user-types';

interface FetchUsersResponse {
  success: boolean;
  data?: {
    users: User[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  error?: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const UserService = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.search) queryParams.set('search', params.search);

    const response = await fetch(`/api/users?${queryParams.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch users');
    
    const json: FetchUsersResponse = await response.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || 'Failed to fetch users');
    }
    
    // Enrich with status since API doesn't provide it yet
    const enriched = json.data.users.map((u) => ({
      ...u,
      status: (u.status || 'active') as 'active' | 'inactive',
    }));
    
    return enriched;
  },

  getById: async (id: string) => {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    
    const json: ApiResponse = await response.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || 'Failed to fetch user');
    }
    
    return json.data as User;
  },

  create: async (data: CreateUserDto) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const json: ApiResponse = await response.json();
    if (!json.success) {
      throw new Error(json.error || 'Failed to create user');
    }
    
    return json.data as User;
  },

  update: async (id: string, data: UpdateUserDto) => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const json: ApiResponse = await response.json();
    if (!json.success) {
      throw new Error(json.error || 'Failed to update user');
    }
    
    return json.data as User;
  },

  delete: async (id: string) => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    
    const json: ApiResponse = await response.json();
    if (!json.success) {
      throw new Error(json.error || 'Failed to delete user');
    }
    
    return json.data;
  },

  toggleStatus: async (id: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    return UserService.update(id, { status: newStatus });
  },
};