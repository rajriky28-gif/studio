
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminDashboard from '@/components/sections/admin/jobs/dashboard';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';

const ADMIN_EMAILS = ['riky@google.com', 'admin@lumivex.com', 'founder@lumivex.com', 'lumivex.company@gmail.com', 'rajriky28@gmail.com', 'riky@gmail.com'];

function AdminAccessGate() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-700 mb-8">This page is only accessible to Lumivex administrators.</p>
            <Button onClick={() => router.push('/')}>Return to Home</Button>
        </div>
    );
}

function LoadingSkeleton() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg font-semibold text-gray-600">
          Checking authentication...
        </div>
      </div>
    );
}

export default function AdminJobsPage() {
    const { user, auth, isUserLoading } = useUser();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading) {
            const lowerCaseAdminEmails = ADMIN_EMAILS.map(email => email.toLowerCase());
            if (user && user.email && lowerCaseAdminEmails.includes(user.email.toLowerCase())) {
                setIsAuthorized(true);
            } else if (user) {
                setIsAuthorized(false);
            } else {
                router.push('/login');
            }
        }
    }, [user, isUserLoading, router]);

    const handleLogout = async () => {
        if (auth) {
          await signOut(auth);
          router.push('/login');
        }
    };

    if (isUserLoading || isAuthorized === null) {
        return <LoadingSkeleton />;
    }

    if (!isAuthorized) {
        return <AdminAccessGate />;
    }

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="fixed top-0 left-0 right-0 h-16 bg-navy text-white flex items-center justify-between px-6 md:px-12 z-50 shadow-md">
            <div className="flex items-center gap-4">
                <Logo isScrolled={true} isHomePage={false}/>
                <div className="w-px h-6 bg-white/20 mx-2 hidden md:block"></div>
                <span className="text-base font-medium tracking-wide hidden md:block">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-white/80 hidden sm:inline">{user?.email}</span>
                <Button onClick={handleLogout} variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                    Logout
                </Button>
            </div>
        </header>
        <main className="pt-24 px-4 sm:px-6 lg:px-8">
            <AdminDashboard />
        </main>
    </div>
  );
}
