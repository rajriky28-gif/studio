import { Gem, BookOpen, User, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  practice: string;
}

const values: Value[] = [
  {
    icon: Gem,
    title: 'Simplicity Without Sacrifice',
    description: 'We believe powerful technology should be simple to use. Lumivex hides complexity without limiting capability—making advanced AI accessible without dumbing it down.',
    practice: 'One prompt can create enterprise-grade agents. No compromise between ease and power.',
  },
  {
    icon: BookOpen,
    title: 'Transparency & Trust',
    description: 'No black boxes. Users understand what their agents do, how they work, and have complete visibility into operations. Trust is earned through transparency, not promises.',
    practice: 'Every action logged. Every decision explainable. Full control always.',
  },
  {
    icon: User,
    title: 'Human-Centered AI',
    description: 'AI should augment human capability, not replace human judgment. Lumivex empowers people to do more, create more, and achieve more—while keeping humans in control.',
    practice: 'AI builds what you envision. You remain the architect of your automation.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: "The best innovations come from collective intelligence. We're building an ecosystem where creators, users, and the platform grow stronger together through shared knowledge and modules.",
    practice: 'Build once, benefit the community. Use community modules, contribute your own.',
  },
];

export function Values() {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-20">
            Our Core Values
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white border border-gray-200 rounded-3xl p-10 lg:p-12 transition-all duration-300 hover:border-cyan hover:-translate-y-2 hover:shadow-xl"
            >
              <value.icon className="h-16 w-16 text-cyan mb-6" />
              <h3 className="text-navy text-3xl font-medium mb-4">{value.title}</h3>
              <p className="text-charcoal text-lg leading-relaxed mb-6">{value.description}</p>
              <p className="text-silver italic text-base">"{value.practice}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
