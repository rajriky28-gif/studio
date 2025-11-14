import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="inline-block">
      <Image 
        src="/logo.png" 
        alt="Lumivex Logo" 
        width={140} 
        height={40} 
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}
