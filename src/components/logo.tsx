import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-4">
      <Image 
        src="/logo.png" 
        alt="Lumivex Logo" 
        width={120} 
        height={120} 
        className="h-12 w-auto"
        priority
      />
      <span className="text-4xl font-bold tracking-tight text-inherit">Lumivex</span>
    </Link>
  );
}
