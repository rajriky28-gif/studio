export function FoundersNote() {
  const paragraphs = [
    "For too long, creating AI systems has been the domain of technical experts with specialized knowledge. But the best ideas don't always come from engineers—they come from people who understand real problems and need real solutions.",
    "Lumivex exists to democratize AI creation. To put the power of intelligent automation in everyone's hands. To make building AI as natural as having a conversation.",
    "We're building more than a platform. We're building a future where every idea can become an intelligent system—instantly.",
    "Join us on this journey.",
  ];

  return (
    <section id="about" className="w-full bg-white py-24 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-ocean">FROM THE FOUNDERS</p>
          <h2 className="mt-4 text-4xl font-normal text-navy sm:text-5xl tracking-tighter">
            Why Lumivex?
          </h2>
        </div>
        <div className="mt-12 space-y-8 text-center text-lg leading-relaxed text-charcoal sm:text-xl sm:leading-loose">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-12 text-center text-lg italic text-navy sm:text-xl">
          — The Lumivex Team
        </p>
      </div>
    </section>
  );
}
