import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <Image 
        src="/logo.png" 
        alt="Lumivex Logo" 
        width={32} 
        height={32} 
        className="h-8 w-auto"
        priority
      />
      <span className="text-xl font-bold tracking-tight text-inherit">Lumivex</span>
    </Link>
  );
}
