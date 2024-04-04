"use client";

import React, { useCallback, useEffect, useState } from 'react'
import CardWrapper from './card-wrapper'
import BeatLoader from 'react-spinners/BeatLoader';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import FormError from './form-error';
import FormSuccess from './form-success';

export default function NewVerificationForm() {
  const params = useSearchParams();
  const token = params.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const verify = useCallback(
    () => {
      if (!token) return;
      newVerification(token).then((res) => {
        if (res.error) setError(res?.error);
        if (res.success) setSuccess(res.success);
      })
    },
    [token],
  );

  useEffect(() => {
    verify();
  }, [verify])

  return (
    <CardWrapper
        showSocial={false}
        headerLabel='Confirming your verification'
        backButtonLabel='Back to Login'
        backButtonHref='/auth/login'
    >
        <div className='w-full flex-col gap-y-6 flex items-center justify-center'>
            {(!success && !error) && <BeatLoader />}
            {!success && <FormError message={error} />}
            <FormSuccess message={success} />
        </div>
    </CardWrapper>
  )
}
