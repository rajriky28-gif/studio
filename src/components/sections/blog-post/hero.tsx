'use client';
import { BlogPost } from '@/components/sections/admin/blog/posts-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Image from 'next/image';

export function BlogPostHero({ post }: { post: BlogPost }) {
  const publishedDate = post.publishedAt?.toDate ? format(post.publishedAt.toDate(), 'MMMM d, yyyy') : 'Date not available';

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textLength = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.ceil(textLength / wordsPerMinute);
  };
  
  const readingTime = post.content ? calculateReadingTime(post.content) : 5;

  return (
    <header className="pt-32 pb-16 bg-gradient-to-b from-white to-cream">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Badge variant="outline" className="bg-cyan/10 text-cyan border-cyan/20 uppercase font-semibold text-xs tracking-wider mb-6">
          {post.category}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-light text-navy leading-tight tracking-tight mb-6">
          {post.title}
        </h1>
        <div className="flex justify-center items-center gap-6 text-charcoal/80">
          <div className="flex items-center gap-2">
            <Image src="https://picsum.photos/seed/author/32/32" alt={post.author} width={32} height={32} className="rounded-full" data-ai-hint="person portrait" />
            <span>By {post.author}</span>
          </div>
          <span>&bull;</span>
          <span>{publishedDate}</span>
          <span>&bull;</span>
          <span>{readingTime} min read</span>
        </div>
      </div>
      {post.featuredImage && (
        <div className="container mx-auto px-4 mt-16">
            <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-navy/20">
                <Image
                    src={post.featuredImage}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>
        </div>
      )}
    </header>
  );
}