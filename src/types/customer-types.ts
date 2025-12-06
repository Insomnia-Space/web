export interface Customer {
  id: string;
  customer_code: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female';
  location: string;
  occupation: string;
  current_plan: string;
  status: 'active' | 'churned';
  clv_segment: 'high_value' | 'medium_value' | 'low_value';
  join_date: string;
  avg_data_usage: number;
  avg_call_duration: number;
  avg_sms_count: number;
  created_at: string;
  updated_at: string;
  device_brand: string;
  monthly_spend: number;
  pct_video_usage: number;
  sms_freq: number;
  topup_freq: number;
  travel_score: number;
  complaint_count: number;
}

export interface CustomerStatistics {
  total_customers: number;
  active_customers: number;
  churned_customers: number;
  active_ratio: number;
  clv_segments: {
    high_value: number;
    medium_value: number;
    low_value: number;
  };
  average_clv: number;
  average_tenure_months: number;
}

export interface CreateCustomerDto {
  name: string;
  age: number;
  gender: 'male' | 'female';
  location: string;
  occupation: string;
  current_plan: string;
  clv_segment: 'high_value' | 'medium_value' | 'low_value';
}

export interface UpdateCustomerDto {
  name?: string;
  age?: number;
  gender?: 'male' | 'female';
  location?: string;
  occupation?: string;
  current_plan?: string;
  clv_segment?: 'high_value' | 'medium_value' | 'low_value';
  status?: 'active' | 'churned';
}

export interface CustomerFilters {
  searchTerm: string;
  status: 'all' | 'active' | 'churned';
  clv_segment: 'all' | 'high_value' | 'medium_value' | 'low_value';
  gender: 'all' | 'male' | 'female';
  sortBy: 'name' | 'avg_data_usage' | 'avg_call_duration' | 'join_date';
  sortOrder: 'asc' | 'desc';
}

export interface CustomerPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  offset: number;
}

export interface CustomerState {
  items: Customer[];
  statistics: CustomerStatistics | null;
  filters: CustomerFilters;
  pagination: CustomerPagination;
  selectedItem: Customer | null;
  loading: boolean;
  error: string | null;
}