import apiClient from '@/lib/api-client';
import type {
  Recommendation,
  RecommendationDetail,
  GenerateRecommendationDto,
  OverrideRecommendationDto,
  MLRecommendationInput,
  MLRecommendationResponse,
} from '@/types/recommendation.types';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta: {
    timestamp: string;
    version: string;
  };
}

export const RecommendationService = {
  // Generate recommendation
  generate: async (data: GenerateRecommendationDto): Promise<RecommendationDetail> => {
    const response = await apiClient.post<ApiResponse<RecommendationDetail>>(
      '/api/v1/feature/recommendations/generate',
      data
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to generate recommendation');
    }

    return response.data.data;
  },

  // Get ML recommendation (external API)
  getMLRecommendation: async (
    input: MLRecommendationInput,
    n: number = 5
  ): Promise<MLRecommendationResponse> => {
    const response = await fetch(
      `https://rozhak-telcosmartrecs.hf.space/api/v1/recommend?n=${n}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get ML recommendation');
    }

    return response.json();
  },

  // Get recommendation history - ✅ FIXED: Changed from POST to GET with query params
  getHistory: async (customer_id?: string): Promise<Recommendation[]> => {
    const url = customer_id 
      ? `/api/v1/feature/recommendations/history?customer_id=${customer_id}`
      : '/api/v1/feature/recommendations/history';
    
    const response = await apiClient.get<ApiResponse<Recommendation[]>>(url);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch recommendation history');
    }

    return response.data.data;
  },

  // Get recommendation detail
  getDetail: async (id: string): Promise<RecommendationDetail> => {
    const response = await apiClient.get<ApiResponse<RecommendationDetail>>(
      `/api/v1/feature/recommendations/${id}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch recommendation detail');
    }

    return response.data.data;
  },

  // Override recommendation
  override: async (
    id: string,
    data: OverrideRecommendationDto
  ): Promise<RecommendationDetail> => {
    const response = await apiClient.post<ApiResponse<RecommendationDetail>>(
      `/api/v1/feature/recommendations/${id}/override`,
      data
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to override recommendation');
    }

    return response.data.data;
  },
};