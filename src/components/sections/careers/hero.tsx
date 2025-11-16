import { Globe, DollarSign, BarChart } from "lucide-react";
import Link from "next/link";

export function CareersHero() {
  return (
    <section className="bg-navy-gradient-deep pt-40 pb-24 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-6 text-sm text-white/70">
          <Link href="/" className="hover:text-cyan">Home</Link>
          <span className="mx-2">/</span>
          <span>Careers</span>
        </div>
        <p className="mb-5 text-cyan text-xs uppercase tracking-[3px] font-semibold">
          JOIN OUR TEAM
        </p>
        <h1 className="text-white font-light text-5xl sm:text-6xl lg:text-7xl !leading-tight tracking-tighter max-w-4xl mx-auto">
          Build the Future of AI with Us
        </h1>
        <p className="text-white/80 font-light text-xl leading-relaxed max-w-3xl mx-auto mt-8 mb-12">
          Join a team of innovators creating the platform that democratizes AI agent creation. We're looking for talented, passionate people who want to make a real impact.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-white">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-cyan"/>
            <span>Remote-First Team</span>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-cyan"/>
            <span>Competitive Salary</span>
          </div>
          <div className="flex items-center gap-3">
            <BarChart className="h-5 w-5 text-cyan"/>
            <span>Equity Options</span>
          </div>
        </div>
      </div>
    </section>
  );
}