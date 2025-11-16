import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FinalCta() {
  return (
    <section className="w-full py-24 sm:py-32 bg-navy-gradient-deep">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-light text-white sm:text-6xl !leading-tight tracking-tighter">
            Can't Find the Right Role?
          </h2>
          <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and tell us why you want to work at Lumivex.
          </p>
          <div className="mt-12">
            <Button
              size="lg"
              className="h-auto bg-white/20 border-2 border-white/30 text-white px-10 py-5 text-lg font-semibold transition-all duration-300 hover:bg-white/30 hover:border-white/50"
              asChild
            >
              <Link href="mailto:careers@lumivex.com">
                careers@lumivex.com
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}