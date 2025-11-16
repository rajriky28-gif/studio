'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useUser, useDoc, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import WaitlistLoginGate from '@/components/sections/waitlist-page/login-gate';
import WaitlistForm from '@/components/sections/waitlist-page/waitlist-form';
import WaitlistDashboard from '@/components/sections/waitlist-page/dashboard';
import WaitlistPageSkeleton from '@/components/sections/waitlist-page/skeleton';

export default function WaitlistPage() {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();

  const userWaitlistRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'waitlist', user.uid);
  }, [user, firestore]);
  
  const { data: waitlistEntry, isLoading: isWaitlistLoading } = useDoc(userWaitlistRef);

  const isLoading = isUserLoading || (user && isWaitlistLoading);

  const renderContent = () => {
    if (isLoading) {
      return <WaitlistPageSkeleton />;
    }

    if (!user) {
      return (
        <>
          <WaitlistLoginGate />
        </>
      );
    }
    
    if (waitlistEntry) {
      return <WaitlistDashboard waitlistEntry={waitlistEntry} />;
    }

    return <WaitlistForm />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-cream">
      <Header />
      <main className="flex-grow pt-24">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
