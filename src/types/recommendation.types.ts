// types/recommendation.types.ts

export interface RecommendationProduct {
  id: string;
  recommendation_id: string;
  product_id: string;
  rank_order: number;
  confidence_score: number;
  reasoning: string;
  product_name: string;
  category: 'data' | 'voice' | 'combo' | 'addon';
  price: string;
  description: string;
}

export interface Recommendation {
  id: string;
  customer_id: string;
  customer_name: string;
  generated_by_user_id: string;
  status: 'sent' | 'draft' | 'pending';
  model_version: string;
  algorithm: string;
  processing_time_ms: number;
  is_overridden: number;
  override_reason: string | null;
  override_product_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface RecommendationDetail extends Recommendation {
  staff_name: string;
  recommendations: RecommendationProduct[];
}

export interface GenerateRecommendationDto {
  customer_id: string;
}

export interface OverrideRecommendationDto {
  product_id: string;
  override_reason: string;
}

export interface MLRecommendationInput {
  avg_call_duration: number;
  avg_data_usage_gb: number;
  complaint_count: number;
  device_brand: string;
  monthly_spend: number;
  pct_video_usage: number;
  plan_type: string;
  sms_freq: number;
  topup_freq: number;
  travel_score: number;
}

export interface MLRecommendationResult {
  rank: number;
  product_name: string;
  confidence_score: number;
}

export interface MLRecommendationResponse {
  best_recommendation: MLRecommendationResult;
  recommendations: MLRecommendationResult[];
}

export interface RecommendationFilters {
  searchTerm: string;
  status: 'All' | 'sent' | 'draft' | 'pending';
  dateRange: 7 | 30 | 90;
  isOverridden?: boolean;
}

export interface RecommendationStats {
  total: number;
  sent: number;
  draft: number;
  pending: number;
  overridden: number;
}

export interface RecommendationState {
  items: Recommendation[];
  filteredItems: Recommendation[];
  filters: RecommendationFilters;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  selectedItem: RecommendationDetail | null;
  loading: boolean;
  error: string | null;
  stats: RecommendationStats;
}