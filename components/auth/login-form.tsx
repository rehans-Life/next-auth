'use client';

import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { LoginSchema } from '@/schemas'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '../ui/form'
import { LoginFormType } from '@/types'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import FormError from './form-error';
import FormSuccess from './form-success';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const params = useSearchParams();

  const callbackURL = params.get("callbackURL");
  const [isPending, startTransition] = useTransition();

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {

    startTransition(() => {
      login(data, callbackURL).then((res) => {

        if (res?.twoFactor) {
            setError(undefined);
            setSuccess(undefined);      
            setShowTwoFactor(true);
            return;                      
        }

        if (res?.success) {
          form.reset();
          setSuccess(res?.success);
          setError(undefined);
        }

        if (res?.error) {
          form.setValue('code', undefined);
          setShowTwoFactor(false);
          setError(res?.error);
          setSuccess(undefined);
        }
      })
    })
  }

  return (
    <CardWrapper
      headerLabel='Welcome Back'
      showSocial
      backButtonLabel="Dont have an account?"
      backButtonHref='/auth/register'
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            {showTwoFactor
              ?
              <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => {
                    return <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input placeholder='123456' {...field} type='text' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }}
                />
              :
              <>
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
                      <Button
                        className='p-0 font-normal'
                        asChild
                        size='sm'
                        variant="link"
                      >
                        <Link href="/auth/reset">
                          Forgot Password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  }}
                />
              </>
            }
            {(error || params.get('error')) && <FormError message={error || "Email already in use with a different provider"} />}
            {success && <FormSuccess message={success} />}
            <Button 
              disabled={isPending} 
              size='lg' 
              className='w-full'
            >
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  )
}
