'use client';
import { BlogPost } from '@/components/sections/admin/blog/posts-table';

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article className="py-16">
      <div 
        className="prose prose-lg lg:prose-xl max-w-3xl mx-auto px-4 text-charcoal"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}