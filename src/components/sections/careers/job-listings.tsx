'use client';

import { useMemo } from 'react';
import { useCollection, useMemoFirebase, useFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import JobCard, { Job } from './job-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function JobListingSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full max-w-4xl mx-auto border border-stone-200 rounded-2xl p-12">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-14 w-48 rounded-lg" />
          </div>
          <div className="flex items-center gap-10 mt-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function JobListings() {
  const { firestore } = useFirebase();

  const jobsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'jobs'),
      where('status', '==', 'active'),
      orderBy('postedDate', 'desc')
    );
  }, [firestore]);

  const { data: jobs, isLoading } = useCollection<Job>(jobsQuery);

  const hasJobs = jobs && jobs.length > 0;

  return (
    <section id="positions" className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl font-normal mb-4">Open Positions</h2>
          <p className="text-charcoal text-lg">
            Can't find the right role? Send us your resume at{' '}
            <Link href="mailto:careers@lumivex.com" className="text-ocean hover:underline">
              careers@lumivex.com
            </Link>
          </p>
        </div>
        <div className="mt-16">
          {isLoading && <JobListingSkeleton />}
          {!isLoading && hasJobs && (
            <div className="max-w-4xl mx-auto space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
          {!isLoading && !hasJobs && (
            <div className="text-center py-16 px-6 bg-cream/50 max-w-2xl mx-auto rounded-2xl border border-stone-200">
              <h3 className="text-2xl font-medium text-navy">No open positions at the moment</h3>
              <p className="text-charcoal mt-2 mb-6">Follow us on LinkedIn for updates when we're hiring.</p>
              <Button asChild>
                <Link href="#">
                  <Linkedin className="mr-2 h-5 w-5"/>
                  Follow on LinkedIn
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
