interface Transformation {
  title: string;
  currentState: string;
  futureState: string;
  impacts: string[];
}

const transformations: Transformation[] = [
  {
    title: 'From Months to Minutes',
    currentState: "Building custom AI automation requires months of development, testing, and iteration. Small businesses can't afford it. Individuals can't access it. Most ideas never get built.",
    futureState: 'Any automation idea becomes reality in minutes. A restaurant owner creates a reservation management agent over coffee. A nonprofit builds a donor communication system between meetings. A student creates a research assistant during study break.',
    impacts: [
      '100x acceleration in automation deployment',
      'Ideas tested and validated same day',
      'Innovation no longer constrained by implementation time',
      'Competitive advantage shifts to creativity, not resources',
    ]
  },
  {
    title: 'From Technical Elite to Universal Creators',
    currentState: 'Only those with coding skills, technical education, or large budgets can build intelligent automation. The vast majority of people with great ideas are excluded.',
    futureState: 'A nurse creates a patient intake agent. A farmer builds crop monitoring automation. A teacher develops personalized learning assistants. A chef creates inventory management intelligence. Anyone with a need becomes a creator.',
    impacts: [
      '10 million+ new AI creators worldwide',
      'Solutions built by people who understand the problems',
      'Diverse perspectives driving innovation',
      'Technology serving everyone, not just tech companies'
    ]
  },
  {
    title: 'From Static Tools to Evolving Intelligence',
    currentState: 'Once built, systems require constant maintenance. Updates are manual. Improvements need developer time. Systems decay without ongoing investment.',
    futureState: 'Agents that learn from every interaction. Systems that optimize themselves automatically. Intelligence that grows more capable over time without human intervention. Maintenance becomes obsolete.',
    impacts: [
      'Zero maintenance burden',
      'Continuous improvement without cost',
      'Systems that get better, not worse, over time',
      'Resources freed for innovation, not maintenance'
    ]
  },
  {
    title: 'From Isolated Solutions to Collaborative Ecosystem',
    currentState: "Every company builds proprietary solutions. Developers work in silos. Knowledge doesn't transfer. Innovation requires starting from scratch repeatedly.",
    futureState: "A marketplace of intelligence where creators build modules, users combine them into agents, and everyone benefits. Community contributions compound. Building on others' work is celebrated and rewarded.",
    impacts: [
      'Exponential growth in capability',
      'Creators earn passive income from their modules',
      'Users access best-in-class components instantly',
      'Innovation accelerates through collaboration'
    ]
  }
];

export function WorldWeBuild() {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-5">
            What Becomes Possible
          </h2>
          <p className="text-charcoal text-lg sm:text-xl font-light mb-20">
            When these three pillars come together, entirely new possibilities emerge. Here's what the world looks like when AI creation is truly democratized.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {transformations.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-navy text-3xl font-medium mb-6">{item.title}</h3>
              <div>
                <p className="font-semibold text-sm text-gray-500 mb-2">Current State:</p>
                <p className="text-charcoal/80 mb-6">{item.currentState}</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-ocean mb-2">Future State:</p>
                <p className="text-charcoal mb-6">{item.futureState}</p>
              </div>
              <div className="bg-cream/70 rounded-lg p-4">
                <p className="font-semibold text-sm text-navy mb-2">Impact:</p>
                <ul className="space-y-1 text-charcoal/80 text-sm">
                  {item.impacts.map(impact => <li key={impact}>→ {impact}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
