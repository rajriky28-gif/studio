const points = [
  {
    title: 'AI Capability Breakthrough',
    description: 'Advanced language models now understand context and intent at human levels. The technology to make this vision real finally exists.'
  },
  {
    title: 'Urgent Need',
    description: "Automation demand is exploding. Businesses need solutions now. Current tools can't keep pace. The gap between need and capability has never been wider."
  },
  {
    title: 'Window of Opportunity',
    description: "We're at the beginning of the conversational AI era. The next five years will define how humans and AI interact for decades. First movers will shape the future."
  },
  {
    title: 'Collective Readiness',
    description: "Society is ready. People understand AI. They've used ChatGPT. They see the potential. The question is no longer 'if' but 'how'—and Lumivex answers 'how.'"
  }
];

export function WhyNow() {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-16">
          The Perfect Moment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {points.map((point, index) => (
            <div key={index} className="text-left bg-cream/60 p-8 rounded-xl border border-stone-200">
              <h3 className="text-xl font-semibold text-ocean mb-3">{point.title}</h3>
              <p className="text-charcoal leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
