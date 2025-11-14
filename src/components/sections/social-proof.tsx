import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail, Instagram, Twitter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
}

const socialLinks: SocialLink[] = [
  { name: 'Join us on X', icon: Twitter, href: '#' },
  { name: 'Connect on LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Stay updated on IG', icon: Instagram, href: '#' },
  { name: 'Subscribe', icon: Mail, href: '#waitlist' },
];

export function SocialProof() {
  return (
    <section className="bg-navy-gradient py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center md:px-6">
        <h2 className="text-4xl font-light text-white sm:text-5xl tracking-tighter">
          Follow Our Journey
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          We're building in public. Follow along for updates, behind-the-scenes, and exclusive previews.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              className="h-auto rounded-xl border-white/30 bg-white/10 px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/20 hover:border-white/40 hover:-translate-y-1"
              asChild
            >
              <Link href={link.href}>
                <link.icon className="mr-3 h-5 w-5" />
                {link.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
