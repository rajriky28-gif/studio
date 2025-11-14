import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowRight, Flame } from 'lucide-react';
import { AnimatedCounter } from '@/components/animated-counter';

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cream-gradient px-4 py-20 text-center">
      <div className="container mx-auto">
        <Badge
          variant="outline"
          className="animate-pulse-badge border-cyan bg-cyan/10 py-2 px-6 text-sm font-semibold uppercase text-cyan rounded-full"
        >
          🚀 Coming Soon
        </Badge>

        <h1 className="mt-8 text-5xl font-light leading-tight tracking-tighter text-navy sm:text-7xl md:text-8xl animate-fade-in-up [animation-delay:0.2s]">
          The AI That
          <br />
          Builds AI
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg font-light text-charcoal sm:text-xl md:text-2xl animate-fade-in-up [animation-delay:0.4s]">
          Create fully autonomous AI agents with a single conversation. No code. No complexity. Just intelligence.
        </p>

        <p className="mt-8 text-lg font-medium text-ocean animate-fade-in-up [animation-delay:0.6s]">
          Launching Q2 2025
        </p>

        <div className="mt-10 animate-fade-in-up [animation-delay:0.8s]">
          <Button
            size="lg"
            className="h-auto bg-navy-gradient px-12 py-5 text-base font-semibold text-white shadow-lg shadow-ocean/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-ocean/50 md:text-lg"
            asChild
          >
            <a href="#waitlist">
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-silver">
            Be among the first to experience the future of AI creation
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-base text-cyan font-medium animate-fade-in-up [animation-delay:1s]">
          <Flame className="h-5 w-5" />
          <AnimatedCounter target={2847} />
          <span className="text-charcoal">innovators already waiting</span>
        </div>
      </div>
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-silver animate-fade-in-up [animation-delay:1.2s]">
        <span className="text-sm">Discover more</span>
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}
