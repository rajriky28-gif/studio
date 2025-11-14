import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-0">
      <Image 
        src="/logo.png" 
        alt="Lumivex Logo" 
        width={40} 
        height={40} 
        className="h-10 w-10"
        priority
      />
      <span className="text-2xl font-bold tracking-tight text-inherit -ml-2">Lumivex</span>
    </Link>
  );
}
