'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const name = user?.name ?? 'User';
  const email = user?.email ?? '';

  return (
    <header className="flex-shrink-0 border-b border-gray-200 bg-white">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center">
          <h1 className="text-sm font-semibold tracking-tight text-gray-800">
            Page Title (Need Improvement)
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {status === 'loading' ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : session ? (
            <DropdownMenu>
              <div className="flex items-center space-x-2">
                <div className="hidden flex-col text-right sm:flex">
                  <span className="text-sm leading-none font-medium text-gray-800">{name}</span>
                  <span className="mt-0.5 text-xs leading-none text-gray-500">{email}</span>
                </div>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full p-0 hover:bg-gray-100"
                    aria-label={`Open menu for ${name}`}
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image || ''} alt={name} />
                      <AvatarFallback className="bg-blue-500 text-sm text-white">
                        {name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none font-medium text-gray-800">{name}</p>
                    <p className="text-xs leading-none text-gray-500">{email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-sm">
                <Link href="/auth/signin">Login</Link>
              </Button>
              <Button asChild className="text-sm">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
