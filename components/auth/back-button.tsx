import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

interface BackButtonProps {
    href: string,
    label: string
}

export default function BackButton({
    href, label
}: BackButtonProps) {
  return (
    <Button
        className='w-full'
        variant='link'
    >
        <Link href={href} >
            {label}
        </Link>
    </Button>
  )
}
