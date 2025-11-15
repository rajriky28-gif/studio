
import { LoginForm } from '@/components/sections/login/login-form';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cream-gradient px-4 py-12">
      {/* Subtle animated particles can be added here if desired */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full"></div>

      <header className="mb-10 text-center">
        <div className="flex justify-center">
            <Logo isScrolled={true} isHomePage={false} />
        </div>
        <p className="mt-2 text-xs uppercase tracking-[3px] text-cyan">
          BUILD BEYOND
        </p>
      </header>
      
      <main className="z-10 w-full">
        <LoginForm />
      </main>

      <footer className="mt-8 text-center">
        <p className="text-sm text-charcoal">
          Need help?{' '}
          <Link href="/contact" className="font-semibold text-ocean hover:underline">
            Contact Support
          </Link>
        </p>
        <p className="mt-4 max-w-sm text-xs text-silver">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </footer>
    </div>
  );
}
