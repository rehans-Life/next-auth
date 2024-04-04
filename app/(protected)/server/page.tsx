import UserInfo from '@/components/auth/user-info';
import getCurrentUser from '@/lib/get-current-user';
import React from 'react'

export default async function Page() {
  const user = await getCurrentUser();
  
  return (
    user ? <UserInfo label='🖥️ Server Component' user={user} /> : <></>
  )
}
