import { Globe, BrainCircuit, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    icon: Globe,
    title: 'AI for Everyone',
    description: 'We envision a future where anyone—regardless of technical background—can harness the power of AI to solve their unique challenges and bring their ideas to life.',
  },
  {
    icon: BrainCircuit,
    title: 'Self-Building Systems',
    description: 'AI that creates AI. Systems that understand, design, build, and optimize themselves—freeing humans to focus on vision and creativity rather than implementation.',
  },
  {
    icon: Users,
    title: 'Community-Powered Innovation',
    description: 'A thriving ecosystem where creators build modules, users build agents, and everyone benefits from collective intelligence and shared innovation.',
  },
];

export function Vision() {
  return (
    <section className="bg-navy-gradient-deep py-28 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-5xl sm:text-6xl font-normal mb-8">
          Our Vision
        </h2>
        <p className="text-4xl font-light leading-snug max-w-3xl mx-auto mb-16">
          A world where every idea can become an intelligent system—instantly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white/10 border border-white/20 rounded-2xl p-8 sm:p-12 backdrop-blur-lg transition-all duration-300 hover:border-cyan hover:bg-white/15"
            >
              <pillar.icon className="h-16 w-16 text-cyan mb-6 mx-auto" />
              <h3 className="text-2xl font-medium mb-4">{pillar.title}</h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
