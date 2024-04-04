"use client";

import settings from '@/actions/settings';
import FormError from '@/components/auth/form-error';
import FormSuccess from '@/components/auth/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem,
  FormLabel, 
  FormMessage, 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import useCurrentUser from '@/hooks/use-current-user';
import { SettingsSchema } from '@/schemas';
import { SettingsFormType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from '@prisma/client';

export default function Page() {
  const user = useCurrentUser();
  const { update } = useSession();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<SettingsFormType> = function (values) {

    startTransition(() => {
      settings(values)
      .then((res) => {
          if (res.success) {
            setSuccess(res.success);
            setError("");
            update();
          }

          if (res.error) {
            setError(res.error);
            setSuccess("")
          }
      });
    })
  }

  const form = useForm<SettingsFormType>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
    },
  });

  return (
    <Card className='card'>
      <CardHeader>
        <p className='heading'>
          📱Settings
        </p>
      </CardHeader>
      <CardContent>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => {
                  return <FormItem>
                    <FormLabel>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={isPending} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }}
              />
              {user && !user.isOAuth && <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => {
                    return <FormItem>
                      <FormLabel>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder='@example.com' 
                          {...field} 
                          type='email' 
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }}
                />
              </>}
              <FormField
                name='role'
                control={form.control}
                render={({ field }) => {
                  return <FormItem>
                    <FormLabel>Roles</FormLabel>
                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                }}
              />
              {user && !user.isOAuth && <>
               <FormField
                control={form.control}
                name='password'
                render={({ field }) => {
                  return <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder='******' 
                        {...field} 
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }}
              />
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => {
                  return <FormItem>
                    <FormLabel>
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder='******' 
                        {...field} 
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }}
              />
              <FormField
                control={form.control}
                name='isTwoFactorEnabled'
                render={({ field }) => {
                  return <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className="space-y-0.5">
                    <FormLabel className='flex items-center'>
                      Two Factor Authentication
                    </FormLabel>
                    <FormDescription>
                        Enable two factor authentication for your account
                    </FormDescription>
                      </div>
                    <FormControl>
                      <Switch 
                        className='!mt-0'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }}
              />
              </>}
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type='submit'
              >
                Update Settings
              </Button>
            </form>
         </Form>
      </CardContent>
    </Card>
  )
}
