'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useCollection, useFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { BlogPost } from '@/components/sections/admin/blog/posts-table';

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { BlogPostHero } from '@/components/sections/blog-post/hero';
import { BlogPostContent } from '@/components/sections/blog-post/content';
import { NewsletterSignup } from '@/components/sections/blog/newsletter-signup';
import { Skeleton } from '@/components/ui/skeleton';

function PostSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="pt-[140px] pb-[100px] bg-gray-50">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                    <Skeleton className="h-6 w-32 mx-auto mb-6" />
                    <Skeleton className="h-16 w-full mx-auto mb-6" />
                    <Skeleton className="h-8 w-2/3 mx-auto" />
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 w-40" />
                    </div>
                </div>
            </div>
            <Skeleton className="h-[500px] w-full" />
            <div className="container mx-auto max-w-3xl py-16 space-y-6">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-full" />
            </div>
        </div>
    )
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { firestore } = useFirebase();

  const postQuery = useMemo(() => {
    if (!firestore || !slug) return null;
    return query(
      collection(firestore, 'blog_posts'),
      where('slug', '==', slug),
      where('status', '==', 'published'),
      limit(1)
    );
  }, [firestore, slug]);

  const { data: posts, isLoading } = useCollection<BlogPost>(postQuery);
  const post = posts?.[0];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {isLoading && <PostSkeleton />}
        {!isLoading && post && (
            <>
                <BlogPostHero post={post} />
                <BlogPostContent post={post} />
            </>
        )}
        {!isLoading && !post && (
             <div className="text-center py-40">
                <h1 className="text-4xl font-bold text-navy mb-4">Post Not Found</h1>
                <p className="text-lg text-charcoal">Sorry, we couldn't find the post you were looking for.</p>
            </div>
        )}
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}
