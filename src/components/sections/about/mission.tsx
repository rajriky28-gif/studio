export function Mission() {
  const missionText = [
    "For too long, building intelligent systems has been reserved for those with deep technical expertise. Talented founders, creative professionals, and innovative teams have been held back—not by lack of vision, but by barriers of complexity.",
    "We're removing those barriers.",
    "Lumivex transforms natural language into functional AI agents. No coding. No drag-and-drop builders. No technical documentation to decipher. Just you, describing what you need, and AI building it autonomously.",
    "This is more than a product. It's a fundamental shift in how we interact with technology—where tools understand us, rather than demanding we understand them."
  ];

  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-8">
          Our Mission
        </h2>
        <p className="text-ocean text-4xl font-light leading-snug mb-12">
          To make AI creation as simple as conversation.
        </p>
        <div className="space-y-8 text-charcoal text-lg sm:text-xl font-light leading-loose">
          {missionText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
