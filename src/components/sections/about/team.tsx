import Link from "next/link";

export function Team() {
  return (
    <section className="bg-cream py-28">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-5">
          The Team Building Lumivex
        </h2>
        <p className="text-charcoal text-lg sm:text-xl font-light mb-20 max-w-3xl mx-auto">
          A small, passionate team obsessed with making AI accessible
        </p>

        <div className="max-w-2xl mx-auto">
            <p className="text-charcoal text-lg sm:text-xl leading-relaxed">
                We're a lean, focused team working heads-down to bring Lumivex to life. As we grow, we'll introduce the people behind the platform.
            </p>
            <p className="text-charcoal text-lg sm:text-xl leading-relaxed mt-6">
                For now, we're letting our work speak for itself.
            </p>

            <h3 className="text-navy text-2xl font-medium mt-16 mb-4">
                Interested in joining our mission?
            </h3>
            <Link href="mailto:careers@lumivex.com" className="text-ocean text-lg hover:underline">
                We're hiring &rarr; careers@lumivex.com
            </Link>
        </div>
      </div>
    </section>
  );
}
