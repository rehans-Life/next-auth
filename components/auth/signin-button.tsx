'use client';

import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

interface LoginInBtnProps {
    children: ReactNode,
    mode?: "redirect" | "modal",
    asChild?: boolean
}

export default function LoginInButton({
    children,
    asChild = false,
    mode = "redirect"
}: LoginInBtnProps) {
    const router = useRouter();
    
    const onClick = () => {
        router.push("/auth/login")
    }

    if (mode === 'modal') {
        return <span>
            Login Modal
        </span>
    }
    
    return (
    <span onClick={onClick} className='cusor-pointer'>
        {children}
    </span>
  )
}
