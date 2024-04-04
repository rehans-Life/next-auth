import { User } from 'next-auth'
import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'

export default function UserInfo({
    user, label
}: { user: User, label: string }) {
  return (
    <Card className='card'>
        <CardHeader>
            <p className='heading'>
                {label}
            </p>
        </CardHeader>
        <CardContent className='space-y-4'>
            <div className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>                
                <p className='text-sm font-medium'>
                    ID
                </p>
                <p className='truncate text-xs p-1 bg-slate-100 rounded-md'>
                    {user.id}
                </p>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>                
                <p className='text-sm font-medium'>
                    Name
                </p>
                <p className='truncate text-xs p-1 bg-slate-100 rounded-md'>
                    {user.name}
                </p>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>                
                <p className='text-sm font-medium'>
                    Email
                </p>
                <p className='truncate text-xs p-1 bg-slate-100 rounded-md'>
                    {user.email}
                </p>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>                
                <p className='text-sm font-medium'>
                    Role
                </p>
                <p className='truncate text-xs p-1 bg-slate-100 rounded-md'>
                    {user.role}
                </p>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>                
                <p className='text-sm font-medium'>
                    Two Factor Authenticated
                </p>
               <Badge variant={user.isTwoFactorEnabled ? "success" : "destructive"}>
                    {user.isTwoFactorEnabled ? "ON" : 'OFF'}
               </Badge>
            </div>
        </CardContent>
        <CardFooter>

        </CardFooter>
    </Card>
  )
}
