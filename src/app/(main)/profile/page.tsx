'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchProfile,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from '@/store/slices/profileSlice';
import {
  ProfileHeader,
  ProfileStats,
  AccountInfo,
  EditProfileForm,
  ChangePasswordForm,
} from './components';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert'; 
import { AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/Layouts';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const loading = useAppSelector(selectProfileLoading);
  const error = useAppSelector(selectProfileError);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading && !profile) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <Alert>
            <AlertDescription>Profile not found</AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto space-y-6 p-6">
        <ProfileHeader profile={profile} />
        <ProfileStats statistics={profile.statistics} />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <AccountInfo profile={profile} />
          </div>
          <div className="space-y-6">
            <EditProfileForm profile={profile} />
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}