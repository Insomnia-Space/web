import apiClient from '@/lib/api-client';
import type {
  Customer,
  CustomerStatistics,
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerPagination,
} from '@/types/customer-types';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta: {
    timestamp: string;
    version: string;
  };
  pagination?: CustomerPagination;
}

interface GetAllParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'churned';
  clv_segment?: 'high_value' | 'medium_value' | 'low_value';
  gender?: 'male' | 'female';
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search?: string;
}

export const CustomerService = {
  // Get all customers with filters
  getAll: async (params?: GetAllParams) => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.clv_segment) queryParams.append('clv_segment', params.clv_segment);
    if (params?.gender) queryParams.append('gender', params.gender);
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.sort_order) queryParams.append('sort_order', params.sort_order);
    if (params?.search) queryParams.append('search', params.search);

    const url = `/api/v1/feature/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await apiClient.get<ApiResponse<Customer[]>>(url);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch customers');
    }

    return {
      customers: response.data.data,
      pagination: response.data.pagination!,
    };
  },

  // Get customer statistics
  getStatistics: async (): Promise<CustomerStatistics> => {
    const response = await apiClient.get<ApiResponse<CustomerStatistics>>(
      '/api/v1/feature/customers/statistics'
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch statistics');
    }

    return response.data.data;
  },

  // Get customer by ID
  getById: async (id: string): Promise<Customer> => {
    const response = await apiClient.get<ApiResponse<Customer>>(
      `/api/v1/feature/customers/${id}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch customer');
    }

    return response.data.data;
  },

  // Create customer
  create: async (data: CreateCustomerDto): Promise<Customer> => {
    const response = await apiClient.post<ApiResponse<Customer>>(
      '/api/v1/feature/customers',
      data
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create customer');
    }

    return response.data.data;
  },

  // Update customer
  update: async (id: string, data: UpdateCustomerDto): Promise<Customer> => {
    const response = await apiClient.put<ApiResponse<Customer>>(
      `/api/v1/feature/customers/${id}`,
      data
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update customer');
    }

    return response.data.data;
  },

  // Delete customer
  delete: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse>(
      `/api/v1/feature/customers/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete customer');
    }
  },
};