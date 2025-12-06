import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  CreateCustomerDto,
  Customer,
  CustomerState,
  UpdateCustomerDto,
} from '@/types/customer-types';
import { CustomerService } from '@/services/customer.service';

const initialState: CustomerState = {
  items: [],
  statistics: null,
  filters: {
    searchTerm: '',
    status: 'all',
    clv_segment: 'all',
    gender: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  },
  pagination: {
    total: 0,
    count: 0,
    per_page: 20,
    current_page: 1,
    total_pages: 0,
    offset: 0,
  },
  selectedItem: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchCustomers = createAsyncThunk(
  'customers/fetchAll',
  async (params: {
    page?: number;
    limit?: number;
    filters?: CustomerState['filters'];
  } = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 20, filters } = params;
      
      const response = await CustomerService.getAll({
        page,
        limit,
        status: filters?.status !== 'all' ? filters?.status : undefined,
        clv_segment: filters?.clv_segment !== 'all' ? filters?.clv_segment : undefined,
        gender: filters?.gender !== 'all' ? filters?.gender : undefined,
        sort_by: filters?.sortBy,
        sort_order: filters?.sortOrder,
        search: filters?.searchTerm || undefined,
      });

      return response;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch customers';
      return rejectWithValue(message);
    }
  }
);

export const fetchCustomerStatistics = createAsyncThunk(
  'customers/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const data = await CustomerService.getStatistics();
      return data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch statistics';
      return rejectWithValue(message);
    }
  }
);

export const fetchCustomerDetail = createAsyncThunk(
  'customers/fetchDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await CustomerService.getById(id);
      return data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch customer detail';
      return rejectWithValue(message);
    }
  }
);

export const createCustomer = createAsyncThunk(
  'customers/create',
  async (data: CreateCustomerDto, { rejectWithValue }) => {
    try {
      const customer = await CustomerService.create(data);
      return customer;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to create customer';
      return rejectWithValue(message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async ({ id, data }: { id: string; data: UpdateCustomerDto }, { rejectWithValue }) => {
    try {
      const customer = await CustomerService.update(id, data);
      return customer;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to update customer';
      return rejectWithValue(message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await CustomerService.delete(id);
      return id;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to delete customer';
      return rejectWithValue(message);
    }
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    // Filters
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },

    setStatusFilter: (state, action: PayloadAction<CustomerState['filters']['status']>) => {
      state.filters.status = action.payload;
    },

    setCLVSegmentFilter: (state, action: PayloadAction<CustomerState['filters']['clv_segment']>) => {
      state.filters.clv_segment = action.payload;
    },

    setGenderFilter: (state, action: PayloadAction<CustomerState['filters']['gender']>) => {
      state.filters.gender = action.payload;
    },

    setSorting: (state, action: PayloadAction<{ sortBy: CustomerState['filters']['sortBy']; sortOrder: CustomerState['filters']['sortOrder'] }>) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
    },

    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.current_page = action.payload;
    },

    // Detail
    setSelectedItem: (state, action: PayloadAction<Customer | null>) => {
      state.selectedItem = action.payload;
    },

    // Reset
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Customers
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.customers;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Statistics
    builder
      .addCase(fetchCustomerStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchCustomerStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Detail
    builder
      .addCase(fetchCustomerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchCustomerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Customer
    builder
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Customer
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Customer
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchTerm,
  setStatusFilter,
  setCLVSegmentFilter,
  setGenderFilter,
  setSorting,
  setCurrentPage,
  setSelectedItem,
  resetFilters,
  clearError,
} = customerSlice.actions;

export default customerSlice.reducer;