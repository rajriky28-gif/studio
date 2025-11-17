'use client';

import { useMemo, useState } from 'react';
import { useCollection, useFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { BlogPost } from '@/components/sections/admin/blog/posts-table';
import BlogPostCard from './post-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

function PostListingsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <Skeleton className="h-60 w-full" />
          <div className="p-8 space-y-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <div className="flex justify-between items-center pt-4 border-t mt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const categories = ["All Posts", "Product Updates", "AI & Technology", "Company News", "Tutorials"];

export function PostListings() {
  const { firestore } = useFirebase();
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const postsQuery = useMemo(() => {
    if (!firestore) return null;
    const baseQuery = collection(firestore, 'blog_posts');
    const queries = [
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
    ];
    if (activeCategory !== "All Posts") {
        queries.unshift(where('category', '==', activeCategory));
    }
    return query(baseQuery, ...queries);
  }, [firestore, activeCategory]);

  const { data: posts, isLoading, error } = useCollection<BlogPost>(postsQuery);

  const renderContent = () => {
    if (isLoading) {
      return <PostListingsSkeleton />;
    }
    
    if (error) {
      return <div className="text-center text-red-500">Error loading posts: {error.message}</div>;
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="text-center py-24 px-6 bg-cream/50 max-w-2xl mx-auto rounded-2xl border border-dashed">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6"/>
          <h3 className="text-3xl font-medium text-navy">No Posts Yet</h3>
          <p className="text-charcoal mt-4">We're working on some great content. Check back soon!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center flex-wrap gap-3 mb-16">
            {categories.map(category => (
                <Button 
                    key={category}
                    variant={activeCategory === category ? 'default' : 'outline'}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${activeCategory === category ? 'bg-navy text-white' : 'text-navy border-stone-300 hover:bg-cream'}`}
                >
                    {category}
                </Button>
            ))}
        </div>
        
        {renderContent()}
        
        {posts && posts.length > 0 && (
            <div className="text-center mt-20">
                <Button size="lg" variant="outline" className="h-14 px-10 text-base">Load More Posts</Button>
            </div>
        )}
      </div>
    </section>
  );
}
