"use client";

import { logout } from '@/actions/logout'
import React, { ReactNode, useTransition } from 'react'

export default function LogoutButton({ children }: {children: ReactNode}) {
    const [isPending, startTransition] = useTransition(); 

    const onClick = async () => {
      if (isPending) return;

      startTransition(() => {
        logout();
      })
    }

  return (<span onClick={onClick} className='cursor-pointer'>
    {children}
  </span>
  )
}
