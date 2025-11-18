# 📚 Customer Module Implementation Guide

## 🗂️ Complete File Structure

```
project-root/
├── app/
│   ├── layout.tsx                        # Add ReduxProvider here
│   └── customers/
│       ├── page.tsx                      # Customer List Page ✅
│       ├── [id]/
│       │   ├── page.tsx                  # Customer Detail Page ✅
│       │   └── components/
│       │       ├── index.tsx             # Export barrel ✅
│       │       ├── CustomerDetailHeader.tsx ✅
│       │       ├── DemographicsCard.tsx     ✅
│       │       ├── SubscriptionCard.tsx     ✅
│       │       ├── UsagePatternCard.tsx     ✅
│       │       └── TransactionHistoryCard.tsx ✅
│       └── components/
│           ├── index.tsx                 # Export barrel ✅
│           ├── CustomerListHeader.tsx    ✅
│           ├── CustomerStatsCards.tsx    ✅
│           ├── CustomerFilters.tsx       ✅
│           ├── CustomerTable.tsx         ✅
│           ├── CustomerTableRow.tsx      ✅
│           └── CustomerPagination.tsx    ✅
│
├── store/
│   ├── store.ts                          # Redux store config ✅
│   ├── hooks.ts                          # Typed hooks ✅
│   ├── provider.tsx                      # Redux Provider ✅
│   └── slices/
│       └── customerSlice.ts              # Customer slice ✅
│
├── components/
│   └── ui/
│       ├── SearchBar.tsx                 # ✅ (already provided)
│       ├── Filter.tsx                    # ✅ (already provided)
│       ├── EmptyState.tsx                # ✅ (already provided)
│       ├── badge.tsx                     # ⚠️ Shadcn component (install)
│       ├── KPICard.tsx                   # ✅ NEW
│       ├── StatCard.tsx                  # ✅ NEW
│       ├── Pagination.tsx                # ✅ NEW
│       ├── Table.tsx                     # ✅ NEW
│       └── LoadingSpinner.tsx            # ✅ NEW
│
├── hooks/
│   └── use-toast.ts                      # ✅ Toast notification hook
│
└── lib/
    └── utils.ts                          # ✅ cn() utility function
```

---

## 📦 Installation Steps

### 1. Install Required Dependencies

```bash
# Redux Toolkit & React Redux
npm install @reduxjs/toolkit react-redux

# Utility libraries
npm install clsx tailwind-merge

# Lucide Icons (if not installed)
npm install lucide-react

# Shadcn Badge component
npx shadcn-ui@latest add badge
```

### 2. Setup Redux Store

Create the following files in order:

1. `store/slices/customerSlice.ts` - Redux slice
2. `store/store.ts` - Store configuration
3. `store/hooks.ts` - Typed hooks
4. `store/provider.tsx` - Redux Provider component

### 3. Update Root Layout

```typescript
// app/layout.tsx
import { ReduxProvider } from '@/store/provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
```

### 4. Create UI Components

Create all components in `components/ui/`:

- KPICard.tsx
- StatCard.tsx
- Pagination.tsx
- Table.tsx
- LoadingSpinner.tsx

### 5. Create Customer Components

**Customer List Components** (`app/customers/components/`):

- CustomerListHeader.tsx
- CustomerStatsCards.tsx
- CustomerFilters.tsx
- CustomerTable.tsx
- CustomerTableRow.tsx
- CustomerPagination.tsx
- index.tsx (export barrel)

**Customer Detail Components** (`app/customers/[id]/components/`):

- CustomerDetailHeader.tsx
- DemographicsCard.tsx
- SubscriptionCard.tsx
- UsagePatternCard.tsx
- TransactionHistoryCard.tsx
- index.tsx (export barrel)

### 6. Create Pages

- `app/customers/page.tsx` - Customer List Page
- `app/customers/[id]/page.tsx` - Customer Detail Page

---

## 🎯 Features Implemented

### Customer List Page

✅ Search by Customer ID or Name (debounced)  
✅ Filter by Status (All/Active/Churned)  
✅ Pagination (20 items per page)  
✅ Statistics Cards (Total, Active, Churned)  
✅ Click row to view detail  
✅ Loading states  
✅ Empty states  
✅ Redux state management

### Customer Detail Page

✅ Complete demographics information  
✅ Subscription details  
✅ Usage pattern cards (Data, Call, SMS)  
✅ Transaction history (last 5)  
✅ Generate recommendation button  
✅ Back to list navigation  
✅ Loading states  
✅ Error handling

---

## 🔧 Redux State Structure

```typescript
{
  customers: {
    customers: Customer[],           // All customers
    filteredCustomers: Customer[],   // Filtered by search & status
    filters: {
      searchTerm: string,
      status: 'All' | 'Active' | 'Churned'
    },
    pagination: {
      currentPage: number,
      itemsPerPage: number,
      totalItems: number,
      totalPages: number
    },
    selectedCustomer: CustomerDetail | null,
    loading: boolean,
    error: string | null,
    stats: {
      total: number,
      active: number,
      churned: number
    }
  }
}
```

---

## 🎨 Component Props Reference

### KPICard

```typescript
interface KPICardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: { value: number; direction: 'up' | 'down' };
  subtitle?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  className?: string;
}
```

### StatCard

```typescript
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
}
```

### Pagination

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  showInfo?: boolean;
  className?: string;
}
```

### Table

```typescript
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  hoverable?: boolean;
  striped?: boolean;
  className?: string;
}
```

---

## 🚀 Usage Examples

### Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchTerm, setStatusFilter } from '@/store/slices/customerSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { filters, loading } = useAppSelector((state) => state.customers);

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return <SearchBar value={filters.searchTerm} onChange={handleSearch} />;
}
```

### Using Selectors

```typescript
import { selectPaginatedCustomers, selectPageInfo } from '@/store/slices/customerSlice';

const paginatedCustomers = useAppSelector(selectPaginatedCustomers);
const pageInfo = useAppSelector(selectPageInfo);
```

### Using Toast Notifications

```typescript
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: 'Success',
  description: 'Customer updated successfully',
});

// Error toast
toast({
  title: 'Error',
  description: 'Failed to load customer',
  variant: 'destructive',
});
```

---

## 🔄 API Integration (TODO)

Replace mock data with actual API calls:

### Customer List

```typescript
// In customerSlice.ts
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// In page.tsx
useEffect(() => {
  dispatch(fetchCustomers());
}, [dispatch]);
```

### Customer Detail

```typescript
export const fetchCustomerDetail = createAsyncThunk(
  'customers/fetchCustomerDetail',
  async (customerId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

---

## ✅ Testing Checklist

### Customer List Page

- [ ] Search by customer ID works
- [ ] Search by customer name works
- [ ] Filter by status (All/Active/Churned) works
- [ ] Pagination changes page correctly
- [ ] Statistics cards show correct numbers
- [ ] Click row navigates to detail page
- [ ] Loading state displays during data fetch
- [ ] Empty state shows when no results
- [ ] Search debounce works (300ms delay)

### Customer Detail Page

- [ ] All customer information displays correctly
- [ ] Back button navigates to list
- [ ] Generate recommendation button works
- [ ] Loading state during recommendation generation
- [ ] Transaction history displays correctly
- [ ] Usage pattern cards show correct data
- [ ] Error handling for invalid customer ID

---

## 🎯 Next Steps

1. **API Integration**
   - Replace mock data with actual API calls
   - Add error boundaries
   - Implement retry logic

2. **Additional Features**
   - Export to CSV functionality
   - Advanced filters (age range, CLV segment)
   - Sorting by columns
   - Bulk actions

3. **Optimization**
   - Implement React.memo for components
   - Add virtualization for large lists
   - Optimize Redux selectors with reselect

4. **Testing**
   - Unit tests for Redux slice
   - Integration tests for pages
   - E2E tests for user flows

---

## 📝 Notes

- All components are **fully typed** with TypeScript
- **Reusable components** can be used across the app
- **Redux state** is properly structured and typed
- **Loading & error states** handled throughout
- **Mobile responsive** design included
- **Accessibility** considerations in place

---

## 🐛 Common Issues & Solutions

### Issue: Redux state not persisting

**Solution:** Make sure ReduxProvider wraps your entire app in layout.tsx

### Issue: Typescript errors on useAppSelector

**Solution:** Ensure store/hooks.ts is properly configured with correct types

### Issue: Badge component not found

**Solution:** Install shadcn badge: `npx shadcn-ui@latest add badge`

### Issue: cn() utility not working

**Solution:** Install dependencies: `npm install clsx tailwind-merge`

---

## 📞 Support

If you encounter any issues during implementation, check:

1. All dependencies are installed
2. File paths match the structure exactly
3. TypeScript types are correctly imported
4. Redux Provider is in the correct location

---

**Happy Coding! 🚀**
