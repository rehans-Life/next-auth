import React, { ReactNode } from 'react'

export default function layout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-sky-500'>      
      {children}
    </div>
  )
}
