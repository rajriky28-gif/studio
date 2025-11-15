import { Award, Shield, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Tier {
  icon: LucideIcon;
  title: string;
  requirement: string;
  rewards: string[];
}

const tiers: Tier[] = [
  {
    icon: Award,
    title: 'Advocate',
    requirement: '3 referrals',
    rewards: ['+30 positions in waitlist', 'Exclusive "Advocate" badge', 'Early access to feature previews', 'Priority support ticket'],
  },
  {
    icon: Shield,
    title: 'Champion',
    requirement: '10 referrals',
    rewards: ['+100 positions in waitlist', 'Exclusive "Champion" badge', '1-month free Professional plan', 'Direct Slack channel access', 'Vote on next features'],
  },
  {
    icon: Star,
    title: 'Ambassador',
    requirement: '25 referrals',
    rewards: ['Skip to top 100 in waitlist', 'Exclusive "Ambassador" badge', '3-months free Professional plan', '1-on-1 onboarding session', 'Beta feature testing access'],
  },
];

export function ReferralProgram() {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy text-5xl font-normal mb-4">Move Up the List</h2>
          <p className="text-charcoal text-lg">
            Invite friends and skip ahead in line. For every person who joins using your link, you both move up 10 positions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={tier.title}
              className={`rounded-2xl p-8 border hover:shadow-2xl transition-shadow ${
                index === 0 ? 'bg-orange-50 border-orange-200' : index === 1 ? 'bg-slate-50 border-slate-200' : 'bg-yellow-50 border-yellow-300'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-full ${
                  index === 0 ? 'bg-orange-100' : index === 1 ? 'bg-slate-200' : 'bg-yellow-200'
                }`}>
                  <tier.icon className={`h-6 w-6 ${
                    index === 0 ? 'text-orange-600' : index === 1 ? 'text-slate-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-navy text-xl font-medium">{tier.title}</h3>
                  <p className="text-sm font-semibold text-charcoal/70">{tier.requirement}</p>
                </div>
              </div>
              <p className="font-semibold text-charcoal mb-3 text-sm mt-6">Rewards:</p>
              <ul className="space-y-2 text-charcoal/80 text-sm list-disc list-inside">
                {tier.rewards.map((reward) => <li key={reward}>{reward}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
