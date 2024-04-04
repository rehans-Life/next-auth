"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import FormSuccess from "./form-success";
import { Button } from "../ui/button";
import FormError from "./form-error";
import { useState, useTransition } from "react";
import { NewPasswordFormType } from "@/types";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export default function NewPasswordForm() {
    const params = useSearchParams();

    const [isPending, startTransition] = useTransition();

    const form = useForm<NewPasswordFormType>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
      });
    
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const onSubmit: SubmitHandler<NewPasswordFormType> = (data) => {
      startTransition(() => {
        const token = params.get("token");
        if (!token) return;
        
        newPassword(token, data).then((res) => {
          setError(res?.error);
          setSuccess(res?.success);
        })
      })
    }

  return (
    <CardWrapper
        headerLabel="Set New Password"
        backButtonHref="/auth/login"
        backButtonLabel="Back to Login"
        showSocial={false}
    >
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            {!success && <FormError message={error || (form.formState.errors as { [key: string]: { message: string, type: string } })[""]?.message} />}
            <FormSuccess message={success} />
            <Button
              disabled={isPending} 
              size='lg' 
              className='w-full'
            >
              Set New Password
            </Button>
          </form>
        </Form>
        </div>
    </CardWrapper>
  )
}
