'use client';

import { useState } from 'react';
import Modal from '@/components/modal';
import InputField from '@/components/input';
import SelectField from '@/components/select';
import { Button } from '@/components/ui/button';
import { Mail, User, Lock, Shield } from 'lucide-react';
import type { CreateUserDto } from '@/types/user-types';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserDto) => Promise<void>;
  loading?: boolean;
}

export function CreateUserModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}: CreateUserModalProps) {
  const [formData, setFormData] = useState<CreateUserDto>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateUserDto, string>>>({});

  const handleChange = (field: keyof CreateUserDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateUserDto, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New User"
      size="md"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" form="create-user-form" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </>
      }
    >
      <form id="create-user-form" onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          icon={<User className="h-4 w-4" />}
          error={errors.name}
          required
          disabled={loading}
        />

        <InputField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          icon={<Mail className="h-4 w-4" />}
          error={errors.email}
          helperText="User will use this email to login"
          required
          disabled={loading}
        />

        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          icon={<Lock className="h-4 w-4" />}
          error={errors.password}
          helperText="Minimum 6 characters"
          required
          disabled={loading}
        />

        <SelectField
          label="Role"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value as 'user' | 'admin')}
          options={[
            { value: 'user', label: 'User - Regular access' },
            { value: 'admin', label: 'Admin - Full access' },
          ]}
          required
          disabled={loading}
        />
      </form>
    </Modal>
  );
}