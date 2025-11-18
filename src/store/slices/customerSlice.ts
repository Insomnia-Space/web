import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// ==================== TYPES ====================
export interface Customer {
  id: string;
  name: string;
  age: number;
  status: 'Active' | 'Churned';
  clvSegment: 'High' | 'Medium' | 'Low';
}

export interface CustomerDetail extends Customer {
  gender: 'Male' | 'Female';
  location: string;
  occupation: string;
  email: string;
  phone: string;
  currentPlan: string;
  joinDate: string;
  avgDataUsage: number;
  callDuration: number;
  smsCount: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  product: string;
  date: string;
  price: number;
}

export interface CustomerFilters {
  searchTerm: string;
  status: 'All' | 'Active' | 'Churned';
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface CustomerState {
  // List State
  customers: Customer[];
  filteredCustomers: Customer[];
  filters: CustomerFilters;
  pagination: PaginationState;

  // Detail State
  selectedCustomer: CustomerDetail | null;

  // Loading & Error States
  loading: boolean;
  error: string | null;

  // Stats
  stats: {
    total: number;
    active: number;
    churned: number;
  };
}

// ==================== INITIAL STATE ====================
const initialState: CustomerState = {
  customers: [],
  filteredCustomers: [],
  filters: {
    searchTerm: '',
    status: 'All',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0,
    totalPages: 0,
  },
  selectedCustomer: null,
  loading: false,
  error: null,
  stats: {
    total: 0,
    active: 0,
    churned: 0,
  },
};

// ==================== ASYNC THUNKS ====================

// Fetch all customers
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/customers');
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Fetch single customer detail
export const fetchCustomerDetail = createAsyncThunk(
  'customers/fetchCustomerDetail',
  async (customerId: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/customers/${customerId}`);
      if (!response.ok) throw new Error('Failed to fetch customer detail');
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Generate recommendation
export const generateRecommendation = createAsyncThunk(
  'customers/generateRecommendation',
  async (customerId: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/recommendations/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId }),
      });
      if (!response.ok) throw new Error('Failed to generate recommendation');
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// ==================== SLICE ====================
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    // Set search term
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      state.pagination.currentPage = 1; // Reset to first page
      applyFilters(state);
    },

    // Set status filter
    setStatusFilter: (state, action: PayloadAction<'All' | 'Active' | 'Churned'>) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1; // Reset to first page
      applyFilters(state);
    },

    // Clear filters
    clearFilters: state => {
      state.filters = initialState.filters;
      state.filteredCustomers = state.customers;
      state.pagination.currentPage = 1;
      calculatePagination(state);
    },

    // Set current page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },

    // Set items per page
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page
      calculatePagination(state);
    },

    // Clear selected customer
    clearSelectedCustomer: state => {
      state.selectedCustomer = null;
    },

    // Set customers (for mock data)
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
      state.filteredCustomers = action.payload;
      calculateStats(state);
      calculatePagination(state);
    },
  },
  extraReducers: builder => {
    // Fetch Customers
    builder
      .addCase(fetchCustomers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
        state.filteredCustomers = action.payload;
        calculateStats(state);
        calculatePagination(state);
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Customer Detail
    builder
      .addCase(fetchCustomerDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(fetchCustomerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Generate Recommendation
    builder
      .addCase(generateRecommendation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRecommendation.fulfilled, state => {
        state.loading = false;
        // Handle success (e.g., show toast notification)
      })
      .addCase(generateRecommendation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ==================== HELPER FUNCTIONS ====================

// Apply filters to customer list
function applyFilters(state: CustomerState) {
  let filtered = state.customers;

  // Apply status filter
  if (state.filters.status !== 'All') {
    filtered = filtered.filter(c => c.status === state.filters.status);
  }

  // Apply search filter
  if (state.filters.searchTerm) {
    const search = state.filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      c => c.id.toLowerCase().includes(search) || c.name.toLowerCase().includes(search)
    );
  }

  state.filteredCustomers = filtered;
  calculatePagination(state);
}

// Calculate pagination
function calculatePagination(state: CustomerState) {
  state.pagination.totalItems = state.filteredCustomers.length;
  state.pagination.totalPages = Math.ceil(
    state.filteredCustomers.length / state.pagination.itemsPerPage
  );
}

// Calculate statistics
function calculateStats(state: CustomerState) {
  state.stats.total = state.customers.length;
  state.stats.active = state.customers.filter(c => c.status === 'Active').length;
  state.stats.churned = state.customers.filter(c => c.status === 'Churned').length;
}

// ==================== EXPORTS ====================
export const {
  setSearchTerm,
  setStatusFilter,
  clearFilters,
  setCurrentPage,
  setItemsPerPage,
  clearSelectedCustomer,
  setCustomers,
} = customerSlice.actions;

export default customerSlice.reducer;

// ==================== SELECTORS ====================

// Get paginated customers
export const selectPaginatedCustomers = (state: { customers: CustomerState }) => {
  const { filteredCustomers, pagination } = state.customers;
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  return filteredCustomers.slice(startIndex, endIndex);
};

// Get current page info
export const selectPageInfo = (state: { customers: CustomerState }) => {
  const { pagination } = state.customers;
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = Math.min(startIndex + pagination.itemsPerPage, pagination.totalItems);

  return {
    startIndex: startIndex + 1,
    endIndex,
    totalItems: pagination.totalItems,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
  };
};
