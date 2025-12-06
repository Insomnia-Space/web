import apiClient from '@/lib/api-client';
import type { UserProfileDetail, UpdateProfileRequest } from '@/types/profile.types';

interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfileDetail;
  meta: {
    timestamp: string;
    version: string;
  };
}

export const profileService = {
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await apiClient.get<ProfileResponse>(
      '/api/v1/authentication/profile'
    );
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<ProfileResponse> => {
    const response = await apiClient.put<ProfileResponse>(
      '/api/v1/authentication/profile',
      data
    );
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await apiClient.post('/api/v1/authentication/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },
};