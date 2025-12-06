import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Product, ProductState } from '@/types/product-types';
import { ProductService } from '@/services/product.service';

const initialState: ProductState = {
  items: [],
  categories: [],
  filteredItems: [],
  filters: {
    searchTerm: '',
    category: 'All',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    totalPages: 0,
  },
  selectedItem: null,
  loading: false,
  error: null,
  stats: {
    total: 0,
    data: 0,
    voice: 0,
    combo: 0,
    addon: 0,
  },
  viewMode: 'grid',
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params: { page?: number; limit?: number } | undefined, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { filters, pagination } = state.product;

      // Fix: Don't send category if it's 'All'
      const categoryParam = filters.category !== 'All' ? filters.category : undefined;

      const response = await ProductService.getAll({
        page: params?.page || pagination.currentPage,
        limit: params?.limit || pagination.itemsPerPage,
        search: filters.searchTerm || undefined,
        category: categoryParam,
        min_price: filters.minPrice,
        max_price: filters.maxPrice,
      });

      return response;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type and console.error
      const message = error instanceof Error ? error.message : 'Failed to fetch products';
      return rejectWithValue(message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await ProductService.getCategories();
      return categories;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch categories';
      return rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      state.pagination.currentPage = 1;
    },
    setCategoryFilter: (state, action: PayloadAction<ProductState['filters']['category']>) => {
      state.filters.category = action.payload;
      state.pagination.currentPage = 1;
    },
    setPriceRange: (state, action: PayloadAction<{ min?: number; max?: number }>) => {
      state.filters.minPrice = action.payload.min;
      state.filters.maxPrice = action.payload.max;
      state.pagination.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'table'>) => {
      state.viewMode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
    setSelectedItem: (state, action: PayloadAction<Product | null>) => {
      state.selectedItem = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.unshift(action.payload);
      state.stats.total += 1;
      state.stats[action.payload.category] += 1;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.stats.total -= 1;
        state.stats[product.category] -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.filteredItems = action.payload.products;
        
        if (action.payload.pagination) {
          state.pagination.totalItems = action.payload.pagination.total;
          state.pagination.totalPages = action.payload.pagination.total_pages;
          state.pagination.currentPage = action.payload.pagination.current_page;
          state.pagination.itemsPerPage = action.payload.pagination.per_page;
        }

        state.stats.total = action.payload.pagination?.total || action.payload.products.length;
        state.stats.data = action.payload.products.filter((p) => p.category === 'data').length;
        state.stats.voice = action.payload.products.filter((p) => p.category === 'voice').length;
        state.stats.combo = action.payload.products.filter((p) => p.category === 'combo').length;
        state.stats.addon = action.payload.products.filter((p) => p.category === 'addon').length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // ✅ Fixed: Removed console.error
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPaginatedItems = (state: RootState) => {
  const { items, filteredItems } = state.product;
  
  // Return items directly since backend handles pagination
  // Use filteredItems if available, otherwise use items
  const result = filteredItems.length > 0 ? filteredItems : items;  
  
  return result;
};

export const selectPageInfo = (state: RootState) => {
  const { pagination } = state.product;
  return {
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalItems: pagination.totalItems,
    itemsPerPage: pagination.itemsPerPage,
  };
};

export const {
  setSearchTerm,
  setCategoryFilter,
  setPriceRange,
  setPage,
  setViewMode,
  setLoading,
  resetFilters,
  setSelectedItem,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;