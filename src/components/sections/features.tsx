import { BrainCircuit, Lock, MessageCircle, Network, ShieldCheck, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  name: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: MessageCircle,
    name: 'Natural Language',
    description: 'Communicate your needs naturally. No technical knowledge required.',
  },
  {
    icon: Network,
    name: 'Autonomous Assembly',
    description: 'AI selects and connects the perfect modules automatically.',
  },
  {
    icon: ShieldCheck,
    name: 'Intelligent Testing',
    description: 'Every agent is validated and debugged before deployment.',
  },
  {
    icon: Zap,
    name: 'Instant Deployment',
    description: 'From idea to production in minutes, not weeks.',
  },
  {
    icon: BrainCircuit,
    name: 'Continuous Learning',
    description: 'Agents improve from every interaction automatically.',
  },
  {
    icon: Lock,
    name: 'Enterprise Security',
    description: 'Bank-grade security and compliance built-in.',
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-24 sm:py-32 bg-navy-gradient-deep">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-4xl font-light text-white sm:text-5xl lg:text-6xl tracking-tighter">
            Built for Complexity.
          </h2>
          <h2 className="text-4xl font-light text-white sm:text-5xl lg:text-6xl tracking-tighter">
            Designed for Simplicity.
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg transition-all duration-300 hover:border-cyan/50 hover:bg-white/15"
            >
              <feature.icon className="h-14 w-14 text-cyan" />
              <h3 className="mt-6 text-2xl font-medium text-white">{feature.name}</h3>
              <p className="mt-2 text-base text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
