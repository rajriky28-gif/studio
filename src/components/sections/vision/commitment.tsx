const commitments = [
  'Keeping AI creation accessible to everyone',
  'Maintaining a free tier that delivers real value',
  'Building features that serve users, not just metrics',
  'Growing sustainably without sacrificing our values',
  'Listening to our community and adapting our vision',
  'Staying transparent about our progress and challenges',
];

export function Commitment() {
  return (
    <section className="bg-navy-gradient py-28 text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <h2 className="text-5xl sm:text-6xl font-light mb-8">
          What We Promise
        </h2>
        <div className="space-y-6 text-lg text-white/90 leading-loose">
          <p>
            This vision guides every decision we make. When faced with choices between ease and power, we choose both. Between speed and quality, we refuse to compromise. Between profit and mission, mission wins.
          </p>
          <p>
            We're building Lumivex for the long term—not for a quick exit, but for lasting impact. Not to dominate a market, but to create one. Not to extract value, but to create it.
          </p>
        </div>
        <div className="mt-16 text-left max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-cyan mb-6 text-center">We commit to:</h3>
          <ul className="space-y-4">
            {commitments.map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-white/10 rounded-lg">
                <span className="text-cyan font-bold text-xl mt-px">→</span>
                <span className="text-white text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 text-2xl italic text-white/80">
          This is our promise. This is our vision. This is Lumivex.
        </p>
      </div>
    </section>
  );
}
