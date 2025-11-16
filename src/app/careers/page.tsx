'use client';

import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CareersHero } from "@/components/sections/careers/hero";
import { JobListings } from "@/components/sections/careers/job-listings";
import { WhyLumivex } from "@/components/sections/careers/why-lumivex";
import { Faq } from "@/components/sections/careers/faq";
import { FinalCta } from "@/components/sections/careers/final-cta";
import { Skeleton } from '@/components/ui/skeleton';

const ADMIN_EMAILS = ['riky@google.com', 'admin@lumivex.com', 'founder@lumivex.com', 'lumivex.company@gmail.com'];

function LoadingSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-40">
        <div className="container mx-auto px-4 md:px-6 space-y-16">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default function CareersPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user && user.email && ADMIN_EMAILS.includes(user.email)) {
      router.replace('/admin/jobs');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || (user && user.email && ADMIN_EMAILS.includes(user.email))) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <CareersHero />
        <JobListings />
        <WhyLumivex />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
