"use client";

import UserButton from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Navbar() {
    const pathname = usePathname();

  return (
    <nav
        className='bg-secondary flex justify-between items-center max-w-full w-[600px] flex-wrap gap-4 p-4 rounded-xl shadow-sm'
    >
        <div className='flex gap-3'>
           <Button
                variant={pathname === '/server' ? 'default' : 'outline'}
                asChild
            >
                <Link href={'/server'}>
                    Server
                </Link>
            </Button>

            <Button
                variant={pathname === '/admin' ? 'default' : 'outline'}
                asChild
            >
                <Link href={'/admin'}>
                    Admin
                </Link>
            </Button>


            <Button
                variant={pathname === '/client' ? 'default' : 'outline'}
                asChild
            >
                <Link href={'/client'}>
                    Client
                </Link>
            </Button>

            <Button
                variant={pathname === '/settings' ? 'default' : 'outline'}
                asChild
            >
                <Link href={'/settings'}>
                    Settings
                </Link>
            </Button>
        </div>
        <UserButton />
    </nav>
  )
}
