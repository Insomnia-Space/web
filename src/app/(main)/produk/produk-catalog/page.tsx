'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  LayoutList,
  RefreshCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface ProductItem {
  id: string;
  name: string;
  category: 'Data' | 'Voice' | 'Combo';
  price: number; // in IDR
  description: string;
}

// Mock data (replace later with /api/products)
const mockProducts: ProductItem[] = [
  {
    id: 'PKT-DATA-001',
    name: 'Unlimited Pro',
    category: 'Data',
    price: 199000,
    description: 'Paket data unlimited dengan FUP tinggi untuk streaming & kerja remote.',
  },
  {
    id: 'PKT-DATA-002',
    name: 'Streaming Max',
    category: 'Data',
    price: 129000,
    description: 'Optimized untuk video HD & platform OTT dengan prioritas QoS.',
  },
  {
    id: 'PKT-VOICE-001',
    name: 'Voice Saver 250',
    category: 'Voice',
    price: 75000,
    description: '250 menit nelpon semua operator + bonus VoIP gateway.',
  },
  {
    id: 'PKT-VOICE-002',
    name: 'Call Unlimited Local',
    category: 'Voice',
    price: 99000,
    description: 'Nelpon lokal unlimited (area sama) + 50 menit nasional.',
  },
  {
    id: 'PKT-COMBO-001',
    name: 'Combo Smart 15GB + 200Min',
    category: 'Combo',
    price: 159000,
    description: '15GB kuota nasional + 200 menit telpon + 200 SMS.',
  },
  {
    id: 'PKT-COMBO-002',
    name: 'Gaming Plus 30GB',
    category: 'Combo',
    price: 179000,
    description: '30GB data dengan latency optimized + 100 menit voice.',
  },
  {
    id: 'PKT-DATA-003',
    name: 'Work From Anywhere 50GB',
    category: 'Data',
    price: 229000,
    description: '50GB high-speed untuk remote working multi device tethering.',
  },
  {
    id: 'PKT-COMBO-003',
    name: 'Family Share 80GB',
    category: 'Combo',
    price: 299000,
    description: '80GB dapat dibagi 5 user + kontrol parental usage.',
  },
  {
    id: 'PKT-VOICE-003',
    name: 'Enterprise Voice 1000',
    category: 'Voice',
    price: 499000,
    description: 'Bundle enterprise voice 1000 menit + SIP trunk integration.',
  },
  {
    id: 'PKT-DATA-004',
    name: 'Night Owl 100GB',
    category: 'Data',
    price: 99000,
    description: 'Kuota malam (00.00–06.00) besar untuk download & backup.',
  },
];

const PAGE_SIZE = 10;
const categories: Array<ProductItem['category']> = ['Data', 'Voice', 'Combo'];

export default function ProductCatalogPage() {
  const [search, setSearch] = useState('');
  const [pendingSearch, setPendingSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Simulate loading state when filters change
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200); // small fake delay
    return () => clearTimeout(timer);
  }, [search, category, page]);

  const filtered = useMemo(() => {
    let data = mockProducts;
    if (category !== 'All') {
      data = data.filter(p => p.category === category);
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      data = data.filter(
        p =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.id.toLowerCase().includes(s)
      );
    }
    return data;
  }, [search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function applySearch() {
    setPage(1);
    setSearch(pendingSearch);
  }

  function resetFilters() {
    setPendingSearch('');
    setSearch('');
    setCategory('All');
    setPage(1);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header with gradient */}
        <div className="rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
          <div className="rounded-[10px] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                    Product Catalog
                  </h1>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Jelajahi {filtered.length} produk telco terbaik kami
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="gap-1.5 transition-all"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('table')}
                  className="gap-1.5 transition-all"
                >
                  <LayoutList className="h-4 w-4" />
                  <span className="hidden sm:inline">Table</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cari nama produk, ID, atau deskripsi..."
                  className="pl-10 transition-all focus:ring-2 focus:ring-purple-200"
                  value={pendingSearch}
                  onChange={e => setPendingSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') applySearch();
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={applySearch}
                  className="transition-all hover:border-purple-300 hover:bg-purple-50"
                >
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="transition-all hover:bg-gray-100"
                >
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 300);
                  }}
                  className="transition-all"
                >
                  <RefreshCcw className={cn('h-4 w-4', loading && 'animate-spin')} />
                </Button>
              </div>
            </div>

            {/* Enhanced Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setCategory('All');
                  setPage(1);
                }}
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  'hover:scale-105 active:scale-95',
                  category === 'All'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-200'
                    : 'border border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                )}
              >
                All Products
                {category === 'All' && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex h-5 w-5 rounded-full bg-purple-500"></span>
                  </span>
                )}
              </button>
              {categories.map(cat => {
                const count = mockProducts.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setPage(1);
                    }}
                    className={cn(
                      'relative rounded-lg px-4 py-2 text-sm font-medium transition-all',
                      'hover:scale-105 active:scale-95',
                      category === cat
                        ? cat === 'Data'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-200'
                          : cat === 'Voice'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                    )}
                  >
                    <span>{cat}</span>
                    <span
                      className={cn(
                        'ml-1.5 rounded-full px-1.5 py-0.5 text-xs',
                        category === cat ? 'bg-white/20' : 'bg-gray-100'
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Loading Skeleton */}
            {loading && (
              <div
                className={cn(
                  'grid gap-4',
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                )}
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-xl border border-gray-200 p-4">
                    <div className="mb-3 h-4 w-1/3 rounded bg-gray-200"></div>
                    <div className="mb-3 h-6 w-2/3 rounded bg-gray-200"></div>
                    <div className="mb-2 h-3 w-full rounded bg-gray-200"></div>
                    <div className="h-3 w-4/5 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Grid View */}
            {!loading && viewMode === 'grid' && (
              <div className="animate-in fade-in grid grid-cols-1 gap-4 duration-300 md:grid-cols-2 lg:grid-cols-3">
                {pageData.map((p, idx) => (
                  <div
                    key={p.id}
                    className="group relative rounded-xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-1 hover:scale-[1.02] hover:border-purple-300 hover:shadow-xl"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-10" />

                    <div className="relative space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge
                          className={cn(
                            'text-[11px] font-semibold transition-all group-hover:scale-110',
                            p.category === 'Data' &&
                              'bg-blue-100 text-blue-700 group-hover:bg-blue-200',
                            p.category === 'Voice' &&
                              'bg-amber-100 text-amber-700 group-hover:bg-amber-200',
                            p.category === 'Combo' &&
                              'bg-purple-100 text-purple-700 group-hover:bg-purple-200'
                          )}
                        >
                          {p.category}
                        </Badge>
                        <span className="font-mono text-[10px] text-gray-400">{p.id}</span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-purple-600">
                          {p.name}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs text-gray-600 transition-all group-hover:line-clamp-none">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                        <div>
                          <p className="text-[10px] font-medium text-gray-500">Harga</p>
                          <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                            Rp {p.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-all group-hover:opacity-100 hover:from-purple-700 hover:to-pink-700"
                        >
                          Pilih
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {!loading && viewMode === 'table' && (
              <div className="animate-in fade-in overflow-x-auto rounded-xl border border-gray-200 duration-300">
                <Table className="min-w-[1000px]">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-purple-50/30 hover:from-gray-50 hover:to-purple-50/30">
                      <TableHead className="font-semibold text-gray-700">Product ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Category</TableHead>
                      <TableHead className="font-semibold text-gray-700">Price</TableHead>
                      <TableHead className="font-semibold text-gray-700">Description</TableHead>
                      <TableHead className="text-right font-semibold text-gray-700">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageData.map((p, idx) => (
                      <>
                        <TableRow
                          key={p.id}
                          className={cn(
                            'group relative h-20 transition-all duration-300 ease-out',
                            'hover:bg-gradient-to-r hover:from-purple-50/40 hover:via-pink-50/30 hover:to-blue-50/40',
                            'hover:scale-[1.01] hover:shadow-md',
                            'border-b border-gray-100'
                          )}
                          style={{
                            animationDelay: `${idx * 40}ms`,
                          }}
                        >
                          <TableCell className="py-5">
                            <span className="font-mono text-xs text-gray-500 transition-colors group-hover:text-purple-600">
                              {p.id}
                            </span>
                          </TableCell>

                          <TableCell className="py-5">
                            <div className="space-y-0.5">
                              <p className="font-bold text-gray-800 transition-colors group-hover:text-purple-700">
                                {p.name}
                              </p>
                              <p className="text-[10px] font-medium text-gray-400">Product</p>
                            </div>
                          </TableCell>

                          <TableCell className="py-5">
                            <Badge
                              className={cn(
                                'text-xs font-semibold transition-all group-hover:scale-110 group-hover:shadow-md',
                                p.category === 'Data' &&
                                  'bg-blue-100 text-blue-700 group-hover:bg-blue-200',
                                p.category === 'Voice' &&
                                  'bg-amber-100 text-amber-700 group-hover:bg-amber-200',
                                p.category === 'Combo' &&
                                  'bg-purple-100 text-purple-700 group-hover:bg-purple-200'
                              )}
                            >
                              {p.category}
                            </Badge>
                          </TableCell>

                          <TableCell className="py-5">
                            <div className="space-y-0.5">
                              <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-base font-bold text-transparent">
                                Rp {p.price.toLocaleString('id-ID')}
                              </p>
                              <p className="text-[10px] text-gray-400">per bulan</p>
                            </div>
                          </TableCell>

                          <TableCell className="max-w-[300px] py-5">
                            <p className="line-clamp-2 text-xs text-gray-600 transition-colors group-hover:text-gray-800">
                              {p.description}
                            </p>
                          </TableCell>

                          <TableCell className="px-5 py-8 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setExpandedRow(expandedRow === p.id ? null : p.id)}
                                className={cn(
                                  'border-purple-200 transition-all',
                                  'opacity-0 group-hover:opacity-100',
                                  'hover:border-purple-300 hover:bg-purple-50',
                                  expandedRow === p.id && 'bg-purple-50 opacity-100'
                                )}
                              >
                                {expandedRow === p.id ? 'Tutup' : 'Detail'}
                              </Button>
                              <Button
                                size="sm"
                                className={cn(
                                  'bg-gradient-to-r from-purple-600 to-pink-600 transition-all',
                                  'opacity-0 group-hover:scale-105 group-hover:opacity-100',
                                  'hover:from-purple-700 hover:to-pink-700 hover:shadow-lg',
                                  'active:scale-95'
                                )}
                              >
                                Pilih
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedRow === p.id && (
                          <TableRow className="animate-in fade-in slide-in-from-top-2 border-b-2 border-purple-200 bg-gradient-to-r from-purple-50/60 via-pink-50/50 to-blue-50/60 duration-300">
                            <TableCell colSpan={6} className="py-6">
                              <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                  <div className="flex-1 space-y-3">
                                    <div>
                                      <p className="mb-1 text-xs font-semibold tracking-wide text-purple-600 uppercase">
                                        Detail Produk
                                      </p>
                                      <h4 className="text-lg font-bold text-gray-800">{p.name}</h4>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-gray-500">
                                          Deskripsi:
                                        </span>
                                      </div>
                                      <p className="text-sm leading-relaxed text-gray-700">
                                        {p.description}
                                      </p>
                                    </div>
                                    <div className="flex gap-6 pt-2">
                                      <div>
                                        <p className="text-xs font-medium text-gray-500">
                                          Kategori
                                        </p>
                                        <Badge className="mt-1 bg-purple-100 text-purple-700">
                                          {p.category}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-xs font-medium text-gray-500">
                                          Product ID
                                        </p>
                                        <p className="mt-1 font-mono text-sm text-gray-700">
                                          {p.id}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-3">
                                    <div className="text-right">
                                      <p className="mb-1 text-xs font-medium text-gray-500">
                                        Harga
                                      </p>
                                      <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                                        Rp {p.price.toLocaleString('id-ID')}
                                      </p>
                                      <p className="mt-0.5 text-xs text-gray-400">per bulan</p>
                                    </div>
                                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transition-all hover:scale-105 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl active:scale-95">
                                      Pilih Paket Ini
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Empty State */}
            {!loading && pageData.length === 0 && (
              <div className="animate-in fade-in py-16 text-center duration-300">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100">
                  <Search className="h-10 w-10 text-purple-400" />
                </div>
                <p className="font-medium text-gray-600">Tidak ada produk yang cocok</p>
                <p className="mt-1 text-sm text-gray-400">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <p className="text-sm font-medium text-gray-600">
                Halaman <span className="font-bold text-purple-600">{page}</span> dari{' '}
                <span className="font-bold text-purple-600">{totalPages}</span> •{' '}
                <span className="text-gray-500">{filtered.length} produk</span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 1 || loading}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="transition-all hover:border-purple-300 hover:bg-purple-50 disabled:opacity-40"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Prev
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === totalPages || loading}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="transition-all hover:border-purple-300 hover:bg-purple-50 disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
