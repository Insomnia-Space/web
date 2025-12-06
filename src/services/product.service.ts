import apiClient from '@/lib/api-client';
import type {
  CreateProductDto,
  Product,
  ProductCategory,
  ProductDetail,
  UpdateProductDto,
} from '@/types/product-types';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta: {
    timestamp: string;
    version: string;
  };
  pagination?: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    offset: number;
  };
}

export const ProductService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.search) queryParams.set('search', params.search);
    
    // Fix: Only add category if it's not empty and not 'All'
    if (params?.category && params.category !== 'All' && params.category !== '') {
      queryParams.set('category', params.category);
    }
    
    if (params?.min_price) queryParams.set('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.set('max_price', params.max_price.toString());

    const url = `/api/v1/feature/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    try {
      const response = await apiClient.get<ApiResponse<Product[]>>(url);

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch products');
      }

      return {
        products: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      // ✅ Fixed: Removed console.error
      throw error;
    }
  },

  getCategories: async (): Promise<ProductCategory[]> => {
    try {
      const response = await apiClient.get<ApiResponse<ProductCategory[]>>(
        '/api/v1/feature/products/categories'
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch categories');
      }

      return response.data.data;
    } catch (error) {
      // ✅ Fixed: Removed console.error
      throw error;
    }
  },

  getById: async (id: string): Promise<ProductDetail> => {
    const response = await apiClient.get<ApiResponse<ProductDetail>>(
      `/api/v1/feature/products/${id}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch product');
    }

    return response.data.data;
  },

  create: async (data: CreateProductDto): Promise<Product> => {
    const response = await apiClient.post<ApiResponse<Product>>(
      '/api/v1/feature/products',
      data
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create product');
    }

    return response.data.data;
  },

  update: async (id: string, data: UpdateProductDto): Promise<Product> => {
    const response = await apiClient.put<ApiResponse<Product>>(
      `/api/v1/feature/products/${id}`,
      data
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update product');
    }

    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse>(
      `/api/v1/feature/products/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete product');
    }
  },
};