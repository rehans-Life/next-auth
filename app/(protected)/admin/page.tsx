"use client"

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react'
import RoleGate from '../_components/role-gate';
import { UserRole } from '@prisma/client';
import FormSuccess from '@/components/auth/form-success';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import admin from '@/actions/admin';

export default function Page() {

    const onServerActionClick = () => {
        admin().then((res) => {
            if (res.error) toast.error(res.error);
            if (res.success) toast.success(res.success);
        })
    }

    const onApiRouteClick = () => {
        fetch("/api/admin").then((res) => {
            if (res.ok) {
                toast.success("Allowed API Route!", {
                    action: {
                        label: "Undo",
                        onClick: () => {},
                    }
                });
                return;
            } 

            toast.error("FORBIDDEN API Route");
        })
    }

    return (
    <Card className='card'>
        <CardHeader>
            <p className='heading'>
                😎 Admin
            </p>
        </CardHeader>
        <CardContent className='space-y-4'>
        <RoleGate allowedRoles={[UserRole.ADMIN]}>
            <FormSuccess message="You are allowed to use this page" />
        </RoleGate>
        <div className='flex flex-row items-center text-sm font-semibold p-3 justify-between shadow-lg rounded-lg'>
            <p>Admin-only API Route</p>
            <Button 
                size='sm'
                onClick={() => {
                    onApiRouteClick();
                }}
            >
                Click to test
            </Button>
        </div>
        <div className='flex flex-row items-center text-sm font-semibold p-3 justify-between shadow-lg rounded-lg'>
            <p>Admin-only Server Action</p>
            <Button 
                onClick={() => {
                    onServerActionClick();
                }}
                size='sm'
            >
                Click to test
            </Button>
        </div>
        </CardContent>
        <CardFooter></CardFooter>
    </Card>
  )
}
