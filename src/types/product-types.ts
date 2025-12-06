export interface Product {
  id: string;
  product_code: string;
  name: string;
  category: 'data' | 'voice' | 'combo' | 'addon';
  price: string;
  description: string;
  data_quota: string | null;
  call_minutes: string | null;
  sms_count: string | null;
  validity_days: number | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

// ✅ Fixed: Use type alias instead of empty interface
export type ProductDetail = Product;

export interface ProductCategory {
  category: string;
  display_name: string;
  count: number;
  price_range: {
    min: string;
    max: string;
  };
}

export interface ProductFilters {
  searchTerm: string;
  category: 'All' | 'data' | 'voice' | 'combo' | 'addon' | '';
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductStats {
  total: number;
  data: number;
  voice: number;
  combo: number;
  addon: number;
}

export interface CreateProductDto {
  name: string;
  category: 'data' | 'voice' | 'combo' | 'addon';
  price: number;
  description: string;
  data_quota?: string;
  call_minutes?: string;
  sms_count?: string;
  validity_days?: number;
}

export interface UpdateProductDto {
  name?: string;
  category?: 'data' | 'voice' | 'combo' | 'addon';
  price?: number;
  description?: string;
  data_quota?: string;
  call_minutes?: string;
  sms_count?: string;
  validity_days?: number;
}

export interface ProductState {
  items: Product[];
  categories: ProductCategory[];
  filteredItems: Product[];
  filters: ProductFilters;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  selectedItem: ProductDetail | null;
  loading: boolean;
  error: string | null;
  stats: ProductStats;
  viewMode: 'grid' | 'table';
}