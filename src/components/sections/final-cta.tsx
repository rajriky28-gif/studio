import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function FinalCta() {
  return (
    <section id="final-cta" className="w-full py-24 sm:py-40 bg-cream-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-light text-navy sm:text-6xl lg:text-7xl !leading-tight tracking-tighter">
            Don't Miss the Launch
          </h2>
          <p className="mt-6 text-lg text-charcoal sm:text-xl">
            Be part of the AI revolution. Join our waitlist and get exclusive early access when Lumivex launches.
          </p>
          <div className="mt-12">
            <Button
              size="lg"
              className="h-auto w-full sm:w-auto bg-navy-gradient px-14 py-5 text-lg font-semibold text-white shadow-lg shadow-ocean/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-ocean/50"
              asChild
            >
              <a href="#waitlist">
                Join Waitlist Now <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 text-sm text-charcoal/80 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> No credit card required
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> Early access guaranteed
            </span>
             <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> Special founder pricing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
