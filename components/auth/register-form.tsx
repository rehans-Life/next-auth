'use client';

import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { RegisterSchema } from '@/schemas'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { RegisterFormType } from '@/types'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import FormError from './form-error';
import FormSuccess from './form-success';
import { register } from '@/actions/register';

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    setError(undefined);
    setSuccess(undefined);
    
    startTransition(() => {
      register(data).then((res) => {
        setError(res?.error);
        setSuccess(res?.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel='Welcome Back'
      showSocial
      backButtonLabel="Already have an account?"
      backButtonHref='/auth/login'
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
              control={form.control}
              name='name'
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='@example.com' {...field} type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='******' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <Button 
              disabled={isPending} 
              size='lg' 
              className='w-full'
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  )
}
