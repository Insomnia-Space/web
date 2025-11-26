// store/slices/productSlice.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Product, ProductDetail, ProductState } from '@/types/product.types';

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  filters: {
    searchTerm: '',
    category: 'All',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 9,
    totalItems: 0,
    totalPages: 0,
  },
  selectedItem: null,
  viewMode: 'grid',
  loading: false,
  error: null,
  stats: {
    total: 0,
    data: 0,
    voice: 0,
    combo: 0,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.stats = calculateStats(action.payload);
      state.pagination.totalItems = action.payload.length;
      state.pagination.totalPages = Math.ceil(
        action.payload.length / state.pagination.itemsPerPage
      );
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

    setCategoryFilter: (state, action: PayloadAction<ProductState['filters']['category']>) => {
      state.filters.category = action.payload;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1;
      state.pagination.totalPages = Math.ceil(state.filteredItems.length / action.payload);
    },

    setViewMode: (state, action: PayloadAction<'grid' | 'table'>) => {
      state.viewMode = action.payload;
    },

    setSelectedItem: (state, action: PayloadAction<ProductDetail | null>) => {
      state.selectedItem = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetFilters: state => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },
  },
});

function applyFilters(state: ProductState) {
  let filtered = state.items;

  if (state.filters.searchTerm) {
    const search = state.filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      item =>
        item.id.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
    );
  }

  if (state.filters.category !== 'All') {
    filtered = filtered.filter(item => item.category === state.filters.category);
  }

  state.filteredItems = filtered;
  state.pagination.totalItems = filtered.length;
  state.pagination.totalPages = Math.ceil(filtered.length / state.pagination.itemsPerPage);
}

function calculateStats(items: Product[]): ProductStats {
  return {
    total: items.length,
    data: items.filter(item => item.category === 'Data').length,
    voice: items.filter(item => item.category === 'Voice').length,
    combo: items.filter(item => item.category === 'Combo').length,
  };
}

export const selectPaginatedItems = (state: RootState) => {
  const { filteredItems, pagination } = state.product;
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const end = start + pagination.itemsPerPage;
  return filteredItems.slice(start, end);
};

export const selectPageInfo = (state: RootState) => {
  const { pagination } = state.product;
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const end = Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems);
  return { start, end, total: pagination.totalItems };
};

export const {
  setItems,
  setSearchTerm,
  setCategoryFilter,
  setCurrentPage,
  setItemsPerPage,
  setViewMode,
  setSelectedItem,
  setLoading,
  setError,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
