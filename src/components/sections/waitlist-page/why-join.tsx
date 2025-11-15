import { Key, Tag, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  subTitle: string;
  description: string;
  features: string[];
}

const benefits: Benefit[] = [
  {
    icon: Key,
    title: 'Priority Beta Access',
    subTitle: 'First in Line',
    description: "You'll be among the first to access Lumivex when we launch our invitation-only beta in Q1 2026. No waiting, no applying—you're already in.",
    features: [
      'Guaranteed beta invitation',
      'Access before public launch',
      'Priority support during beta',
      'Direct line to our team',
    ],
  },
  {
    icon: Tag,
    title: 'Founder Pricing',
    subTitle: 'Special Pricing, Forever',
    description: "Lock in exclusive founder pricing that's significantly lower than our standard rates—and keep it for life. Your early support deserves lasting rewards.",
    features: [
      'Up to 50% off standard pricing',
      'Lifetime pricing guarantee',
      'No price increases, ever',
      'Extended free tier benefits',
    ],
  },
  {
    icon: Lightbulb,
    title: 'Shape the Product',
    subTitle: 'Direct Influence',
    description: 'Your feedback directly influences what we build and how we build it. Waitlist members get exclusive surveys, feature voting, and direct access to our team.',
    features: [
      'Monthly feedback surveys',
      'Feature voting rights',
      'Early feature previews',
      'Direct communication with founders',
    ],
  },
];

export function WhyJoin() {
  return (
    <section className="bg-cream py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy text-5xl font-normal mb-4">What You Get as an Early Supporter</h2>
          <p className="text-charcoal text-lg">
            Being on the waitlist isn't just about getting notified—it's about being part of the journey from the beginning with exclusive benefits.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-2xl p-8 border border-stone-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-ocean/10 p-3 rounded-full">
                  <benefit.icon className="h-6 w-6 text-ocean" />
                </div>
                <h3 className="text-navy text-xl font-medium">{benefit.subTitle}</h3>
              </div>
              <p className="text-charcoal/80 mb-4">{benefit.description}</p>
              <div className="mt-6 border-t border-stone-200 pt-6">
                 <p className="font-semibold text-charcoal mb-3 text-sm">What This Means:</p>
                <ul className="space-y-2 text-charcoal/80 text-sm list-disc list-inside">
                  {benefit.features.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
