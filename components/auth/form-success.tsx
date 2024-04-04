import React from 'react'
import { CircleCheck } from 'lucide-react';

interface FormSuccess {
    message?: string
}

export default function FormSuccess({
    message
}: FormSuccess) {
  return !message ? <></> : <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
        <CircleCheck className='h-4 w-4' />
        <p>
            { message }
        </p>
    </div>
  
}
