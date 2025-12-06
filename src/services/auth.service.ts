import apiClient from '@/lib/api-client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: 'admin' | 'user';
      status: string;
      last_login: string;
      created_at: string;
      updated_at: string;
    };
    token: {
      access: string;
      refresh: string;
      type: string;
      expires_in: number;
    };
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    token: {
      access: string;
      refresh: string;
      type: string;
      expires_in: number;
    };
  };
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: string;
    last_login: string;
    statistics: {
      total_recommendations_generated: number;
      total_overrides: number;
      avg_confidence_score: number;
    };
    created_at: string;
    updated_at: string;
  };
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      '/api/v1/authentication/login',
      credentials
    );
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>(
      '/api/v1/authentication/refresh',
      { refresh_token: refreshToken }
    );
    return response.data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await apiClient.get<ProfileResponse>(
      '/api/v1/authentication/profile'
    );
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/api/v1/authentication/logout');
    return response.data;
  },
};