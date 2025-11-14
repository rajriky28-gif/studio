import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-0">
      <Image 
        src="/logo.png" 
        alt="Lumivex Logo" 
        width={96} 
        height={96} 
        className="h-24 w-24"
        priority
      />
      <span className="text-2xl font-bold tracking-tight text-inherit -ml-4">Lumivex</span>
    </Link>
  );
}
