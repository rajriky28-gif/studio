import { Button } from '@/components/ui/button';
import Link from 'next/link';

const contributions = [
  {
    number: "1.",
    title: "Join the Waitlist",
    description: "Be among the first to use Lumivex when we launch. Your early adoption validates the vision and provides crucial feedback.",
    cta: "Join Waitlist →",
    href: "/#waitlist",
  },
  {
    number: "2.",
    title: "Spread the Word",
    description: "Share our vision with others who believe technology should serve everyone. Every conversation plants seeds for the future.",
    cta: "Share on Twitter →",
    href: "#",
  },
  {
    number: "3.",
    title: "Provide Input",
    description: "Tell us what you'd build with Lumivex. Your use cases shape our priorities and ensure we're building the right thing.",
    cta: "Share Your Ideas →",
    href: "/contact",
  }
];

export function JoinVision() {
  return (
    <section className="bg-cream py-28">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-6">
          Help Us Build This Future
        </h2>
        <p className="text-charcoal text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-16">
          This vision becomes reality only with a community of believers, builders, and early supporters who share our conviction that AI creation should be universal.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contributions.map((item) => (
            <div key={item.number} className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 flex flex-col text-left">
              <span className="text-3xl font-bold text-cyan mb-4">{item.number}</span>
              <h3 className="text-2xl font-medium text-navy mb-3">{item.title}</h3>
              <p className="text-charcoal/80 mb-6 flex-grow">{item.description}</p>
              <Button asChild variant="link" className="text-ocean font-semibold p-0 h-auto justify-start">
                <Link href={item.href}>{item.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
