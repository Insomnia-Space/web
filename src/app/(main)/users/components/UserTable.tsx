'use client';

import { Table } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { selectPaginatedItems } from '@/store/slices/userSlice';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user-types';
import { cn } from '@/lib/utils';

interface UserTableProps {
  onToggleStatus: (user: User) => void;
}

export function UserTable({ onToggleStatus }: UserTableProps) {
  const router = useRouter();
  const items = useAppSelector(selectPaginatedItems);
  const { loading } = useAppSelector((state) => state.user);

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (item: User) => (
        <div className="space-y-0.5">
          <p className="font-medium text-gray-800">{item.name}</p>
          <p className="text-xs text-gray-500">{item.id}</p>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (item: User) => (
        <span className="text-sm text-gray-600">{item.email}</span>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      width: '120px',
      render: (item: User) => (
        <Badge
          className={cn(
            'text-xs font-semibold',
            item.role === 'admin'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-100 text-gray-700'
          )}
        >
          {item.role}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (item: User) => (
        <Badge
          className={cn(
            'text-xs font-semibold',
            item.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          )}
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '150px',
      align: 'right' as const,
      render: (item: User) => (
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(item);
          }}
        >
          {item.status === 'active' ? 'Deactivate' : 'Activate'}
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={items}
      loading={loading}
      emptyMessage="No users found"
      onRowClick={(item) => router.push(`/settings/users/${item.id}`)}
      hoverable
      striped
    />
  );
}