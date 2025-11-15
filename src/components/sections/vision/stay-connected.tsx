import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { XIcon } from '@/components/x-icon';
import React from 'react';
import Image from 'next/image';

interface SocialChannel {
  name: string;
  icon: LucideIcon | ((props: any) => JSX.Element) | string;
  description: string;
  cta: string;
  href: string;
  isImage: boolean;
}

const socialChannels: SocialChannel[] = [
  {
    name: 'Twitter / X',
    icon: XIcon,
    description: 'Development updates and thoughts',
    cta: 'Follow @lumivex',
    href: '#',
    isImage: false,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    description: 'Company milestones and team news',
    cta: 'Connect with us',
    href: '#',
    isImage: false,
  },
  {
    name: 'Discord',
    icon: '/discord.png',
    description: 'Community discussions and direct access',
    cta: 'Join Community',
    href: '#',
    isImage: true,
  },
  {
    name: 'Newsletter',
    icon: Mail,
    description: 'In-depth updates every two weeks',
    cta: 'Subscribe',
    href: '#waitlist',
    isImage: false,
  },
];

export function StayConnected() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Follow the Journey
          </h2>
          <p className="mt-4 text-lg text-charcoal sm:text-xl">
            We're building this vision in public. Follow along for updates, behind-the-scenes insights, and opportunities to shape the future with us.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {socialChannels.map((channel) => (
            <Link key={channel.name} href={channel.href} className="group rounded-2xl border border-stone-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan hover:shadow-2xl hover:shadow-cyan/10 flex flex-col items-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cream">
                {channel.isImage ? (
                  <Image src={channel.icon as string} alt={channel.name} width={32} height={32} />
                ) : (
                  React.createElement(channel.icon as React.ElementType, { className: 'h-8 w-8 text-navy' })
                )}
              </div>
              <h3 className="mt-6 text-xl font-medium text-navy">{channel.name}</h3>
              <p className="mt-2 text-base text-charcoal/80 flex-grow">{channel.description}</p>
              <p className="mt-4 text-ocean font-semibold">{channel.cta}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
