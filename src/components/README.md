📚 Dokumentasi Reusable UI Components
Table of Contents

1. Button Component
2. Card Component
3. Badge Component
4. Modal Component
5. Table Component
6. Pagination Component
7. Search Bar Component
8. Filter Component
9. KPI Card Component
10. Chart Components
11. Form Components
12. Loading Components
13. Empty State Component

14. Button Component
    File: components/ui/Button.jsx
    Props:
    PropTypeDefaultDescriptionvariantstring'primary'Style variant: primary, secondary, danger, ghostsizestring'md'Size: sm, md, lgloadingbooleanfalseMenampilkan loading spinnerdisabledbooleanfalseDisable buttonfullWidthbooleanfalseButton full widthiconReactNodenullIcon sebelum textonClickfunction-Click handlertypestring'button'Button type: button, submit, resetclassNamestring''Additional CSS classes
    Usage:
    jsximport Button from '@/components/ui/Button';

// Primary button
<Button variant="primary" onClick={handleClick}>
Generate Recommendation
</Button>

// Button with loading state
<Button variant="primary" loading={isLoading}>
Saving...
</Button>

// Button with icon
<Button variant="secondary" icon={<PlusIcon />}>
Add New
</Button>

// Danger button
<Button variant="danger" onClick={handleDelete}>
Delete
</Button>

// Small ghost button
<Button variant="ghost" size="sm">
Cancel
</Button>
Implementation Example:
jsxexport default function Button({
variant = 'primary',
size = 'md',
loading = false,
disabled = false,
fullWidth = false,
icon = null,
onClick,
type = 'button',
className = '',
children,
...props
}) {
const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variants = {
primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
};

const sizes = {
sm: 'px-3 py-1.5 text-sm',
md: 'px-4 py-2 text-base',
lg: 'px-6 py-3 text-lg'
};

return (
<button
type={type}
onClick={onClick}
disabled={disabled || loading}
className={`         ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
{...props} >
{loading && (
<svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
</svg>
)}
{icon && !loading && <span className="mr-2">{icon}</span>}
{children}
</button>
);
}

2. Card Component
   File: components/ui/Card.jsx
   Props:
   PropTypeDefaultDescriptiontitlestringnullCard titlesubtitlestringnullCard subtitleheaderActionReactNodenullAction button di headerpaddingbooleantrueTambahkan padding ke bodyshadowbooleantrueTambahkan shadowborderbooleantrueTambahkan borderclassNamestring''Additional CSS classes
   Usage:
   jsximport Card from '@/components/ui/Card';

// Simple card
<Card title="Customer Information">

  <p>Customer details here...</p>
</Card>

// Card with header action
<Card
title="Recommendations"
subtitle="Generated on Nov 17, 2025"
headerAction={<Button size="sm">Export</Button>}

>

  <div>Recommendation content...</div>
</Card>

// Card without padding
<Card title="Product List" padding={false}>

  <Table data={products} />
</Card>
Implementation Example:
jsxexport default function Card({
  title,
  subtitle,
  headerAction,
  padding = true,
  shadow = true,
  border = true,
  className = '',
  children
}) {
  return (
    <div className={`
      bg-white rounded-lg
      ${shadow ? 'shadow-md' : ''}
      ${border ? 'border border-gray-200' : ''}
      ${className}
    `}>
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={padding ? 'p-6' : ''}>
        {children}
      </div>
    </div>
  );
}

3. Badge Component
   File: components/ui/Badge.jsx
   Props:
   PropTypeDefaultDescriptionvariantstring'default'Style variant: default, success, warning, danger, infosizestring'md'Size: sm, md, lgroundedbooleanfalseFully rounded badge (pill shape)iconReactNodenullIcon sebelum textclassNamestring''Additional CSS classes
   Usage:
   jsximport Badge from '@/components/ui/Badge';

// Status badges untuk URQ-003, URQ-008
<Badge variant="success">Active</Badge>
<Badge variant="danger">Churned</Badge>

// Confidence score badge untuk URQ-005
<Badge variant="info">85% Confidence</Badge>

// Override flag untuk URQ-007, URQ-008
<Badge variant="warning" icon={<EditIcon />}>Manual Override</Badge>

// Small badge
<Badge variant="success" size="sm" rounded>New</Badge>
Implementation Example:
jsxexport default function Badge({
variant = 'default',
size = 'md',
rounded = false,
icon = null,
className = '',
children
}) {
const baseStyles = 'inline-flex items-center font-medium';

const variants = {
default: 'bg-gray-100 text-gray-800',
success: 'bg-green-100 text-green-800',
warning: 'bg-yellow-100 text-yellow-800',
danger: 'bg-red-100 text-red-800',
info: 'bg-blue-100 text-blue-800'
};

const sizes = {
sm: 'px-2 py-0.5 text-xs',
md: 'px-2.5 py-1 text-sm',
lg: 'px-3 py-1.5 text-base'
};

return (
<span className={`       ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${rounded ? 'rounded-full' : 'rounded'}
      ${className}
    `}>
{icon && <span className="mr-1">{icon}</span>}
{children}
</span>
);
}

4. Modal Component
   File: components/ui/Modal.jsx
   Props:
   PropTypeDefaultDescriptionisOpenbooleanfalseModal visibility stateonClosefunction-Close modal handlertitlestring''Modal titlesizestring'md'Modal size: sm, md, lg, xl, fullshowCloseButtonbooleantrueShow X button di headerfooterReactNodenullModal footer contentcloseOnOverlaybooleantrueClose saat klik overlayclassNamestring''Additional CSS classes
   Usage:
   jsximport { useState } from 'react';
   import Modal from '@/components/ui/Modal';

// Recommendation result modal (URQ-005, URQ-006)
const [showModal, setShowModal] = useState(false);

<Modal
isOpen={showModal}
onClose={() => setShowModal(false)}
title="Recommendation Results"
size="lg"
footer={
<>
<Button variant="ghost" onClick={() => setShowModal(false)}>Close</Button>
<Button variant="primary">Save Recommendation</Button>
</>
}

>

  <div className="space-y-4">
    {/* Recommendation content */}
  </div>
</Modal>

// Confirmation modal
<Modal
isOpen={showConfirm}
onClose={() => setShowConfirm(false)}
title="Confirm Delete"
size="sm"
footer={
<>
<Button variant="ghost" onClick={() => setShowConfirm(false)}>Cancel</Button>
<Button variant="danger" onClick={handleDelete}>Delete</Button>
</>
}

>

  <p>Are you sure you want to delete this item?</p>
</Modal>
Implementation Example:
jsxexport default function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  footer,
  closeOnOverlay = true,
  className = '',
  children
}) {
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`
          relative bg-white rounded-lg shadow-xl w-full ${sizes[size]}
          ${className}
        `}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          {/* Body */}
          <div className="px-6 py-4">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

5. Table Component
   File: components/ui/Table.jsx
   Props:
   PropTypeDefaultDescriptioncolumnsarray[]Column definitionsdataarray[]Table dataloadingbooleanfalseShow loading stateemptyMessagestring'No data available'Message saat data kosongonRowClickfunctionnullRow click handlerhoverablebooleanfalseEnable row hover effectstripedbooleanfalseStriped rowsclassNamestring''Additional CSS classes
   Column Definition:
   javascript{
   key: string, // Data key
   label: string, // Column header
   width: string, // Column width (optional)
   align: string, // 'left', 'center', 'right' (optional)
   render: function, // Custom render function (optional)
   sortable: boolean // Enable sorting (optional)
   }
   Usage:
   jsximport Table from '@/components/ui/Table';

// Customer list table (URQ-003)
const columns = [
{ key: 'id', label: 'Customer ID', width: '120px' },
{ key: 'name', label: 'Name', sortable: true },
{ key: 'age', label: 'Age', align: 'center' },
{
key: 'status',
label: 'Status',
render: (value) => (
<Badge variant={value === 'Active' ? 'success' : 'danger'}>
{value}
</Badge>
)
},
{ key: 'clv_segment', label: 'CLV Segment' }
];

const data = [
{ id: 'C001', name: 'John Doe', age: 28, status: 'Active', clv_segment: 'High' },
// ... more data
];

<Table 
  columns={columns} 
  data={data}
  loading={isLoading}
  hoverable
  onRowClick={(row) => router.push(`/customers/${row.id}`)}
/>

// Recommendation history table (URQ-008)
const historyColumns = [
{ key: 'customer_name', label: 'Customer Name' },
{ key: 'date', label: 'Date', render: (value) => formatDate(value) },
{ key: 'products', label: 'Recommended Products' },
{
key: 'status',
label: 'Status',
render: (value) => <Badge>{value}</Badge>
},
{
key: 'is_overridden',
label: 'Override',
render: (value) => value ? <Badge variant="warning">Manual Override</Badge> : '-'
}
];

<Table columns={historyColumns} data={historyData} striped />
Implementation Example:
jsxexport default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data available',
  onRowClick = null,
  hoverable = false,
  striped = false,
  className = ''
}) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" />
        <p className="text-gray-500 mt-4">Loading data...</p>
      </div>
    );
  }
  
  if (data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }
  
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${column.align === 'center' ? 'text-center' : ''}
                  ${column.align === 'right' ? 'text-right' : 'text-left'}
                `}
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`bg-white divide-y divide-gray-200 ${striped ? 'divide-y-0' : ''}`}>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`
                ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
                ${hoverable ? 'hover:bg-gray-100 cursor-pointer' : ''}
                ${onRowClick ? 'cursor-pointer' : ''}
                transition-colors
              `}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`
                    px-6 py-4 whitespace-nowrap text-sm text-gray-900
                    ${column.align === 'center' ? 'text-center' : ''}
                    ${column.align === 'right' ? 'text-right' : ''}
                  `}
                >
                  {column.render 
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

6. Pagination Component
   File: components/ui/Pagination.jsx
   Props:
   PropTypeDefaultDescriptioncurrentPagenumber1Current page numbertotalPagesnumber1Total pagesonPageChangefunction-Page change handleritemsPerPagenumber20Items per pagetotalItemsnumber0Total items countshowInfobooleantrueShow "Showing X to Y of Z" infoclassNamestring''Additional CSS classes
   Usage:
   jsximport Pagination from '@/components/ui/Pagination';
   import { useState } from 'react';

// Customer list pagination (URQ-003)
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 20;
const totalItems = 250;
const totalPages = Math.ceil(totalItems / itemsPerPage);

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  itemsPerPage={itemsPerPage}
  totalItems={totalItems}
/>
Implementation Example:
jsxexport default function Pagination({
currentPage = 1,
totalPages = 1,
onPageChange,
itemsPerPage = 20,
totalItems = 0,
showInfo = true,
className = ''
}) {
const startItem = (currentPage - 1) _ itemsPerPage + 1;
const endItem = Math.min(currentPage _ itemsPerPage, totalItems);

const getPageNumbers = () => {
const pages = [];
const showPages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;

};

return (
<div className={`flex items-center justify-between ${className}`}>
{showInfo && (
<div className="text-sm text-gray-700">
Showing <span className="font-medium">{startItem}</span> to{' '}
<span className="font-medium">{endItem}</span> of{' '}
<span className="font-medium">{totalItems}</span> results
</div>
)}

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md
              ${currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

);
}

7. Search Bar Component
   File: components/ui/SearchBar.jsx
   Props:
   PropTypeDefaultDescriptionvaluestring''Search input valueonChangefunction-Change handlerplaceholderstring'Search...'Input placeholderonClearfunctionnullClear button handlerloadingbooleanfalseShow loading indicatordebouncenumber300Debounce delay (ms)classNamestring''Additional CSS classes
   Usage:
   jsximport SearchBar from '@/components/ui/SearchBar';
   import { useState } from 'react';

// Customer search (URQ-003)
const [searchTerm, setSearchTerm] = useState('');

<SearchBar
value={searchTerm}
onChange={setSearchTerm}
placeholder="Search by Customer ID or Name"
onClear={() => setSearchTerm('')}
/>

// Product search (URQ-014)
<SearchBar
  value={productSearch}
  onChange={setProductSearch}
  placeholder="Search products..."
  debounce={500}
  loading={isSearching}
/>
Implementation Example:
jsximport { useState, useEffect } from 'react';

export default function SearchBar({
value = '',
onChange,
placeholder = 'Search...',
onClear = null,
loading = false,
debounce = 300,
className = ''
}) {
const [internalValue, setInternalValue] = useState(value);

useEffect(() => {
const timer = setTimeout(() => {
onChange(internalValue);
}, debounce);

    return () => clearTimeout(timer);

}, [internalValue, debounce]);

useEffect(() => {
setInternalValue(value);
}, [value]);

return (
<div className={`relative ${className}`}>
<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
</div>

      <input
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {loading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}

      {internalValue && !loading && onClear && (
        <button
          onClick={() => {
            setInternalValue('');
            onClear();
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>

);
}

8. Filter Component
   File: components/ui/Filter.jsx
   Props:
   PropTypeDefaultDescriptionlabelstring''Filter labeloptionsarray[]Filter optionsvaluestring/array''Selected value(s)onChangefunction-Change handlermultiplebooleanfalseAllow multiple selectionplaceholderstring'Select...'Placeholder textclearablebooleantrueShow clear buttonclassNamestring''Additional CSS classes
   Option Definition:
   javascript{
   value: string/number, // Option value
   label: string // Option label
   }
   Usage:
   jsximport Filter from '@/components/ui/Filter';

// Status filter (URQ-003)
const statusOptions = [
{ value: 'all', label: 'All' },
{ value: 'active', label: 'Active' },
{ value: 'churned', label: 'Churned' }
];

<Filter
  label="Status"
  options={statusOptions}
  value={selectedStatus}
  onChange={setSelectedStatus}
/>

// Date range filter (URQ-008, URQ-009)
const dateOptions = [
{ value: '7', label: 'Last 7 days' },
{ value: '30', label: 'Last 30 days' },
{ value: '90', label: 'Last 90 days' }
];

<Filter
  label="Period"
  options={dateOptions}
  value={selectedPeriod}
  onChange={setSelectedPeriod}
/>

// Product category filter (URQ-014)
const categoryOptions = [
{ value: 'all', label: 'All Categories' },
{ value: 'data', label: 'Paket Data' },
{ value: 'voice', label: 'Voice' },
{ value: 'combo', label: 'Combo' }
];

<Filter
  label="Category"
  options={categoryOptions}
  value={selectedCategory}
  onChange={setSelectedCategory}
/>
Implementation Example:
jsxexport defaultRetryABContinuejsxexport default function Filter({
label = '',
options = [],
value = '',
onChange,
multiple = false,
placeholder = 'Select...',
clearable = true,
className = ''
}) {
const handleClear = () => {
onChange(multiple ? [] : '');
};

return (
<div className={`flex flex-col gap-1 ${className}`}>
{label && (
<label className="text-sm font-medium text-gray-700">
{label}
</label>
)}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          multiple={multiple}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Clear Button */}
        {clearable && value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-8 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>

);
}

9. KPI Card Component
   File: components/ui/KPICard.jsx
   Props:
   PropTypeDefaultDescriptiontitlestring''KPI titlevaluestring/number''KPI valueiconReactNodenullIcon componenttrendobjectnullTrend data: {value: number, direction: 'up'/'down'}loadingbooleanfalseShow loading statecolorstring'blue'Card color theme: blue, green, yellow, red, purplesubtitlestring''Additional subtitle textclassNamestring''Additional CSS classes
   Usage:
   jsximport KPICard from '@/components/ui/KPICard';
   import { UsersIcon, ChartBarIcon, TargetIcon, ActivityIcon } from 'lucide-react';

// Dashboard KPI cards (URQ-009)

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <KPICard
    title="Total Customers"
    value="1,234"
    icon={<UsersIcon />}
    color="blue"
    trend={{ value: 12.5, direction: 'up' }}
    subtitle="vs last month"
  />
  
  <KPICard
    title="Total Recommendations"
    value="567"
    icon={<ChartBarIcon />}
    color="green"
    trend={{ value: 8.2, direction: 'up' }}
  />
  
  <KPICard
    title="Avg Confidence Score"
    value="82.4%"
    icon={<TargetIcon />}
    color="purple"
    loading={isLoading}
  />
  
  <KPICard
    title="Active vs Churned"
    value="85:15"
    icon={<ActivityIcon />}
    color="yellow"
    subtitle="Active : Churned ratio"
  />
</div>
Implementation Example:
jsxexport default function KPICard({
  title = '',
  value = '',
  icon = null,
  trend = null,
  loading = false,
  color = 'blue',
  subtitle = '',
  className = ''
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600'
  };
  
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900">
            {value}
          </h3>
          
          {/* Subtitle or Trend */}
          {(subtitle || trend) && (
            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <span className={`
                  inline-flex items-center text-sm font-medium
                  ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}
                `}>
                  {trend.direction === 'up' ? (
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {trend.value}%
                </span>
              )}
              {subtitle && (
                <span className="text-sm text-gray-500">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Icon */}
        {icon && (
          <div className={`
            p-3 rounded-lg ${colorClasses[color]}
          `}>
            <div className="w-6 h-6">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

10. Chart Components
    File: components/ui/Charts/LineChart.jsx
    Props:
    PropTypeDefaultDescriptiondataarray[]Chart dataxKeystring'name'X-axis data keyyKeystring'value'Y-axis data keytitlestring''Chart titleheightnumber300Chart height in pixelscolorstring'#3B82F6'Line colorshowGridbooleantrueShow grid linesshowTooltipbooleantrueShow tooltip on hoverloadingbooleanfalseShow loading state
    Usage:
    jsximport LineChart from '@/components/ui/Charts/LineChart';

// Recommendation trend chart (URQ-009)
const trendData = [
{ week: 'Week 1', count: 45 },
{ week: 'Week 2', count: 52 },
{ week: 'Week 3', count: 48 },
{ week: 'Week 4', count: 61 },
{ week: 'Week 5', count: 58 }
];

<LineChart
  data={trendData}
  xKey="week"
  yKey="count"
  title="Recommendation Trend"
  height={350}
  color="#10B981"
/>
Implementation Example (using Recharts):
jsximport { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LineChart({
data = [],
xKey = 'name',
yKey = 'value',
title = '',
height = 300,
color = '#3B82F6',
showGrid = true,
showTooltip = true,
loading = false
}) {
if (loading) {
return (
<div style={{ height }} className="flex items-center justify-center bg-gray-50 rounded-lg">
<LoadingSpinner size="lg" />
</div>
);
}

return (
<div>
{title && (
<h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
)}
<ResponsiveContainer width="100%" height={height}>
<RechartsLine data={data}>
{showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
<XAxis dataKey={xKey} stroke="#6B7280" style={{ fontSize: '12px' }} />
<YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
{showTooltip && <Tooltip />}
<Line
type="monotone"
dataKey={yKey}
stroke={color}
strokeWidth={2}
dot={{ fill: color, r: 4 }}
activeDot={{ r: 6 }}
/>
</RechartsLine>
</ResponsiveContainer>
</div>
);
}

File: components/ui/Charts/BarChart.jsx
Props:
PropTypeDefaultDescriptiondataarray[]Chart dataxKeystring'name'X-axis data keyyKeystring'value'Y-axis data keytitlestring''Chart titleheightnumber300Chart height in pixelscolorstring'#3B82F6'Bar colorhorizontalbooleanfalseHorizontal barsshowGridbooleantrueShow grid linesshowTooltipbooleantrueShow tooltip on hoverloadingbooleanfalseShow loading state
Usage:
jsximport BarChart from '@/components/ui/Charts/BarChart';

// Top 5 recommended products (URQ-009)
const productData = [
{ product: 'Unlimited Pro', count: 145 },
{ product: 'Data Plus 50GB', count: 132 },
{ product: 'Family Combo', count: 98 },
{ product: 'Voice Premium', count: 87 },
{ product: 'Starter Pack', count: 76 }
];

<BarChart
  data={productData}
  xKey="product"
  yKey="count"
  title="Top 5 Recommended Products"
  height={350}
  color="#8B5CF6"
  horizontal
/>
Implementation Example (using Recharts):
jsximport { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChart({
data = [],
xKey = 'name',
yKey = 'value',
title = '',
height = 300,
color = '#3B82F6',
horizontal = false,
showGrid = true,
showTooltip = true,
loading = false
}) {
if (loading) {
return (
<div style={{ height }} className="flex items-center justify-center bg-gray-50 rounded-lg">
<LoadingSpinner size="lg" />
</div>
);
}

return (
<div>
{title && (
<h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
)}
<ResponsiveContainer width="100%" height={height}>
<RechartsBar
data={data}
layout={horizontal ? 'vertical' : 'horizontal'} >
{showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
{horizontal ? (
<>
<XAxis type="number" stroke="#6B7280" style={{ fontSize: '12px' }} />
<YAxis type="category" dataKey={xKey} stroke="#6B7280" style={{ fontSize: '12px' }} />
</>
) : (
<>
<XAxis dataKey={xKey} stroke="#6B7280" style={{ fontSize: '12px' }} />
<YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
</>
)}
{showTooltip && <Tooltip />}
<Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
</RechartsBar>
</ResponsiveContainer>
</div>
);
}

11. Form Components
    File: components/ui/Form/Input.jsx
    Props:
    PropTypeDefaultDescriptionlabelstring''Input labeltypestring'text'Input typevaluestring''Input valueonChangefunction-Change handlerplaceholderstring''Placeholder texterrorstring''Error messagerequiredbooleanfalseRequired fielddisabledbooleanfalseDisabled stateiconReactNodenullIcon before inputhelperTextstring''Helper text below inputclassNamestring''Additional CSS classes
    Usage:
    jsximport Input from '@/components/ui/Form/Input';
    import { MailIcon, LockIcon } from 'lucide-react';

// Login form (URQ-001)
<Input
label="Email"
type="email"
value={email}
onChange={setEmail}
placeholder="Enter your email"
icon={<MailIcon />}
required
error={emailError}
/>

<Input
label="Password"
type="password"
value={password}
onChange={setPassword}
placeholder="Enter your password"
icon={<LockIcon />}
required
error={passwordError}
/>

// Create user form (URQ-013)
<Input
  label="Full Name"
  value={name}
  onChange={setName}
  placeholder="John Doe"
  helperText="Enter user's full name"
  required
/>
Implementation Example:
jsxexport default function Input({
label = '',
type = 'text',
value = '',
onChange,
placeholder = '',
error = '',
required = false,
disabled = false,
icon = null,
helperText = '',
className = '',
...props
}) {
return (
<div className={`flex flex-col gap-1 ${className}`}>
{label && (
<label className="text-sm font-medium text-gray-700">
{label}
{required && <span className="text-red-500 ml-1">\*</span>}
</label>
)}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            block w-full px-3 py-2 border rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>

);
}

File: components/ui/Form/Select.jsx
Props:
PropTypeDefaultDescriptionlabelstring''Select labeloptionsarray[]Select optionsvaluestring''Selected valueonChangefunction-Change handlerplaceholderstring'Select...'Placeholder texterrorstring''Error messagerequiredbooleanfalseRequired fielddisabledbooleanfalseDisabled statehelperTextstring''Helper textclassNamestring''Additional CSS classes
Usage:
jsximport Select from '@/components/ui/Form/Select';

// Manual override product selection (URQ-007)
const productOptions = [
{ value: '1', label: 'Unlimited Pro' },
{ value: '2', label: 'Data Plus 50GB' },
{ value: '3', label: 'Family Combo' }
];

<Select
  label="Override Product"
  options={productOptions}
  value={overrideProduct}
  onChange={setOverrideProduct}
  placeholder="Select a product"
/>

// User role selection (URQ-013)
const roleOptions = [
{ value: 'admin', label: 'Admin' },
{ value: 'staff', label: 'Marketing Staff' }
];

<Select
  label="Role"
  options={roleOptions}
  value={role}
  onChange={setRole}
  required
  error={roleError}
/>
Implementation Example:
jsxexport default function Select({
label = '',
options = [],
value = '',
onChange,
placeholder = 'Select...',
error = '',
required = false,
disabled = false,
helperText = '',
className = '',
...props
}) {
return (
<div className={`flex flex-col gap-1 ${className}`}>
{label && (
<label className="text-sm font-medium text-gray-700">
{label}
{required && <span className="text-red-500 ml-1">\*</span>}
</label>
)}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          block w-full px-3 py-2 border rounded-lg
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>

);
}

12. Loading Components
    File: components/ui/LoadingSpinner.jsx
    Props:
    PropTypeDefaultDescriptionsizestring'md'Spinner size: sm, md, lg, xlcolorstring'blue'Spinner colorclassNamestring''Additional CSS classes
    Usage:
    jsximport LoadingSpinner from '@/components/ui/LoadingSpinner';

// Full page loading

<div className="flex items-center justify-center min-h-screen">
  <LoadingSpinner size="xl" />
</div>

// Inline loading
<LoadingSpinner size="sm" color="green" />

// Inside button (already in Button component)
<Button loading>Loading...</Button>
Implementation Example:
jsxexport default function LoadingSpinner({
size = 'md',
color = 'blue',
className = ''
}) {
const sizes = {
sm: 'h-4 w-4',
md: 'h-8 w-8',
lg: 'h-12 w-12',
xl: 'h-16 w-16'
};

const colors = {
blue: 'text-blue-600',
green: 'text-green-600',
red: 'text-red-600',
gray: 'text-gray-600'
};

return (
<svg
className={`animate-spin ${sizes[size]} ${colors[color]} ${className}`}
fill="none"
viewBox="0 0 24 24" >
<circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
<path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
</svg>
);
}

File: components/ui/SkeletonLoader.jsx
Props:
PropTypeDefaultDescriptiontypestring'text'Type: text, title, card, table, circlerowsnumber3Number of rows (for text/table)classNamestring''Additional CSS classes
Usage:
jsximport SkeletonLoader from '@/components/ui/SkeletonLoader';

// Loading customer list (URQ-003)
<SkeletonLoader type="table" rows={5} />

// Loading KPI cards (URQ-009)

<div className="grid grid-cols-4 gap-6">
  <SkeletonLoader type="card" />
  <SkeletonLoader type="card" />
  <SkeletonLoader type="card" />
  <SkeletonLoader type="card" />
</div>

// Loading text content
<SkeletonLoader type="text" rows={4} />
Implementation Example:
jsxexport default function SkeletonLoader({
type = 'text',
rows = 3,
className = ''
}) {
const baseClass = 'animate-pulse bg-gray-200 rounded';

if (type === 'text') {
return (
<div className={`space-y-3 ${className}`}>
{Array.from({ length: rows }).map((\_, i) => (
<div
key={i}
className={`${baseClass} h-4`}
style={{ width: i === rows - 1 ? '70%' : '100%' }}
/>
))}
</div>
);
}

if (type === 'title') {
return (
<div className={`${baseClass} h-8 w-1/2 ${className}`} />
);
}

if (type === 'card') {
return (
<div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
<div className={`${baseClass} h-4 w-1/2 mb-4`} />
<div className={`${baseClass} h-8 w-3/4`} />
</div>
);
}

if (type === 'table') {
return (
<div className={`space-y-3 ${className}`}>
{/_ Header _/}
<div className={`${baseClass} h-10 w-full`} />
{/_ Rows _/}
{Array.from({ length: rows }).map((\_, i) => (
<div key={i} className={`${baseClass} h-12 w-full`} />
))}
</div>
);
}

if (type === 'circle') {
return (
<div className={`${baseClass} h-12 w-12 rounded-full ${className}`} />
);
}

return null;
}

13. Empty State Component
    File: components/ui/EmptyState.jsx
    Props:
    PropTypeDefaultDescriptioniconReactNodenullIcon componenttitlestring'No data found'Title textmessagestring''Description messageactionReactNodenullAction buttonclassNamestring''Additional CSS classes
    Usage:
    jsximport EmptyState from '@/components/ui/EmptyState';
    import { InboxIcon, PlusIcon } from 'lucide-react';

// No customers found (URQ-003)
<EmptyState
icon={<InboxIcon />}
title="No customers found"
message="Try adjusting your search or filter to find what you're looking for."
/>

// No recommendations yet (URQ-008)
<EmptyState
icon={<ChartBarIcon />}
title="No recommendations yet"
message="Start generating recommendations for your customers."
action={
<Button
variant="primary"
icon={<PlusIcon />}
onClick={() => router.push('/customers')} >
Browse Customers
</Button>
}
/>

// No products (URQ-014)
<EmptyState
title="No products available"
message="Add products to start creating recommendations."
action={<Button>Add Product</Button>}
/>
Implementation Example:
jsxexport default function EmptyState({
icon = null,
title = 'No data found',
message = '',
action = null,
className = ''
}) {
return (
<div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
{icon && (
<div className="mb-4 text-gray-400">
<div className="w-16 h-16">
{icon}
</div>
</div>
)}

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {message && (
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          {message}
        </p>
      )}

      {action && (
        <div>
          {action}
        </div>
      )}
    </div>

);
}

📁 Folder Structure Summary
components/
├── ui/
│ ├── Button.jsx
│ ├── Card.jsx
│ ├── Badge.jsx
│ ├── Modal.jsx
│ ├── Table.jsx
│ ├── Pagination.jsx
│ ├── SearchBar.jsx
│ ├── Filter.jsx
│ ├── KPICard.jsx
│ ├── LoadingSpinner.jsx
│ ├── SkeletonLoader.jsx
│ ├── EmptyState.jsx
│ ├── Charts/
│ │ ├── LineChart.jsx
│ │ └── BarChart.jsx
│ └── Form/
│ ├── Input.jsx
│ ├── Select.jsx
│ └── Textarea.jsxRetryABContinue│ └── Textarea.jsx
└── layout/
├── Navbar.jsx
├── Sidebar.jsx
└── MainLayout.jsx

14. Textarea Component
    File: components/ui/Form/Textarea.jsx
    Props:
    PropTypeDefaultDescriptionlabelstring''Textarea labelvaluestring''Textarea valueonChangefunction-Change handlerplaceholderstring''Placeholder texterrorstring''Error messagerequiredbooleanfalseRequired fielddisabledbooleanfalseDisabled staterowsnumber4Number of rowsmaxLengthnumbernullMaximum character lengthhelperTextstring''Helper textclassNamestring''Additional CSS classes
    Usage:
    jsximport Textarea from '@/components/ui/Form/Textarea';

// Product description (URQ-014)
<Textarea
  label="Product Description"
  value={description}
  onChange={setDescription}
  placeholder="Enter product description..."
  rows={6}
  maxLength={500}
  helperText="Maximum 500 characters"
/>

// Override reasoning (URQ-007)
<Textarea
  label="Override Reason"
  value={reason}
  onChange={setReason}
  placeholder="Explain why you're overriding the recommendation..."
  rows={3}
  required
/>
Implementation Example:
jsxexport default function Textarea({
label = '',
value = '',
onChange,
placeholder = '',
error = '',
required = false,
disabled = false,
rows = 4,
maxLength = null,
helperText = '',
className = '',
...props
}) {
return (
<div className={`flex flex-col gap-1 ${className}`}>
{label && (
<label className="text-sm font-medium text-gray-700">
{label}
{required && <span className="text-red-500 ml-1">\*</span>}
</label>
)}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`
          block w-full px-3 py-2 border rounded-lg resize-none
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        {...props}
      />

      <div className="flex justify-between items-center">
        <div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {helperText && !error && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>

        {maxLength && (
          <p className="text-sm text-gray-500">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>

);
}

15. Layout Components
    File: components/layout/Navbar.jsx
    Props:
    PropTypeDefaultDescriptionuserobjectnullCurrent user dataonLogoutfunction-Logout handler
    Usage:
    jsximport Navbar from '@/components/layout/Navbar';

const user = {
name: 'John Doe',
email: 'john@example.com',
role: 'admin'
};

<Navbar user={user} onLogout={handleLogout} />
Implementation Example:
jsx'use client';
import { useState } from 'react';
import { BellIcon, UserCircleIcon } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
const [showProfileMenu, setShowProfileMenu] = useState(false);

return (
<nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-40">
<div className="px-6 py-4">
<div className="flex items-center justify-between">
{/_ Logo & Title _/}
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
<span className="text-white font-bold text-xl">T</span>
</div>
<div>
<h1 className="text-xl font-bold text-gray-900">
Telco Recommendation System
</h1>
<p className="text-xs text-gray-500">Product Recommendation Platform</p>
</div>
</div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <UserCircleIcon className="w-8 h-8 text-gray-400" />
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={onLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>

);
}

File: components/layout/Sidebar.jsx
Props:
PropTypeDefaultDescriptionuserRolestring'staff'Current user roleactivePathstring'/'Current active path
Usage:
jsximport Sidebar from '@/components/layout/Sidebar';
import { usePathname } from 'next/navigation';

const pathname = usePathname();

<Sidebar userRole={user.role} activePath={pathname} />
Implementation Example:
jsx'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboardIcon, 
  UsersIcon, 
  ChartBarIcon, 
  PackageIcon, 
  SettingsIcon,
  ShieldIcon
} from 'lucide-react';

export default function Sidebar({ userRole = 'staff' }) {
const pathname = usePathname();

// Navigation items based on role (URQ-002)
const navItems = [
{
label: 'Dashboard',
href: '/dashboard',
icon: <LayoutDashboardIcon />,
roles: ['admin', 'staff']
},
{
label: 'Customers',
href: '/customers',
icon: <UsersIcon />,
roles: ['admin', 'staff']
},
{
label: 'Recommendations',
href: '/recommendations',
icon: <ChartBarIcon />,
roles: ['admin', 'staff']
},
{
label: 'Products',
href: '/products',
icon: <PackageIcon />,
roles: ['admin', 'staff']
},
{
label: 'User Management',
href: '/users',
icon: <ShieldIcon />,
roles: ['admin'] // Admin only (URQ-013)
}
];

// Filter menu based on user role
const filteredNavItems = navItems.filter(item =>
item.roles.includes(userRole)
);

return (
<aside className="bg-gray-900 text-white w-64 min-h-screen fixed left-0 top-16 z-30">
<nav className="p-4">
<ul className="space-y-2">
{filteredNavItems.map((item) => {
const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Settings */}
        <ul>
          <li>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
            >
              <span className="w-5 h-5"><SettingsIcon /></span>
              <span className="font-medium">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>

);
}

File: components/layout/MainLayout.jsx
Props:
PropTypeDefaultDescriptionchildrenReactNode-Page contentuserobjectnullCurrent user dataonLogoutfunction-Logout handler
Usage:
jsximport MainLayout from '@/components/layout/MainLayout';

export default function DashboardPage() {
return (
<MainLayout user={user} onLogout={handleLogout}>
<h1>Dashboard Content</h1>
{/_ Page content here _/}
</MainLayout>
);
}
Implementation Example:
jsx'use client';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout({ children, user, onLogout }) {
return (
<div className="min-h-screen bg-gray-50">
{/_ Navbar _/}
<Navbar user={user} onLogout={onLogout} />

      {/* Sidebar */}
      <Sidebar userRole={user?.role} />

      {/* Main Content */}
      <main className="ml-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>

);
}

16. Toast Notification Component
    File: components/ui/Toast.jsx
    Props:
    PropTypeDefaultDescriptiontypestring'info'Type: success, error, warning, infomessagestring''Toast messagedurationnumber3000Auto-hide duration (ms)onClosefunction-Close handlerpositionstring'top-right'Position: top-right, top-left, bottom-right, bottom-left
    Usage:
    jsximport { useState } from 'react';
    import Toast from '@/components/ui/Toast';

// Toast notification (URQ-015)
const [toast, setToast] = useState(null);

// Show success toast
const showSuccessToast = () => {
setToast({
type: 'success',
message: 'Recommendation generated successfully!'
});
setTimeout(() => setToast(null), 3000);
};

// Show error toast
const showErrorToast = () => {
setToast({
type: 'error',
message: 'Failed to connect to ML service. Please try again.'
});
setTimeout(() => setToast(null), 3000);
};

// Render toast
{toast && (
<Toast
type={toast.type}
message={toast.message}
onClose={() => setToast(null)}
duration={3000}
/>
)}
Implementation Example:
jsx'use client';
import { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon, XIcon } from 'lucide-react';

export default function Toast({
type = 'info',
message = '',
duration = 3000,
onClose,
position = 'top-right'
}) {
useEffect(() => {
if (duration) {
const timer = setTimeout(() => {
onClose();
}, duration);

      return () => clearTimeout(timer);
    }

}, [duration, onClose]);

const positions = {
'top-right': 'top-4 right-4',
'top-left': 'top-4 left-4',
'bottom-right': 'bottom-4 right-4',
'bottom-left': 'bottom-4 left-4'
};

const types = {
success: {
bgColor: 'bg-green-50',
borderColor: 'border-green-500',
textColor: 'text-green-800',
icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />
},
error: {
bgColor: 'bg-red-50',
borderColor: 'border-red-500',
textColor: 'text-red-800',
icon: <XCircleIcon className="w-5 h-5 text-red-500" />
},
warning: {
bgColor: 'bg-yellow-50',
borderColor: 'border-yellow-500',
textColor: 'text-yellow-800',
icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-500" />
},
info: {
bgColor: 'bg-blue-50',
borderColor: 'border-blue-500',
textColor: 'text-blue-800',
icon: <InfoIcon className="w-5 h-5 text-blue-500" />
}
};

const config = types[type];

return (
<div className={`fixed ${positions[position]} z-50 animate-slide-in-right`}>
<div className={`         flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4
        ${config.bgColor} ${config.borderColor}
        min-w-[300px] max-w-md
      `}>
{config.icon}
<p className={`flex-1 text-sm font-medium ${config.textColor}`}>
{message}
</p>
<button
onClick={onClose}
className={`${config.textColor} hover:opacity-70 transition-opacity`} >
<XIcon className="w-4 h-4" />
</button>
</div>
</div>
);
}
CSS Animation (add to globals.css):
css@keyframes slide-in-right {
from {
transform: translateX(100%);
opacity: 0;
}
to {
transform: translateX(0);
opacity: 1;
}
}

.animate-slide-in-right {
animation: slide-in-right 0.3s ease-out;
}

17. Progress Bar Component
    File: components/ui/ProgressBar.jsx
    Props:
    PropTypeDefaultDescriptionvaluenumber0Progress value (0-100)colorstring'blue'Bar colorsizestring'md'Size: sm, md, lgshowLabelbooleanfalseShow percentage labelanimatedbooleanfalseAnimated progress barclassNamestring''Additional CSS classes
    Usage:
    jsximport ProgressBar from '@/components/ui/ProgressBar';

// Confidence score progress bar (URQ-005, URQ-006)

<div className="space-y-4">
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium">Unlimited Pro</span>
      <span className="text-sm text-gray-500">85%</span>
    </div>
    <ProgressBar value={85} color="green" showLabel={false} />
  </div>
  
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium">Data Plus 50GB</span>
      <span className="text-sm text-gray-500">72%</span>
    </div>
    <ProgressBar value={72} color="blue" showLabel={false} />
  </div>
</div>

// Model accuracy display (URQ-012)

<div>
  <p className="text-sm font-medium mb-2">Model Accuracy</p>
  <ProgressBar value={87.5} color="purple" showLabel animated />
</div>
Implementation Example:
jsxexport default function ProgressBar({
  value = 0,
  color = 'blue',
  size = 'md',
  showLabel = false,
  animated = false,
  className = ''
}) {
  // Clamp value between 0-100
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600'
  };
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`
            h-full ${colors[color]} rounded-full transition-all duration-500
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 text-right mt-1">
          {clampedValue.toFixed(1)}%
        </p>
      )}
    </div>
  );
}

18. Tooltip Component
    File: components/ui/Tooltip.jsx
    Props:
    PropTypeDefaultDescriptioncontentstring''Tooltip contentpositionstring'top'Position: top, bottom, left, rightchildrenReactNode-Element to attach tooltipclassNamestring''Additional CSS classes
    Usage:
    jsximport Tooltip from '@/components/ui/Tooltip';
    import { InfoIcon } from 'lucide-react';

// Info tooltip
<Tooltip content="This score represents the model's confidence in this recommendation">
<InfoIcon className="w-4 h-4 text-gray-400 cursor-help" />
</Tooltip>

// Button tooltip
<Tooltip content="Generate new recommendation" position="bottom">
<Button variant="primary">Generate</Button>
</Tooltip>

// Badge tooltip (URQ-007)
<Tooltip content="This recommendation was manually overridden by marketing staff">
<Badge variant="warning">Manual Override</Badge>
</Tooltip>
Implementation Example:
jsx'use client';
import { useState } from 'react';

export default function Tooltip({
content = '',
position = 'top',
children,
className = ''
}) {
const [isVisible, setIsVisible] = useState(false);

const positions = {
top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
left: 'right-full top-1/2 -translate-y-1/2 mr-2',
right: 'left-full top-1/2 -translate-y-1/2 ml-2'
};

const arrows = {
top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900',
bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900',
left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900',
right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900'
};

return (
<div
className="relative inline-block"
onMouseEnter={() => setIsVisible(true)}
onMouseLeave={() => setIsVisible(false)} >
{children}

      {isVisible && content && (
        <div className={`
          absolute ${positions[position]} z-50 whitespace-nowrap
          ${className}
        `}>
          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
            {content}
          </div>
          <div className={`
            absolute w-0 h-0 border-4 border-transparent
            ${arrows[position]}
          `} />
        </div>
      )}
    </div>

);
}

📚 Complete Component Index
Core UI Components (13)

✅ Button Component
✅ Card Component
✅ Badge Component
✅ Modal Component
✅ Table Component
✅ Pagination Component
✅ Search Bar Component
✅ Filter Component
✅ KPI Card Component
✅ Loading Spinner
✅ Skeleton Loader
✅ Empty State
✅ Progress Bar

Form Components (3)

✅ Input Component
✅ Select Component
✅ Textarea Component

Chart Components (2)

✅ Line Chart
✅ Bar Chart

Layout Components (3)

✅ Navbar
✅ Sidebar
✅ Main Layout

Utility Components (2)

✅ Toast Notification
✅ Tooltip

🎨 Tailwind CSS Configuration
Add to tailwind.config.js:
jsmodule.exports = {
content: [
'./app/**/*.{js,ts,jsx,tsx,mdx}',
'./components/**/*.{js,ts,jsx,tsx,mdx}',
],
theme: {
extend: {
colors: {
primary: {
50: '#eff6ff',
100: '#dbeafe',
200: '#bfdbfe',
300: '#93c5fd',
400: '#60a5fa',
500: '#3b82f6',
600: '#2563eb',
700: '#1d4ed8',
800: '#1e40af',
900: '#1e3a8a',
},
},
animation: {
'slide-in-right': 'slide-in-right 0.3s ease-out',
'fade-in': 'fade-in 0.2s ease-out',
},
keyframes: {
'slide-in-right': {
'0%': { transform: 'translateX(100%)', opacity: '0' },
'100%': { transform: 'translateX(0)', opacity: '1' },
},
'fade-in': {
'0%': { opacity: '0' },
'100%': { opacity: '1' },
},
},
},
},
plugins: [],
}

📦 Required NPM Packages
bash# Core dependencies
npm install react react-dom next

# UI & Charts

npm install recharts lucide-react

# Forms & Validation (optional)

npm install react-hook-form zod @hookform/resolvers

# HTTP Client

npm install axios

# State Management (optional - jika pakai Zustand)

npm install zustand

# Utility

npm install clsx tailwind-merge

🔧 Usage Best Practices

1. Import Conventions
   jsx// Prefer named imports for components
   import { Button, Card, Badge } from '@/components/ui';

// Or individual imports
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card'; 2. Consistent Styling
jsx// Good: Use Tailwind utility classes

<div className="flex items-center gap-4 p-6">

// Avoid: Inline styles unless necessary

<div style={{ display: 'flex', padding: '24px' }}>
3. Component Composition
jsx// Good: Compose small components
<Card title="Customer Details">
  <Table columns={columns} data={data} />
  <Pagination currentPage={page} totalPages={10} />
</Card>

// Better: Extract to dedicated component
<CustomerDetailsCard customer={customer} /> 4. Loading States
jsx// Always show loading feedback
{isLoading ? (
<SkeletonLoader type="table" rows={5} />
) : (

  <Table columns={columns} data={data} />
)}
5. Error Handling
jsx// Show user-friendly errors
{error && (
  <Toast type="error" message={error.message} onClose={clearError} />
)}

✅ Component Checklist for Each URQ
URQComponents NeededURQ-001Input, Button, CardURQ-002Sidebar (role-based menu)URQ-003Table, Pagination, SearchBar, Filter, Badge, EmptyStateURQ-004Card, Badge, Table (transactions), ButtonURQ-005Modal, Card, Badge, ProgressBar, LoadingSpinnerURQ-006Card, Badge, TooltipURQ-007Select, Button, Badge, ModalURQ-008Table, Pagination, Filter, BadgeURQ-009KPICard, LineChart, BarChart, FilterURQ-010Table, ButtonURQ-012Card, BadgeURQ-013Table, Button, Modal, Input, SelectURQ-014Table, SearchBar, Filter, BadgeURQ-015Toast

🚀 Ready to Use!
Semua komponen sudah production-ready dan siap digunakan untuk memenuhi semua requirement URS!
Next Steps:

Install dependencies
Setup Tailwind CSS
Create component files
Import & use dalam pages
Test setiap komponen
Integrate dengan API
