export interface DashboardKPI {
  total_customers: number;
  total_recommendations: number;
  avg_confidence_score: string;
}

export interface ActiveChurnedRatio {
  active: number;
  churned: number;
  ratio_percentage: number;
}

export interface TopProduct {
  product_id: string;
  product_name: string;
  category: 'data' | 'voice' | 'combo' | 'addon';
  price: string;
  times_recommended: number;
  avg_confidence: number;
}

export interface DashboardOverview {
  kpi: DashboardKPI;
  active_vs_churned_ratio: ActiveChurnedRatio;
  top_products: TopProduct[];
}

export interface ProductPerformance {
  product_id: string;
  product_name: string;
  category: 'data' | 'voice' | 'combo' | 'addon';
  price: string;
  times_recommended: number;
  avg_confidence: number;
  revenue_potential: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}

export interface TrainingData {
  total_samples: number;
  training_samples: number;
  validation_samples: number;
}

export interface ModelInfo {
  model_version: string;
  model_type: string;
  last_training_date: string;
  metrics: ModelMetrics;
  training_data: TrainingData;
  features_used: string[];
  status: 'active' | 'inactive' | 'training';
  next_training_scheduled: string;
}