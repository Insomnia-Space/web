// store/slices/recommendationSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type {
  GenerateRecommendationDto,
  Recommendation,
  RecommendationDetail,
  RecommendationState,
  RecommendationStats,
} from '@/types/recommendation.types';
import { RecommendationService } from '@/services/recommendation.service';

const initialState: RecommendationState = {
  items: [],
  filteredItems: [],
  filters: {
    searchTerm: '',
    status: 'All',
    dateRange: 30,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  },
  selectedItem: null,
  loading: false,
  error: null,
  stats: {
    total: 0,
    sent: 0,
    draft: 0,
    pending: 0,
    overridden: 0,
  },
};

// Async thunks
export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchAll',
  async (customer_id: string | undefined, { rejectWithValue }) => {
    try {
      const data = await RecommendationService.getHistory(customer_id);
      return data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch recommendations';
      return rejectWithValue(message);
    }
  }
);

export const fetchRecommendationDetail = createAsyncThunk(
  'recommendations/fetchDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await RecommendationService.getDetail(id);
      return data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch recommendation detail';
      return rejectWithValue(message);
    }
  }
);

export const generateRecommendation = createAsyncThunk(
  'recommendations/generate',
  async (data: GenerateRecommendationDto, { rejectWithValue }) => {
    try {
      const result = await RecommendationService.generate(data);
      return result;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to generate recommendation';
      return rejectWithValue(message);
    }
  }
);

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    // Search & Filters
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

    setStatusFilter: (state, action: PayloadAction<RecommendationState['filters']['status']>) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

    setDateRangeFilter: (state, action: PayloadAction<7 | 30 | 90>) => {
      state.filters.dateRange = action.payload;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

    setOverriddenFilter: (state, action: PayloadAction<boolean | undefined>) => {
      state.filters.isOverridden = action.payload;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1;
      state.pagination.totalPages = Math.ceil(
        state.filteredItems.length / action.payload
      );
    },

    // Detail
    setSelectedItem: (state, action: PayloadAction<RecommendationDetail | null>) => {
      state.selectedItem = action.payload;
    },

    // Reset
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Recommendations
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        applyFilters(state);
        state.stats = calculateStats(action.payload);
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Detail
    builder
      .addCase(fetchRecommendationDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendationDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchRecommendationDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Generate Recommendation
    builder
      .addCase(generateRecommendation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRecommendation.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        applyFilters(state);
        state.stats = calculateStats(state.items);
      })
      .addCase(generateRecommendation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Helper Functions
function applyFilters(state: RecommendationState) {
  let filtered = state.items;

  // Date range filter
  const now = new Date();
  const cutoffDate = new Date(now);
  cutoffDate.setDate(cutoffDate.getDate() - state.filters.dateRange);
  filtered = filtered.filter((item) => new Date(item.created_at) >= cutoffDate);

  // Search filter
  if (state.filters.searchTerm) {
    const search = state.filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.id.toLowerCase().includes(search) ||
        item.customer_name.toLowerCase().includes(search) ||
        item.customer_id.toLowerCase().includes(search)
    );
  }

  // Status filter
  if (state.filters.status !== 'All') {
    filtered = filtered.filter((item) => item.status === state.filters.status);
  }

  // Override filter
  if (state.filters.isOverridden !== undefined) {
    filtered = filtered.filter(
      (item) => Boolean(item.is_overridden) === state.filters.isOverridden
    );
  }

  // Sort by date descending
  filtered = filtered.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  state.filteredItems = filtered;
  state.pagination.totalItems = filtered.length;
  state.pagination.totalPages = Math.ceil(
    filtered.length / state.pagination.itemsPerPage
  );
}

function calculateStats(items: Recommendation[]): RecommendationStats {
  return {
    total: items.length,
    sent: items.filter((item) => item.status === 'sent').length,
    draft: items.filter((item) => item.status === 'draft').length,
    pending: items.filter((item) => item.status === 'pending').length,
    overridden: items.filter((item) => item.is_overridden === 1).length,
  };
}

// Selectors
export const selectPaginatedItems = (state: RootState) => {
  const { filteredItems, pagination } = state.recommendation;
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const end = start + pagination.itemsPerPage;
  return filteredItems.slice(start, end);
};

export const selectPageInfo = (state: RootState) => {
  const { pagination } = state.recommendation;
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const end = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems
  );
  return { start, end, total: pagination.totalItems };
};

export const {
  setSearchTerm,
  setStatusFilter,
  setDateRangeFilter,
  setOverriddenFilter,
  setCurrentPage,
  setItemsPerPage,
  setSelectedItem,
  resetFilters,
  clearError,
} = recommendationSlice.actions;

export default recommendationSlice.reducer;