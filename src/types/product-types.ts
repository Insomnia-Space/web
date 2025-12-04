// types/product.types.ts

export interface Product {
  id: string;
  name: string;
  category: 'Data' | 'Voice' | 'Combo';
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetail extends Product {
  features?: string[];
  terms?: string;
  quota?: string;
  validity?: string;
}

export interface ProductFilters {
  searchTerm: string;
  category: 'All' | 'Data' | 'Voice' | 'Combo';
}

export interface ProductStats {
  total: number;
  data: number;
  voice: number;
  combo: number;
}

export interface ProductState {
  items: Product[];
  filteredItems: Product[];
  filters: ProductFilters;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  selectedItem: ProductDetail | null;
  viewMode: 'grid' | 'table';
  loading: boolean;
  error: string | null;
  stats: ProductStats;
}
