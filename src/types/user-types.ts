export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDetail extends User {
  lastLogin?: string;
  department?: string;
  phone?: string;
}

export interface UserFilters {
  searchTerm: string;
  role: 'All' | 'user' | 'admin';
  status: 'All' | 'active' | 'inactive';
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admin: number;
  user: number;
}

export interface UserState {
  items: User[];
  filteredItems: User[];
  filters: UserFilters;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  selectedItem: UserDetail | null;
  loading: boolean;
  error: string | null;
  stats: UserStats;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: 'user' | 'admin';
  status?: 'active' | 'inactive';
}