'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedItem, setLoading, updateUser, deleteUser } from '@/store/slices/userSlice';
import { UserDetailHeader, UserInfoCard, UserActivityCard } from './components';
import { LoadingSpinner } from '@/components/loading-spinner';
import { UserService } from '@/services/user.service';
import { useToast } from '@/hooks/use-toast';
import ToastNotification from '@/components/toast-notification';
import { DashboardLayout } from '@/components/layout/Layouts';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedItem, loading } = useAppSelector((state) => state.user);
  const { toasts, success, error, removeToast } = useToast();

  useEffect(() => {
    loadUserDetail();
  }, [params.id]);

  const loadUserDetail = async () => {
    dispatch(setLoading(true));
    try {
      const user = await UserService.getById(params.id as string);
      // Enrich with additional detail fields
      const detailUser = {
        ...user,
        lastLogin: new Date().toISOString(),
        department: 'Engineering',
        phone: '+62 812 3456 7890',
      };
      dispatch(setSelectedItem(detailUser));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load user details';
      error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleToggleStatus = async () => {
    if (!selectedItem) return;

    try {
      const updatedUser = await UserService.toggleStatus(
        selectedItem.id,
        selectedItem.status
      );
      dispatch(updateUser(updatedUser));
      dispatch(setSelectedItem({ ...selectedItem, status: updatedUser.status }));
      success(`User ${updatedUser.status === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      error(message);
    }
  };

  const handleEdit = () => {
    // Navigate to edit page or open edit modal
    router.push(`/settings/users/${params.id}/edit`);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    
    if (!confirm(`Are you sure you want to delete user "${selectedItem.name}"?`)) {
      return;
    }

    try {
      await UserService.delete(selectedItem.id);
      dispatch(deleteUser(selectedItem.id));
      success('User deleted successfully');
      router.push('/users');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800">User Not Found</h2>
            <p className="mt-2 text-muted-foreground">
              The requested user could not be found.
          </p>
          <button
            onClick={() => router.push('/users')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Back to User List
          </button>
        </div>
      </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto space-y-6 p-6">
        <UserDetailHeader
          user={selectedItem}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <UserInfoCard user={selectedItem} />
          <UserActivityCard user={selectedItem} />
        </div>
      </div>

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