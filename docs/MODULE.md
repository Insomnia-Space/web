# 🚀 Frontend Development Modules - Telco Recommendation System

## 📋 Project Information

**Project:** Sistem Rekomendasi Produk Telekomunikasi  
**Tech Stack:** Next.js 14+ (App Router) | Tailwind CSS | Recharts  
**Timeline:** 5 Des - 18 Des 2025 (Week 7-8)  
**Team:** Frontend Developers

---

## 📂 Module Breakdown & Task Assignment

### **PRIORITY 1: MUST HAVE (Core Features)**

---

## 🔐 **MODULE 1: Authentication System**

**Status:** 🔴 Not Started | **Priority:** HIGH  
**Estimated Time:** 1-2 days  
**Assigned To:** `_____________`

### **FE-001: Login Page** (URQ-001)

**File:** `app/login/page.jsx`

**Requirements:**

- ✅ Email dan password input fields
- ✅ Form validation (email format, required fields)
- ✅ Loading state saat submit
- ✅ Error handling untuk kredensial salah
- ✅ Redirect ke dashboard setelah sukses login
- ✅ "Remember me" checkbox (optional)

**Components Needed:**

- Input component (email & password)
- Button component (with loading state)
- Card component (wrapper)

**API Integration:**

- `POST /api/login` → return JWT token

**Acceptance Criteria:**

- [ ] User dapat login dengan email & password
- [ ] Error message tampil jika kredensial salah
- [ ] Loading indicator tampil saat login process
- [ ] Session tersimpan dan redirect ke dashboard
- [ ] Responsive design (desktop & tablet)

---

### **FE-002: Protected Routes & Role-Based Access** (URQ-002)

**File:** `middleware.js` & `app/layout.jsx`

**Requirements:**

- ✅ Middleware untuk cek authentication
- ✅ Role-based menu rendering (Admin vs Marketing Staff)
- ✅ Protected routes (redirect ke login jika belum auth)
- ✅ Logout functionality

**Components Needed:**

- AuthContext (untuk manage auth state)
- Navbar (dengan logout button)
- Sidebar (dengan conditional menu based on role)

**Acceptance Criteria:**

- [ ] Unauthenticated user redirect ke login
- [ ] Admin melihat menu User Management
- [ ] Marketing Staff tidak melihat menu User Management
- [ ] Logout berhasil clear session & redirect ke login

---

## 👥 **MODULE 2: Customer Management**

**Status:** 🔴 Not Started | **Priority:** HIGH  
**Estimated Time:** 2-3 days  
**Assigned To:** `_____________`

### **FE-003: Customer List Page** (URQ-003)

**File:** `app/customers/page.jsx`

**Requirements:**

- ✅ Table dengan pagination (20 items/page)
- ✅ Columns: Customer ID, Name, Age, Status, CLV Segment
- ✅ Search bar (search by ID atau Name)
- ✅ Filter dropdown (Status: All/Active/Churned)
- ✅ Loading state & empty state
- ✅ Click row → navigate ke detail page

**Components Needed:**

- Table component
- Pagination component
- SearchBar component
- Filter component
- Badge component (untuk status)
- EmptyState component

**API Integration:**

- `GET /api/customers?page=1&search=&status=`

**Acceptance Criteria:**

- [ ] Table menampilkan data customer dengan benar
- [ ] Pagination berfungsi (prev, next, page numbers)
- [ ] Search by ID/Name berfungsi (debounced 300ms)
- [ ] Filter status berfungsi
- [ ] Loading skeleton tampil saat fetch data
- [ ] Empty state tampil jika no data
- [ ] Click row navigate ke customer detail

---

### **FE-004: Customer Detail Page** (URQ-004)

**File:** `app/customers/[id]/page.jsx`

**Requirements:**

- ✅ Section Demografi: Name, Age, Gender, Location, Occupation
- ✅ Section Subscription: Current Plan, Status, Join Date
- ✅ Section Usage Pattern: Avg Data Usage, Call Duration, SMS Count
- ✅ Section Transaction History: Last 5 transactions (table)
- ✅ Button "Generate Recommendation"
- ✅ Back button ke customer list

**Components Needed:**

- Card component (multiple cards untuk setiap section)
- Badge component (status)
- Table component (transaction history)
- Button component (Generate Recommendation)

**API Integration:**

- `GET /api/customers/{id}`

**Acceptance Criteria:**

- [ ] Semua customer detail tampil dengan benar
- [ ] Transaction history tampil dalam table
- [ ] Button "Generate Recommendation" visible
- [ ] Loading state saat fetch data
- [ ] 404 page jika customer tidak ditemukan

---

## 🎯 **MODULE 3: Recommendation Engine** (CORE MODULE)

**Status:** 🔴 Not Started | **Priority:** CRITICAL  
**Estimated Time:** 3-4 days  
**Assigned To:** `_____________`

### **FE-005: Generate Recommendation Modal** (URQ-005)

**File:** `components/features/recommendations/GenerateRecommendationModal.jsx`

**Requirements:**

- ✅ Modal trigger dari customer detail page
- ✅ Display Top 3 produk rekomendasi
- ✅ Confidence Score (0-100%) untuk setiap produk
- ✅ Product Details: Nama, Harga, Benefits
- ✅ Loading state saat call ML API
- ✅ Error handling jika ML service down
- ✅ Success state & close button

**Components Needed:**

- Modal component
- Card component (product card)
- ProgressBar component (confidence score)
- Badge component
- LoadingSpinner component

**API Integration:**

- `POST /api/recommendations/generate` → call ML service

**Acceptance Criteria:**

- [ ] Modal muncul saat klik "Generate Recommendation"
- [ ] Loading state tampil saat API call (max 3 detik)
- [ ] Top 3 produk tampil dengan confidence score
- [ ] Error message tampil jika ML service down
- [ ] Modal dapat di-close setelah berhasil
- [ ] Toast notification: "Recommendation generated successfully"

---

### **FE-006: Recommendation Reasoning Display** (URQ-006) 🌟 WOW FACTOR

**File:** `components/features/recommendations/ReasoningCard.jsx`

**Requirements:**

- ✅ Tampilkan reasoning dalam bahasa natural
- ✅ Contoh: "Berdasarkan usage data 45GB/bulan dan sering streaming video, paket Unlimited Pro cocok untuk Anda"
- ✅ Display dalam card yang menarik dengan icon/ilustrasi
- ✅ Highlight key metrics (usage data, call duration, etc)

**Components Needed:**

- Card component (custom styling)
- Badge component
- Tooltip component (untuk explain metrics)

**Acceptance Criteria:**

- [ ] Reasoning tampil dalam bahasa natural
- [ ] Key metrics di-highlight
- [ ] Visual design menarik (icon, color coding)
- [ ] Responsive layout

---

### **FE-007: Manual Override Feature** (URQ-007) ⭐ IMPRESSIVE

**File:** `components/features/recommendations/ManualOverride.jsx`

**Requirements:**

- ✅ Dropdown untuk pilih produk lain dari catalog
- ✅ Button "Save Override"
- ✅ Confirmation modal sebelum save
- ✅ Save dengan flag `is_overridden: true`
- ✅ Toast notification: "Override saved successfully"

**Components Needed:**

- Select component (product dropdown)
- Button component
- Modal component (confirmation)
- Toast notification

**API Integration:**

- `GET /api/products` → list all products
- `POST /api/recommendations/override`

**Acceptance Criteria:**

- [ ] Dropdown menampilkan semua produk
- [ ] Confirmation modal muncul sebelum save
- [ ] Override berhasil disimpan ke database
- [ ] Toast success tampil setelah save
- [ ] Badge "Manual Override" tampil di history

---

### **FE-008: Recommendation History Page** (URQ-008)

**File:** `app/recommendations/page.jsx`

**Requirements:**

- ✅ Table: Customer Name, Date, Products, Status, Override Flag
- ✅ Filter by date range (last 7/30/90 days)
- ✅ Pagination
- ✅ Badge untuk Manual Override
- ✅ Search by customer name
- ✅ Empty state

**Components Needed:**

- Table component
- Pagination component
- Filter component (date range)
- Badge component
- EmptyState component

**API Integration:**

- `GET /api/recommendations/history?period=30&page=1`

**Acceptance Criteria:**

- [ ] Table menampilkan history dengan benar
- [ ] Filter date range berfungsi
- [ ] Badge "Manual Override" tampil jika ada
- [ ] Pagination berfungsi
- [ ] Empty state tampil jika no data

---

## 📊 **MODULE 4: Dashboard & Analytics**

**Status:** 🔴 Not Started | **Priority:** HIGH  
**Estimated Time:** 2-3 days  
**Assigned To:** `_____________`

### **FE-009: Overview Dashboard** (URQ-009)

**File:** `app/dashboard/page.jsx`

**Requirements:**

- ✅ 4 KPI Cards:
  - Total Customers
  - Total Recommendations Generated
  - Avg Confidence Score
  - Active vs Churned Ratio
- ✅ Line Chart: Recommendation Trend (per minggu)
- ✅ Bar Chart: Top 5 Recommended Products
- ✅ Date range filter (Last 7/30/90 days)
- ✅ Auto-refresh data (optional)

**Components Needed:**

- KPICard component (x4)
- LineChart component (Recharts)
- BarChart component (Recharts)
- Filter component (date range)
- Card component (wrapper untuk charts)

**API Integration:**

- `GET /api/dashboard/stats?period=30`

**Acceptance Criteria:**

- [ ] 4 KPI cards tampil dengan data real-time
- [ ] Line chart menampilkan trend rekomendasi
- [ ] Bar chart menampilkan top 5 produk
- [ ] Date filter berfungsi (update charts & KPI)
- [ ] Loading state saat fetch data
- [ ] Responsive layout (grid system)

---

### **FE-010: Product Performance Dashboard** (URQ-010)

**File:** `app/dashboard/products/page.jsx`

**Requirements:**

- ✅ Table: Product Name, Times Recommended, Avg Confidence, Acceptance Rate
- ✅ Sort by: Most Recommended / Highest Confidence
- ✅ Export to CSV button (optional)
- ✅ Pagination

**Components Needed:**

- Table component (dengan sorting)
- Button component (export)
- Badge component

**API Integration:**

- `GET /api/dashboard/products`

**Acceptance Criteria:**

- [ ] Table menampilkan product performance
- [ ] Sorting berfungsi (click column header)
- [ ] Export CSV berfungsi (optional)
- [ ] Pagination berfungsi

---

### **FE-011: Model Information Display** (URQ-012)

**File:** `components/features/dashboard/ModelInfoCard.jsx`

**Requirements:**

- ✅ Display Model Version
- ✅ Display Last Training Date
- ✅ Display Accuracy/Precision Metrics
- ✅ Fetch dari ML API endpoint

**Components Needed:**

- Card component
- Badge component (model status: Active/Training)
- LoadingSpinner component

**API Integration:**

- `GET /model/info` (ML Service)

**Acceptance Criteria:**

- [ ] Model info tampil dengan benar
- [ ] Auto-fetch saat dashboard load
- [ ] Error handling jika ML service down
- [ ] Refresh button untuk update info

---

## 🛠️ **PRIORITY 2: NICE TO HAVE**

### **FE-012: User Management Page** (URQ-013) 🔒 Admin Only

**File:** `app/users/page.jsx`  
**Estimated Time:** 1-2 days  
**Assigned To:** `_____________`

**Requirements:**

- ✅ Table: Name, Email, Role, Status
- ✅ Button "Add New User"
- ✅ Modal form: name, email, password, role
- ✅ Activate/Deactivate button
- ✅ Form validation

**Components Needed:**

- Table component
- Modal component
- Input component (form fields)
- Select component (role selection)
- Button component

**API Integration:**

- `GET /api/users` (Admin only)
- `POST /api/users/create`
- `PATCH /api/users/{id}/status`

**Acceptance Criteria:**

- [ ] Admin dapat melihat daftar user
- [ ] Modal create user berfungsi
- [ ] Form validation berfungsi
- [ ] Activate/deactivate berfungsi
- [ ] Non-admin tidak dapat akses page ini

---

### **FE-013: Product Catalog Page** (URQ-014)

**File:** `app/products/page.jsx`  
**Estimated Time:** 1 day  
**Assigned To:** `_____________`

**Requirements:**

- ✅ Table: Product ID, Name, Category, Price, Description
- ✅ Search bar
- ✅ Filter by category (Data/Voice/Combo)
- ✅ Pagination

**Components Needed:**

- Table component
- SearchBar component
- Filter component
- Badge component (category)

**API Integration:**

- `GET /api/products?search=&category=`

**Acceptance Criteria:**

- [ ] Table menampilkan semua produk
- [ ] Search berfungsi
- [ ] Filter category berfungsi
- [ ] Pagination berfungsi

---

### **FE-014: Toast Notification System** (URQ-015)

**File:** `components/ui/Toast.jsx` & `context/ToastContext.jsx`  
**Estimated Time:** 0.5 day  
**Assigned To:** `_____________`

**Requirements:**

- ✅ Toast untuk success (recommendation generated, override saved)
- ✅ Toast untuk error (ML service down, API error)
- ✅ Auto-dismiss after 3 seconds
- ✅ Multiple toast support (queue system)

**Components Needed:**

- Toast component
- ToastContext (global state)

**Acceptance Criteria:**

- [ ] Toast muncul di top-right corner
- [ ] Auto-dismiss setelah 3 detik
- [ ] Multiple toast dapat tampil bersamaan
- [ ] Close button berfungsi

---

## 🎨 **MODULE 5: Layout & Shared Components**

### **FE-015: Main Layout Components**

**Files:**

- `components/layout/Navbar.jsx`
- `components/layout/Sidebar.jsx`
- `components/layout/MainLayout.jsx`

**Estimated Time:** 1 day  
**Assigned To:** `_____________`

**Requirements:**

- ✅ Navbar: Logo, User Profile, Notification Bell, Logout
- ✅ Sidebar: Navigation menu (role-based)
- ✅ MainLayout: Wrapper untuk semua pages
- ✅ Responsive design (mobile hamburger menu)

**Acceptance Criteria:**

- [ ] Navbar fixed di top
- [ ] Sidebar navigation berfungsi
- [ ] Active menu highlighted
- [ ] Logout berfungsi
- [ ] Mobile responsive (hamburger menu)

---

### **FE-016: Reusable UI Components Library**

**Files:** `components/ui/*`

**Estimated Time:** 2-3 days (parallel dengan module lain)  
**Assigned To:** `_____________`

**Components List:**

1. ✅ Button component
2. ✅ Input component
3. ✅ Select component
4. ✅ Textarea component
5. ✅ Card component
6. ✅ Badge component
7. ✅ Modal component
8. ✅ Table component
9. ✅ Pagination component
10. ✅ SearchBar component
11. ✅ Filter component
12. ✅ KPICard component
13. ✅ LoadingSpinner component
14. ✅ SkeletonLoader component
15. ✅ EmptyState component
16. ✅ ProgressBar component
17. ✅ Tooltip component
18. ✅ LineChart component (Recharts wrapper)
19. ✅ BarChart component (Recharts wrapper)

**Acceptance Criteria:**

- [ ] Semua component documented (props, usage)
- [ ] Consistent styling (Tailwind CSS)
- [ ] Reusable & composable
- [ ] TypeScript props validation (optional)

---

## 📦 **MODULE 6: State Management & API Integration**

### **FE-017: Context API / Zustand Setup**

**Files:**

- `context/AuthContext.jsx`
- `context/ToastContext.jsx`
- `lib/api.js` (Axios instance)

**Estimated Time:** 0.5 day  
**Assigned To:** `_____________`

**Requirements:**

- ✅ AuthContext: manage user, token, login/logout
- ✅ ToastContext: manage toast notifications
- ✅ Axios instance dengan interceptors (token injection, error handling)

**Acceptance Criteria:**

- [ ] AuthContext tersedia di semua pages
- [ ] Token auto-inject ke API calls
- [ ] Auto-redirect ke login jika token expired
- [ ] Error handling global

---

## 📋 **Task Assignment Template**

```markdown
### Developer 1: `[NAME]`

**Modules:** FE-001, FE-002, FE-017
**Total Estimated Time:** 2-3 days
**Focus:** Authentication & State Management

### Developer 2: `[NAME]`

**Modules:** FE-003, FE-004
**Total Estimated Time:** 2-3 days
**Focus:** Customer Management

### Developer 3: `[NAME]`

**Modules:** FE-005, FE-006, FE-007, FE-008
**Total Estimated Time:** 4-5 days
**Focus:** Recommendation Engine (CORE)

### Developer 4: `[NAME]`

**Modules:** FE-009, FE-010, FE-011
**Total Estimated Time:** 3-4 days
**Focus:** Dashboard & Analytics

### Developer 5: `[NAME]`

**Modules:** FE-015, FE-016
**Total Estimated Time:** 3-4 days
**Focus:** Layout & UI Components (Support All Modules)
```

---

## 🗂️ **Folder Structure**

```
src/
├── app/
│   ├── login/
│   │   └── page.jsx                    # FE-001
│   ├── dashboard/
│   │   ├── page.jsx                    # FE-009
│   │   └── products/
│   │       └── page.jsx                # FE-010
│   ├── customers/
│   │   ├── page.jsx                    # FE-003
│   │   └── [id]/
│   │       └── page.jsx                # FE-004
│   ├── recommendations/
│   │   └── page.jsx                    # FE-008
│   ├── products/
│   │   └── page.jsx                    # FE-013 (Priority 2)
│   ├── users/
│   │   └── page.jsx                    # FE-012 (Priority 2, Admin Only)
│   ├── layout.jsx                      # FE-002 (Protected Layout)
│   └── middleware.js                   # FE-002 (Auth Middleware)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx                  # FE-015
│   │   ├── Sidebar.jsx                 # FE-015
│   │   └── MainLayout.jsx              # FE-015
│   │
│   ├── ui/                             # FE-016 (All Reusable Components)
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Filter.jsx
│   │   ├── KPICard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Tooltip.jsx
│   │   ├── Toast.jsx                   # FE-014
│   │   ├── Charts/
│   │   │   ├── LineChart.jsx
│   │   │   └── BarChart.jsx
│   │   └── Form/
│   │       ├── Input.jsx
│   │       ├── Select.jsx
│   │       └── Textarea.jsx
│   │
│   └── features/                       # Feature-specific components
│       ├── recommendations/
│       │   ├── GenerateRecommendationModal.jsx  # FE-005
│       │   ├── ReasoningCard.jsx                # FE-006
│       │   └── ManualOverride.jsx               # FE-007
│       └── dashboard/
│           └── ModelInfoCard.jsx                 # FE-011
│
├── context/                            # FE-017
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
│
├── lib/
│   ├── api.js                          # FE-017 (Axios instance)
│   └── utils.js                        # Helper functions
│
└── styles/
    └── globals.css                     # Tailwind CSS
```

---

## ✅ **Development Checklist**

### **Week 7: Core Features (5-11 Des)**

- [ ] **Day 1-2:** Setup project, install dependencies, create folder structure
- [ ] **Day 3-4:** Build UI components library (FE-016)
- [ ] **Day 5:** Authentication system (FE-001, FE-002)
- [ ] **Day 6-7:** Customer management (FE-003, FE-004)

### **Week 8: Advanced Features (12-18 Des)**

- [ ] **Day 1-3:** Recommendation engine (FE-005, FE-006, FE-007, FE-008)
- [ ] **Day 4-5:** Dashboard & analytics (FE-009, FE-010, FE-011)
- [ ] **Day 6:** Layout components & navigation (FE-015)
- [ ] **Day 7:** Integration testing & bug fixes

### **Priority 2 (If Time Permits)**

- [ ] User management page (FE-012)
- [ ] Product catalog page (FE-013)
- [ ] Toast notification system (FE-014)

---

## 🔗 **API Endpoints Reference**

| Module | Endpoint                        | Method | Description                        |
| ------ | ------------------------------- | ------ | ---------------------------------- |
| FE-001 | `/api/login`                    | POST   | User authentication                |
| FE-003 | `/api/customers`                | GET    | List customers with pagination     |
| FE-004 | `/api/customers/{id}`           | GET    | Get customer detail                |
| FE-005 | `/api/recommendations/generate` | POST   | Generate recommendation            |
| FE-007 | `/api/recommendations/override` | POST   | Save manual override               |
| FE-008 | `/api/recommendations/history`  | GET    | Get recommendation history         |
| FE-009 | `/api/dashboard/stats`          | GET    | Get dashboard KPI data             |
| FE-010 | `/api/dashboard/products`       | GET    | Get product performance            |
| FE-011 | `/model/info`                   | GET    | Get ML model metadata (ML Service) |
| FE-012 | `/api/users`                    | GET    | Get user list (Admin only)         |
| FE-013 | `/api/products`                 | GET    | Get product catalog                |

---

## 🎯 **Success Criteria**

### **Must Have (Priority 1)**

- ✅ User dapat login dan logout
- ✅ Dashboard menampilkan KPI cards dan charts
- ✅ Customer list dengan search, filter, pagination
- ✅ Customer detail page lengkap
- ✅ Generate recommendation dengan confidence score
- ✅ Recommendation reasoning tampil (WOW FACTOR)
- ✅ Manual override berfungsi
- ✅ Recommendation history dengan filter
- ✅ Model info display
- ✅ Responsive design (desktop & tablet)
- ✅ Loading states untuk semua async operations
- ✅ Error handling user-friendly

### **Nice to Have (Priority 2)**

- ⭐ User management (Admin only)
- ⭐ Product catalog page
- ⭐ Toast notification system

---

## 📚 **Resources**

### **Design Reference**

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [Shadcn UI Components](https://ui.shadcn.com/)

### **Code Examples**

- [Next.js 14 App Router](https://nextjs.org/docs/app)
- [React Hook Form](https://react-hook-form.com/)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)

---

## 🐛 **Common Issues & Solutions**

### **Issue 1: CORS Error**

**Solution:** Pastikan Laravel backend sudah config CORS dengan benar

```php
// config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
```

### **Issue 2: Token Expired**

**Solution:** Implement refresh token logic di Axios interceptor

```javascript
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Redirect to login
      router.push('/login');
    }
    return Promise.reject(error);
  }
);
```

### **Issue 3: Chart Not Rendering**

**Solution:** Make sure data format sesuai dengan Recharts requirement

```javascript
// Correct format
const data = [
  { name: 'Week 1', value: 45 },
  { name: 'Week 2', value: 52 },
];
```

---

## 📞 **Contact & Support**

**Frontend Lead:** `[NAME]`  
**Backend Lead:** `[NAME]`  
**ML Lead:** `[NAME]`  
**Project Manager:** US

**Daily Standup:** 09:00 WIB (Google Meet)  
**Code Review:** Setiap Merge Request ke `main` branch  
**Communication:** Slack Channel #frontend-dev

---

## 🚀 **Let's Build Something Amazing!**

Good luck, Frontend Team! 💪  
Focus on **Priority 1** first, kemudian baru **Priority 2** jika waktu tersisa.

**Remember:**

- ✅ Code quality > Speed
- ✅ Component reusability is key
- ✅ Always test before push
- ✅ Document your code
- ✅ Communicate with team

---

**Last Updated:** 19 November 2025  
**Version:** 1.0
