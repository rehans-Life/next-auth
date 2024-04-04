'use client';

import { Button } from '../ui/button';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export default function Social() {  
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT
    });
  }

  return (
    <div className='flex tiems-center w-full gap-x-2'>
        <Button
            size='lg'
            className='w-full'
            variant='outline'
            onClick={() => onClick('google')}
        >
            <FaGoogle className="h-5 w-5"/>
        </Button>
        <Button
            size='lg'
            className='w-full'
            variant='outline'
            onClick={() => onClick('github')}
        >
            <FaGithub className="h-5 w-5"/>
        </Button>
    </div>
  )
}
