import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { User, UserDetail, UserState, UserStats } from '@/types/user-types';

const initialState: UserState = {
  items: [],
  filteredItems: [],
  filters: {
    searchTerm: '',
    role: 'All',
    status: 'All',
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
    active: 0,
    inactive: 0,
    admin: 0,
    user: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<User[]>) => {
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

    setRoleFilter: (state, action: PayloadAction<UserState['filters']['role']>) => {
      state.filters.role = action.payload;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

    setStatusFilter: (state, action: PayloadAction<UserState['filters']['status']>) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

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

    setSelectedItem: (state, action: PayloadAction<UserDetail | null>) => {
      state.selectedItem = action.payload;
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.items.unshift(action.payload);
      applyFilters(state);
      state.stats = calculateStats(state.items);
    },

    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.items.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        applyFilters(state);
        state.stats = calculateStats(state.items);
      }
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((u) => u.id !== action.payload);
      applyFilters(state);
      state.stats = calculateStats(state.items);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },
  },
});

function applyFilters(state: UserState) {
  let filtered = state.items;

  if (state.filters.searchTerm) {
    const search = state.filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search)
    );
  }

  if (state.filters.role !== 'All') {
    filtered = filtered.filter((item) => item.role === state.filters.role);
  }

  if (state.filters.status !== 'All') {
    filtered = filtered.filter((item) => item.status === state.filters.status);
  }

  state.filteredItems = filtered;
  state.pagination.totalItems = filtered.length;
  state.pagination.totalPages = Math.ceil(
    filtered.length / state.pagination.itemsPerPage
  );
}

function calculateStats(items: User[]): UserStats {
  return {
    total: items.length,
    active: items.filter((item) => item.status === 'active').length,
    inactive: items.filter((item) => item.status === 'inactive').length,
    admin: items.filter((item) => item.role === 'admin').length,
    user: items.filter((item) => item.role === 'user').length,
  };
}

export const selectPaginatedItems = (state: RootState) => {
  const { filteredItems, pagination } = state.user;
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const end = start + pagination.itemsPerPage;
  return filteredItems.slice(start, end);
};

export const selectPageInfo = (state: RootState) => {
  const { pagination } = state.user;
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const end = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems
  );
  return { start, end, total: pagination.totalItems };
};

export const {
  setItems,
  setSearchTerm,
  setRoleFilter,
  setStatusFilter,
  setCurrentPage,
  setItemsPerPage,
  setSelectedItem,
  addUser,
  updateUser,
  deleteUser,
  setLoading,
  setError,
  resetFilters,
} = userSlice.actions;

export default userSlice.reducer;