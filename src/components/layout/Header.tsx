'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// Hanya impor ikon yang benar-benar digunakan (Bell, Settings, User, LogOut)
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';

export function Header() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const name = user?.name ?? 'John Smith';
  const email = user?.email ?? 'john@example.com';
  // Menggunakan Role seperti di gambar
  const role = 'Project Manager'; 

  const handleLogout = async () => {
    try {
      // Pastikan urutan ini benar: logout API, hapus token, baru signOut NextAuth
      await authService.logout();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      await signOut({ callbackUrl: '/auth/signin' });
      toast.success('Logged out successfully');
    } catch {
      // Fallback tetap logout jika API gagal, agar user tidak stuck
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      await signOut({ callbackUrl: '/auth/signin' });
      toast.error('Logout completed with errors');
    }
  };

  return (
    // 1. Header: Tidak perlu border-b jika ada sidebar di kiri yang sudah memisahkan
    // Namun, kita pertahankan bg-white dan menghilangkan shadow/border yang berlebihan.
    <header className="flex-shrink-0 bg-white border-b border-gray-100">
      {/* Container utama: Tinggi lebih ke arah 16 (64px) atau lebih rendah untuk kesan minimalis */}
      <div className="flex h-16 items-center justify-end px-6"> 
        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Search Bar - Di gambar, Search Bar berada di kanan atas, agak terpisah dari ikon kecil. 
              Kita akan membuatnya lebih menonjol di sini, tetapi kecil dan bulat.
              Catatan: Search Bar di gambar lebih besar dan ada di bawah Header utama, 
              namun untuk komponen 'Header' standar, kita masukkan di sini. */}
          <div className="flex items-center max-w-sm ml-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search Task, Meeting, Projects..."
                // Mengubah styling Input agar lebih halus, border tipis, dan rounded-lg
                className="w-72 border-gray-200 pl-10 h-10 rounded-lg text-sm focus:border-indigo-500 focus:ring-0"
              />
            </div>
          </div>

          {status === 'loading' ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : session ? (
            <>
              {/* Bell Icon: Di gambar, ikon notifikasi sangat minimalis */}
              <Button
                variant="ghost"
                size="icon"
                // Styling ikon: lebih kecil, rounded-lg, menggunakan warna abu-abu
                className="h-9 w-9 text-gray-500 hover:bg-gray-100 rounded-lg"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>

              {/* Setting Icon: Di gambar, ikon ini ada, jadi kita pertahankan */}
              <Button
                variant="ghost"
                size="icon"
                // Styling ikon: lebih kecil, rounded-lg, menggunakan warna abu-abu
                className="h-9 w-9 text-gray-500 hover:bg-gray-100 rounded-lg"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Button>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <div className="flex items-center gap-3 ml-2"> {/* Tambah margin kiri */}
                  
                  {/* Info Nama & Role - Mirip dengan gaya di gambar (Nama di atas Role) */}
                  <div className="hidden flex-col text-right sm:flex">
                    <span className="text-sm font-semibold leading-none text-gray-900">{name}</span>
                    <span className="mt-1 text-xs leading-none text-gray-500">{role}</span>
                  </div>

                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      // Border Avatar menggunakan warna aksen (Orange di gambar)
                      className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100" 
                      aria-label={`Open menu for ${name}`}
                    >
                      <Avatar className="h-10 w-10 border-2 border-orange-400"> {/* Border ORANGE */}
                        <AvatarImage src={user?.image || ''} alt={name} />
                        <AvatarFallback className="bg-orange-500 text-sm font-semibold text-white">
                          {name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none text-gray-900">{name}</p>
                      <p className="mt-0.5 text-xs leading-none text-gray-500">{email}</p>
                      <p className="mt-0.5 text-xs leading-none text-gray-400">{role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Bagian untuk user yang belum login
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-sm">
                <Link href="/auth/signin">Login</Link>
              </Button>
              <Button asChild className="text-sm bg-gray-900 hover:bg-gray-800">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}