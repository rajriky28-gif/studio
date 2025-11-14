import { Book, MessageCircle, CalendarX, Zap, Wrench, Sparkles, Target, RefreshCcw, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Transformation {
  before: {
    icon: LucideIcon;
    text: string;
  };
  after: {
    icon: LucideIcon;
    text: string;
  };
  result: string;
  resultIcon: LucideIcon;
}

const transformations: Transformation[] = [
  {
    before: { icon: Book, text: "Required technical expertise, programming knowledge, and understanding of complex systems" },
    after: { icon: MessageCircle, text: "Simple conversation in natural language. Describe what you need like talking to a colleague." },
    result: "Zero technical knowledge required",
    resultIcon: Target
  },
  {
    before: { icon: CalendarX, text: "Weeks or months of development, testing, and iteration before deployment" },
    after: { icon: Zap, text: "AI analyzes, builds, tests, and deploys complete agents in 3-5 minutes automatically" },
    result: "100x faster development",
    resultIcon: Zap
  },
  {
    before: { icon: Wrench, text: "Constant manual updates, debugging, and optimization consuming ongoing resources" },
    after: { icon: Sparkles, text: "Agents self-optimize, auto-debug, and continuously improve without manual intervention" },
    result: "Zero maintenance burden",
    resultIcon: RefreshCcw
  },
];

export function Solution() {
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-5">
            How Lumivex Solves This
          </h2>
          <p className="text-charcoal text-lg sm:text-xl font-light mb-20">
            We've reimagined the entire process from the ground up
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          {transformations.map((item, index) => (
            <div key={index} className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-16 py-12 ${index < transformations.length - 1 ? 'border-b border-gray-200' : ''}`}>
              {/* Before */}
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-gray-500 mb-4">Before</p>
                <div className="flex flex-col items-center md:flex-row gap-4 text-gray-600">
                  <item.before.icon className="h-10 w-10 text-gray-400 flex-shrink-0" />
                  <p className="text-base leading-relaxed">{item.before.text}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-cyan mx-auto rotate-90 md:rotate-0">
                <ArrowRight className="h-10 w-10" />
              </div>

              {/* After */}
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-navy mb-4">With Lumivex</p>
                <div className="flex flex-col items-center md:flex-row gap-4 text-charcoal">
                  <item.after.icon className="h-10 w-10 text-ocean flex-shrink-0" />
                  <p className="text-base leading-relaxed">{item.after.text}</p>
                </div>
                 <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-ocean font-semibold text-sm py-2 px-4 bg-ocean/10 rounded-full">
                  <item.resultIcon className="h-4 w-4" />
                  <span>{item.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
