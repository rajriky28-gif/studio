
import { Suspense } from 'react';
import { Logo } from '@/components/logo';
import { CheckCircle } from 'lucide-react';
import { ModernForm } from '@/components/sections/login/modern-form';

function LoginFormSkeleton() {
    return <div className="w-full h-[500px] bg-white/10 animate-pulse rounded-lg"></div>;
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-navy-gradient-deep font-body">
      {/* Left Side - Visuals & Branding */}
      <div className="relative hidden lg:flex lg:w-[40%] flex-col justify-center p-12 text-white overflow-hidden">
         <div className="absolute top-8 left-8">
            <Logo isScrolled={false} isHomePage={true}/>
        </div>
        
        <div className="z-10 flex flex-col gap-8">
            <h1 className="text-7xl font-light leading-tight tracking-tighter">
                Build AI Agents
            </h1>
            <p className="text-2xl text-cyan/80">
                With nothing but conversation.
            </p>
            <div className="flex gap-6">
                <div className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan"/> No Code
                </div>
                <div className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan"/> 3 Minutes
                </div>
                 <div className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan"/> Production Ready
                </div>
            </div>
        </div>

        {/* Orbs and Particles would go here - simplified for now */}
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-transparent py-12 lg:w-[60%]">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8 text-center">
            <div className="flex justify-center">
                 <Logo isScrolled={true} isHomePage={true} />
            </div>
        </div>

        <div className="w-full max-w-[580px] lg:max-w-none lg:w-auto lg:p-0 px-4">
            <Suspense fallback={<LoginFormSkeleton />}>
              <ModernForm />
            </Suspense>
        </div>
      </div>
    </div>
  );
}
