📚 Module Implementation Template Guide
Panduan lengkap untuk membuat module baru dengan pattern dan struktur yang sama seperti Customer Module.

🎯 Overview
Template ini menyediakan struktur standar untuk membuat module baru dengan:

✅ Redux Toolkit state management
✅ TypeScript type safety
✅ Reusable UI components
✅ Consistent patterns & architecture
✅ Loading & error states
✅ Search, filter, & pagination
✅ List & detail pages

🗂️ Standard Module Structure
app/
├── [module-name]/
│ ├── page.tsx # List Page
│ ├── [id]/
│ │ ├── page.tsx # Detail Page
│ │ └── components/
│ │ ├── index.tsx # Export barrel
│ │ ├── [Module]DetailHeader.tsx
│ │ ├── [Info]Card.tsx # Multiple info cards
│ │ └── [Related]Card.tsx
│ └── components/
│ ├── index.tsx # Export barrel
│ ├── [Module]ListHeader.tsx
│ ├── [Module]StatsCards.tsx
│ ├── [Module]Filters.tsx
│ ├── [Module]Table.tsx
│ ├── [Module]TableRow.tsx
│ └── [Module]Pagination.tsx
│
store/
└── slices/
└── [module]Slice.ts # Redux slice

📋 Step-by-Step Implementation
Step 1: Define Types & Interfaces
typescript// types/[module].types.ts

export interface [Module] {
id: string;
name: string;
status: 'Active' | 'Inactive' | 'Pending';
createdAt: string;
updatedAt: string;
// Add your specific fields
}

export interface [Module]Detail extends [Module] {
// Additional detailed fields
description?: string;
metadata?: Record<string, any>;
relatedItems?: RelatedItem[];
}

export interface [Module]Filters {
searchTerm: string;
status: 'All' | 'Active' | 'Inactive' | 'Pending';
// Add custom filters
}

export interface [Module]Stats {
total: number;
active: number;
inactive: number;
pending: number;
}

export interface [Module]State {
items: [Module][];
filteredItems: [Module][];
filters: [Module]Filters;
pagination: {
currentPage: number;
itemsPerPage: number;
totalItems: number;
totalPages: number;
};
selectedItem: [Module]Detail | null;
loading: boolean;
error: string | null;
stats: [Module]Stats;
}

Step 2: Create Redux Slice
typescript// store/slices/[module]Slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { [Module], [Module]Detail, [Module]State } from '@/types/[module].types';

const initialState: [Module]State = {
items: [],
filteredItems: [],
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
selectedItem: null,
loading: false,
error: null,
stats: {
total: 0,
active: 0,
inactive: 0,
pending: 0,
},
};

const [module]Slice = createSlice({
name: '[module]',
initialState,
reducers: {
// Load data
setItems: (state, action: PayloadAction<[Module][]>) => {
state.items = action.payload;
state.filteredItems = action.payload;
state.stats = calculateStats(action.payload);
state.pagination.totalItems = action.payload.length;
state.pagination.totalPages = Math.ceil(
action.payload.length / state.pagination.itemsPerPage
);
},

    // Search & Filters
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      applyFilters(state);
    },

    setStatusFilter: (state, action: PayloadAction<[Module]Filters['status']>) => {
      state.filters.status = action.payload;
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
    setSelectedItem: (state, action: PayloadAction<[Module]Detail | null>) => {
      state.selectedItem = action.payload;
    },

    // Loading & Error
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Reset
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
      applyFilters(state);
    },

},
});

// Helper Functions
function applyFilters(state: [Module]State) {
let filtered = state.items;

// Search filter
if (state.filters.searchTerm) {
const search = state.filters.searchTerm.toLowerCase();
filtered = filtered.filter(
(item) =>
item.id.toLowerCase().includes(search) ||
item.name.toLowerCase().includes(search)
);
}

// Status filter
if (state.filters.status !== 'All') {
filtered = filtered.filter(
(item) => item.status === state.filters.status
);
}

state.filteredItems = filtered;
state.pagination.totalItems = filtered.length;
state.pagination.totalPages = Math.ceil(
filtered.length / state.pagination.itemsPerPage
);
}

function calculateStats(items: [Module][]): [Module]Stats {
return {
total: items.length,
active: items.filter((item) => item.status === 'Active').length,
inactive: items.filter((item) => item.status === 'Inactive').length,
pending: items.filter((item) => item.status === 'Pending').length,
};
}

// Selectors
export const selectPaginatedItems = (state: RootState) => {
const { filteredItems, pagination } = state.[module];
const start = (pagination.currentPage - 1) \* pagination.itemsPerPage;
const end = start + pagination.itemsPerPage;
return filteredItems.slice(start, end);
};

export const selectPageInfo = (state: RootState) => {
const { pagination } = state.[module];
const start = (pagination.currentPage - 1) _ pagination.itemsPerPage + 1;
const end = Math.min(
pagination.currentPage _ pagination.itemsPerPage,
pagination.totalItems
);
return { start, end, total: pagination.totalItems };
};

export const {
setItems,
setSearchTerm,
setStatusFilter,
setCurrentPage,
setItemsPerPage,
setSelectedItem,
setLoading,
setError,
resetFilters,
} = [module]Slice.actions;

export default [module]Slice.reducer;

Step 3: Update Redux Store
typescript// store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';
import [module]Reducer from './slices/[module]Slice'; // Add new reducer

export const store = configureStore({
reducer: {
customers: customerReducer,
[module]: [module]Reducer, // Add here
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

Step 4: Create List Page Components
A. List Header Component
typescript// app/[module]/components/[Module]ListHeader.tsx

'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface [Module]ListHeaderProps {
onAddNew?: () => void;
}

export function [Module]ListHeader({ onAddNew }: [Module]ListHeaderProps) {
return (
<div className="flex items-center justify-between">
<div>
<h1 className="text-3xl font-bold tracking-tight">[Module] Management</h1>
<p className="text-muted-foreground">
Manage and monitor all [module] records
</p>
</div>
{onAddNew && (
<Button onClick={onAddNew} className="gap-2">
<Plus className="h-4 w-4" />
Add New [Module]
</Button>
)}
</div>
);
}
B. Stats Cards Component
typescript// app/[module]/components/[Module]StatsCards.tsx

'use client';

import { Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { useAppSelector } from '@/store/hooks';

export function [Module]StatsCards() {
const { stats } = useAppSelector((state) => state.[module]);

return (
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
<KPICard
        title="Total [Module]s"
        value={stats.total}
        icon={Users}
        color="blue"
        subtitle="All records"
      />
<KPICard
        title="Active"
        value={stats.active}
        icon={CheckCircle}
        color="green"
        subtitle="Currently active"
      />
<KPICard
        title="Inactive"
        value={stats.inactive}
        icon={XCircle}
        color="red"
        subtitle="Deactivated"
      />
<KPICard
        title="Pending"
        value={stats.pending}
        icon={Clock}
        color="yellow"
        subtitle="Awaiting action"
      />
</div>
);
}
C. Filters Component
typescript// app/[module]/components/[Module]Filters.tsx

'use client';

import { SearchBar } from '@/components/ui/SearchBar';
import { Filter } from '@/components/ui/Filter';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchTerm, setStatusFilter, resetFilters } from '@/store/slices/[module]Slice';

export function [Module]Filters() {
const dispatch = useAppDispatch();
const { filters } = useAppSelector((state) => state.[module]);

const statusOptions = [
{ value: 'All', label: 'All Status' },
{ value: 'Active', label: 'Active' },
{ value: 'Inactive', label: 'Inactive' },
{ value: 'Pending', label: 'Pending' },
];

return (
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
<div className="flex flex-1 gap-4">
<SearchBar
value={filters.searchTerm}
onChange={(value) => dispatch(setSearchTerm(value))}
placeholder="Search by ID or name..."
className="max-w-md"
/>
<Filter
options={statusOptions}
value={filters.status}
onChange={(value) => dispatch(setStatusFilter(value as any))}
placeholder="Filter by status"
/>
</div>
<Button
variant="outline"
onClick={() => dispatch(resetFilters())}
className="gap-2" >
<RotateCcw className="h-4 w-4" />
Reset Filters
</Button>
</div>
);
}
D. Table Component
typescript// app/[module]/components/[Module]Table.tsx

'use client';

import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/store/hooks';
import { selectPaginatedItems } from '@/store/slices/[module]Slice';
import { useRouter } from 'next/navigation';
import type { [Module] } from '@/types/[module].types';

export function [Module]Table() {
const router = useRouter();
const items = useAppSelector(selectPaginatedItems);
const { loading } = useAppSelector((state) => state.[module]);

const columns = [
{
key: 'id',
label: 'ID',
render: (item: [Module]) => (
<span className="font-mono text-sm">{item.id}</span>
),
},
{
key: 'name',
label: 'Name',
render: (item: [Module]) => (
<span className="font-medium">{item.name}</span>
),
},
{
key: 'status',
label: 'Status',
render: (item: [Module]) => (
<Badge
variant={
item.status === 'Active'
? 'success'
: item.status === 'Inactive'
? 'destructive'
: 'secondary'
} >
{item.status}
</Badge>
),
},
{
key: 'createdAt',
label: 'Created',
render: (item: [Module]) => (
<span className="text-sm text-muted-foreground">
{new Date(item.createdAt).toLocaleDateString()}
</span>
),
},
];

return (
<Table
columns={columns}
data={items}
loading={loading}
emptyMessage="No [module] records found"
onRowClick={(item) => router.push(`/[module]/${item.id}`)}
hoverable
striped
/>
);
}
E. Pagination Component
typescript// app/[module]/components/[Module]Pagination.tsx

'use client';

import { Pagination } from '@/components/ui/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentPage } from '@/store/slices/[module]Slice';
import { selectPageInfo } from '@/store/slices/[module]Slice';

export function [Module]Pagination() {
const dispatch = useAppDispatch();
const { pagination } = useAppSelector((state) => state.[module]);
const pageInfo = useAppSelector(selectPageInfo);

return (
<Pagination
currentPage={pagination.currentPage}
totalPages={pagination.totalPages}
onPageChange={(page) => dispatch(setCurrentPage(page))}
itemsPerPage={pagination.itemsPerPage}
totalItems={pagination.totalItems}
showInfo
/>
);
}
F. Export Barrel
typescript// app/[module]/components/index.tsx

export { [Module]ListHeader } from './[Module]ListHeader';
export { [Module]StatsCards } from './[Module]StatsCards';
export { [Module]Filters } from './[Module]Filters';
export { [Module]Table } from './[Module]Table';
export { [Module]Pagination } from './[Module]Pagination';

Step 5: Create List Page
typescript// app/[module]/page.tsx

'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setItems } from '@/store/slices/[module]Slice';
import {
[Module]ListHeader,
[Module]StatsCards,
[Module]Filters,
[Module]Table,
[Module]Pagination,
} from './components';

// Mock data - replace with API call
const mockData = [
{
id: '[module]\_001',
name: 'Sample Item 1',
status: 'Active',
createdAt: '2024-01-01',
updatedAt: '2024-01-15',
},
// Add more mock data
];

export default function [Module]Page() {
const dispatch = useAppDispatch();

useEffect(() => {
// Replace with actual API call
dispatch(setItems(mockData));
}, [dispatch]);

return (
<div className="container mx-auto space-y-6 p-6">
<[Module]ListHeader />
<[Module]StatsCards />
<[Module]Filters />
<[Module]Table />
<[Module]Pagination />
</div>
);
}

Step 6: Create Detail Page Components
A. Detail Header Component
typescript// app/[module]/[id]/components/[Module]DetailHeader.tsx

'use client';

import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import type { [Module]Detail } from '@/types/[module].types';

interface [Module]DetailHeaderProps {
item: [Module]Detail;
onEdit?: () => void;
onDelete?: () => void;
}

export function [Module]DetailHeader({
item,
onEdit,
onDelete,
}: [Module]DetailHeaderProps) {
const router = useRouter();

return (
<div className="flex items-start justify-between">
<div className="space-y-1">
<Button
variant="ghost"
onClick={() => router.push('/[module]')}
className="mb-2 gap-2 px-0" >
<ArrowLeft className="h-4 w-4" />
Back to [Module] List
</Button>
<div className="flex items-center gap-3">
<h1 className="text-3xl font-bold">{item.name}</h1>
<Badge
variant={
item.status === 'Active'
? 'success'
: item.status === 'Inactive'
? 'destructive'
: 'secondary'
} >
{item.status}
</Badge>
</div>
<p className="text-muted-foreground">ID: {item.id}</p>
</div>
<div className="flex gap-2">
{onEdit && (
<Button onClick={onEdit} variant="outline" className="gap-2">
<Edit className="h-4 w-4" />
Edit
</Button>
)}
{onDelete && (
<Button
            onClick={onDelete}
            variant="destructive"
            className="gap-2"
          >
<Trash2 className="h-4 w-4" />
Delete
</Button>
)}
</div>
</div>
);
}
B. Info Cards
typescript// app/[module]/[id]/components/BasicInfoCard.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/StatCard';
import { Calendar, User, Clock } from 'lucide-react';
import type { [Module]Detail } from '@/types/[module].types';

interface BasicInfoCardProps {
item: [Module]Detail;
}

export function BasicInfoCard({ item }: BasicInfoCardProps) {
return (
<Card>
<CardHeader>
<CardTitle>Basic Information</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<div className="grid gap-4 md:grid-cols-2">
<StatCard
label="Created Date"
value={new Date(item.createdAt).toLocaleDateString()}
icon={<Calendar className="h-4 w-4" />}
/>
<StatCard
label="Last Updated"
value={new Date(item.updatedAt).toLocaleDateString()}
icon={<Clock className="h-4 w-4" />}
/>
</div>
{item.description && (
<div>
<h4 className="mb-2 font-medium">Description</h4>
<p className="text-sm text-muted-foreground">
{item.description}
</p>
</div>
)}
</CardContent>
</Card>
);
}
C. Export Barrel
typescript// app/[module]/[id]/components/index.tsx

export { [Module]DetailHeader } from './[Module]DetailHeader';
export { BasicInfoCard } from './BasicInfoCard';
// Export other detail cards

Step 7: Create Detail Page
typescript// app/[module]/[id]/page.tsx

'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedItem, setLoading } from '@/store/slices/[module]Slice';
import { [Module]DetailHeader, BasicInfoCard } from './components';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Mock detail data - replace with API call
const mockDetailData = {
id: '[module]\_001',
name: 'Sample Item 1',
status: 'Active',
createdAt: '2024-01-01',
updatedAt: '2024-01-15',
description: 'This is a sample description',
// Add more detailed fields
};

export default function [Module]DetailPage() {
const params = useParams();
const dispatch = useAppDispatch();
const { selectedItem, loading } = useAppSelector((state) => state.[module]);

useEffect(() => {
const loadData = async () => {
dispatch(setLoading(true));
try {
// Replace with actual API call
// const data = await fetch(`/api/[module]/${params.id}`).then(r => r.json());
dispatch(setSelectedItem(mockDetailData));
} catch (error) {
console.error('Failed to load [module] detail:', error);
} finally {
dispatch(setLoading(false));
}
};

    loadData();

}, [params.id, dispatch]);

if (loading) {
return (
<div className="flex min-h-screen items-center justify-center">
<LoadingSpinner size="large" />
</div>
);
}

if (!selectedItem) {
return (
<div className="container mx-auto p-6">
<div className="text-center">
<h2 className="text-2xl font-bold">Item Not Found</h2>
<p className="text-muted-foreground">
The requested [module] could not be found.
</p>
</div>
</div>
);
}

return (
<div className="container mx-auto space-y-6 p-6">
<[Module]DetailHeader item={selectedItem} />
<div className="grid gap-6 md:grid-cols-2">
<BasicInfoCard item={selectedItem} />
{/_ Add more info cards _/}
</div>
</div>
);
}

🎨 Customization Guidelines
Adding Custom Filters
typescript// In [module]Slice.ts
export interface [Module]Filters {
searchTerm: string;
status: 'All' | 'Active' | 'Inactive';
category?: string; // Add custom filter
dateRange?: { // Add date range filter
start: Date;
end: Date;
};
}

// Add reducer
setCategoryFilter: (state, action: PayloadAction<string>) => {
state.filters.category = action.payload;
applyFilters(state);
},

// Update applyFilters function
function applyFilters(state: [Module]State) {
let filtered = state.items;

// Category filter
if (state.filters.category) {
filtered = filtered.filter(
(item) => item.category === state.filters.category
);
}

// ... rest of filters
}
Adding Sorting
typescript// Add to state
sorting: {
field: keyof [Module];
direction: 'asc' | 'desc';
}

// Add reducer
setSorting: (state, action: PayloadAction<{ field: keyof [Module]; direction: 'asc' | 'desc' }>) => {
state.sorting = action.payload;
state.filteredItems.sort((a, b) => {
const aVal = a[action.payload.field];
const bVal = b[action.payload.field];
const modifier = action.payload.direction === 'asc' ? 1 : -1;
return aVal > bVal ? modifier : -modifier;
});
},
Adding Bulk Actions
typescript// Add to state
selectedIds: string[];

// Add reducers
toggleSelection: (state, action: PayloadAction<string>) => {
const id = action.payload;
if (state.selectedIds.includes(id)) {
state.selectedIds = state.selectedIds.filter((i) => i !== id);
} else {
state.selectedIds.push(id);
}
},

selectAll: (state) => {
state.selectedIds = state.filteredItems.map((item) => item.id);
},

clearSelection: (state) => {
state.selectedIds = [];
},

🔄 API Integration Pattern
typescript// Create API service
// services/[module].service.ts

export const [Module]Service = {
getAll: async () => {
const response = await fetch('/api/[module]');
if (!response.ok) throw new Error('Failed to fetch');
return response.json();
},

getById: async (id: string) => {
const response = await fetch(`/api/[module]/${id}`);
if (!response.ok) throw new Error('Failed to fetch');
return response.json();
},

create: async (data: Partial<[Module]>) => {
const response = await fetch('/api/[module]', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
if (!response.ok) throw new Error('Failed to create');
return response.json();
},

update: async (id: string, data: Partial<[Module]>) => {
const response = await fetch(`/api/[module]/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
if (!response.ok) throw new Error('Failed to update');
return response.json();
},

delete: async (id: string) => {
const response = await fetch(`/api/[module]/${id}`, {
method: 'DELETE',
});
if (!response.ok) throw new Error('Failed to delete');
return response.json();
},
};
typescript// Add async thunks to slice
import { createAsyncThunk } from '@reduxjs/toolkit';
import { [Module]Service } from '@/services/[module].service';

export const fetch[Module]s = createAsyncThunk(
'[module]/fetchAll',
async (\_, { rejectWithValue }) => {
try {
return await [Module]Service.getAll();
} catch (error: any) {
return rejectWithValue(error.message);
}
}
);

export const fetch[Module]Detail = createAsyncThunk(
'[module]/fetchDetail',
async (id: string, { rejectWithValue }) => {
try {
return await [Module]Service.getById(id);
} catch (error: any) {
return rejectWithValue(error.message);
}
}
);

// Add extraReducers
extraReducers: (builder) => {
builder
.addCase(fetch[Module]s.pending, (state) => {
state.loading = true;
state.error = null;
})
.addCase(fetch[Module]s.fulfilled, (state, action) => {
state.loading = false;
state.items = action.payload;
state.filteredItems = action.payload;
state.stats = calculateStats(action.payload);
})
.addCase(fetch[Module]s.rejected, (state, action) => {
state.loading = false;
state.error = action.payload as string;
});
},

✅ Implementation Checklist
Phase 1: Setup

Create types/interfaces
Create Redux slice
Add reducer to store
Create mock data

Phase 2: List Page

Create ListHeader component
Create StatsCards component
Create Filters component
Create Table component
Create Pagination component
Create export barrel
Create list page

Phase 3: Detail Page

Create DetailHeader component
Create info card components
Create export barrel
Create detail page

Phase 4: Integration

Test search functionality
Test filter functionality
Test pagination
Test navigation
Add API integration
Add error handling
Add loading states

Phase 5: Enhancement

Add sorting
Add bulk actions
Add export functionality
Add responsive design
Add accessibility features
Write tests

📝 Quick Reference
Replace These Placeholders:

[module] → Your module name (lowercase, e.g., "product")
[Module] → Your module name (PascalCase, e.g., "Product")
[module-name] → Your module name (kebab-case, e.g., "product-management")

Standard File Naming:

Slice: [module]Slice.ts
Types: [module].types.ts
Service: [module].service.ts
Components: [Module]ComponentName.tsx

Standard Component Exports:
typescript// List page components
export { [Module]ListHeader } from './[Module]ListHeader';
export { [Module]StatsCards } from './[Module]StatsCards';
export { [Module]Filters } from './[Module]Filters';
export { [Module]Table } from './[Module]Table';
export { [Module]Pagination } from './[Module]Pagination';
// Detail page components
export { [Module]DetailHeader } from './[Module]DetailHeader';
export { BasicInfoCard } from './BasicInfoCard';

---

## 🎯 Best Practices

1. **Always use TypeScript** - Full type safety
2. **Use barrel exports** - Clean imports
3. **Implement loading states** - Better UX
4. **Handle errors gracefully** - User-friendly messages
5. **Make components reusable** - DRY principle
6. **Use Redux selectors** - Memoized data
7. **Implement search debounce** - Performance
8. **Add accessibility** - ARIA labels, keyboard nav
9. **Mobile responsive** - Mobile-first approach
10. **Write tests** - Unit & integration tests

---

**Selamat mengembangkan module baru! 🚀**RetryClaude can make mistakes. Please double-check responses.
