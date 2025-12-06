// components/forms/LoginForm.tsx

'use client';

import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginFormData, loginSchema } from '@/schemas/auth';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn

interface LoginFormProps {
  onSubmit: (values: LoginFormData) => void;
  isLoading?: boolean;
}

// --- Kelas Glassmorphism & Utilitas ---

// Kelas Glassmorphism untuk Card container
const glassCardContainerClass = cn(
  "mx-auto w-full max-w-md rounded-xl shadow-2xl backdrop-blur-md", 
  "border border-white/30 bg-white/10 dark:border-gray-800/50 dark:bg-gray-900/10" // Glassmorphism Core
);

// Kelas Glassmorphism untuk Input Field
const glassInputClass = cn(
    "pl-10 h-10 rounded-lg transition duration-150 ease-in-out border",
    "border-white/20 bg-white/10 dark:border-gray-700/50 dark:bg-gray-800/20 dark:text-white"
);

// Kelas untuk Tombol Primary (Sign In) - Indigo Glassmorphism
const glassButtonPrimaryClass = cn(
    "bg-indigo-600/80 hover:bg-indigo-700/90 shadow-lg shadow-indigo-500/30",
    "dark:bg-indigo-700 dark:hover:bg-indigo-800"
);

// Kelas Teks (untuk Dark Mode)
const primaryTextClass = "text-gray-800 dark:text-white";
const secondaryTextClass = "text-gray-500 dark:text-gray-400";
const labelTextClass = "text-gray-700 dark:text-gray-300";
const iconColorClass = "text-gray-400 dark:text-gray-500";


// ---------------------------------------------

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };

  return (
    // CARD CONTAINER: GLASSMORPHISM
    <Card className={glassCardContainerClass}> 
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className={cn("text-center text-2xl font-semibold", primaryTextClass)}>
          Sign In to Panze
        </CardTitle>
        <CardDescription className={cn("text-center", secondaryTextClass)}>
          Manage your projects seamlessly
        </CardDescription>
      </CardHeader>
      <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className={cn("text-sm font-medium", labelTextClass)}>
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className={cn("absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2", iconColorClass)} />
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    // INPUT FIELD: GLASSMORPHISM + Dynamic Border
                    className={cn(glassInputClass, {
                        'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email && touched.email,
                        'focus:border-indigo-500 focus:ring-indigo-500': !(errors.email && touched.email)
                    })}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className={cn("text-sm font-medium", labelTextClass)}>
                    Password
                  </Label>
                  <a
                    href="/auth/forgot-password"
                    // Link: Warna aksen Indigo
                    className="text-xs text-indigo-500 hover:text-indigo-600 hover:underline transition duration-150 ease-in-out dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className={cn("absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2", iconColorClass)} />
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    // INPUT FIELD: GLASSMORPHISM + Dynamic Border
                    className={cn("pr-10", glassInputClass, {
                        'border-red-500 focus:border-red-500 focus:ring-red-500': errors.password && touched.password,
                        'focus:border-indigo-500 focus:ring-indigo-500': !(errors.password && touched.password)
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={cn("absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-600 transition duration-150 ease-in-out", iconColorClass)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Remember Me: Warna aksen Indigo pada checkbox */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800" 
                />
                <label htmlFor="remember" className={cn("ml-2 text-sm", labelTextClass)}>
                  Remember me
                </label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-4">
              <Button
                type="submit"
                // BUTTON: GLASSMORPHISM PRIMARY INDIGO
                className={cn(`w-full h-10 rounded-lg text-white font-semibold transition duration-150 ease-in-out`, glassButtonPrimaryClass)}
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center gap-2">
                    {/* Spinner menggunakan warna latar depan */}
                    <svg
                      className="h-4 w-4 animate-spin text-white" 
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}