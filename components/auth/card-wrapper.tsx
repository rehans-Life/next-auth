import React, { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Header from './header'
import Social from './social'
import BackButton from './back-button'

interface CardWrapperProps {
    children: ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial: boolean
}

export default function CardWrapper({
    backButtonHref,
    backButtonLabel,
    children,
    headerLabel,
    showSocial,
}: CardWrapperProps) {
  return (
    <Card
        className='w-[400px] max-w-full bg-white'
    >
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && 
            <CardFooter>
                <Social />
            </CardFooter>
        }
        <CardFooter>
            <BackButton
                href={backButtonHref}
                label={backButtonLabel}
            />
        </CardFooter>
    </Card>
  )
}
