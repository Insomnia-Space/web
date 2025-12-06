Dokumentasi Komponen UI
Dokumentasi lengkap untuk penggunaan komponen-komponen React yang telah disediakan.

Daftar Isi

BarChart
EmptyState
ErrorBoundary
Filter
InputField
KPICard
LineChart
LoadingSpinner
Modal
Pagination
PieChart
ProgressBar
SearchBar
SelectField
SkeletonLoader
StatCard
Table
TextareaField
ToastNotification
Tooltip
useToast Hook

BarChart
Komponen untuk menampilkan grafik batang menggunakan Recharts.
Props
PropTypeDefaultDeskripsidataRecord<string, string | number>[][]Data yang akan ditampilkanxKeystring'name'Key untuk sumbu XyKeystring'value'Key untuk sumbu Ytitlestring''Judul chartheightnumber300Tinggi chart dalam pixelcolorstring'#3B82F6'Warna batanghorizontalbooleanfalseOrientasi horizontalshowGridbooleantrueTampilkan gridshowTooltipbooleantrueTampilkan tooltiploadingbooleanfalseStatus loadingclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport BarChart from '@/components/bar-chart';

const data = [
{ name: 'Jan', value: 400 },
{ name: 'Feb', value: 300 },
{ name: 'Mar', value: 600 },
{ name: 'Apr', value: 800 },
];

function MyComponent() {
return (
<BarChart
      data={data}
      title="Monthly Sales"
      xKey="name"
      yKey="value"
      color="#10B981"
      height={400}
    />
);
}

EmptyState
Komponen untuk menampilkan state kosong dengan icon, pesan, dan action button.
Props
PropTypeDefaultDeskripsiiconReactNodenullIcon yang ditampilkantitlestring'No data found'Judul pesanmessagestring''Pesan detailactionReactNodenullTombol actionclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport EmptyState from '@/components/empty-state';
import { Inbox } from 'lucide-react';

function MyComponent() {
return (
<EmptyState
icon={<Inbox />}
title="No messages"
message="You don't have any messages yet"
action={
<button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
Compose Message
</button>
}
/>
);
}

ErrorBoundary
Komponen class untuk menangkap error React dan menampilkan fallback UI.
Props
PropTypeDefaultDeskripsichildrenReactNode-Children componentsfallbackComponentTypeDefaultErrorFallbackCustom fallback component
Contoh Penggunaan
tsximport { ErrorBoundary } from '@/components/error-boundary';

function CustomFallback({ error, resetError }) {
return (
<div>
<h2>Terjadi kesalahan</h2>
<p>{error?.message}</p>
<button onClick={resetError}>Coba Lagi</button>
</div>
);
}

function App() {
return (
<ErrorBoundary fallback={CustomFallback}>
<YourApp />
</ErrorBoundary>
);
}
useErrorHandler Hook
tsximport { useErrorHandler } from '@/components/error-boundary';

function MyComponent() {
const { error, resetError, captureError } = useErrorHandler();

const handleSubmit = async () => {
try {
await riskyOperation();
} catch (err) {
captureError(err);
}
};

if (error) {
return <div>Error: {error.message}</div>;
}

return <button onClick={handleSubmit}>Submit</button>;
}

Filter
Komponen dropdown filter dengan opsi clear dan multiple selection.
Props
PropTypeDefaultDeskripsilabelstring''Label filteroptionsFilterOption[][]Array opsi filtervaluestring | string[]''Nilai terpilihonChangefunction-Callback saat nilai berubahmultiplebooleanfalseMultiple selectionplaceholderstring'Select...'Placeholder textclearablebooleantrueTampilkan tombol clearclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport Filter from '@/components/filter';
import { useState } from 'react';

const options = [
{ value: 'active', label: 'Active' },
{ value: 'pending', label: 'Pending' },
{ value: 'completed', label: 'Completed' },
];

function MyComponent() {
const [status, setStatus] = useState('');

return (
<Filter
      label="Status"
      options={options}
      value={status}
      onChange={setStatus}
      placeholder="Select status"
    />
);
}

InputField
Komponen input field dengan label, error message, dan icon support.
Props
PropTypeDefaultDeskripsilabelstring''Label inputtypestring'text'Tipe inputerrorstring''Pesan errorhelperTextstring''Helper texticonReactNodenullIcon di sebelah kirirequiredbooleanfalseRequired fielddisabledbooleanfalseDisabled stateclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport InputField from '@/components/input-field';
import { Mail } from 'lucide-react';
import { useState } from 'react';

function MyComponent() {
const [email, setEmail] = useState('');
const [error, setError] = useState('');

return (
<InputField
label="Email"
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
icon={<Mail />}
error={error}
helperText="We'll never share your email"
required
/>
);
}

KPICard
Komponen kartu untuk menampilkan Key Performance Indicator.
Props
PropTypeDefaultDeskripsititlestring-Judul KPIvaluestring | number-Nilai KPIiconLucideIcon-Icon komponentrendobject-Trend data (value, direction)subtitlestring-Subtitle tambahancolorstring'blue'Warna themeclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport { KPICard } from '@/components/kpi-card';
import { Users } from 'lucide-react';

function Dashboard() {
return (
<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
<KPICard
title="Total Users"
value="1,234"
icon={Users}
color="blue"
trend={{ value: 12.5, direction: 'up' }}
subtitle="vs last month"
/>
</div>
);
}

LineChart
Komponen untuk menampilkan grafik garis menggunakan Recharts.
Props
PropTypeDefaultDeskripsidataRecord<string, string | number>[][]Data chartxKeystring'name'Key untuk sumbu XyKeystring'value'Key untuk sumbu Ytitlestring''Judul chartheightnumber300Tinggi chartcolorstring'#3B82F6'Warna garisshowGridbooleantrueTampilkan gridshowTooltipbooleantrueTampilkan tooltiploadingbooleanfalseStatus loadingclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport LineChart from '@/components/line-chart';

const data = [
{ month: 'Jan', revenue: 4000 },
{ month: 'Feb', revenue: 3000 },
{ month: 'Mar', revenue: 6000 },
];

function RevenueChart() {
return (
<LineChart
      data={data}
      xKey="month"
      yKey="revenue"
      title="Monthly Revenue"
      color="#10B981"
    />
);
}

LoadingSpinner
Komponen spinner loading sederhana.
Props
PropTypeDefaultDeskripsisize'sm' | 'md' | 'lg' | 'xl''md'Ukuran spinnercolor'blue' | 'green' | 'red' | 'gray''blue'Warna spinnerclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport { LoadingSpinner } from '@/components/loading-spinner';

function MyComponent() {
const [loading, setLoading] = useState(true);

if (loading) {
return (
<div className="flex items-center justify-center p-8">
<LoadingSpinner size="lg" color="blue" />
</div>
);
}

return <div>Content</div>;
}

Modal
Komponen modal dialog dengan backdrop dan animasi.
Props
PropTypeDefaultDeskripsiisOpenboolean-Status modal terbukaonClosefunction-Callback saat modal ditutuptitlestring-Judul modalsize'sm' | 'md' | 'lg' | 'xl' | 'full''md'Ukuran modalshowCloseButtonbooleantrueTampilkan tombol closefooterReactNode-Footer contentcloseOnOverlaybooleantrueClose saat klik overlayclassNamestring''CSS class tambahanchildrenReactNode-Modal content
Contoh Penggunaan
tsximport Modal from '@/components/modal';
import { useState } from 'react';

function MyComponent() {
const [isOpen, setIsOpen] = useState(false);

return (
<>
<button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="md"
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => setIsOpen(false)}>Confirm</button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>

);
}

Pagination
Komponen pagination dengan navigasi halaman.
Props
PropTypeDefaultDeskripsicurrentPagenumber1Halaman aktiftotalPagesnumber1Total halamanonPageChangefunction-Callback perubahan halamanitemsPerPagenumber20Jumlah item per halamantotalItemsnumber0Total itemshowInfobooleantrueTampilkan info itemclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport { Pagination } from '@/components/pagination';
import { useState } from 'react';

function MyComponent() {
const [currentPage, setCurrentPage] = useState(1);
const totalItems = 250;
const itemsPerPage = 20;
const totalPages = Math.ceil(totalItems / itemsPerPage);

return (
<Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
    />
);
}

PieChart
Komponen untuk menampilkan grafik pie menggunakan Recharts.
Props
PropTypeDefaultDeskripsidataRecord<string, string | number>[][]Data chartnameKeystring'name'Key untuk namavalueKeystring'value'Key untuk nilaititlestring''Judul chartheightnumber300Tinggi chartcolorsstring[]DEFAULT_COLORSArray warnashowTooltipbooleantrueTampilkan tooltiploadingbooleanfalseStatus loadingclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport PieChart from '@/components/pie-chart';

const data = [
{ name: 'Product A', value: 400 },
{ name: 'Product B', value: 300 },
{ name: 'Product C', value: 200 },
];

function SalesDistribution() {
return (
<PieChart
data={data}
title="Sales by Product"
nameKey="name"
valueKey="value"
colors={['#3B82F6', '#10B981', '#F59E0B']}
/>
);
}

ProgressBar
Komponen progress bar dengan berbagai ukuran dan warna.
Props
PropTypeDefaultDeskripsivaluenumber0Nilai progress (0-100)color'blue' | 'green' | 'yellow' | 'red' | 'purple''blue'Warna progresssize'sm' | 'md' | 'lg''md'Ukuran progress barshowLabelbooleanfalseTampilkan label persentaseanimatedbooleanfalseAnimasi pulseclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport ProgressBar from '@/components/progress-bar';

function UploadProgress() {
const [progress, setProgress] = useState(0);

return (
<div>
<p>Uploading: {progress}%</p>
<ProgressBar
        value={progress}
        color="blue"
        size="lg"
        showLabel
        animated
      />
</div>
);
}

SearchBar
Komponen search bar dengan debounce dan loading indicator.
Props
PropTypeDefaultDeskripsivaluestring''Nilai searchonChangefunction-Callback perubahan nilaiplaceholderstring'Search...'Placeholder textonClearfunction-Callback saat clearloadingbooleanfalseStatus loadingdebouncenumber300Debounce delay (ms)classNamestring''CSS class tambahan
Contoh Penggunaan
tsximport SearchBar from '@/components/search-bar';
import { useState } from 'react';

function MyComponent() {
const [searchTerm, setSearchTerm] = useState('');
const [loading, setLoading] = useState(false);

const handleSearch = (value) => {
setSearchTerm(value);
// Perform search operation
};

return (
<SearchBar
value={searchTerm}
onChange={handleSearch}
placeholder="Search products..."
loading={loading}
debounce={500}
onClear={() => setSearchTerm('')}
/>
);
}

SelectField
Komponen select dropdown dengan label dan error handling.
Props
PropTypeDefaultDeskripsilabelstring''Label selectoptionsSelectOption[][]Array opsierrorstring''Pesan errorhelperTextstring''Helper textrequiredbooleanfalseRequired fielddisabledbooleanfalseDisabled stateplaceholderstring'Select...'PlaceholderclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport SelectField from '@/components/select-field';
import { useState } from 'react';

const countries = [
{ value: 'us', label: 'United States' },
{ value: 'id', label: 'Indonesia' },
{ value: 'uk', label: 'United Kingdom' },
];

function MyComponent() {
const [country, setCountry] = useState('');

return (
<SelectField
label="Country"
options={countries}
value={country}
onChange={(e) => setCountry(e.target.value)}
placeholder="Select your country"
required
/>
);
}

SkeletonLoader
Komponen skeleton loader untuk loading state.
Props
PropTypeDefaultDeskripsitype'text' | 'title' | 'card' | 'table' | 'circle''text'Tipe skeletonrowsnumber3Jumlah baris (untuk text/table)classNamestring''CSS class tambahan
Contoh Penggunaan
tsximport SkeletonLoader from '@/components/skeleton-loader';

function MyComponent() {
const [loading, setLoading] = useState(true);

if (loading) {
return (
<div>
<SkeletonLoader type="title" />
<SkeletonLoader type="text" rows={5} />
<SkeletonLoader type="card" />
</div>
);
}

return <div>Content</div>;
}

StatCard
Komponen kartu statistik sederhana dengan icon.
Props
PropTypeDefaultDeskripsilabelstring-Label statvaluestring | number-Nilai staticonReactNode-Icondescriptionstring-Deskripsi tambahanclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport { StatCard } from '@/components/stat-card';
import { TrendingUp } from 'lucide-react';

function Dashboard() {
return (
<div className="grid grid-cols-3 gap-4">
<StatCard
label="Revenue"
value="$45,231"
icon={<TrendingUp className="h-5 w-5 text-green-600" />}
description="+12% from last month"
/>
</div>
);
}

Table
Komponen tabel dengan sorting, loading, dan empty state.
Props
PropTypeDefaultDeskripsicolumnsColumn<T>[]-Konfigurasi kolomdataT[]-Data tabelloadingbooleanfalseStatus loadingemptyMessagestring'No data available'Pesan saat kosongonRowClickfunction-Callback klik barishoverablebooleanfalseHover effectstripedbooleanfalseStriped rowsclassNamestring''CSS class tambahan
Column Interface
tsxinterface Column<T> {
key: string;
label: string;
width?: string;
align?: 'left' | 'center' | 'right';
render?: (value: unknown, row: T, index: number) => ReactNode;
sortable?: boolean;
}
Contoh Penggunaan
tsximport { Table } from '@/components/table';

interface User {
id: number;
name: string;
email: string;
role: string;
}

const columns = [
{ key: 'id', label: 'ID', width: '80px' },
{ key: 'name', label: 'Name' },
{ key: 'email', label: 'Email' },
{
key: 'role',
label: 'Role',
render: (value) => (
<span className="rounded bg-blue-100 px-2 py-1">{value}</span>
),
},
];

function UserTable() {
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);

return (
<Table
columns={columns}
data={users}
loading={loading}
hoverable
striped
onRowClick={(user) => console.log(user)}
/>
);
}

TextareaField
Komponen textarea dengan label dan error handling.
Props
PropTypeDefaultDeskripsilabelstring''Label textareaerrorstring''Pesan errorhelperTextstring''Helper textrequiredbooleanfalseRequired fielddisabledbooleanfalseDisabled staterowsnumber4Jumlah barisclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport TextareaField from '@/components/textarea-field';
import { useState } from 'react';

function MyComponent() {
const [message, setMessage] = useState('');

return (
<TextareaField
label="Message"
value={message}
onChange={(e) => setMessage(e.target.value)}
placeholder="Enter your message..."
rows={6}
required
helperText="Maximum 500 characters"
/>
);
}

ToastNotification
Komponen notifikasi toast dengan auto-dismiss.
Props
PropTypeDefaultDeskripsimessagestring-Pesan notifikasitype'success' | 'error' | 'warning' | 'info''info'Tipe notifikasidurationnumber3000Durasi tampil (ms)onClosefunction-Callback saat closeclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport ToastNotification from '@/components/toast-notification';
import { useState } from 'react';

function MyComponent() {
const [showToast, setShowToast] = useState(false);

return (
<>
<button onClick={() => setShowToast(true)}>
Show Notification
</button>

      {showToast && (
        <ToastNotification
          message="Operation successful!"
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </>

);
}

Tooltip
Komponen tooltip dengan berbagai posisi.
Props
PropTypeDefaultDeskripsicontentstring''Konten tooltipposition'top' | 'bottom' | 'left' | 'right''top'Posisi tooltipchildrenReactNode-Element triggerclassNamestring''CSS class tambahan
Contoh Penggunaan
tsximport Tooltip from '@/components/tooltip';
import { Info } from 'lucide-react';

function MyComponent() {
return (
<Tooltip content="This is helpful information" position="top">
<Info className="h-5 w-5 cursor-help text-gray-400" />
</Tooltip>
);
}

useToast Hook
Custom hook untuk mengelola toast notifications.
Return Values
MethodParametersDeskripsitoasts-Array of active toastsshowToast(message, type)Tampilkan toastremoveToast(id)Hapus toastsuccess(message)Tampilkan success toasterror(message)Tampilkan error toastwarning(message)Tampilkan warning toastinfo(message)Tampilkan info toast
Contoh Penggunaan
tsximport { useToast } from '@/components/use-toast';
import ToastNotification from '@/components/toast-notification';

function MyComponent() {
const { toasts, success, error, removeToast } = useToast();

const handleSubmit = async () => {
try {
await submitData();
success('Data saved successfully!');
} catch (err) {
error('Failed to save data');
}
};

return (
<>
<button onClick={handleSubmit}>Submit</button>

      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>

);
}

Tips Umum

1. Styling & Customization
   Semua komponen mendukung className prop untuk customization tambahan menggunakan Tailwind CSS:
   tsx<InputField
     label="Email"
     className="max-w-md"
   />
2. TypeScript Support
   Semua komponen fully typed dengan TypeScript. Gunakan generic types untuk komponen seperti Table:
   tsxinterface Product {
   id: number;
   name: string;
   price: number;
   }

<Table<Product>
columns={columns}
data={products}
/> 3. Form Handling
Untuk form handling, gunakan dengan react-hook-form:
tsximport { useForm } from 'react-hook-form';
import InputField from '@/components/input-field';

function MyForm() {
const { register, handleSubmit, formState: { errors } } = useForm();

return (
<form onSubmit={handleSubmit(onSubmit)}>
<InputField
label="Email"
{...register('email', { required: 'Email is required' })}
error={errors.email?.message}
/>
</form>
);
} 4. Loading States
Gunakan kombinasi SkeletonLoader dan LoadingSpinner untuk UX yang lebih baik :

tsxfunction MyComponent() {
const [loading, setLoading] = useState(true);

if (loading) {
return <SkeletonLoader type="card" />;
}

return <div>Content</div>;
} 5. Error Handling
Wrap aplikasi dengan ErrorBoundary di level tertinggi:
tsx// \_app.tsx atau layout.tsx
import { ErrorBoundary } from '@/components/error-boundary';

export default function App({ Component, pageProps }) {
return (
<ErrorBoundary>
<Component {...pageProps} />
</ErrorBoundary>
);
}

Dependencies
Komponen-komponen ini memerlukan dependencies berikut:
json{
"dependencies": {
"react": "^18.0.0",
"lucide-react": "^0.263.1",
"recharts": "^2.5.0"
}
}
Dan utility function cn dari @/lib/utils:
tsximport { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}

Lisensi & Support
Untuk pertanyaan atau issue, silakan buat issue di repository atau hubungi tim development.
