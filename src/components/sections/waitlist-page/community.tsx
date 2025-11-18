import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { XIcon } from '@/components/x-icon';
import React from 'react';
import { AnimatedCounter } from '@/components/animated-counter';

interface CommunityChannel {
  name: string;
  icon: LucideIcon | ((props: any) => JSX.Element) | string;
  isImage: boolean;
  members: number;
  description: string;
  details: string[];
  cta: string;
  href: string;
}

const channels: CommunityChannel[] = [
  {
    name: 'Discord Server',
    icon: '/discord.png',
    isImage: true,
    members: 1234,
    description: 'Join discussions, share ideas, get sneak peeks, and connect directly with our team and other waitlist members.',
    details: ['#general - Community chat', '#feature-requests - Suggest ideas', '#use-cases - Share what you\'ll build', '#announcements - Official updates'],
    cta: 'Join Discord →',
    href: 'https://discord.gg/jmUWSa3N',
  },
  {
    name: 'Twitter/X Community',
    icon: XIcon,
    isImage: false,
    members: 3456,
    description: 'Follow for daily updates, behind-the-scenes development insights, AI industry thoughts, and launch announcements.',
    details: ['Development progress', 'Feature previews', 'Team insights', 'Launch countdown'],
    cta: 'Follow on X →',
    href: 'https://x.com/LumivexAI',
  },
  {
    name: 'LinkedIn Page',
    icon: Linkedin,
    isImage: false,
    members: 2103,
    description: 'Connect for professional updates, company milestones, team announcements, and thought leadership content.',
    details: ['Company updates', 'Team introductions', 'Industry insights', 'Partnership news'],
    cta: 'Follow on LinkedIn →',
    href: 'https://www.linkedin.com/company/lumivexai/',
  },
];

export function Community() {
  return (
    <section className="bg-cream py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy text-5xl font-normal mb-4">Join the Community Now</h2>
          <p className="text-charcoal text-lg">
            Don't wait for launch to get involved. Join our community channels and connect with other early supporters today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {channels.map((channel) => (
            <div key={channel.name} className="bg-white rounded-2xl p-8 border border-stone-200 hover:shadow-xl transition-shadow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10">
                        {channel.isImage ? (
                        <Image src={channel.icon as string} alt={channel.name} width={24} height={24} />
                        ) : (
                        React.createElement(channel.icon as React.ElementType, { className: 'h-6 w-6 text-navy' })
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-navy"><AnimatedCounter target={channel.members} />+</p>
                        <p className="text-xs text-charcoal/70">{channel.name.includes('Discord') ? 'members' : 'followers'}</p>
                    </div>
                </div>

              <h3 className="text-navy text-xl font-medium mb-2">{channel.name}</h3>
              <p className="text-charcoal/80 mb-4 flex-grow">{channel.description}</p>
              
              <div className="mt-4 border-t border-stone-200 pt-4">
                <p className="font-semibold text-charcoal mb-2 text-sm">What you'll see:</p>
                <ul className="space-y-1.5 text-charcoal/80 text-sm">
                  {channel.details.map((item) => <li key={item} className="flex items-start gap-2"><span className="text-ocean mt-1">→</span>{item}</li>)}
                </ul>
              </div>

              <Button asChild variant="outline" className="mt-6 w-full bg-white hover:bg-ocean/10 border-ocean/50 text-ocean font-semibold">
                <Link href={channel.href} target="_blank" rel="noopener noreferrer">{channel.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
