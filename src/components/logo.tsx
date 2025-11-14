import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="inline-block">
      <span className="font-headline text-3xl font-bold tracking-tight text-primary">
        Lumivex
      </span>
    </Link>
  );
}
