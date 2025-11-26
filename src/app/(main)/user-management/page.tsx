'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Plus, RefreshCcw, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: 'active' | 'inactive'; // not provided by API yet, we simulate
  createdAt?: string;
  updatedAt?: string;
}

interface FetchResponse {
  success: boolean;
  data?: {
    users: UserItem[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  };
  error?: string;
}

const PAGE_SIZE = 10; // aligned with API default

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [pendingSearch, setPendingSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState('user');

  async function fetchUsers(targetPage = page, targetSearch = search) {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: targetPage.toString(),
        limit: PAGE_SIZE.toString(),
      });
      if (targetSearch.trim()) params.set('search', targetSearch.trim());
      const res = await fetch(`/api/users?${params.toString()}`);
      const json: FetchResponse = await res.json();
      if (!json.success || !json.data) {
        throw new Error(json.error || 'Failed fetching users');
      }
      // Simulate status since API doesn't yet provide it
      const enriched = json.data.users.map(u => ({ ...u, status: 'active' as const }));
      setUsers(enriched);
      setPage(json.data.pagination.page);
      setTotalPages(json.data.pagination.totalPages);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err || 'Error loading users');
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers(1, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function resetForm() {
    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormRole('user');
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!formName || !formEmail || !formPassword || !formRole) {
      toast.error('Lengkapi semua field');
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, email: formEmail, role: formRole }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal membuat user');
      toast.success('User berhasil dibuat');
      setOpenCreate(false);
      resetForm();
      // Refresh list
      fetchUsers(1, search);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err || 'Error');
      toast.error(msg);
    } finally {
      setCreating(false);
    }
  }

  async function toggleStatus(user: UserItem) {
    // In absence of real status in API, we send a PUT with status but backend currently ignores it.
    const nextStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal update status');
      toast.success(`Status user diubah menjadi ${nextStatus}`);
      setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, status: nextStatus } : u)));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err || 'Error mengubah status');
      toast.error(msg);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">User Management</CardTitle>
              <CardDescription>Kelola daftar user (create, search, status)</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cari nama..."
                  className="w-48 pl-8"
                  value={pendingSearch}
                  onChange={e => setPendingSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') setSearch(pendingSearch);
                  }}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch(pendingSearch);
                }}
              >
                Apply
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setPendingSearch('');
                  setSearch('');
                }}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchUsers(page, search)}
                disabled={loading}
              >
                <RefreshCcw className={cn('h-4 w-4', loading && 'animate-spin')} />
              </Button>
              <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                <DialogTrigger asChild>
                  <Button className="gap-1" size="sm">
                    <Plus className="h-4 w-4" /> User Baru
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Buat User Baru</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreate} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Nama</label>
                      <Input
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Email</label>
                      <Input
                        type="email"
                        value={formEmail}
                        onChange={e => setFormEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Password</label>
                      <Input
                        type="password"
                        value={formPassword}
                        onChange={e => setFormPassword(e.target.value)}
                        required
                      />
                      <p className="text-[10px] text-gray-500">
                        (Disimpan hanya untuk demonstrasi – backend belum implement)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Role</label>
                      <Select value={formRole} onValueChange={val => setFormRole(val)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button type="button" variant="ghost" onClick={() => setOpenCreate(false)}>
                        Batal
                      </Button>
                      <Button type="submit" disabled={creating}>
                        {creating ? 'Membuat...' : 'Buat'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto rounded-md border">
              <Table className="min-w-[760px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <Link href={`#/user/${u.id}`} className="text-blue-600 hover:underline">
                          {u.name}
                        </Link>
                      </TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            'text-[11px]',
                            u.role === 'admin'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-gray-100 text-gray-700'
                          )}
                        >
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            'text-[11px]',
                            u.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          )}
                        >
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => toggleStatus(u)}>
                          {u.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-6 text-center text-xs text-gray-500">
                        Tidak ada data
                      </TableCell>
                    </TableRow>
                  )}
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-6 text-center text-xs text-gray-500">
                        Memuat...
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">
                Page {page} / {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (page > 1) {
                      const newPage = page - 1;
                      setPage(newPage);
                      fetchUsers(newPage, search);
                    }
                  }}
                  disabled={page === 1 || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (page < totalPages) {
                      const newPage = page + 1;
                      setPage(newPage);
                      fetchUsers(newPage, search);
                    }
                  }}
                  disabled={page === totalPages || loading}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* <div className="rounded-md bg-blue-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">Catatan Implementasi:</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>
                  Status user saat ini disimulasikan (API belum sediakan field <code>status</code>).
                </li>
                <li>
                  Untuk produksi: tambah kolom <code>status</code> di database dan kembalikan di{' '}
                  <code>GET /api/users</code>.
                </li>
                <li>
                  Password tidak dikirim ke backend karena route contoh belum mendukung—perlu
                  endpoint khusus registrasi.
                </li>
                <li>
                  Toggle status melakukan <code>PUT</code> dengan body berisi status; backend contoh
                  saat ini mengabaikan field ekstra.
                </li>
              </ul>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
