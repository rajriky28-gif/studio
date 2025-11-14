export function Location() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
        <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter mb-8">
          Where We're Based
        </h2>
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-stone-200">
          <h3 className="text-2xl font-semibold text-ocean mb-4">Remote-First Team</h3>
          <div className="space-y-4 text-charcoal text-lg leading-relaxed">
            <p>
              We're a distributed team working from locations around the world. 
              While we don't have a physical office yet, we're always connected 
              and available through email and our community channels.
            </p>
            <p className="italic text-charcoal/80">
              Building great products doesn't require a single location—it requires great people, wherever they are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}