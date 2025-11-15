
import { ModernForm } from '@/components/sections/login/modern-form';
import { Logo } from '@/components/logo';
import { Suspense } from 'react';

// A simple loading fallback for the form
function LoginFormSkeleton() {
    return <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>;
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Side - Visuals & Branding */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-center bg-navy-gradient p-12 text-white">
        <div className="absolute top-8 left-8">
            <Logo isScrolled={false} isHomePage={true}/>
        </div>
        <div className="z-10">
            <h1 className="text-6xl font-light leading-tight tracking-tight text-white/90">
                Build AI Agents
            </h1>
            <p className="mt-4 text-2xl text-white/70">
                With just a conversation.
            </p>
        </div>
         <div className="absolute bottom-8 left-8 text-xs text-white/40">
          © {new Date().getFullYear()} Lumivex. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col justify-center bg-white px-4 py-12 lg:w-1/2">
        <div className="mx-auto w-full max-w-sm lg:w-[420px]">
            <div className="lg:hidden mb-12 text-center">
                <div className="flex justify-center">
                     <Logo isScrolled={true} isHomePage={false} />
                </div>
            </div>
            <Suspense fallback={<LoginFormSkeleton />}>
              <ModernForm />
            </Suspense>
        </div>
      </div>
    </div>
  );
}
