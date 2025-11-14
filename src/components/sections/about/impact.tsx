import { TrendingUp, Rocket, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ImpactItem {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
}

const impacts: ImpactItem[] = [
  {
    icon: TrendingUp,
    title: 'Enable 10 Million Creators',
    description: "By removing technical barriers, we'll empower millions of entrepreneurs, creators, and professionals to build the automation they envision. Ideas that would have died due to implementation challenges will flourish.",
    metric: '10 million AI agents created by non-technical users by 2030',
  },
  {
    icon: Rocket,
    title: '10x Faster Innovation Cycles',
    description: 'When building intelligent systems takes minutes instead of months, innovation accelerates exponentially. Businesses can test ideas quickly, iterate rapidly, and bring solutions to market at unprecedented speed.',
    metric: 'Average time from idea to deployment: 5 minutes by 2027',
  },
  {
    icon: Lightbulb,
    title: 'Unlock Impossible Ideas',
    description: "Many automation ideas are abandoned not because they're bad, but because they seem too complex to build. Lumivex makes the 'impossible' possible, unlocking entirely new categories of intelligent applications.",
    metric: "1 million use cases we haven't imagined yet by 2028",
  },
];

export function Impact() {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-20">
            The Impact We Envision
          </h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-10">
          {impacts.map((item) => (
            <div
              key={item.title}
              className="flex flex-col md:flex-row items-start gap-8 rounded-2xl border-l-4 border-cyan p-10 lg:p-14"
              style={{ background: 'linear-gradient(to right, hsl(var(--cream)), white)' }}
            >
              <item.icon className="h-16 w-16 text-cyan flex-shrink-0" />
              <div>
                <h3 className="text-navy text-3xl font-medium mb-4">{item.title}</h3>
                <p className="text-charcoal text-lg leading-relaxed mb-6">{item.description}</p>
                <p className="text-ocean italic">"{item.metric}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
