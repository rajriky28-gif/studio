interface Phase {
  number: string;
  year: string;
  goal: string;
  milestones: string[];
  impactMetric: string;
}

const phases: Phase[] = [
  {
    number: '01',
    year: '2026',
    goal: 'Launch Lumivex and prove the concept',
    milestones: [
      'Beta launch to 10,000 early users',
      '100,000 AI agents created',
      '500+ modules in library',
      'First creator revenue payouts',
    ],
    impactMetric: 'Proof that conversational AI creation works at scale',
  },
  {
    number: '02',
    year: '2027-2028',
    goal: 'Scale platform and grow ecosystem',
    milestones: [
      '1 million users worldwide',
      '10 million agents deployed',
      '2,000+ active module creators',
      '50+ enterprise customers',
      'International expansion',
    ],
    impactMetric: 'Lumivex becomes the standard for no-code AI creation',
  },
  {
    number: '03',
    year: '2029-2030',
    goal: 'Build thriving creator economy',
    milestones: [
      '10 million users globally',
      '100 million agents operational',
      '50,000+ creators earning income',
      'Module marketplace generating $100M+ annually',
      'Community-driven innovation',
    ],
    impactMetric: 'Self-sustaining ecosystem where community drives growth',
  },
  {
    number: '04',
    year: '2031+',
    goal: 'Achieve vision of universal AI creation',
    milestones: [
      '100 million+ users worldwide',
      '1 billion+ agents deployed',
      'AI creation becomes as common as using email',
      'New industries and career paths emerge',
      'Fundamental shift in human-AI interaction',
    ],
impactMetric: 'AI creation is democratized; the vision is realized',
  },
];

export function Roadmap() {
  return (
    <section className="bg-cream py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-5">
            From Vision to Reality
          </h2>
          <p className="text-charcoal text-lg sm:text-xl font-light mb-20">
            This vision unfolds in phases, each building on the last, each bringing us closer to the future we envision.
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-cyan/30 hidden lg:block" aria-hidden="true"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
            {phases.map((phase, index) => (
              <div key={index} className={`relative p-8 bg-white rounded-2xl shadow-lg border-l-4 border-cyan lg:border-l-0 ${index % 2 === 0 ? 'lg:border-r-4' : 'lg:border-l-4'}`}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-cyan text-5xl font-bold">{phase.number}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-navy">Phase {phase.number}: {phase.goal} ({phase.year})</h3>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-charcoal mb-2">Milestones:</h4>
                  <ul className="list-disc list-inside space-y-1 text-charcoal/80">
                    {phase.milestones.map(m => <li key={m}>{m}</li>)}
                  </ul>
                </div>
                <p className="text-silver italic text-sm">
                  <strong>Impact Metric:</strong> "{phase.impactMetric}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
