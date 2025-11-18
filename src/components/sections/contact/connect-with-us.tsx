import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { XIcon } from '@/components/x-icon';
import React from 'react';

interface SocialChannel {
  name: string;
  icon: LucideIcon | ((props: any) => JSX.Element) | string;
  handle: string;
  purpose: string;
  cta: string;
  href: string;
  isImage: boolean;
}

const socialChannels: SocialChannel[] = [
  {
    name: 'Twitter / X',
    icon: XIcon,
    handle: '@LumivexAI',
    purpose: 'Real-time updates, announcements, and behind-the-scenes insights into our development journey.',
    cta: 'Follow on X →',
    href: 'https://x.com/LumivexAI',
    isImage: false,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    handle: 'Lumivex',
    purpose: 'Company updates, team announcements, thought leadership, and professional networking.',
    cta: 'Connect on LinkedIn →',
    href: 'https://www.linkedin.com/company/lumivexai/',
    isImage: false,
  },
  {
    name: 'Discord',
    icon: '/discord.png',
    handle: 'Lumivex Community',
    purpose: 'Join discussions with other early supporters, share ideas, provide feedback, and shape the future of Lumivex.',
    cta: 'Join Discord →',
    href: 'https://discord.gg/jmUWSa3N',
    isImage: true,
  },
  {
    name: 'Newsletter',
    icon: Mail,
    handle: 'Bi-weekly',
    purpose: 'Exclusive development updates, early access opportunities, and in-depth articles delivered to your inbox.',
    cta: 'Subscribe →',
    href: '/waitlist',
    isImage: false,
  },
];

export function ConnectWithUs() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Join Our Community
          </h2>
          <p className="mt-4 text-lg text-charcoal sm:text-xl">
            Follow our journey, get updates, and connect with other early supporters building the future of AI.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {socialChannels.map((channel) => (
            <div
              key={channel.name}
              className="group rounded-3xl border border-stone-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan hover:shadow-2xl hover:shadow-cyan/10 flex flex-col"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cream">
                {channel.isImage ? (
                  <Image src={channel.icon as string} alt={channel.name} width={32} height={32} />
                ) : (
                  React.createElement(channel.icon as React.ElementType, { className: 'h-8 w-8 text-navy' })
                )}
              </div>
              <h3 className="mt-6 text-xl font-medium text-navy">{channel.name}</h3>
              <p className="text-sm text-silver">{channel.handle}</p>
              <p className="mt-4 text-base text-charcoal/80 flex-grow">{channel.purpose}</p>
              <Button asChild variant="link" className="mt-6 text-ocean">
                <Link href={channel.href} target="_blank" rel="noopener noreferrer">
                  {channel.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
