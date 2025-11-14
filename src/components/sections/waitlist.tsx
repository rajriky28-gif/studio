import { Gift, Rocket, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { WaitlistForm } from '@/components/waitlist-form';
import { AnimatedCounter } from '@/components/animated-counter';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Rocket,
    title: 'Early Access',
    description: 'Be first to build when we launch.',
  },
  {
    icon: Gift,
    title: 'Special Pricing',
    description: 'Exclusive founder pricing for early supporters.',
  },
  {
    icon: Star,
    title: 'Shape the Future',
    description: 'Direct input on features and priorities.',
  },
];

export function Waitlist() {
  return (
    <section id="waitlist" className="w-full bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Join the Waitlist
          </h2>
          <p className="mt-4 text-lg text-charcoal sm:text-xl">
            Be among the first to experience Lumivex when we launch. Get exclusive early access, special pricing, and direct input on features.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                <benefit.icon className="h-8 w-8 text-cyan" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-navy">{benefit.title}</h3>
              <p className="mt-1 text-base text-charcoal">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
            <WaitlistForm />
          </div>
          <p className="mt-8 text-center text-base font-medium text-navy">
            Join <AnimatedCounter target={2847} />+ innovators already waiting
          </p>
        </div>
      </div>
    </section>
  );
}
