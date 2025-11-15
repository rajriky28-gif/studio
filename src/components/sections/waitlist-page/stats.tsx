import { AnimatedCounter } from '@/components/animated-counter';

const stats = [
  {
    target: 2847,
    label: 'Innovators Waiting',
    suffix: '+',
  },
  {
    target: 67,
    label: 'Countries Worldwide',
  },
  {
    target: 120,
    label: 'Different Industries',
    suffix: '+',
  },
  {
    target: 4,
    label: 'Months Until Beta Access',
    prefix: '~',
  },
];

export function Stats() {
  return (
    <section className="bg-navy-gradient-deep py-24 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl md:text-7xl font-bold tracking-tighter">
                {stat.prefix}
                <AnimatedCounter target={stat.target} duration={3000} />
                {stat.suffix}
              </p>
              <p className="text-white/70 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
