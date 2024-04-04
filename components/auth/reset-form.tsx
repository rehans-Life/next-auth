"use client";

import CardWrapper from '@/components/auth/card-wrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button';
import { ResetFormType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetSchema } from '@/schemas';
import { reset } from '@/actions/reset';
import FormError from './form-error';
import FormSuccess from './form-success';

export default function ResetForm() {
    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const form = useForm<ResetFormType>({
        resolver: zodResolver(ResetSchema)
    })

    const onSubmit: SubmitHandler<ResetFormType> = (data) => {
        startTransition(() => {
            reset(data).then((res) => {
                if (res.error) setError(res.error);
                if (res.success) setSuccess(res.success);
            });
        })
    }

    return (
        <CardWrapper  
        headerLabel={'Reset your password'} 
        backButtonLabel={'Back to Login'} 
        backButtonHref={'/auth/login'} 
        showSocial={false}
    >
        <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => {
                        return <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='@example.com' 
                                    {...field} 
                                    type='email' 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        }}
                />
               {!success && <FormError message={error} />}
                <FormSuccess message={success} />
                <Button
                    disabled={isPending} 
                    size='lg' 
                    className='w-full'
                >
                  Send Reset Link
                </Button>
            </form>
        </Form>
        </div>
    </CardWrapper>
  )
}
