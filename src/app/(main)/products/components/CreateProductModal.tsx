// app/(main)/products/components/CreateProductModal.tsx

'use client';

import { useState } from 'react';
import Modal from '@/components/modal';
import InputField from '@/components/input'; // Asumsi ini adalah komponen kustom yang menerima kelas
import SelectField from '@/components/select'; // Asumsi ini adalah komponen kustom yang menerima kelas
import { Button } from '@/components/ui/button';
import { Database, DollarSign, Package } from 'lucide-react';
import type { CreateProductDto } from '@/types/product-types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils'; // Import cn untuk utilitas Tailwind

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProductDto) => Promise<void>;
  loading?: boolean;
}

// --- Kelas Glassmorphism ---

// Kelas Glassmorphism untuk Tombol Cancel (Outline)
const glassButtonOutlineClass = cn(
  "border-white/40 bg-white/20 text-gray-800 backdrop-blur-sm shadow-md",
  "hover:bg-white/30 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/30 dark:text-white dark:hover:bg-gray-700/50"
);

// Kelas Glassmorphism untuk Tombol Submit (Solid)
const glassButtonSubmitClass = cn(
  "border-0 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30",
  "hover:from-indigo-600 hover:to-purple-700 dark:from-indigo-400 dark:to-purple-500"
);

// Kelas Glassmorphism untuk Textarea (Input)
const glassTextareaClass = cn(
  "border-white/40 bg-white/20 hover:bg-white/30 backdrop-blur-sm focus-visible:ring-indigo-500 text-gray-800",
  "dark:border-gray-700 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 dark:focus-visible:ring-indigo-400 dark:text-white"
);

// Kelas Glassmorphism untuk Container Spesifikasi (Optional)
const glassSpecContainerClass = cn(
  "rounded-xl border border-white/30 bg-white/5 p-4 backdrop-blur-sm shadow-inner",
  "dark:border-gray-700/50 dark:bg-gray-800/20"
);


export function CreateProductModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}: CreateProductModalProps) {
  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    category: 'data',
    price: 0,
    description: '',
    data_quota: '',
    call_minutes: '',
    sms_count: '',
    validity_days: 30,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateProductDto, string>>>({});

  // LOGIC TIDAK BERUBAH
  const handleChange = <K extends keyof CreateProductDto>(
    field: K,
    value: CreateProductDto[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProductDto, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
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
      category: 'data',
      price: 0,
      description: '',
      data_quota: '',
      call_minutes: '',
      sms_count: '',
      validity_days: 30,
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };
  // END LOGIC TIDAK BERUBAH

  return (
    // Asumsi komponen Modal eksternal telah dimodifikasi (atau background dashboard buram)
    // untuk mendukung glassmorphism pada konten di dalamnya.
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Product"
      size="lg"
      footer={
        <>
          {/* BUTTON CANCEL: GLASSMORPHISM OUTLINE */}
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleClose} 
            disabled={loading}
            className={cn(glassButtonOutlineClass, "hover:bg-transparent")} // Override hover:bg-transparent dari variant="ghost"
          >
            Cancel
          </Button>
          {/* BUTTON SUBMIT: GLASSMORPHISM SOLID GRADIENT */}
          <Button 
            type="submit" 
            form="create-product-form" 
            disabled={loading}
            className={glassButtonSubmitClass}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
        </>
      }
    >
      <form id="create-product-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name (Asumsi InputField menerima dan meneruskan kelas glassInputSelectClass) */}
        <InputField
          label="Product Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          icon={<Package className="h-4 w-4" />}
          error={errors.name}
          required
          disabled={loading}
          placeholder="e.g., Unlimited Pro Plus"
          // Tambahkan kelas Glassmorphism ke InputField jika memungkinkan
          // className={glassInputSelectClass} 
        />

        {/* Category (Asumsi SelectField menerima dan meneruskan kelas glassInputSelectClass) */}
        <SelectField
          label="Category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value as CreateProductDto['category'])}
          options={[
            { value: 'data', label: 'Data Package' },
            { value: 'voice', label: 'Voice Package' },
            { value: 'combo', label: 'Combo Package' },
            { value: 'addon', label: 'Add-on Services' },
          ]}
          required
          disabled={loading}
          // Tambahkan kelas Glassmorphism ke SelectField jika memungkinkan
          // className={glassInputSelectClass}
        />

        {/* Price (Asumsi InputField menerima dan meneruskan kelas glassInputSelectClass) */}
        <InputField
          label="Price (Rp)"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', Number(e.target.value))}
          icon={<DollarSign className="h-4 w-4" />}
          error={errors.price}
          required
          disabled={loading}
          placeholder="e.g., 100000"
          // className={glassInputSelectClass}
        />

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
            Description <span className="text-red-500">*</span>
          </Label>
          {/* TEXTAREA: GLASSMORPHISM */}
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Enter product description"
            rows={3}
            disabled={loading}
            className={cn(glassTextareaClass, errors.description ? 'border-red-500 dark:border-red-500' : '')}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Package Specifications CONTAINER: GLASSMORPHISM */}
        <div className={glassSpecContainerClass}>
          <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">Package Specifications (Optional)</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            
            {/* Input fields di sini juga akan membutuhkan modifikasi kelas jika InputField mendukungnya */}
            
            <InputField
              label="Data Quota"
              type="text"
              value={formData.data_quota || ''}
              onChange={(e) => handleChange('data_quota', e.target.value)}
              icon={<Database className="h-4 w-4" />}
              disabled={loading}
              placeholder="e.g., 50GB or unlimited"
              // className={glassInputSelectClass}
            />

            <InputField
              label="Call Minutes"
              type="text"
              value={formData.call_minutes || ''}
              onChange={(e) => handleChange('call_minutes', e.target.value)}
              disabled={loading}
              placeholder="e.g., 100 or unlimited"
              // className={glassInputSelectClass}
            />

            <InputField
              label="SMS Count"
              type="text"
              value={formData.sms_count || ''}
              onChange={(e) => handleChange('sms_count', e.target.value)}
              disabled={loading}
              placeholder="e.g., 100"
              // className={glassInputSelectClass}
            />

            <InputField
              label="Validity (Days)"
              type="number"
              value={formData.validity_days || ''}
              onChange={(e) => handleChange('validity_days', Number(e.target.value))}
              disabled={loading}
              placeholder="e.g., 30"
              // className={glassInputSelectClass}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}