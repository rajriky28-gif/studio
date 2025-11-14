import { Badge } from '@/components/ui/badge';
import { XCircle, CheckCircle } from 'lucide-react';

const painPoints = [
  'Weeks of manual configuration',
  'Technical expertise required',
  'Expensive development teams',
  'Rigid, inflexible systems',
  'Constant maintenance needed',
];

const benefits = [
  'Minutes to deployment',
  'Simple conversation',
  'No technical knowledge needed',
  'Infinitely customizable',
  'Self-optimizing intelligence',
];

export function Vision() {
  return (
    <section id="vision" className="w-full bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-4xl font-light text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Reimagining AI Creation
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-charcoal sm:text-xl">
            For decades, building AI systems required armies of engineers and months of development. We're changing that.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* The Old Way */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 grayscale">
            <Badge variant="secondary" className="text-sm uppercase tracking-wider">The Old Way</Badge>
            <div className="mt-6 space-y-4">
              {painPoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                  <span className="text-base text-gray-600">{point}</span>
                </div>
              ))}
            </div>
          </div>
          {/* The Lumivex Way */}
          <div className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-cyan/5 p-8">
            <div className="absolute top-0 right-0 h-32 w-32 bg-cyan/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-ocean/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            <Badge variant="outline" className="border-cyan bg-transparent text-sm uppercase tracking-wider text-cyan">The Lumivex Way</Badge>
            <div className="mt-6 space-y-4">
              {benefits.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-cyan" />
                  <span className="text-base text-charcoal">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
