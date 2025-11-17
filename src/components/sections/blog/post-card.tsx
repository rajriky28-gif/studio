'use client';

import { BlogPost } from '@/components/sections/admin/blog/posts-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const publishedDate = post.publishedAt?.toDate ? format(post.publishedAt.toDate(), 'MMM d, yyyy') : 'Date not available';
  
  // A simple function to estimate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textLength = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.ceil(textLength / wordsPerMinute);
  };
  
  const readingTime = post.content ? calculateReadingTime(post.content) : 5;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex flex-col h-full bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan/10 hover:border-cyan">
            {post.featuredImage ? (
            <div className="relative h-60 w-full">
                <Image
                src={post.featuredImage}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            ) : (
                <div className="h-60 w-full bg-gray-200"></div>
            )}
            <div className="flex flex-col flex-grow p-8">
                <Badge variant="outline" className="bg-cyan/10 text-cyan border-cyan/20 uppercase font-semibold text-xs tracking-wider w-fit">
                    {post.category}
                </Badge>

                <h3 className="mt-4 text-2xl font-semibold text-navy group-hover:text-ocean transition-colors duration-300 !leading-snug">
                    {post.title}
                </h3>
                <p className="mt-3 text-base text-charcoal/80 leading-relaxed flex-grow">
                    {post.excerpt}
                </p>

                <div className="mt-5 pt-5 border-t border-stone-200 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        {/* Assuming a generic avatar for now */}
                        <Image src="https://picsum.photos/seed/author/24/24" alt={post.author} width={24} height={24} className="rounded-full" data-ai-hint="person portrait" />
                        <span>By {post.author}</span>
                    </div>
                    <div className="text-right">
                        <span>{publishedDate} &bull; {readingTime} min read</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  );
}