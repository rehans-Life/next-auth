import { Poppins } from 'next/font/google'
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import SigninButton from '@/components/auth/signin-button';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (<div className='min-h-screen flex items-center justify-center bg-sky-500'>
    <div className='text-center text-white space-y-6'>
        <div className={cn('text-6xl font-semibold drop-shadow-md', font.className)}>
          🔐Auth
        </div>
        <div className='text-lg'>A Simple Authentication Service</div>
        <div>
          <SigninButton>
             <Button variant={'secondary'} size={'lg'}>Sign In</Button>
          </SigninButton>
        </div>
    </div>
  </div>
  );
}
