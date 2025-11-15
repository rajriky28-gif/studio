import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function FinalCta() {
  return (
    <section className="bg-navy-gradient py-28 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
        <h2 className="text-5xl sm:text-6xl font-light mb-6">
          Don't Miss the Launch
        </h2>
        <p className="text-xl text-white/80 font-light leading-relaxed mb-12">
          Spots are filling fast. Join 2,847+ innovators already on the list and secure your early access to the future of AI creation.
        </p>
        
        <Button
          size="lg"
          className="h-auto w-full sm:w-auto bg-white text-navy px-14 py-5 text-lg font-semibold shadow-lg shadow-cyan/20 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          asChild
        >
          <Link href="#waitlist-form">
            Join the Waitlist Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-white/80 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> 2,847+ members waiting
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> 67 countries represented
            </span>
             <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-cyan" /> Lifetime founder pricing
            </span>
          </div>
        <p className="mt-6 text-sm text-white/70">
            Beta invitations sent in order of signup. The sooner you join, the sooner you build.
        </p>
      </div>
    </section>
  );
}
