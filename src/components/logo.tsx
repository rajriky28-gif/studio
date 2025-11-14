import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ isScrolled }: { isScrolled?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-0">
      <Image 
        src="/logo.png" 
        alt="Lumivex Logo" 
        width={168} 
        height={168} 
        className="h-20 w-20"
        priority
      />
      <span 
        className={cn(
          "text-2xl font-bold tracking-tight transition-colors",
          isScrolled ? "text-primary" : "text-white"
        )}
      >
        Lumivex
      </span>
    </Link>
  );
}
