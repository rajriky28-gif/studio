import { Check, Code, Rocket, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Milestone {
  title: string;
  icon: LucideIcon;
  status: string;
  statusDetail?: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    title: 'Now: You Join',
    icon: Check,
    status: 'Complete',
    description: "You've secured your spot on the waitlist. Welcome to the community! You'll start receiving updates within 24 hours.",
  },
  {
    title: 'Q4 2025: Platform Development',
    icon: Code,
    status: 'In Progress',
    statusDetail: '~65% complete',
    description: "We're currently building the platform. You'll receive regular progress updates, sneak peeks, and opportunities to vote on features.",
  },
  {
    title: 'Q1 2026: Beta Launch',
    icon: Rocket,
    status: 'Upcoming',
    statusDetail: '4 months',
    description: "Invitation-only beta begins. Waitlist members receive invitations in waves. You'll get early access to build your first agents.",
  },
  {
    title: 'Q2 2026: Public Launch',
    icon: Globe,
    status: 'Planned',
    statusDetail: '7 months',
    description: "Full public launch with complete feature set. Your founder pricing locks in. You're already a Lumivex power user by now.",
  },
];

const statusStyles = {
  Complete: "bg-green-100 text-green-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Upcoming: "bg-blue-100 text-blue-800",
  Planned: "bg-gray-100 text-gray-800",
};

export function Timeline() {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy text-5xl font-normal mb-4">What to Expect</h2>
          <p className="text-charcoal text-lg">
            Here's what happens between now and when you get access to Lumivex.
          </p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 w-0.5 h-full bg-cyan/20" aria-hidden="true"></div>
          {milestones.map((item, index) => (
            <div key={item.title} className="relative pl-16 pb-12 last:pb-0">
              <div className="absolute left-0 top-0">
                <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-ocean" />
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-xl font-medium text-navy">{item.title}</h3>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusStyles[item.status]}`}>{item.status}</span>
              </div>
              <p className="text-sm text-silver mb-2">{item.statusDetail}</p>
              <p className="text-charcoal/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
