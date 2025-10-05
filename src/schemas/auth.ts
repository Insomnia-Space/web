import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().min(6, 'Password minimal 6 karakter').required('Password wajib diisi'),
});

export const registerSchema = yup.object({
  name: yup.string().min(2, 'Nama minimal 2 karakter').required('Nama wajib diisi'),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().min(6, 'Password minimal 6 karakter').required('Password wajib diisi'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Konfirmasi password tidak sesuai')
    .required('Konfirmasi password wajib diisi'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
