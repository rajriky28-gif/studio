'use client';

import { BlogPost } from '@/components/sections/admin/blog/posts-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturedBlogPostCard({ post }: { post: BlogPost }) {
  const publishedDate = post.publishedAt?.toDate ? format(post.publishedAt.toDate(), 'MMMM d, yyyy') : 'Date not available';
  
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textLength = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.ceil(textLength / wordsPerMinute);
  };
  
  const readingTime = post.content ? calculateReadingTime(post.content) : 5;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-white border border-stone-200 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan/10 hover:border-cyan">
            {post.featuredImage && (
                <div className="relative h-64 md:h-full w-full md:min-h-[400px]">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}
            
            <div className="p-8 md:p-12 flex flex-col">
                <Badge variant="outline" className="bg-cyan/10 text-cyan border-cyan/20 uppercase font-semibold text-xs tracking-wider w-fit">
                    {post.category}
                </Badge>

                <h3 className="mt-4 text-3xl font-semibold text-navy group-hover:text-ocean transition-colors duration-300 !leading-snug">
                    {post.title}
                </h3>
                <p className="mt-4 text-base text-charcoal/80 leading-relaxed flex-grow">
                    {post.excerpt}
                </p>

                <div className="mt-6 pt-6 border-t border-stone-200 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                        <Image src="https://picsum.photos/seed/author/32/32" alt={post.author} width={32} height={32} className="rounded-full" data-ai-hint="person portrait" />
                        <div>
                            <p className="font-semibold">By {post.author}</p>
                            <p>{publishedDate} &bull; {readingTime} min read</p>
                        </div>
                    </div>
                </div>
                 <div className="mt-8">
                    <span className="text-ocean font-semibold flex items-center gap-2">
                        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </div>
    </Link>
  );
}
