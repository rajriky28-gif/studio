import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function ContactFinalCta() {
  return (
    <section className="w-full py-24 sm:py-32 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-light text-navy sm:text-6xl lg:text-7xl !leading-tight tracking-tighter">
            Ready to Build the Future?
          </h2>
          <p className="mt-6 text-lg text-charcoal sm:text-xl">
            Join 2,847+ innovators waiting for Lumivex to launch. Get early access, exclusive updates, and founder pricing.
          </p>
          <div className="mt-12">
            <Button
              size="lg"
              className="h-auto w-full sm:w-auto bg-navy-gradient px-14 py-5 text-lg font-semibold text-white shadow-lg shadow-ocean/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-ocean/50"
              asChild
            >
              <Link href="/#waitlist">
                Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 text-sm text-charcoal/80 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> Early beta access
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> Founder pricing
            </span>
             <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> Product updates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}