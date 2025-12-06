import apiClient from '@/lib/api-client';
import type {
  DashboardOverview,
  ProductPerformance,
  ModelInfo,
} from '@/types/dashboard-types';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta: {
    timestamp: string;
    version: string;
  };
}

export const DashboardService = {
  // Get dashboard overview
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await apiClient.get<ApiResponse<DashboardOverview>>(
      '/api/v1/feature/dashboard/overview'
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch dashboard overview');
    }

    return response.data.data;
  },

  // Get product performance
  getProductPerformance: async (): Promise<ProductPerformance[]> => {
    const response = await apiClient.get<ApiResponse<ProductPerformance[]>>(
      '/api/v1/feature/dashboard/product-performance'
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch product performance');
    }

    return response.data.data;
  },

  // Export product performance to CSV
  exportProductPerformance: async (): Promise<Blob> => {
    const response = await apiClient.get(
      '/api/v1/feature/dashboard/product-performance/export',
      {
        responseType: 'blob',
      }
    );

    return response.data;
  },

  // Get ML model information
  getModelInfo: async (): Promise<ModelInfo> => {
    const response = await apiClient.get<ApiResponse<ModelInfo>>(
      '/api/v1/feature/dashboard/model-info'
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch model info');
    }

    return response.data.data;
  },
};