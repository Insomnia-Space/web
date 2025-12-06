'use client';

import { ArrowLeft, Edit, Power, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import type { UserDetail } from '@/types/user-types';
import { cn } from '@/lib/utils';

interface UserDetailHeaderProps {
  user: UserDetail;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStatus?: () => void;
}

export function UserDetailHeader({
  user,
  onEdit,
  onDelete,
  onToggleStatus,
}: UserDetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <Button
          variant="ghost"
          onClick={() => router.push('/users')}
          className="mb-2 gap-2 px-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to User List
        </Button>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <Badge
            className={cn(
              'text-sm font-semibold',
              user.role === 'admin'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700'
            )}
          >
            {user.role}
          </Badge>
          <Badge
            className={cn(
              'text-sm font-semibold',
              user.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            )}
          >
            {user.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">{user.email}</p>
        <p className="text-xs text-muted-foreground">ID: {user.id}</p>
      </div>
      <div className="flex gap-2">
        {onToggleStatus && (
          <Button
            onClick={onToggleStatus}
            variant="outline"
            className="gap-2"
          >
            <Power className="h-4 w-4" />
            {user.status === 'active' ? 'Deactivate' : 'Activate'}
          </Button>
        )}
        {onEdit && (
          <Button onClick={onEdit} variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        )}
        {onDelete && (
          <Button onClick={onDelete} variant="destructive" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}