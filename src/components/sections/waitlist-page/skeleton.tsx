'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function WaitlistPageSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-full mx-auto" />
      </div>
      <div className="mx-auto mt-16 max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-12 border border-stone-200">
          <Skeleton className="h-8 w-1/2 mb-8" />
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-12 w-full mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
