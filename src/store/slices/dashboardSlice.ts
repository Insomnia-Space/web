import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  DashboardOverview,
  ModelInfo,
  ProductPerformance,
} from '@/types/dashboard-types';
import { DashboardService } from '@/services/dashboard.service';

interface DashboardState {
  overview: DashboardOverview | null;
  productPerformance: ProductPerformance[];
  modelInfo: ModelInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  overview: null,
  productPerformance: [],
  modelInfo: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchDashboardOverview = createAsyncThunk(
  'dashboard/fetchOverview',
  async (_, { rejectWithValue }) => {
    try {
      const data = await DashboardService.getOverview();
      return data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch dashboard overview';
      return rejectWithValue(message);
    }
  }
);

export const fetchProductPerformance = createAsyncThunk(
  'dashboard/fetchProductPerformance',
  async (_, { rejectWithValue }) => {
    try {
      const data = await DashboardService.getProductPerformance();
      return data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch product performance';
      return rejectWithValue(message);
    }
  }
);

export const fetchModelInfo = createAsyncThunk(
  'dashboard/fetchModelInfo',
  async (_, { rejectWithValue }) => {
    try {
      const data = await DashboardService.getModelInfo();
      return data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch model info';
      return rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch Overview
    builder
      .addCase(fetchDashboardOverview.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Product Performance
    builder
      .addCase(fetchProductPerformance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductPerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.productPerformance = action.payload;
      })
      .addCase(fetchProductPerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Model Info
    builder
      .addCase(fetchModelInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModelInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.modelInfo = action.payload;
      })
      .addCase(fetchModelInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = dashboardSlice.actions;

export default dashboardSlice.reducer;