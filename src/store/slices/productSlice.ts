// store/slices/productSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface ProductPerformance {
  id: number;
  productName: string;
  timesRecommended: number;
  avgConfidenceScore: number;
  acceptanceRate: number;
}

interface ProductFilters {
  searchTerm: string;
  minAcceptanceRate: number | null;
  minConfidenceScore: number | null;
}

interface ProductStats {
  totalProducts: number;
  totalRecommendations: number;
  avgConfidence: number;
  avgAcceptance: number;
}

interface ProductPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface ProductState {
  products: ProductPerformance[];
  filteredProducts: ProductPerformance[];
  filters: ProductFilters;
  sortField: 'timesRecommended' | 'avgConfidenceScore' | 'acceptanceRate' | null;
  sortOrder: 'asc' | 'desc' | null;
  pagination: ProductPagination;
  loading: boolean;
  error: string | null;
  stats: ProductStats;
}

// Mock data
const mockProducts: ProductPerformance[] = [
  {
    id: 1,
    productName: 'Paket Internet Unlimited 50GB',
    timesRecommended: 245,
    avgConfidenceScore: 0.92,
    acceptanceRate: 89.5,
  },
  {
    id: 2,
    productName: 'Paket Voice & SMS Premium',
    timesRecommended: 189,
    avgConfidenceScore: 0.88,
    acceptanceRate: 85.2,
  },
  {
    id: 3,
    productName: 'Paket Streaming HD',
    timesRecommended: 167,
    avgConfidenceScore: 0.85,
    acceptanceRate: 82.7,
  },
  {
    id: 4,
    productName: 'Paket Family 100GB',
    timesRecommended: 156,
    avgConfidenceScore: 0.91,
    acceptanceRate: 91.3,
  },
  {
    id: 5,
    productName: 'Paket Gaming Low Latency',
    timesRecommended: 143,
    avgConfidenceScore: 0.87,
    acceptanceRate: 86.8,
  },
  {
    id: 6,
    productName: 'Paket Business 200GB',
    timesRecommended: 128,
    avgConfidenceScore: 0.94,
    acceptanceRate: 93.1,
  },
  {
    id: 7,
    productName: 'Paket Social Media',
    timesRecommended: 112,
    avgConfidenceScore: 0.83,
    acceptanceRate: 80.4,
  },
  {
    id: 8,
    productName: 'Paket Roaming International',
    timesRecommended: 98,
    avgConfidenceScore: 0.89,
    acceptanceRate: 87.9,
  },
];

const calculateStats = (products: ProductPerformance[]): ProductStats => {
  const totalProducts = products.length;
  const totalRecommendations = products.reduce((sum, p) => sum + p.timesRecommended, 0);
  const avgConfidence =
    totalProducts > 0
      ? (products.reduce((sum, p) => sum + p.avgConfidenceScore, 0) / totalProducts) * 100
      : 0;
  const avgAcceptance =
    totalProducts > 0 ? products.reduce((sum, p) => sum + p.acceptanceRate, 0) / totalProducts : 0;

  return {
    totalProducts,
    totalRecommendations,
    avgConfidence,
    avgAcceptance,
  };
};

const initialState: ProductState = {
  products: mockProducts,
  filteredProducts: mockProducts,
  filters: {
    searchTerm: '',
    minAcceptanceRate: null,
    minConfidenceScore: null,
  },
  sortField: null,
  sortOrder: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: mockProducts.length,
    totalPages: Math.ceil(mockProducts.length / 10),
  },
  loading: false,
  error: null,
  stats: calculateStats(mockProducts),
};

const applyFiltersAndSort = (state: ProductState) => {
  let filtered = [...state.products];

  // Apply search filter
  if (state.filters.searchTerm) {
    const searchLower = state.filters.searchTerm.toLowerCase();
    filtered = filtered.filter(product => product.productName.toLowerCase().includes(searchLower));
  }

  // Apply acceptance rate filter
  if (state.filters.minAcceptanceRate !== null) {
    filtered = filtered.filter(
      product => product.acceptanceRate >= state.filters.minAcceptanceRate!
    );
  }

  // Apply confidence score filter
  if (state.filters.minConfidenceScore !== null) {
    filtered = filtered.filter(
      product => product.avgConfidenceScore * 100 >= state.filters.minConfidenceScore!
    );
  }

  // Apply sorting
  if (state.sortField && state.sortOrder) {
    filtered.sort((a, b) => {
      const aValue = a[state.sortField!];
      const bValue = b[state.sortField!];
      return state.sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
    });
  }

  state.filteredProducts = filtered;
  state.stats = calculateStats(filtered);

  // Update pagination
  state.pagination.totalItems = filtered.length;
  state.pagination.totalPages = Math.ceil(filtered.length / state.pagination.itemsPerPage);

  // Reset to page 1 if current page exceeds total pages
  if (
    state.pagination.currentPage > state.pagination.totalPages &&
    state.pagination.totalPages > 0
  ) {
    state.pagination.currentPage = 1;
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      applyFiltersAndSort(state);
    },
    setMinAcceptanceRate: (state, action: PayloadAction<number | null>) => {
      state.filters.minAcceptanceRate = action.payload;
      applyFiltersAndSort(state);
    },
    setMinConfidenceScore: (state, action: PayloadAction<number | null>) => {
      state.filters.minConfidenceScore = action.payload;
      applyFiltersAndSort(state);
    },
    setSorting: (
      state,
      action: PayloadAction<{
        field: 'timesRecommended' | 'avgConfidenceScore' | 'acceptanceRate';
      }>
    ) => {
      const { field } = action.payload;

      if (state.sortField === field) {
        // Toggle sort order
        if (state.sortOrder === 'desc') {
          state.sortOrder = 'asc';
        } else if (state.sortOrder === 'asc') {
          state.sortOrder = null;
          state.sortField = null;
        } else {
          state.sortOrder = 'desc';
        }
      } else {
        state.sortField = field;
        state.sortOrder = 'desc';
      }

      applyFiltersAndSort(state);
    },
    clearFilters: state => {
      state.filters = {
        searchTerm: '',
        minAcceptanceRate: null,
        minConfidenceScore: null,
      };
      state.sortField = null;
      state.sortOrder = null;
      state.pagination.currentPage = 1;
      applyFiltersAndSort(state);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1;
      state.pagination.totalPages = Math.ceil(state.filteredProducts.length / action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setMinAcceptanceRate,
  setMinConfidenceScore,
  setSorting,
  clearFilters,
  setPage,
  setItemsPerPage,
  setLoading,
  setError,
} = productSlice.actions;

// Selectors
export const selectAllProducts = (state: RootState) => state.products.filteredProducts;
export const selectPaginatedProducts = (state: RootState) => {
  const { filteredProducts, pagination } = state.products;
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  return filteredProducts.slice(startIndex, endIndex);
};
export const selectProductStats = (state: RootState) => state.products.stats;
export const selectProductFilters = (state: RootState) => state.products.filters;
export const selectProductSorting = (state: RootState) => ({
  sortField: state.products.sortField,
  sortOrder: state.products.sortOrder,
});
export const selectProductPagination = (state: RootState) => state.products.pagination;
export const selectProductLoading = (state: RootState) => state.products.loading;

export default productSlice.reducer;
