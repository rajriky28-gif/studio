import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ isScrolled, isHomePage }: { isScrolled?: boolean, isHomePage?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-0">
      <Image 
        src="/logo.png" 
        alt="Lumivex Logo" 
        width={128} 
        height={128} 
        className="h-20 w-20"
        priority
      />
      <span 
        className={cn(
          "text-3xl font-bold tracking-tight transition-colors -ml-4",
          isScrolled ? "text-navy" : (isHomePage ? "text-white" : "text-navy")
        )}
      >
        Lumivex
      </span>
    </Link>
  );
}
