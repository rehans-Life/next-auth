"use client";

import UserInfo from '@/components/auth/user-info';
import useCurrentUser from '@/hooks/use-current-user'
import React from 'react'

export default function Page() {
    const user = useCurrentUser();
  return (
    user ? <UserInfo
        label='🐋 Client Component'
        user={user}
    /> : <></>
  )
}
