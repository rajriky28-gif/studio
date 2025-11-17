'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Logo({ isScrolled, isHomePage }: { isScrolled?: boolean, isHomePage?: boolean }) {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith('/blog');

  const logoTextColor = () => {
    if (isScrolled) {
      return "text-navy"; // Scrolled color is always navy
    }
    // Non-scrolled colors
    if (isHomePage) {
      return "text-white"; // White on transparent hero
    }
     if (isBlogPage) {
      return "text-navy"; // Navy on blog page (non-scrolled)
    }
    return "text-navy"; // Default to navy for other pages
  };

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
          logoTextColor()
        )}
      >
        Lumivex
      </span>
    </Link>
  );
}
