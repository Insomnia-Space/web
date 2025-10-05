'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
import { loginSchema, LoginFormData } from '@/schemas/auth';

interface LoginFormProps {
  onSubmit: (values: LoginFormData) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Masukkan email dan password Anda untuk login</CardDescription>
      </CardHeader>
      <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contoh@email.com"
                  className={errors.email && touched.email ? 'border-red-500' : ''}
                />
                <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={errors.password && touched.password ? 'border-red-500' : ''}
                />
                <ErrorMessage name="password" component="p" className="text-sm text-red-500" />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? 'Loading...' : 'Login'}
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
