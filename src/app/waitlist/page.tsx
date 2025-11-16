'use client';

import { useMemo } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import WaitlistLoginGate from '@/components/sections/waitlist-page/login-gate';
import WaitlistForm from '@/components/sections/waitlist-page/waitlist-form';
import WaitlistDashboard from '@/components/sections/waitlist-page/dashboard';
import WaitlistPageSkeleton from '@/components/sections/waitlist-page/skeleton';
import { WhyJoin } from '@/components/sections/waitlist-page/why-join';
import { ReferralProgram } from '@/components/sections/waitlist-page/referral-program';
import { Faq } from '@/components/sections/waitlist-page/faq';
import { FinalCta } from '@/components/sections/waitlist-page/final-cta';
import { WaitlistHero } from '@/components/sections/waitlist-page/hero';
import { SocialProof } from '@/components/sections/waitlist-page/social-proof';
import { Stats } from '@/components/sections/waitlist-page/stats';
import { Timeline } from '@/components/sections/waitlist-page/timeline';
import { Community } from '@/components/sections/waitlist-page/community';

export default function WaitlistPage() {
  const { user, isUserLoading, firestore } = useUser();

  const userWaitlistRef = useMemoFirebase(() => {
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
          <div id="waitlist-benefits">
            <WhyJoin />
          </div>
          <ReferralProgram />
          <SocialProof />
          <Stats />
          <Timeline />
          <Community />
          <Faq />
          <FinalCta />
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
        <WaitlistHero />
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
