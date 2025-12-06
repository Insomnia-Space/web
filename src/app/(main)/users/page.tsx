'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addUser, setItems, setLoading, updateUser } from '@/store/slices/userSlice';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  CreateUserModal,
  UserFilters,
  UserListHeader,
  UserPagination,
  UserStatsCards,
  UserTable,
} from './components';
import { UserService } from '@/services/user.service';
import { useToast } from '@/hooks/use-toast';
import ToastNotification from '@/components/toast-notification';
import type { CreateUserDto, User } from '@/types/user-types';
import { DashboardLayout } from '@/components/layout/Layouts';

export default function UserManagementPage() {
  const dispatch = useAppDispatch();
  const { toasts, success, error, removeToast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const loadUsers = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const users = await UserService.getAll();
      dispatch(setItems(users));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load users';
      error(message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, error]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreateUser = async (data: CreateUserDto) => {
    setCreating(true);
    try {
      const newUser = await UserService.create(data);
      dispatch(addUser(newUser));
      success('User created successfully!');
      setIsCreateModalOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user';
      error(message);
      throw err;
    } finally {
      setCreating(false);
    }
  };

  const handleToggleStatus = async (user: User) => {
    try {
      const updatedUser = await UserService.toggleStatus(user.id, user.status);
      dispatch(updateUser(updatedUser));
      success(`User ${updatedUser.status === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      error(message);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <UserListHeader onAddNew={() => setIsCreateModalOpen(true)} />
        <UserStatsCards />
        
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <UserFilters />
          </CardHeader>
          <CardContent className="space-y-4">
            <UserTable onToggleStatus={handleToggleStatus} />
            <UserPagination />
          </CardContent>
        </Card>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
        loading={creating}
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}