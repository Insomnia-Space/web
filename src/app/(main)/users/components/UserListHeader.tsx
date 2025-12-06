'use client';

import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserListHeaderProps {
  onAddNew?: () => void;
}

export function UserListHeader({ onAddNew }: UserListHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        </div>
        <p className="mt-1 text-muted-foreground">
          Kelola semua user dan hak akses sistem
        </p>
      </div>
      {onAddNew && (
        <Button onClick={onAddNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New User
        </Button>
      )}
    </div>
  );
}