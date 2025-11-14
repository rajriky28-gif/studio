import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-0">
      <Image 
        src="/logo.png" 
        alt="Lumivex Logo" 
        width={120} 
        height={120} 
        className="h-[120px] w-[120px]"
        priority
      />
      <span className="text-2xl font-bold tracking-tight text-inherit">Lumivex</span>
    </Link>
  );
}
