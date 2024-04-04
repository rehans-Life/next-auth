"use client";

import FormError from '@/components/auth/form-error';
import useUserRole from '@/hooks/use-user-role'
import { UserRole } from '@prisma/client';
import React, { ReactNode } from 'react'

interface IRoleGateProps {
    children: ReactNode
    allowedRoles: UserRole[]
}

export default function RoleGate({
    allowedRoles, children
}: IRoleGateProps) {
    const role = useUserRole();

    if (!role || (allowedRoles instanceof Array && !allowedRoles.includes(role))) {
        return <FormError message='You do not have the permission to access this page' />
    }

     return <>{children}</>
}
